import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getBlogs = async () => {
  try {
    const response = await axios.get(`${base_url}blog/`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};
const createBlog = async (blog) => {
  try {
    const response = await axios.post(`${base_url}blog/`, blog, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};
const updateBlog = async (blog) => {
  try {
    const response = await axios.put(
      `${base_url}blog/${blog.id}`,
      {
        title: blog.blogData.title,
        description: blog.blogData.description,
        category: blog.blogData.category,
        images: blog.blogData.images,
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
const getBlog = async (id) => {
  try {
    const response = await axios.get(`${base_url}blog/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};

const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${base_url}blog/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }
    throw error.response?.data || error.message;
  }
};
const blogService = {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
