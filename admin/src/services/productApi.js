import axios from 'axios';

const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const API_BASE = `${BACKEND_URL}/api/products`;

export const fetchProducts = async (params = {}) => {
  try {
    const res = await axios.get(API_BASE, { params });
    if (res.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    return [];
  } catch (error) {
    console.error("Fetch Products API Error:", error.message);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data?.data || null;
  } catch (error) {
    console.error(`Fetch Product [${id}] Error:`, error.message);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const res = await axios.post(API_BASE, productData);
    return res.data;
  } catch (error) {
    console.error("Create Product API Error:", error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const res = await axios.put(`${API_BASE}/${id}`, productData);
    return res.data;
  } catch (error) {
    console.error(`Update Product [${id}] API Error:`, error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Delete Product [${id}] API Error:`, error);
    throw error;
  }
};

export const seedProducts = async (products, overwrite = false) => {
  try {
    const res = await axios.post(`${API_BASE}/seed`, { products, overwrite });
    return res.data;
  } catch (error) {
    console.error("Seed Products API Error:", error);
    throw error;
  }
};
