// src/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Django API base URL
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Example: login function
export const loginUser = async (username: string, password: string) => {
  const response = await API.post("/token/", { username, password });
  // Save tokens in localStorage
  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
  return response.data;
};

// Attach token automatically to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;