import React, { useState, useEffect } from 'react';
import Sidebar, { HOME_SECTIONS, ABOUT_SECTIONS, PRODUCT_SECTIONS, BLOG_SECTIONS } from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';

// Home Editors
import HeroEditor from './components/editors/HeroEditor';
import PrinciplesEditor from './components/editors/PrinciplesEditor';
import WhyChooseUsEditor from './components/editors/WhyChooseUsEditor';
import ApplicationsEditor from './components/editors/ApplicationsEditor';
import TestimonialsEditor from './components/editors/TestimonialsEditor';
import FeaturedProductsEditor from './components/editors/FeaturedProductsEditor';
import BrandsEditor from './components/editors/BrandsEditor';
import ImpactEditor from './components/editors/ImpactEditor';

// About Editors
import AboutBannerHeroEditor from './components/aboutEditors/AboutBannerHeroEditor';
import AboutStatsEditor from './components/aboutEditors/AboutStatsEditor';
import AboutStoryMissionEditor from './components/aboutEditors/AboutStoryMissionEditor';
import AboutIndustriesEditor from './components/aboutEditors/AboutIndustriesEditor';
import AboutCategoriesEditor from './components/aboutEditors/AboutCategoriesEditor';
import AboutPillarsValuesEditor from './components/aboutEditors/AboutPillarsValuesEditor';
import AboutContactEditor from './components/aboutEditors/AboutContactEditor';

// Product Manager
import ProductsManager from './components/productEditors/ProductsManager';

// Blog Editors & Manager
import BlogHeroEditor from './components/blogEditors/BlogHeroEditor';
import BlogSliderEditor from './components/blogEditors/BlogSliderEditor';
import BlogManager from './components/blogEditors/BlogManager';

// APIs
import { 
  fetchHomeContent, 
  saveFullHomeContent, 
  resetHomeToDefault, 
  DEFAULT_HOME_DATA 
} from './services/api';

import {
  fetchAboutContent,
  saveFullAboutContent,
  resetAboutToDefault,
  DEFAULT_ABOUT_DATA
} from './services/aboutApi';

import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from './services/productApi';

import {
  fetchBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  fetchBlogContent,
  saveFullBlogContent,
  resetBlogContentToDefault,
  DEFAULT_BLOG_CONTENT
} from './services/blogApi';

