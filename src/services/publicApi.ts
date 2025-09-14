import axios from "axios";

// API client for public endpoints (no authentication required)
const publicApi = axios.create({
  baseURL: "https://prosalud.test",
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default publicApi;