import axios from "axios";
import { store } from "../redux/store";

export const appApi = axios.create({
  baseURL: "http://localhost:3000",
});

appApi.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers["token"] = token;
    //bearer TOKEN
  }
  return config;
});
