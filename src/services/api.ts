import axios from "axios";

const api = axios.create({
  baseURL: "https://prosalud.test",
  withCredentials: true,
});

export default api;
