import React from 'react';
import { Search, Book, MessageCircle, HelpCircle } from 'lucide-react';

export default function HelpCenter() {
  const categories = [
    { icon: <Book className="text-indigo-600" />, title: "Getting Started", desc: "Learn the basics of setting up your Opslify account." },
    { icon: <MessageCircle className="text-emerald-600" />, title: "AI Tools", desc: "Guides on using the Resume Builder and Cover Letter Generator." },
    { icon: <HelpCircle className="text-amber-600" />, title: "Account & Billing", desc: "Manage your subscription and account settings." }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6">Help Center</h1>
          <p className="text-xl text-slate-600 mb-10">How can we help you today?</p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input 
              type="text" 
              placeholder="Search for articles..." 
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{cat.title}</h3>
              <p className="text-slate-600">{cat.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 rounded-[32px] p-12 text-center border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Still need help?</h2>
          <p className="text-slate-600 mb-8">Our support team is available 9am to 6pm to assist you.</p>
          <a href="mailto:help@opslify.In" className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
