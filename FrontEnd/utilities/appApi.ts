import axios from "axios";
import { store } from "../src/redux/store";

export const appApi = axios.create({
    baseURL: "http://localhost:3010",
});

appApi.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers["token"] = token;
        //bearer TOKEN
    }
    return config;
});