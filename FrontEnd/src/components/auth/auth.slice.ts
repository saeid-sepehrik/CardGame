import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface authState {
  loading: boolean;
  email: string;
  token: string;
}

const initialState: authState = {
  loading: false,
  email: "",
  token: "",
};

interface LoginState {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (loginData: LoginState) => {
    const resp = await axios.post(
      "http://localhost:3000/api/auth/login",
      loginData
    );
    return { token: resp.data.data.token, email: resp.data.data.email };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(login.rejected, (state) => {
        state.loading = false;
        state.token = "";
        state.email = "";
      }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.email = action.payload.email;
      });
  },
});

export default authSlice.reducer;
