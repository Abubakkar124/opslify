import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, Linkedin, FileUp, Save, CheckCircle2, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { StorageService } from '../services/storageService';
import { User as UserType } from '../types';

export default function ProfilePage() {
  const currentUser = StorageService.getCurrentUser();
  const [formData, setFormData] = useState<Partial<UserType>>(currentUser || {});
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...formData } as UserType;
    StorageService.saveUser(updatedUser);
    StorageService.setCurrentUser(updatedUser);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Profile Management</h1>
            <p className="text-slate-500">Update your personal information and career preferences.</p>
          </div>
          {saved && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 font-bold text-sm"
            >
              <CheckCircle2 size={18} />
              <span>Changes Saved!</span>
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center">
                <User size={16} className="mr-2 text-slate-400" />
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                value={formData.fullName || ''}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center">
                <Mail size={16} className="mr-2 text-slate-400" />
                Email Address
              </label>
              <input
                type="email"
                readOnly
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-2xl text-slate-500 cursor-not-allowed text-sm"
                value={formData.email || ''}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center">
                <Phone size={16} className="mr-2 text-slate-400" />
                Mobile Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                placeholder="+1 234 567 890"
                value={formData.mobile || ''}
                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center">
                <MapPin size={16} className="mr-2 text-slate-400" />
                City
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                placeholder="New York, NY"
                value={formData.city || ''}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center">
                <GraduationCap size={16} className="mr-2 text-slate-400" />
                Education
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                placeholder="Bachelor of Computer Science"
                value={formData.education || ''}
                onChange={e => setFormData({ ...formData, education: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center">
                <Briefcase size={16} className="mr-2 text-slate-400" />
                Experience Level
              </label>
              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm appearance-none"
                value={formData.experienceLevel || ''}
                onChange={e => setFormData({ ...formData, experienceLevel: e.target.value as any })}
              >
                <option value="">Select Level</option>
                <option value="Fresher">Fresher</option>
                <option value="Experienced">Experienced</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700 flex items-center">
                <Search size={16} className="mr-2 text-slate-400" />
                Looking for Position
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                placeholder="e.g. Senior Frontend Engineer"
                value={formData.lookingFor || ''}
                onChange={e => setFormData({ ...formData, lookingFor: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700 flex items-center">
                <Linkedin size={16} className="mr-2 text-slate-400" />
                LinkedIn URL
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedInUrl || ''}
                onChange={e => setFormData({ ...formData, linkedInUrl: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700 flex items-center">
                <FileUp size={16} className="mr-2 text-slate-400" />
                Resume Upload (URL)
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                value={formData.resumeUrl || ''}
                onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center"
          >
            <Save size={20} className="mr-2" />
            Save Changes & Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
