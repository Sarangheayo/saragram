import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { reissueThunk } from '../store/thunks/authThunk.js';

// store 저장용 변수
let store = null;

// store 주입용 함수
export function injectStoreInAxios(_store) {
  store = _store;
}

// axios instance 생성
const axiosInstance = axios.create({
  baseURL: '', // API 기본 URL 설정 // 필요에 따라 설정(하나의 서버로 프론트 백 관리 시 비우기, 분리시 설정 필요)
               // front, back 분리시: 예) 'http://localhost:8080' back 서버 주소 입력해줘야 함 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
  // cross domain(서로 다른 도메인)에 요청 보낼 시,
  // credentials 정보를 담아서 보낼지 여부
  // credentials 정보: 1. 쿠키 2. 인증 헤더 3. TLS 클라이언트 인증서
                   // 4. 헤더 Authorization 항목
});

axiosInstance.interceptors.request.use(async config => {
  const noRetry = /^\/api\/auth\/reissue$/; // 리트라이 제외 URL 설정
  let { accessToken } = store.getState().auth; // auth state 획득
  
  try {
    // 엑세스 토큰 있음 && 리트라이 제외 URL 아님
    if(accessToken && !noRetry.test(config.url)) {
      // 엑세스 토큰 만료 확인
      const claims = jwtDecode(accessToken);
      const now = dayjs().unix();
      const expTime = dayjs.unix(claims.exp).add(-5, 'minute').unix();

      if (now >= expTime) {
        console.log('만료돼서 엑세스 토큰 재발급');
        const response = await store.dispatch(reissueThunk()).unwrap();
        accessToken = response.data.accessToken;
      }
  
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  
    return config;
  } catch(error) {
    console.log('axios interceptor', error);
    return Promise.reject(error);
  }
});

export default axiosInstance;