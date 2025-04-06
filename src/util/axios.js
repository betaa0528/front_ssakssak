// src/utils/axios.js
import axios from "axios";
import { useAuthStore } from "@/stores/auth"; // 경로는 프로젝트 구조에 맞게 수정

const instance = axios.create({
  baseURL: "/api",
  withCredentials: true, // 쿠키 사용 시 필요
});

// 요청 인터셉터
instance.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export default instance;
