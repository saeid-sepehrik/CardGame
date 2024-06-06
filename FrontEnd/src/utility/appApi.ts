import axios from "axios";
import { store } from "../redux/store";

export const appApi = axios.create({
  baseURL: "https://cardgame-oyg6.onrender.com/api",
});

appApi.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});
