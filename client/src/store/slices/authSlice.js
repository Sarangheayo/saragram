import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, reissueThunk } from '../thunks/authThunk.js';

const initialState = {
  accessToken: null,
  user: null,
  // post 페이지 진입 시 유저 정보 나타내야 하므로 미리 불러오기
  isLoggedIn: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth(state) {
      state.accessToken = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload.data; // 백엔드에서 받은 데이터 구조 분해
        state.accessToken = accessToken; // 액세스 토큰 저장
        state.user = user; // 사용자 정보 저장
        state.isLoggedIn = true; // 로그인 상태로 설정
      })    
      .addCase(reissueThunk.fulfilled, (state, action) => {
      const { accessToken, user } = action.payload.data; // 백엔드에서 받은 데이터 구조 분해
      state.accessToken = accessToken; // 액세스 토큰 저장
      state.user = user; // 사용자 정보 저장
      state.isLoggedIn = true; // 로그인 상태로 설정
      })
  },
});

export const {
  clearAuth,
} = slice.actions; // redux toolkit에서 자동 생성한 action creator들 export

export default slice.reducer; // reducer 함수 export
