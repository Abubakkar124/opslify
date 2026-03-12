import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Shield, Rocket } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6">
            Empowering Careers with AI
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Opslify is on a mission to revolutionize how professionals find and land their dream remote jobs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Founded in 2026, Opslify began with a simple observation: the job search process is broken. Professionals spend hundreds of hours tailoring resumes and tracking applications across multiple platforms, often with little to no feedback.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We decided to build a platform that leverages the power of Artificial Intelligence to automate the tedious parts of the job search, allowing candidates to focus on what really matters—finding the right fit and preparing for interviews.
            </p>
          </div>
          <div className="bg-slate-100 rounded-3xl overflow-hidden shadow-xl">
            <img 
              src="https://picsum.photos/seed/team/800/600" 
              alt="Our Team" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {[
            { icon: <Target className="text-indigo-600" />, title: "Mission", desc: "To make remote job hunting efficient and accessible for everyone." },
            { icon: <Users className="text-emerald-600" />, title: "Community", desc: "Building a supportive ecosystem for remote professionals." },
            { icon: <Shield className="text-amber-600" />, title: "Trust", desc: "Verified job listings and secure data management." },
            { icon: <Rocket className="text-violet-600" />, title: "Innovation", desc: "Constantly evolving our AI tools to stay ahead." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Office</h2>
          <p className="text-slate-600 mb-2">Outer Ring Rd, Old Madiwala, Kuvempu Nagar</p>
          <p className="text-slate-600 mb-2">BTM Layout 2nd Stage, BTM Layout</p>
          <p className="text-slate-600">Bengaluru, Karnataka 560076</p>
        </div>
      </div>
    </div>
  );
}
