import axios from 'axios';

// axios instance 생성
const axiosInstance = axios.create({
  baseURL: '', // API 기본 URL 설정 // 필요에 따라 설정(하나의 서버로 프론트 백 관리시 비우기, 분리시 설정 필요)
               // front, back 분리시: 예) 'http://localhost:8080' back 서버 주소 입력해줘야 함 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // cross domain(서로 다른 도메인)에 요청 보낼 시,
  // credentials 정보를 담아서 보낼지 여부
  // credentials 정보: 1. 쿠키 2. 인증 헤더 3. TLS 클라이언트 인증서
                   // 4. 헤더 Authorization 항목
});

export default axiosInstance;