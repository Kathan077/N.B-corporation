import axios from 'axios';

const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const API_BASE = `${BACKEND_URL}/api/home-content`;

export const fetchHomeContent = async () => {
  try {
    const res = await axios.get(API_BASE, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    if (res.data && res.data.data) {
      return res.data.data;
    }
    return null;
  } catch (error) {
    console.warn('Could not fetch dynamic home content from backend, falling back to static defaults:', error.message);
    return null;
  }
};
