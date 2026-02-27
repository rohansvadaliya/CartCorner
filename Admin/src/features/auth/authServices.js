import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

// const getTokenFromLocalStorage = localStorage.get("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

const login = async (user) => {
  try {
    const response = await axios.post(`${base_url}user/admin-login`, user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};
const getOrders = async (data) => {
  try {
    const response = await axios.get(`${base_url}user/getallorders`, data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};
const getOrder = async (id) => {
  try {
    const response = await axios.get(
      `${base_url}user/getaOrder/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const updateOrder = async (data) => {
  try {
    const response = await axios.put(
      `${base_url}user/updateOrder/${data.id}`,
      { status: data.status },
      config
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const getMonthlyOrders = async (data) => {
  try {
    const response = await axios.get(
      `${base_url}user/getMonthWiseOrderIncome`,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const getYearlyStats = async (data) => {
  try {
    const response = await axios.get(
      `${base_url}user/getyearlyorders`,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyStats,
  updateOrder,
};

export default authService;
