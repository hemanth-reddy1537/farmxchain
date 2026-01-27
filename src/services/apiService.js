import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAdminDashboard = () =>
  API.get("/admin/dashboard/overview");

export default API;
