import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { formatDate } from '../utils/helpers';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const storedBlogs = StorageService.getBlogs();
  const storedPost = storedBlogs.find(b => b.id === id);

  let post: any;

  if (storedPost) {
    post = {
      id: storedPost.id,
      title: storedPost.title,
      date: formatDate(storedPost.date),
      author: storedPost.author,
      image: storedPost.image,
      content: storedPost.content
    };
  } else {
    // Handle sample posts
    const sampleId = parseInt(id?.replace('sample-', '') || "1");
    post = {
      id: id,
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
      ][(sampleId - 1) % 20],
      date: "March " + (11 - ((sampleId - 1) % 10)) + ", 2026",
      author: "Opslify Team",
      image: `https://picsum.photos/seed/blog${sampleId - 1}/1200/600`,
      content: `
        <p className="mb-6">The landscape of remote work and recruitment is evolving at an unprecedented pace. As we move further into 2026, the integration of Artificial Intelligence and decentralized work environments has become the standard rather than the exception.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Shift in Remote Hiring</h2>
        <p className="mb-6">Companies are no longer just looking for technical proficiency; they are seeking individuals who can thrive in asynchronous environments. This means communication skills, self-discipline, and digital literacy are more valuable than ever.</p>
        
        <blockquote className="border-l-4 border-indigo-600 pl-6 py-2 my-10 italic text-xl text-slate-700 bg-slate-50 rounded-r-2xl">
          "The future of work isn't about where you are, but what you contribute and how you collaborate across borders."
        </blockquote>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Leveraging AI Tools</h2>
        <p className="mb-6">At Opslify, we've seen a 300% increase in candidates using AI-driven tools to optimize their job search. From AI resume builders that bypass complex ATS algorithms to cover letter generators that maintain a human touch, the tools available today are game-changers.</p>
        
        <p className="mb-6">However, the key is balance. While AI can help you get through the door, your unique human perspective and problem-solving abilities are what will ultimately land you the job.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Key Strategies for Success</h2>
        <ul className="list-disc pl-6 mb-8 space-y-3 text-slate-700">
          <li><strong>Optimize for ATS:</strong> Ensure your resume uses the right keywords that AI scanners are looking for.</li>
          <li><strong>Build a Digital Presence:</strong> Your LinkedIn and personal portfolio are your new business cards.</li>
          <li><strong>Master Video Communication:</strong> Practice your presence on camera, as most remote interviews are now conducted via high-definition video calls.</li>
          <li><strong>Continuous Learning:</strong> The tech stack of 2026 is different from 2024. Stay updated with the latest AI and cloud technologies.</li>
        </ul>

        <p className="mb-6">In conclusion, landing a remote tech job in 2026 requires a blend of technical mastery, digital savvy, and a proactive approach to utilizing the latest career tools. Stay focused, keep learning, and let Opslify help you navigate this exciting journey.</p>
      `
    };
  }

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="aspect-[21/9] overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="p-8 lg:p-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6 text-sm text-slate-500">
                <span className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
                  <Calendar size={14} className="mr-2 text-indigo-600" /> 
                  {post.date}
                </span>
                <span className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
                  <User size={14} className="mr-2 text-indigo-600" /> 
                  {post.author}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <Share2 size={20} />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-10 leading-tight">
              {post.title}
            </h1>

            <div 
              className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-16 pt-10 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                  O
                </div>
                <div>
                  <p className="font-bold text-slate-900">Opslify Editorial Team</p>
                  <p className="text-sm text-slate-500">Helping you navigate the future of work.</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                Follow Opslify
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Previous Post</p>
            <h4 className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors">
              Understanding Applicant Tracking Systems in the AI Era
            </h4>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Next Post</p>
            <h4 className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors">
              Remote Work Productivity: Tools and Techniques for 2026
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
