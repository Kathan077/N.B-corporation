import axios from 'axios';
import { PRODUCTS as STATIC_PRODUCTS } from '../data/productsData';

const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const API_BASE = `${BACKEND_URL}/api/products`;

export const fetchLiveProducts = async (params = {}) => {
  try {
    const res = await axios.get(API_BASE, {
      params,
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
    return STATIC_PRODUCTS;
  } catch (error) {
    console.warn("Backend Products API not reachable, using static catalog:", error.message);
    return STATIC_PRODUCTS;
  }
};

export const fetchLiveProductById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    if (res.data && res.data.data) {
      return res.data.data;
    }
    return STATIC_PRODUCTS.find(p => p.id === id || p.code === id) || null;
  } catch (error) {
    console.warn(`Product [${id}] fallback lookup:`, error.message);
    return STATIC_PRODUCTS.find(p => p.id === id || p.code === id) || null;
  }
};
