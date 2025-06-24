import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "https://socket-talk-api.onrender.com/api" : "/"

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket:null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("https://socket-talk-api.onrender.com/api/auth/check");
      set({ authUser: res.data });
      get().connectSocket()
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("https://socket-talk-api.onrender.com/api/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("https://socket-talk-api.onrender.com/api/auth/login", data);
      set({ authUser: res.data });
      toast.success("Successfully logged in!");

      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("https://socket-talk-api.onrender.com/api/auth/logout");
      set({ authUser: null });
      toast.success("Successfully logged out");
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("https://socket-talk-api.onrender.com/api/auth/update-profile", data);
      set({ authUser: res.data });
      console.log(data);
      toast.success("Profile updated sucessfully!");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in update profile", error);
    } finally {
      set({ isUpdatingProfile: true });
    }
  },

  connectSocket: ()=>{
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL,{
      query:{
        userId: authUser._id,
      },
      transports: ["websocket", "polling"],
      withCredentials: true,
    })
    socket.connect()

    set({socket:socket })

    socket.on("getOnlineUsers",(userIds)=>{
      set({onlineUsers: userIds})
    })
  },
  disconnectSocket: ()=>{
    if(get().socket?.connected) get().socket.disconnect(); // check if connected and them disconnect
  },
}));
