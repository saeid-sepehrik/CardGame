import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  async ({ email, password }: LoginState) => {
    console.log("login" + email + password);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
