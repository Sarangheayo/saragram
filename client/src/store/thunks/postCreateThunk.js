import axiosInstance from "../../api/axiosInstance.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postImageUploadThunk = createAsyncThunk(
  'postCreate/postCreateThunk', // thunk의 고유명
  async (file, { rejectWithValue }) => {
   try {
     const url = `/api/files/posts`;

      // axiosInstance default 설정이  'Content-Type': 'application/json', 인데 여기서만 multipart content로 바꿔주기
      const headers = {
        'Content-Type': 'multipart/form-data'
      };

      // form data 생성 file -> form data형식으로 바꿔서 넣어주기
      const formData = new FormData();
      formData.append('image', file);

      const response = await axiosInstance.post(url, formData, { headers });
  
     return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


// 게시글 작성 텅크 = store
export const postStoreThunk = createAsyncThunk(
  'postCreate/postStoreThunk', // thunk의 고유명
  async (data, { rejectWithValue }) => {
   try {
     const url = `/api/posts`;

     const response = await axiosInstance.post(url, data);
  
     return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);