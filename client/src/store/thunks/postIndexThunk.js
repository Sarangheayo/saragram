import axiosInstance from "../../api/axiosInstance.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postIndexThunk = createAsyncThunk(
  'postIndex/postIndexThunk', // thunk의 고유명
  async (page, { rejectWithValue }) => {
   try {
     const url = `api/posts`;
     const params = { page };
     const response = await axiosInstance.get(url, { params });
  
     return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);