function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'about' | 'products' | 'blogs'
  const [activeTab, setActiveTab] = useState('hero');

  const [homeContent, setHomeContent] = useState(DEFAULT_HOME_DATA);
  const [aboutContent, setAboutContent] = useState(DEFAULT_ABOUT_DATA);
  const [blogContent, setBlogContent] = useState(DEFAULT_BLOG_CONTENT);
  const [products, setProducts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  // Switch page handler
  const handlePageChange = (page) => {
    setActivePage(page);
    if (page === 'about') {
      setActiveTab('aboutHero');
    } else if (page === 'products') {
      setActiveTab('catalog');
    } else if (page === 'blogs') {
      setActiveTab('blogHero');
    } else {
      setActiveTab('hero');
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [homeData, aboutData, blogConfig, productsList, postsList] = await Promise.all([
        fetchHomeContent().catch(() => DEFAULT_HOME_DATA),
        fetchAboutContent().catch(() => DEFAULT_ABOUT_DATA),
        fetchBlogContent().catch(() => DEFAULT_BLOG_CONTENT),
        fetchProducts().catch(() => []),
        fetchBlogPosts().catch(() => [])
      ]);
      setHomeContent(homeData);
      setAboutContent(aboutData);
      setBlogContent(blogConfig);
      setProducts(productsList);
      setBlogPosts(postsList);
      setIsOnline(true);
    } catch (err) {
      console.warn('Backend API connection note:', err.message);
      setHomeContent(DEFAULT_HOME_DATA);
      setAboutContent(DEFAULT_ABOUT_DATA);
      setBlogContent(DEFAULT_BLOG_CONTENT);
      setProducts([]);
      setBlogPosts([]);
      setIsOnline(false);
    } finally {
      setLoading(false);
      setUnsavedChanges(false);
    }
  };

  // Update Home section
  const handleHomeSectionUpdate = async (sectionKey, updatedSectionData) => {
    const newContent = {
      ...homeContent,
      [sectionKey]: updatedSectionData
    };
    setHomeContent(newContent);
    setUnsavedChanges(true);

    try {
      await saveFullHomeContent(newContent);
      setUnsavedChanges(false);
      showToast({
        type: 'success',
        message: 'Home section updated and synced live!'
      });
    } catch (err) {
      console.warn('Auto-sync failed, keeping pending state:', err);
    }
  };

  // Update About section
  const handleAboutSectionUpdate = async (sectionKey, updatedSectionData) => {
    const newContent = {
      ...aboutContent,
      [sectionKey]: updatedSectionData
    };
    setAboutContent(newContent);
    setUnsavedChanges(true);

    try {
      await saveFullAboutContent(newContent);
      setUnsavedChanges(false);
      showToast({
        type: 'success',
        message: 'About section updated and synced live!'
      });
    } catch (err) {
      console.warn('Auto-sync failed, keeping pending state:', err);
    }
  };

  // Update Blog Page configuration (Hero, Featured, Slider)
  const handleBlogContentUpdate = async (sectionKey, updatedSectionData) => {
    const newContent = {
      ...blogContent,
      [sectionKey]: updatedSectionData
    };
    setBlogContent(newContent);
    setUnsavedChanges(true);

    try {
      await saveFullBlogContent(newContent);
      setUnsavedChanges(false);
      showToast({
        type: 'success',
        message: 'Blog section updated and synced live!'
      });
    } catch (err) {
      console.warn('Auto-sync failed, keeping pending state:', err);
    }
  };

  // Products CRUD Operations
  const handleAddProduct = async (productData) => {
    try {
      const res = await createProduct(productData);
      if (res.data) {
        setProducts([res.data, ...products]);
        showToast({
          type: 'success',
          message: `Product '${productData.name}' created successfully!`
        });
      }
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Failed to create product: ' + (err.response?.data?.msg || err.message)
      });
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      const res = await updateProduct(id, productData);
      if (res.data) {
        setProducts(products.map(p => p.id === id ? res.data : p));
        showToast({
          type: 'success',
          message: `Product '${productData.name || id}' updated successfully!`
        });
      }
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Failed to update product: ' + (err.response?.data?.msg || err.message)
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      showToast({
        type: 'success',
        message: 'Product deleted from catalog.'
      });
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Failed to delete product: ' + (err.response?.data?.msg || err.message)
      });
    }
  };

  const handleRefreshProducts = async () => {
    try {
      const list = await fetchProducts();
      setProducts(list);
      showToast({
        type: 'info',
        message: `Catalog refreshed (${list.length} products).`
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Blogs CRUD Operations
  const handleAddBlogPost = async (postData) => {
    try {
      const res = await createBlogPost(postData);
      if (res.data) {
        setBlogPosts([res.data, ...blogPosts]);
        showToast({
          type: 'success',
          message: `Article '${postData.title}' published successfully!`
        });
      }
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Failed to create article: ' + (err.response?.data?.msg || err.message)
      });
    }
  };

  const handleUpdateBlogPost = async (id, postData) => {
    try {
      const res = await updateBlogPost(id, postData);
      if (res.data) {
        setBlogPosts(blogPosts.map(p => p.id === id ? res.data : p));
        showToast({
          type: 'success',
          message: `Article '${postData.title || id}' updated successfully!`
        });
      }
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Failed to update article: ' + (err.response?.data?.msg || err.message)
      });
    }
  };

  const handleDeleteBlogPost = async (id) => {
    try {
      await deleteBlogPost(id);
      setBlogPosts(blogPosts.filter(p => p.id !== id));
      showToast({
        type: 'success',
        message: 'Article deleted from blog.'
      });
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Failed to delete article: ' + (err.response?.data?.msg || err.message)
      });
    }
  };

  const handleRefreshBlogPosts = async () => {
    try {
      const list = await fetchBlogPosts();
      setBlogPosts(list);
      showToast({
        type: 'info',
        message: `Blog articles refreshed (${list.length} articles).`
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Manual save for Home / About / Blog settings
  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (activePage === 'about') {
        await saveFullAboutContent(aboutContent);
        showToast({
          type: 'success',
          message: 'About page changes saved successfully!'
        });
      } else if (activePage === 'home') {
        await saveFullHomeContent(homeContent);
        showToast({
          type: 'success',
          message: 'Home page changes saved successfully!'
        });
      } else if (activePage === 'blogs') {
        await saveFullBlogContent(blogContent);
        showToast({
          type: 'success',
          message: 'Blog page settings saved successfully!'
        });
      }
      setUnsavedChanges(false);
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Failed to save changes: ' + (err.response?.data?.msg || err.message)
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to defaults
  const handleReset = async () => {
    let targetLabel = 'Home Page';
    if (activePage === 'about') targetLabel = 'About Page';
    if (activePage === 'blogs') targetLabel = 'Blog Page';

    if (!window.confirm(`Reset all ${targetLabel} content back to official factory defaults?`)) {
      return;
    }
    setIsSaving(true);
    try {
      if (activePage === 'about') {
        await resetAboutToDefault();
        setAboutContent(DEFAULT_ABOUT_DATA);
      } else if (activePage === 'blogs') {
        await resetBlogContentToDefault();
        setBlogContent(DEFAULT_BLOG_CONTENT);
      } else {
        await resetHomeToDefault();
        setHomeContent(DEFAULT_HOME_DATA);
      }
      setUnsavedChanges(false);
      showToast({
        type: 'info',
        message: `${targetLabel} reset to default content.`
      });
    } catch (err) {
      if (activePage === 'about') {
        setAboutContent(DEFAULT_ABOUT_DATA);
      } else if (activePage === 'blogs') {
        setBlogContent(DEFAULT_BLOG_CONTENT);
      } else {
        setHomeContent(DEFAULT_HOME_DATA);
      }
      setUnsavedChanges(false);
      showToast({
        type: 'info',
        message: `Reset locally to ${targetLabel} default content.`
      });
    } finally {
      setIsSaving(false);
    }
  };

  let currentTabs = HOME_SECTIONS;
  if (activePage === 'about') currentTabs = ABOUT_SECTIONS;
  if (activePage === 'products') currentTabs = PRODUCT_SECTIONS;
  if (activePage === 'blogs') currentTabs = BLOG_SECTIONS;

  const isProductCatalogOnly = activePage === 'products';

  return (
    <div className="flex min-h-screen bg-[#070A10] text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        onSelectPage={handlePageChange}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOnline={isOnline}
        unsavedChanges={unsavedChanges}
        productsCount={products.length}
        blogsCount={blogPosts.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activePage={activePage}
          activeTab={activeTab}
          unsavedChanges={unsavedChanges}
          isSaving={isSaving}
          onSave={handleSave}
          onReset={handleReset}
        />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
              <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-semibold text-slate-400 font-mono">
                Loading CMS Content...
              </p>
            </div>
          ) : (
            <>
              {/* Sub-tabs Pills Bar (For Home, About, and Blog) */}
              {!isProductCatalogOnly && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80 no-scrollbar">
                  {currentTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-red-600 text-white shadow-lg shadow-red-950/60'
                            : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
                        }`}
                      >
                        <Icon size={14} />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Dynamic Sub-section Editor View */}
              <div className="transition-all duration-300">
                {/* --- HOME PAGE EDITORS --- */}
                {activePage === 'home' && (
                  <>
                    {activeTab === 'hero' && (
                      <HeroEditor
                        data={homeContent.hero || DEFAULT_HOME_DATA.hero}
                        onChange={(data) => handleHomeSectionUpdate('hero', data)}
                      />
                    )}

                    {activeTab === 'principles' && (
                      <PrinciplesEditor
                        data={homeContent.principles || DEFAULT_HOME_DATA.principles}
                        onChange={(data) => handleHomeSectionUpdate('principles', data)}
                      />
                    )}

                    {activeTab === 'whyChooseUs' && (
                      <WhyChooseUsEditor
                        data={homeContent.whyChooseUs || DEFAULT_HOME_DATA.whyChooseUs}
                        onChange={(data) => handleHomeSectionUpdate('whyChooseUs', data)}
                      />
                    )}

                    {activeTab === 'applications' && (
                      <ApplicationsEditor
                        data={homeContent.applications || DEFAULT_HOME_DATA.applications}
                        onChange={(data) => handleHomeSectionUpdate('applications', data)}
                      />
                    )}

                    {activeTab === 'testimonials' && (
                      <TestimonialsEditor
                        data={homeContent.testimonials || DEFAULT_HOME_DATA.testimonials}
                        onChange={(data) => handleHomeSectionUpdate('testimonials', data)}
                      />
                    )}

                    {activeTab === 'featuredProducts' && (
                      <FeaturedProductsEditor
                        data={homeContent.featuredProducts || DEFAULT_HOME_DATA.featuredProducts}
                        onChange={(data) => handleHomeSectionUpdate('featuredProducts', data)}
                      />
                    )}

                    {activeTab === 'brands' && (
                      <BrandsEditor
                        data={homeContent.brands || DEFAULT_HOME_DATA.brands}
                        onChange={(data) => handleHomeSectionUpdate('brands', data)}
                      />
                    )}

                    {activeTab === 'impact' && (
                      <ImpactEditor
                        data={homeContent.impact || DEFAULT_HOME_DATA.impact}
                        onChange={(data) => handleHomeSectionUpdate('impact', data)}
                      />
                    )}
                  </>
                )}

                {/* --- ABOUT PAGE EDITORS --- */}
                {activePage === 'about' && (
                  <>
                    {activeTab === 'aboutHero' && (
                      <AboutBannerHeroEditor
                        topBanner={aboutContent.topBanner || DEFAULT_ABOUT_DATA.topBanner}
                        hero={aboutContent.hero || DEFAULT_ABOUT_DATA.hero}
                        onUpdateTopBanner={(data) => handleAboutSectionUpdate('topBanner', data)}
                        onUpdateHero={(data) => handleAboutSectionUpdate('hero', data)}
                      />
                    )}

                    {activeTab === 'aboutStats' && (
                      <AboutStatsEditor
                        data={aboutContent.stats || DEFAULT_ABOUT_DATA.stats}
                        onChange={(data) => handleAboutSectionUpdate('stats', data)}
                      />
                    )}

                    {activeTab === 'aboutStory' && (
                      <AboutStoryMissionEditor
                        data={aboutContent.story || DEFAULT_ABOUT_DATA.story}
                        onChange={(data) => handleAboutSectionUpdate('story', data)}
                      />
                    )}

                    {activeTab === 'aboutIndustries' && (
                      <AboutIndustriesEditor
                        data={aboutContent.industries || DEFAULT_ABOUT_DATA.industries}
                        onChange={(data) => handleAboutSectionUpdate('industries', data)}
                      />
                    )}

                    {activeTab === 'aboutCategories' && (
                      <AboutCategoriesEditor
                        data={aboutContent.categories || DEFAULT_ABOUT_DATA.categories}
                        onChange={(data) => handleAboutSectionUpdate('categories', data)}
                      />
                    )}

                    {activeTab === 'aboutPillarsValues' && (
                      <AboutPillarsValuesEditor
                        pillarsData={aboutContent.pillars || DEFAULT_ABOUT_DATA.pillars}
                        valuesData={aboutContent.values || DEFAULT_ABOUT_DATA.values}
                        onUpdatePillars={(data) => handleAboutSectionUpdate('pillars', data)}
                        onUpdateValues={(data) => handleAboutSectionUpdate('values', data)}
                      />
                    )}

                    {activeTab === 'aboutContact' && (
                      <AboutContactEditor
                        data={aboutContent.contact || DEFAULT_ABOUT_DATA.contact}
                        onChange={(data) => handleAboutSectionUpdate('contact', data)}
                      />
                    )}
                  </>
                )}

                {/* --- PRODUCTS CATALOG MANAGER --- */}
                {activePage === 'products' && (
                  <ProductsManager
                    products={products}
                    onAddProduct={handleAddProduct}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                    onRefresh={handleRefreshProducts}
                  />
                )}

                {/* --- BLOGS MANAGEMENT --- */}
                {activePage === 'blogs' && (
                  <>
                    {activeTab === 'blogHero' && (
                      <BlogHeroEditor
                        heroData={blogContent.hero}
                        featuredData={blogContent.featured}
                        posts={blogPosts}
                        onUpdateHero={(data) => handleBlogContentUpdate('hero', data)}
                        onUpdateFeatured={(data) => handleBlogContentUpdate('featured', data)}
                      />
                    )}

                    {activeTab === 'blogSlider' && (
                      <BlogSliderEditor
                        tickerData={blogContent.ticker}
                        posts={blogPosts}
                        onUpdateTicker={(data) => handleBlogContentUpdate('ticker', data)}
                      />
                    )}

                    {activeTab === 'blogPosts' && (
                      <BlogManager
                        posts={blogPosts}
                        onAddPost={handleAddBlogPost}
                        onUpdatePost={handleUpdateBlogPost}
                        onDeletePost={handleDeleteBlogPost}
                        onRefresh={handleRefreshBlogPosts}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Floating Save Trigger */}
              {unsavedChanges && !isProductCatalogOnly && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-slate-900/95 border border-red-500/40 backdrop-blur-xl px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-in">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-bold text-white">You have unsaved changes</span>
                  </div>

                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={handleSave}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    {isSaving ? 'Saving...' : 'Save Now'}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Toast Notification Banner */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
