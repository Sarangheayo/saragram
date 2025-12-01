import { createSlice } from '@reduxjs/toolkit';
import { postIndexThunk } from '../thunks/postIndexThunk.js';

const initialState = {
  list: null,
  page: 0,
};

const slice = createSlice({
  name: 'postIndex',
  initialState,
  reducers: {
    clearPostIndex(state) {
      state.list = null;
      state.page = 0; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postIndexThunk.fulfilled, (state, action) => {
        const { posts, page } = action.payload.data;
        // 비동기 작업이 시작될 때 상태를 업데이트할 수 있습니다.
        // list가 비어있는지 확인하고, 비어있다면 새로 받은 데이터를 할당
        if (state.list) {
          state.list = [...state.list, ...posts];
        } else {
          // list가 이미 존재한다면, 기존 데이터에 새로 받은 데이터를 추가
          state.list = posts;
        }
        // 현재 페이지 저장 처리
        state.page = page;
    })
  }
});

export const {
  clearPostIndex,
} = slice.actions; // redux toolkit에서 자동 생성한 action creator들

export default slice.reducer; // reducer 함수 export
