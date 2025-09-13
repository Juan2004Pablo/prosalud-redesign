import axios from "axios";

const api = axios.create({
  baseURL: "https://prosalud.test",
  withCredentials: true,
});

api.defaults.xsrfCookieName = "XSRF-TOKEN";
api.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

export default api;
