import axios from "axios";
import { base_url } from "./baseUrl";

const getTokenFromLocalStorage = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return user?.token || null;
};

const getRefreshTokenFromLocalStorage = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return user?.refreshToken || null;
};

// Set global axios base URL so services using default axios pick it up
axios.defaults.baseURL = base_url;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  isRefreshing = false;
  failedQueue = [];
};

// Request interceptor to add token on global axios
axios.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors and token refresh
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshTokenFromLocalStorage();
      if (refreshToken) {
        return axios
          .post(`${base_url}user/refresh-token`, {
            refreshToken: refreshToken,
          })
          .then(res => {
            const { token } = res.data;
            const user = localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user"))
              : null;
            if (user) {
              user.token = token;
              localStorage.setItem("user", JSON.stringify(user));
            }
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            originalRequest.headers["Authorization"] = "Bearer " + token;
            processQueue(null, token);
            return axios(originalRequest);
          })
          .catch(err => {
            processQueue(err, null);
            localStorage.clear();
            window.location.href = "/admin/login";
            return Promise.reject(err);
          });
      } else {
        // No refresh token, redirect to login
        localStorage.clear();
        window.location.href = "/admin/login";
        return Promise.reject(error);
      }
    }

    // For other errors, just reject
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
