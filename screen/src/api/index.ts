import axios from "axios";

import { BASE_URL, TIMEOUT } from "./config";

const defHttp = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

defHttp.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error);
    return error;
  }
);

defHttp.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return error;
  }
);

export default defHttp;
