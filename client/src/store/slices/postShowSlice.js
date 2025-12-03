import { createSlice } from '@reduxjs/toolkit';
import { postShowThunk } from '../thunks/postShowThunk.js';

const initialState = {
  show: null,
};

const slice = createSlice({
  name: 'postShow',
  initialState,
  reducers: {
    clearPostShow(state) {
      state.show = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postShowThunk.fulfilled, (state, action) => {
        state.show = action.payload.data;
    })
  }
});

export const {
  clearPostShow,
} = slice.actions; // redux toolkit에서 자동 생성한 action creator들

export default slice.reducer; // reducer 함수 export
