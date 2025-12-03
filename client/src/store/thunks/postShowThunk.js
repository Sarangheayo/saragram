import axiosInstance from "../../api/axiosInstance.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postShowThunk = createAsyncThunk(
  'postShow/postShowThunk', // thunk의 고유명
  async (id, { rejectWithValue }) => {
   try {
     const url = `/api/posts/${id}`;
     const response = await axiosInstance.get(url);
  
     return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);