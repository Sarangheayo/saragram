import axiosInstance from "../../api/axiosInstance.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const storeCommentThunk = createAsyncThunk(
  'commentStore/storeCommentThunk', // thunk의 고유명
  async (data, { rejectWithValue }) => {
   try {
     const url = `/api/comments`;

     const response = await axiosInstance.post(url, data);
    
     return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

