import React from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle2, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AICoverLetterInfo() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6">
            AI Cover Letter Generator
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Write compelling, personalized cover letters that grab the attention of recruiters and hiring managers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1 bg-slate-100 rounded-3xl p-8 border border-slate-200 shadow-inner">
            <img 
              src="https://picsum.photos/seed/coverletter/800/600" 
              alt="Cover Letter Preview" 
              className="rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Use AI for Cover Letters?</h2>
            <div className="space-y-6">
              {[
                { title: "Personalization at Scale", desc: "Tailor every application to the specific job description without spending hours." },
                { title: "Professional Tone", desc: "Ensure your writing is polished, professional, and free of grammatical errors." },
                { title: "Highlight Key Skills", desc: "The AI automatically identifies and emphasizes the skills most relevant to the role." },
                { title: "Overcome Writer's Block", desc: "Get a perfect first draft that you can then customize to your liking." }
              ].map((benefit, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="mt-1">
                    <CheckCircle2 className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-[32px] p-12 border border-slate-200 mb-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "1. Paste Job Description", desc: "Copy and paste the job requirements from the posting." },
              { title: "2. Upload Resume", desc: "Provide your current resume so the AI knows your background." },
              { title: "3. Generate & Refine", desc: "Get a custom cover letter and make any final tweaks." }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[32px] p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Stop sending generic cover letters</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Stand out from the crowd with a personalized letter that shows exactly why you're the best fit for the job.
          </p>
          <Link to="/signup" className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Generate My Cover Letter
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
