import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { SupabaseService } from '../services/supabaseService';
import { isSupabaseConfigured } from '../lib/supabase';
import { formatDate } from '../utils/helpers';
import { BlogPost } from '../types';

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (isSupabaseConfigured) {
          const supabaseBlogs = await SupabaseService.getBlogs();
          setBlogs(supabaseBlogs);
        } else {
          setBlogs(StorageService.getBlogs());
        }
      } catch (error: any) {
        console.error('Error fetching blogs:', error);
        if (error.message === 'Failed to fetch') {
          console.warn('Supabase fetch failed, falling back to local storage');
        }
        setBlogs(StorageService.getBlogs());
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  
  const samplePosts = Array.from({ length: 20 }, (_, i) => ({
    id: `sample-${i + 1}`,
    title: [
      "How to Land a Remote Tech Job in 2026",
      "The Future of AI in Recruitment",
      "10 Tips for a Perfect ATS-Friendly Resume",
      "Why Remote Work is Here to Stay",
      "Mastering the Video Interview",
      "How to Negotiate Your Salary Remotely",
      "The Best Skills for Data Analysts in 2026",
      "Building a Personal Brand on LinkedIn",
      "How to Use AI to Write Better Cover Letters",
      "Remote Work Productivity Hacks",
      "Understanding Applicant Tracking Systems",
      "The Rise of AI Engineers",
      "Transitioning to a Career in Data Science",
      "How to Manage Work-Life Balance Remotely",
      "Networking in a Digital World",
      "The Importance of Soft Skills in Tech",
      "Creating a Portfolio that Gets You Hired",
      "How to Handle Job Search Rejection",
      "Preparing for Technical Interviews",
      "The Benefits of Working for a Global Startup"
    ][i % 20],
    excerpt: "Discover the latest trends and strategies to accelerate your career growth in the modern remote-first world...",
    date: "March " + (11 - (i % 10)) + ", 2026",
    author: "Opslify Team",
    image: `https://picsum.photos/seed/blog${i}/800/450`
  }));

  const allPosts = [...blogs.map(b => ({
    id: b.id,
    title: b.title,
    excerpt: b.subHeadline || b.content.substring(0, 120) + "...",
    date: formatDate(b.date),
    author: b.author,
    image: b.image
  })), ...samplePosts];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6">
            Career Insights & Tips
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay updated with the latest trends in remote work, AI tools, and job search strategies.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post) => (
              <motion.div 
                key={post.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                    <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.id}`} className="inline-flex items-center text-indigo-600 font-bold text-sm hover:underline">
                    Read More
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
