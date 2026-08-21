import axios from 'axios';

const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const POSTS_API = `${BACKEND_URL}/api/blog-posts`;
const CONTENT_API = `${BACKEND_URL}/api/blog-content`;

export const DEFAULT_BLOG_CONTENT = {
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

// --- Blog Posts (Articles) CRUD ---
export const fetchBlogPosts = async (params = {}) => {
  try {
    const res = await axios.get(POSTS_API, { params });
    if (res.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    return [];
  } catch (error) {
    console.error("Fetch Blog Posts API Error:", error.message);
    throw error;
  }
};

export const fetchBlogPostById = async (id) => {
  try {
    const res = await axios.get(`${POSTS_API}/${id}`);
    return res.data?.data || null;
  } catch (error) {
    console.error(`Fetch Blog Post [${id}] Error:`, error.message);
    throw error;
  }
};

export const createBlogPost = async (postData) => {
  try {
    const res = await axios.post(POSTS_API, postData);
    return res.data;
  } catch (error) {
    console.error("Create Blog Post API Error:", error);
    throw error;
  }
};

export const updateBlogPost = async (id, postData) => {
  try {
    const res = await axios.put(`${POSTS_API}/${id}`, postData);
    return res.data;
  } catch (error) {
    console.error(`Update Blog Post [${id}] Error:`, error);
    throw error;
  }
};

export const deleteBlogPost = async (id) => {
  try {
    const res = await axios.delete(`${POSTS_API}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Delete Blog Post [${id}] Error:`, error);
    throw error;
  }
};

export const seedBlogPosts = async (posts, overwrite = false) => {
  try {
    const res = await axios.post(`${POSTS_API}/seed`, { posts, overwrite });
    return res.data;
  } catch (error) {
    console.error("Seed Blog Posts API Error:", error);
    throw error;
  }
};

// --- Blog Page Content (Hero & Slider) ---
export const fetchBlogContent = async () => {
  try {
    const res = await axios.get(CONTENT_API);
    if (res.data && res.data.data) {
      return res.data.data;
    }
    return DEFAULT_BLOG_CONTENT;
  } catch (error) {
    console.warn("Fetch Blog Content API note:", error.message);
    return DEFAULT_BLOG_CONTENT;
  }
};

export const saveFullBlogContent = async (contentData) => {
  try {
    const res = await axios.post(CONTENT_API, contentData);
    return res.data;
  } catch (error) {
    console.error("Save Blog Content API Error:", error);
    throw error;
  }
};

export const resetBlogContentToDefault = async () => {
  try {
    const res = await axios.post(`${CONTENT_API}/reset`);
    return res.data?.data || DEFAULT_BLOG_CONTENT;
  } catch (error) {
    console.error("Reset Blog Content API Error:", error);
    throw error;
  }
};
