import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
   console.log("ACCESS TOKEN:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      console.log("Refreshing token...");
      originalRequest._retry = true;

     const res = await api.post("/auth/refresh");

      localStorage.setItem("token", res.data.token);

      originalRequest.headers.Authorization =
        `Bearer ${res.data.token}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;