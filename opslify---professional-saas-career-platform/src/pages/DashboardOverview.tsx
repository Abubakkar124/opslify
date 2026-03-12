import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, Send, Calendar, Star, TrendingUp, 
  Clock, CheckCircle2, AlertCircle, ChevronRight, Bell
} from 'lucide-react';
import { motion } from 'motion/react';
import { StorageService } from '../services/storageService';
import { formatCurrency, formatDate, cn } from '../utils/helpers';

export default function DashboardOverview() {
  const jobs = StorageService.getJobs();
  const applications = StorageService.getApplications();
  const notifications = StorageService.getNotifications();
  const currentUser = StorageService.getCurrentUser();
  const settings = StorageService.getSettings();

  const userApps = applications.filter(a => a.userId === currentUser?.id);

  const isProfileUpdated = (user: any) => {
    return user && user.mobile && user.lookingFor && user.city;
  };

  const profileUpdated = isProfileUpdated(currentUser);

  const stats = [
    { label: 'Total Jobs Available', value: jobs.length, icon: <Briefcase className="text-indigo-600" />, bg: 'bg-indigo-50' },
    { label: 'Jobs Applied', value: userApps.length, icon: <Send className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Interviews Scheduled', value: 0, icon: <Calendar className="text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'Saved Jobs', value: 0, icon: <Star className="text-violet-600" />, bg: 'bg-violet-50' },
    { label: 'Resume Score', value: '85/100', icon: <TrendingUp className="text-rose-600" />, bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Platform Announcement Banner */}
      {settings.announcementBanner && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Bell size={20} className="animate-bounce" />
            <p className="font-bold text-sm">{settings.announcementBanner}</p>
          </div>
        </motion.div>
      )}

      {/* Profile Update Notice Board */}
      {!profileUpdated && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-amber-50 border-2 border-amber-200 p-8 rounded-[32px] shadow-sm"
        >
          <div className="flex items-start space-x-6">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
              <AlertCircle size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-amber-900 mb-2">Action Required: Profile Update</h3>
              <p className="text-amber-800 leading-relaxed mb-6">
                Welcome to OPSLIFY! To unlock all features including <strong>Job Listings</strong> and <strong>AI Career Tools</strong>, 
                you must first complete your profile. This helps us tailor the experience to your career goals.
              </p>
              <Link 
                to="/dashboard/profile" 
                className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-200"
              >
                Update Profile Now
                <ChevronRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", stat.bg)}>
              {stat.icon}
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center">
                <Clock size={20} className="mr-2 text-indigo-600" />
                Recent Job Opportunities
              </h3>
              <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {jobs.slice(0, 5).map((job) => (
                <div key={job.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{job.role}</h4>
                      <p className="text-sm text-slate-500">{job.companyName} • {job.jobCategory}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}</p>
                    <p className="text-xs text-slate-400">{formatDate(job.postedDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications & System Updates */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center">
                <Bell size={20} className="mr-2 text-indigo-600" />
                System Notifications
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {notifications.slice(0, 4).map((note) => (
                <div key={note.id} className="flex space-x-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center",
                    note.type === 'job' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                  )}>
                    {note.type === 'job' ? <Briefcase size={18} /> : <AlertCircle size={18} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{note.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{note.message}</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-wider">
                      {formatDate(note.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <p className="text-center text-slate-400 py-8 text-sm">No new notifications</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
