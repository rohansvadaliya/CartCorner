import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getBrands = async () => {
  try {
    const response = await axios.get(`${base_url}brand/`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const createBrand = async (brand) => {
  try {
    const response = await axios.post(`${base_url}brand/`, brand, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};
const updateBrand = async (brand) => {
  try {
    const response = await axios.put(
      `${base_url}brand/${brand.id}`,
      { title: brand.brandData.title },
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
const getBrand = async (id) => {
  try {
    const response = await axios.get(`${base_url}brand/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const deleteBrand = async (id) => {
  try {
    const response = await axios.delete(`${base_url}brand/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
