import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getBlogCategories = async () => {
  try {
    const response = await axios.get(`${base_url}blogcategory/`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};
const createBlogCategory = async (bcat) => {
  try {
    const response = await axios.post(`${base_url}blogcategory/`, bcat, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};
const updateBlogCategory = async (blogCat) => {
  try {
    const response = await axios.put(
      `${base_url}blogcategory/${blogCat.id}`,
      { title: blogCat.blogCatData.title },
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
const getBlogCategory = async (id) => {
  try {
    const response = await axios.get(`${base_url}blogcategory/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const deleteBlogCategory = async (id) => {
  try {
    const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};
const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
};

export default bCategoryService;
