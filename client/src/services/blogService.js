import axios from 'axios';
import { POSTS as STATIC_POSTS } from '../data/blogData';

const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const POSTS_API = `${BACKEND_URL}/api/blog-posts`;
const CONTENT_API = `${BACKEND_URL}/api/blog-content`;

export const DEFAULT_BLOG_PAGE_DATA = {
  hero: {
    badge: "Industrial Knowledge Hub",
    title: "Our Blog",
    titleAccent: "Blog",
    subtitle: "Engineering insights, technical application guides, and industrial innovation updates."
  },
  featured: {
    eyebrow: "PINNED_INTEL // EDITOR'S PICK",
    unitTag: "PRIORITY_TRANS // 0xAF92",
    selectedPostId: "3m-vhb-industrial-tapes-guide",
    ctaText: "Read Full Article"
  },
  ticker: {
    enabled: true,
    label: "LIVE_STREAM",
    customMessage: ""
  }
};

export const fetchLiveBlogPosts = async (params = {}) => {
  try {
    const res = await axios.get(POSTS_API, {
      params,
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
    return STATIC_POSTS;
  } catch (error) {
    console.warn("Backend Blog API not reachable, using static articles:", error.message);
    return STATIC_POSTS;
  }
};

export const fetchLiveBlogPostById = async (id) => {
  try {
    const res = await axios.get(`${POSTS_API}/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    if (res.data && res.data.data) {
      return res.data.data;
    }
    return STATIC_POSTS.find(p => p.id === id) || null;
  } catch (error) {
    console.warn(`Blog Post [${id}] fallback lookup:`, error.message);
    return STATIC_POSTS.find(p => p.id === id) || null;
  }
};

export const fetchLiveBlogContent = async () => {
  try {
    const res = await axios.get(CONTENT_API, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    if (res.data && res.data.data) {
      return res.data.data;
    }
    return DEFAULT_BLOG_PAGE_DATA;
  } catch (error) {
    console.warn("Backend Blog Content API fallback:", error.message);
    return DEFAULT_BLOG_PAGE_DATA;
  }
};
