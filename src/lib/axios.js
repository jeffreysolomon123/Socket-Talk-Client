import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://socket-talk-api.onrender.com/api" : "https://socket-talk-api.onrender.com/api",
  withCredentials: true,
});
