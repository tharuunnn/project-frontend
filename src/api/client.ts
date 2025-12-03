import axios from "axios";
import * as SecureStore from "expo-secure-store";

//reuable axios instane , used throughout
const api = axios.create({
  baseURL: "http://192.168.29.133:8000",
  timeout: 8000,
});

// Inject token into each request
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
