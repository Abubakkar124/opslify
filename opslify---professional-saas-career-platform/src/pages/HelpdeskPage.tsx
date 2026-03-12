import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LifeBuoy, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { Ticket } from '../types';

export default function HelpdeskPage() {
  const currentUser = StorageService.getCurrentUser();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    mobile: currentUser?.mobile || '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const ticket: Ticket = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      message: formData.message,
      timestamp: new Date().toISOString(),
      status: 'Open'
    };

    StorageService.saveTicket(ticket);
    setSubmitted(true);
    setFormData({ ...formData, message: '' });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[40px] border border-slate-200 shadow-xl"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ticket Raised Successfully!</h2>
          <p className="text-slate-600 mb-10 leading-relaxed">
            Your support ticket has been sent to our team. We will review your issue and get back to you shortly via email or mobile.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            Raise Another Ticket
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <LifeBuoy size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Helpdesk & Support</h2>
          <p className="text-slate-500 text-sm">Facing an issue? Raise a ticket and our team will help you.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Mobile Number</label>
                <input 
                  required 
                  type="tel" 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="+91 98765 43210"
                  value={formData.mobile}
                  onChange={e => setFormData({...formData, mobile: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Describe your issue</label>
                <textarea 
                  required 
                  rows={6} 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="Tell us about the problem you are facing..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center group"
              >
                <Send size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
                Submit Support Ticket
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 p-8 rounded-[32px] border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-4">Quick Support</h4>
            <p className="text-sm text-indigo-700 leading-relaxed">
              Our support team typically responds within 2-4 business hours. Please provide as much detail as possible to help us resolve your issue faster.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4">Common Issues</h4>
            <ul className="space-y-3">
              {['Profile Update Problems', 'Job Application Status', 'AI Tool Errors', 'Account Settings'].map((item) => (
                <li key={item} className="flex items-center text-sm text-slate-600">
                  <AlertCircle size={14} className="mr-2 text-slate-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
