import axios from "axios";
import cookie from "js-cookie";

const api = axios.create({
  baseURL: `http://localhost:1234/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = cookie.get("token");

  // @ts-ignore
  config.headers = {
    Authorization: `Bearer ${token}`,
  };
  return config;
});

export default api;
