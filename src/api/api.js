import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000/api/v1",
});

api.interceptors.request.use(
  (config) => {

    // user token
    const userToken =
      localStorage.getItem("token");

    // admin token
    const adminToken =
      localStorage.getItem("admin_token");

    // priority
    const token = userToken || adminToken;


    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

export default api;