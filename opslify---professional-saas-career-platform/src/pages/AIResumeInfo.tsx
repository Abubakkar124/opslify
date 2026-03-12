import React from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle2, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIResumeInfo() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6">
            AI ATS Resume Builder
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Create professional, high-scoring resumes that pass through Applicant Tracking Systems (ATS) with ease.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">How it Works</h2>
            <div className="space-y-8">
              {[
                { title: "Input Your Details", desc: "Provide your basic information, work history, and target job role." },
                { title: "AI Analysis", desc: "Our Gemini-powered AI analyzes your input against thousands of successful resumes." },
                { title: "Smart Generation", desc: "The AI generates powerful bullet points and summaries using industry-standard keywords." },
                { title: "ATS Optimization", desc: "The final output is formatted to be easily readable by automated recruitment software." }
              ].map((step, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{step.title}</h3>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200 shadow-inner">
            <img 
              src="https://picsum.photos/seed/resume/800/600" 
              alt="Resume Preview" 
              className="rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: <Zap className="text-amber-500" />, title: "Speed", desc: "Generate a complete resume in under 60 seconds." },
            { icon: <CheckCircle2 className="text-emerald-500" />, title: "ATS Friendly", desc: "Designed specifically to beat automated filters." },
            { icon: <Sparkles className="text-indigo-500" />, title: "AI Powered", desc: "Uses the latest Gemini 3 Flash model for content." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-indigo-600 rounded-[32px] p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to build your perfect resume?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have landed their dream jobs using Opslify's AI tools.
          </p>
          <Link to="/signup" className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all">
            Start Building Now
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
