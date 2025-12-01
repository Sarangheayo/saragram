import { configureStore } from "@reduxjs/toolkit";
import postIndexReducer from "./slices/postIndexSlice.js";

export default configureStore({
  reducer: {
    // 여기에 slice 리듀서들을 추가합니다.
    postIndex: postIndexReducer,
  },
});