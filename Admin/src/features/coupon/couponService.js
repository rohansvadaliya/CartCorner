import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getCoupons = async () => {
  try {
    const response = await axios.get(`${base_url}coupon/`, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const createCoupons = async (coupon) => {
  try {
    const response = await axios.post(`${base_url}coupon/`, coupon, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};
const updateCoupon = async (coupon) => {
  try {
    const response = await axios.put(
      `${base_url}coupon/${coupon.id}`,
      {
        name: coupon.couponData.name,
        expiry: coupon.couponData.expiry,
        discount: coupon.couponData.discount,
      },
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
const getCoupon = async (id) => {
  try {
    const response = await axios.get(`${base_url}coupon/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const deleteCoupon = async (id) => {
  try {
    const response = await axios.delete(`${base_url}coupon/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const couponService = {
  getCoupons,
  createCoupons,
  deleteCoupon,
  getCoupon,
  updateCoupon,
};

export default couponService;
