import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_API_BASE_URL,
  timeout: 10000,
  params: { key: import.meta.env.VITE_WEATHER_API_KEY, aqi: "yes" },
});

export default axiosInstance;
