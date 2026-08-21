import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Eye, User, Calendar, Tag, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import { POSTS } from '../data/blogData';
import { fetchLiveBlogPostById, fetchLiveBlogPosts } from '../services/blogService';
import Footer from '../components/layout/Footer/Footer';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livePost, setLivePost] = React.useState(null);
  const [allPosts, setAllPosts] = React.useState(POSTS);

  const post = livePost || POSTS.find((p) => p.id === id) || POSTS[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;
    const loadData = async () => {
      try {
        const [single, list] = await Promise.all([
          fetchLiveBlogPostById(id),
          fetchLiveBlogPosts()
        ]);
        if (isMounted) {
          if (single) setLivePost(single);
          if (Array.isArray(list) && list.length > 0) setAllPosts(list);
        }
      } catch (err) {
        console.warn('Fallback to local blog post lookup:', err);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, [id]);

  const relatedPosts = allPosts.filter((p) => p.id !== post.id && p.isActive !== false);

  return (
    <div className="blog-detail-page bg-slate-950 text-white min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-red-500 transition-colors">
            <ArrowLeft size={16} /> Back to Blog Articles
          </Link>
        </motion.div>

        {/* Hero Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 mb-12"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={12} /> {post.readTime}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Eye size={12} /> {post.views} Views
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-slate-100">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light border-l-2 border-red-600 pl-4 py-1">
            {post.excerpt}
          </p>

          {/* Author Strip */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
            <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 font-bold text-sm">
              <User size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-200">{post.author}</div>
              <div className="text-xs text-slate-400">{post.role} • {post.date}</div>
            </div>
          </div>
        </motion.header>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden mb-12 border border-slate-800 shadow-2xl"
        >
          <img src={post.image} alt={post.title} className="w-full max-h-[480px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </motion.div>

        {/* Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Main Text Content */}
          <div className="lg:col-span-8 space-y-8 text-slate-300 leading-relaxed">
            
            {/* Overview Summary Box */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                <ShieldCheck size={16} /> Executive Summary
              </h3>
              <p className="text-slate-200 font-medium">
                {post.summary}
              </p>
            </div>

            {/* Content Sections */}
            {post.sections && post.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4 pt-4">
                <h2 className="text-xl md:text-2xl font-bold text-slate-100 border-b border-slate-800/80 pb-2">
                  {sec.heading}
                </h2>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line text-base">
                  {sec.body}
                </div>
              </div>
            ))}

            {/* Product Inquiry CTA */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white">Need Official 3M Industrial Supplies?</h4>
                <p className="text-xs text-slate-400">N.B Corporation is an authorized distributor of 3M tapes, abrasives, and adhesives in India.</p>
              </div>
              <button 
                onClick={() => navigate('/contact')} 
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-red-600/30 shrink-0 flex items-center gap-2"
              >
                <PhoneCall size={16} /> Get Product Quote
              </button>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-6">
              <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3">
                Related Technical Articles
              </h3>

              <div className="space-y-4">
                {relatedPosts.map((rel) => (
                  <div 
                    key={rel.id} 
                    onClick={() => navigate(`/blog/${rel.id}`)}
                    className="group cursor-pointer p-3 rounded-xl hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-700/60 flex items-start gap-3"
                  >
                    <img src={rel.image} alt={rel.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-red-400">{rel.category}</span>
                      <h4 className="text-xs font-semibold text-slate-200 group-hover:text-red-400 transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 block">{rel.readTime} read</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Link to="/products" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                  Browse Product Catalog <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
