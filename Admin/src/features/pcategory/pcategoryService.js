import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  try {
    const response = await axios.get(`${base_url}category/`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};
const createCategory = async (category) => {
  try {
    const response = await axios.post(`${base_url}category/`, category, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const getProductCategory = async (id) => {
  try {
    const response = await axios.get(`${base_url}category/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const deleteProductCategory = async (id) => {
  try {
    const response = await axios.delete(`${base_url}category/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};
const updateProductCategory = async (category) => {
  try {
    const response = await axios.put(
      `${base_url}category/${category.id}`,
      { title: category.pCatData.title },
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
const pCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default pCategoryService;
