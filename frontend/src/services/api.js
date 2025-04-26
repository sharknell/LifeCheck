import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ 꼭 Bearer 포함해야 함!
  }
  return config;
});

export default API;
