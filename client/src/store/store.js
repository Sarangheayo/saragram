import { configureStore } from "@reduxjs/toolkit";
import postIndexReducer from "./slices/postIndexSlice.js";
import authReducer from './slices/authSlice.js';
import postShowReducer from './slices/postShowSlice.js';

export default configureStore({
  reducer: {
    // 여기에 slice 리듀서들을 추가합니다.
    postIndex: postIndexReducer,
    auth: authReducer,
    postShow: postShowReducer
  },
});