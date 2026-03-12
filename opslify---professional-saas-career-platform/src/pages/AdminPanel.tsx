import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Briefcase, Send, Bell, BarChart3, 
  Settings, LogOut, Menu, X, ChevronRight, Search, Plus, Trash2,
  ShieldAlert, UserCheck, UserX, ExternalLink, Filter, Download,
  Calendar, Eye, Shield, ShieldOff, MoreVertical, User as UserIcon,
  LifeBuoy, FileText, Image as ImageIcon, Upload, CreditCard, CheckCircle2, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StorageService } from '../services/storageService';
import { cn, formatCurrency, formatDate } from '../utils/helpers';
import { User as UserType, Job, Application, JobCategory, Notification, Ticket, PaymentRequest, UserSubscription } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

export default function AdminPanel() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Admin Login State
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'Shaheen@123') {
      setIsAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin credentials');
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-slate-900 rounded-[32px] p-10 border border-slate-800 shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-indigo-500/20">
              <ShieldAlert size={40} />
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Access</h1>
            <p className="text-slate-400 mt-2">Please enter your secure credentials</p>
          </div>
          {loginError && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-sm font-medium text-center">{loginError}</div>}
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">Username</label>
              <input
                type="text"
                className="w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="admin"
                value={loginData.username}
                onChange={e => setLoginData({ ...loginData, username: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">Password</label>
              <input
                type="password"
                className="w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="••••••••"
                value={loginData.password}
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
            <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Admin Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col",
        isSidebarOpen ? "w-72" : "w-20"
      )}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <ShieldAlert size={18} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">AdminPanel</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2 custom-scrollbar">
          {[
            { id: 'dashboard', name: 'Admin Dashboard', icon: <LayoutDashboard size={20} /> },
            { id: 'write-blog', name: 'Write Blog', icon: <FileText size={20} /> },
            { id: 'users', name: 'Manage Users', icon: <Users size={20} /> },
            { id: 'helpdesk', name: 'Users Helpdesk', icon: <LifeBuoy size={20} /> },
            { id: 'jobs', name: 'Manage Jobs', icon: <Briefcase size={20} /> },
            { id: 'applications', name: 'Applications Tracker', icon: <Send size={20} /> },
            { id: 'notifications', name: 'Notifications Manager', icon: <Bell size={20} /> },
            { id: 'analytics', name: 'Analytics', icon: <BarChart3 size={20} /> },
            { id: 'payment-tracker', name: 'Payment Tracker', icon: <CreditCard size={20} /> },
            { id: 'settings', name: 'System Settings', icon: <Settings size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center w-full px-4 py-3.5 rounded-2xl transition-all group",
                activeTab === item.id 
                  ? "bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <span className={cn(
                "transition-colors",
                activeTab === item.id ? "text-white" : "text-slate-500 group-hover:text-white"
              )}>
                {item.icon}
              </span>
              {isSidebarOpen && <span className="ml-3 text-sm">{item.name}</span>}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => window.location.href = '/'}
            className={cn(
              "flex items-center w-full px-4 py-3.5 text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-3 text-sm font-bold">Exit Admin</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 transition-all duration-300 min-h-screen",
        isSidebarOpen ? "ml-72" : "ml-20"
      )}>
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-40">
          <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold border border-indigo-100">
              System Online
            </div>
          </div>
        </header>

        <div className="p-10">
          {activeTab === 'dashboard' && <AdminDashboardOverview />}
          {activeTab === 'write-blog' && <AdminWriteBlog />}
          {activeTab === 'users' && <AdminManageUsers />}
          {activeTab === 'helpdesk' && <AdminUsersHelpdesk />}
          {activeTab === 'jobs' && <AdminManageJobs />}
          {activeTab === 'applications' && <AdminApplicationsTracker />}
          {activeTab === 'notifications' && <AdminNotificationsManager />}
          {activeTab === 'analytics' && <AdminAnalytics />}
          {activeTab === 'payment-tracker' && <AdminPaymentTracker />}
          {activeTab === 'settings' && <AdminSettingsPage />}
        </div>
      </main>
    </div>
  );
}

// --- Sub-components for Admin Panel ---

function AdminDashboardOverview() {
  const users = StorageService.getUsers();
  const jobs = StorageService.getJobs();
  const applications = StorageService.getApplications();
  const settings = StorageService.getSettings();
  const notifications = StorageService.getNotifications();

  const jobsPostedToday = jobs.filter(j => {
    const today = new Date().toISOString().split('T')[0];
    return j.postedDate.startsWith(today);
  }).length;

  const stats = [
    { label: 'Total Registered Users', value: users.length, icon: <Users className="text-indigo-600" />, bg: 'bg-indigo-50' },
    { label: 'Total Jobs Posted', value: jobs.length, icon: <Briefcase className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Jobs Posted Today', value: jobsPostedToday, icon: <Calendar className="text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'Total Applications', value: applications.length, icon: <Send className="text-violet-600" />, bg: 'bg-violet-50' },
    { label: 'Active Job Categories', value: settings.enabledCategories.length, icon: <Filter className="text-rose-600" />, bg: 'bg-rose-50' },
    { label: 'Notifications Sent', value: notifications.length, icon: <Bell className="text-sky-600" />, bg: 'bg-sky-50' },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", stat.bg)}>
              {stat.icon}
            </div>
            <p className="text-slate-500 text-sm font-bold mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Recent Registrations</h3>
            <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {users.slice(-5).reverse().map((user: UserType) => (
              <div key={user.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                    {user.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user.fullName}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{formatDate(user.registrationDate)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Recent Applications</h3>
            <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {applications.slice(-5).reverse().map((app) => (
              <div key={app.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">{app.userName}</p>
                  <p className="text-xs text-slate-500">Applied for {app.jobRole}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
                    {app.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{formatDate(app.applicationDate)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminManageUsers() {
  const [users, setUsers] = useState<UserType[]>(StorageService.getUsers());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (id: string) => {
    const updated = users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'disabled' : 'active' } as UserType;
      }
      return u;
    });
    setUsers(updated);
    localStorage.setItem('opslify_users', JSON.stringify(updated));
  };

  const deleteUser = (id: string) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    localStorage.setItem('opslify_users', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center shadow-lg shadow-indigo-100">
          <Download size={20} className="mr-2" />
          Export Users
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">User Info</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Details</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Position</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                        {user.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{user.fullName}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs text-slate-600 font-medium">{user.mobile || 'No Phone'}</p>
                    <p className="text-xs text-slate-400">{user.city || 'No City'}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-slate-700">{user.lookingFor || 'Not Specified'}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{user.experienceLevel || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest",
                      user.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => toggleUserStatus(user.id)}
                        className={cn(
                          "p-2 rounded-xl transition-colors",
                          user.status === 'active' ? "text-amber-600 hover:bg-amber-50" : "text-emerald-600 hover:bg-emerald-50"
                        )}
                        title={user.status === 'active' ? 'Disable User' : 'Enable User'}
                      >
                        {user.status === 'active' ? <UserX size={18} /> : <UserCheck size={18} />}
                      </button>
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminManageJobs() {
  const [jobs, setJobs] = useState<Job[]>(StorageService.getJobs());
  const [isAdding, setIsAdding] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<any>({
    jobType: 'Remote',
    jobCategory: 'Remote Tech',
    skills: ''
  });

  const categories: JobCategory[] = StorageService.getSettings().enabledCategories;

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJob) {
      const updatedJob: Job = {
        ...editingJob,
        ...formData as Job,
        skills: typeof formData.skills === 'string' ? (formData.skills as string).split(',').map(s => s.trim()) : formData.skills || []
      };
      StorageService.updateJob(updatedJob);
      setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
      setEditingJob(null);
    } else {
      const newJob: Job = {
        ...formData as Job,
        id: Math.random().toString(36).substr(2, 9),
        postedDate: new Date().toISOString(),
        skills: typeof formData.skills === 'string' ? (formData.skills as string).split(',').map(s => s.trim()) : formData.skills || []
      };
      StorageService.saveJob(newJob);
      setJobs([...jobs, newJob]);
    }
    setIsAdding(false);
    setFormData({ jobType: 'Remote', jobCategory: 'Remote Tech', skills: [] });
  };

  const startEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      companyName: job.companyName,
      role: job.role,
      skills: job.skills.join(', '),
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      externalLink: job.externalLink,
      jobDescription: job.jobDescription,
      jobType: job.jobType,
      jobCategory: job.jobCategory
    });
    setIsAdding(true);
  };

  const deleteJob = (id: string) => {
    try {
      StorageService.deleteJob(id);
      setJobs(prevJobs => prevJobs.filter(j => j.id !== id));
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Job Listings</h3>
        <button 
          onClick={() => {
            setEditingJob(null);
            setFormData({ jobType: 'Remote', jobCategory: 'Remote Tech', skills: [] });
            setIsAdding(true);
          }}
          className="px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center shadow-lg shadow-indigo-100"
        >
          <Plus size={20} className="mr-2" />
          Post New Job
        </button>
      </div>

      {isAdding && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold text-slate-900">{editingJob ? 'Edit Job Listing' : 'Create Job Listing'}</h4>
            <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"><X size={20} /></button>
          </div>
          <form onSubmit={handlePostJob} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Company Name</label>
              <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Confidential Company" value={formData.companyName || ''} onChange={e => setFormData({...formData, companyName: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Job Role</label>
              <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Remote Data Analyst" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Skills (Comma separated)</label>
              <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Python, SQL, Power BI" value={formData.skills as any || ''} onChange={e => setFormData({...formData, skills: e.target.value as any})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Min Salary ($)</label>
                <input required type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="1500" value={formData.salaryMin || ''} onChange={e => setFormData({...formData, salaryMin: Number(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Max Salary ($)</label>
                <input required type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="3000" value={formData.salaryMax || ''} onChange={e => setFormData({...formData, salaryMax: Number(e.target.value)})} />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">External Application Link</label>
              <input required type="url" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://company.com/careers/job-123" value={formData.externalLink || ''} onChange={e => setFormData({...formData, externalLink: e.target.value})} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">Job Description</label>
              <textarea required rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Detailed job description..." value={formData.jobDescription || ''} onChange={e => setFormData({...formData, jobDescription: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Job Type</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 appearance-none" value={formData.jobType} onChange={e => setFormData({...formData, jobType: e.target.value as any})}>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Category</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 appearance-none" value={formData.jobCategory} onChange={e => setFormData({...formData, jobCategory: e.target.value as any})}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" className="md:col-span-2 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all">{editingJob ? 'Update Job Listing' : 'Post Job Listing'}</button>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Job Role</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Salary</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Posted Date</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-900">{job.role}</p>
                    <p className="text-xs text-slate-500">{job.companyName}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
                      {job.jobCategory}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-slate-700">{formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}</p>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-400">{formatDate(job.postedDate)}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(job);
                        }} 
                        className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all active:scale-95"
                        title="Edit Job"
                      >
                        <Settings size={20} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteJob(job.id);
                        }} 
                        className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-95"
                        title="Delete Job"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminApplicationsTracker() {
  const applications = StorageService.getApplications();

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-900">All Applications</h3>
        <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{applications.length} Total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Applicant</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Job Applied</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-slate-900">{app.userName}</p>
                  <p className="text-xs text-slate-500">{app.userEmail}</p>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-slate-700">{app.jobRole}</td>
                <td className="px-6 py-5">
                  <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-widest">
                    {app.jobCategory}
                  </span>
                </td>
                <td className="px-6 py-5 text-xs text-slate-400">{formatDate(app.applicationDate)}</td>
                <td className="px-6 py-5">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminNotificationsManager() {
  const [formData, setFormData] = useState({ title: '', message: '', category: '' });
  const [notifications, setNotifications] = useState<Notification[]>(StorageService.getNotifications());
  const categories: JobCategory[] = [
    "Remote Tech", "Remote Data Analyst", "Remote HR & Administration",
    "Remote Customer Success", "Remote Data Entry", "Remote AI Engineers", "Remote Data Scientist"
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      message: formData.message,
      category: formData.category as JobCategory || undefined,
      timestamp: new Date().toISOString(),
      type: 'announcement'
    };
    StorageService.addNotification(notification);
    setNotifications(StorageService.getNotifications());
    setFormData({ title: '', message: '', category: '' });
    alert('Notification sent to all users!');
  };

  const deleteNotification = (id: string) => {
    StorageService.deleteNotification(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-10">
      <div className="max-w-2xl">
        <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Send System Announcement</h3>
          <form onSubmit={handleSend} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Notification Title</label>
              <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. System Maintenance" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Message</label>
              <textarea required rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter announcement details..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Target Category (Optional)</label>
              <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 appearance-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="">All Users</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center">
              <Send size={20} className="mr-2" />
              Send Notification
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Sent Notifications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Title</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Message</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Target</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {notifications.map((note) => (
                <tr key={note.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-900">{note.title}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs text-slate-500 max-w-xs truncate">{note.message}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-widest">
                      {note.category || 'All Users'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-400">{formatDate(note.timestamp)}</td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => deleteNotification(note.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {notifications.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm">No notifications sent yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminUsersHelpdesk() {
  const [tickets, setTickets] = useState<Ticket[]>(StorageService.getTickets());

  const deleteTicket = (id: string) => {
    StorageService.deleteTicket(id);
    setTickets(prev => prev.filter(t => t.id !== id));
  };

  const toggleStatus = (ticket: Ticket) => {
    const updated = { ...ticket, status: ticket.status === 'Open' ? 'Resolved' : 'Open' } as Ticket;
    StorageService.updateTicket(updated);
    setTickets(prev => prev.map(t => t.id === ticket.id ? updated : t));
  };

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-900">User Support Tickets</h3>
        <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{tickets.length} Total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">User Details</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Message</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-slate-900">{ticket.fullName}</p>
                  <p className="text-xs text-slate-500">{ticket.email}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{ticket.mobile}</p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-xs text-slate-600 max-w-md leading-relaxed">{ticket.message}</p>
                </td>
                <td className="px-6 py-5 text-xs text-slate-400">{formatDate(ticket.timestamp)}</td>
                <td className="px-6 py-5">
                  <button 
                    onClick={() => toggleStatus(ticket)}
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest transition-colors",
                      ticket.status === 'Open' ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                    )}
                  >
                    {ticket.status}
                  </button>
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => deleteTicket(ticket.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm">No support tickets found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminPaymentTracker() {
  const [payments, setPayments] = useState<PaymentRequest[]>(StorageService.getPayments());
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>(StorageService.getSubscriptions());
  const [editingSub, setEditingSub] = useState<{ userId: string, date: string, status: string } | null>(null);

  const handleDeletePayment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this payment record?')) {
      StorageService.deletePayment(id);
      setPayments(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleUpdateSubscription = (userId: string) => {
    if (!editingSub) return;

    const newSub: UserSubscription = {
      userId,
      subscriptionDate: editingSub.date,
      status: editingSub.status as any,
      lastUpdated: new Date().toISOString()
    };

    StorageService.saveSubscription(newSub);
    setSubscriptions(StorageService.getSubscriptions());
    setEditingSub(null);
    alert('Subscription status updated successfully!');
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Payment Requests</h3>
          <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">{payments.length} Pending/Processed</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">User Details</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Payment Info</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Screenshot</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-900">{payment.fullName}</p>
                    <p className="text-xs text-slate-500">{payment.email}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{payment.mobile}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-slate-700">{payment.bankName}</p>
                    <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">{payment.paymentMode}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{formatDate(payment.timestamp)}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                        {payment.screenshotUrl ? (
                          <img src={payment.screenshotUrl} alt="Payment" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={16} className="text-slate-300" />
                        )}
                      </div>
                      <button 
                        onClick={() => downloadImage(payment.screenshotUrl, `payment-${payment.fullName}.png`)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Download Screenshot"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest",
                      payment.status === 'Paid' ? "bg-emerald-50 text-emerald-600" : 
                      payment.status === 'Cancelled' ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => {
                          const sub = subscriptions.find(s => s.userId === payment.userId);
                          setEditingSub({
                            userId: payment.userId,
                            date: sub?.subscriptionDate || new Date().toISOString().split('T')[0],
                            status: sub?.status || 'Monthly Subscription Active for 30 days'
                          });
                        }}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                        title="Update Subscription"
                      >
                        <UserCheck size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeletePayment(payment.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm">No payment requests received yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {editingSub && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white p-8 rounded-[32px] border border-indigo-200 shadow-2xl ring-4 ring-indigo-50"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                  <Clock size={20} />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Update User Subscription</h4>
              </div>
              <button onClick={() => setEditingSub(null)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"><X size={20} /></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center">
                  <Calendar size={16} className="mr-2 text-indigo-600" />
                  Monthly Subscription Date
                </label>
                <input 
                  type="date" 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={editingSub.date.split('T')[0]}
                  onChange={e => setEditingSub({...editingSub, date: e.target.value})}
                />
                <p className="text-[10px] text-slate-400 italic">This date will be visible to the user for 30 days.</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center">
                  <Shield size={16} className="mr-2 text-indigo-600" />
                  Subscription Status
                </label>
                <select 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                  value={editingSub.status}
                  onChange={e => setEditingSub({...editingSub, status: e.target.value})}
                >
                  <option value="Monthly Subscription Active for 30 days">Monthly Subscription Active for 30 days</option>
                  <option value="Subscription pending">Subscription pending</option>
                  <option value="Subscription cancelled">Subscription cancelled</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button 
                onClick={() => setEditingSub(null)}
                className="px-6 py-3.5 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleUpdateSubscription(editingSub.userId)}
                className="px-10 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center"
              >
                <CheckCircle2 size={20} className="mr-2" />
                Update & Notify User
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Active Subscriptions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">User ID</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Start Date</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {subscriptions.map((sub) => (
                <tr key={sub.userId} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 text-sm font-mono text-slate-600">{sub.userId}</td>
                  <td className="px-6 py-5 text-sm font-bold text-slate-900">{formatDate(sub.subscriptionDate)}</td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest",
                      sub.status.includes('Active') ? "bg-emerald-50 text-emerald-600" : 
                      sub.status.includes('cancelled') ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-400">{formatDate(sub.lastUpdated)}</td>
                </tr>
              ))}
              {subscriptions.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-400 text-sm">No active subscriptions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminAnalytics() {
  const jobs = StorageService.getJobs();
  const applications = StorageService.getApplications();
  const users = StorageService.getUsers();
  
  const categoryData = [
    { name: 'Tech', value: jobs.filter(j => j.jobCategory === 'Remote Tech').length },
    { name: 'Data Analyst', value: jobs.filter(j => j.jobCategory === 'Remote Data Analyst').length },
    { name: 'AI', value: jobs.filter(j => j.jobCategory === 'Remote AI Engineers').length },
    { name: 'HR', value: jobs.filter(j => j.jobCategory === 'Remote HR & Administration').length },
    { name: 'Customer Success', value: jobs.filter(j => j.jobCategory === 'Remote Customer Success').length },
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-8">Jobs Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {categoryData.map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-xs font-bold text-slate-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-8">Application Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-8">Platform Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-indigo-50 rounded-[24px] border border-indigo-100">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">User Growth</p>
            <p className="text-3xl font-bold text-slate-900">+{users.length}</p>
            <p className="text-xs text-slate-500 mt-2 font-medium">Total registered members</p>
          </div>
          <div className="p-8 bg-emerald-50 rounded-[24px] border border-emerald-100">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Success Rate</p>
            <p className="text-3xl font-bold text-slate-900">84%</p>
            <p className="text-xs text-slate-500 mt-2 font-medium">Application to interview ratio</p>
          </div>
          <div className="p-8 bg-amber-50 rounded-[24px] border border-amber-100">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Avg. Salary</p>
            <p className="text-3xl font-bold text-slate-900">$2.4k</p>
            <p className="text-xs text-slate-500 mt-2 font-medium">Across all remote positions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { SupabaseService } from '../services/supabaseService';
import { isSupabaseConfigured } from '../lib/supabase';

function AdminWriteBlog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState({
    title: '',
    subHeadline: '',
    content: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    team: 'Opslify Team' as any
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (isSupabaseConfigured) {
          const supabaseBlogs = await SupabaseService.getBlogs();
          setBlogs(supabaseBlogs);
        } else {
          setBlogs(StorageService.getBlogs());
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs(StorageService.getBlogs());
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogData({ ...blogData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostBlog = async () => {
    if (!blogData.title || !blogData.content || !blogData.image) {
      alert('Please fill in all required fields (Headline, Content, and Image)');
      return;
    }

    const newBlog = {
      ...blogData,
      id: Math.random().toString(36).substr(2, 9),
      author: blogData.team
    };

    try {
      if (isSupabaseConfigured) {
        await SupabaseService.saveBlog(newBlog);
        const updatedBlogs = await SupabaseService.getBlogs();
        setBlogs(updatedBlogs);
      } else {
        StorageService.saveBlog(newBlog);
        setBlogs(StorageService.getBlogs());
      }
      alert('Blog posted successfully!');
      setBlogData({
        title: '',
        subHeadline: '',
        content: '',
        image: '',
        date: new Date().toISOString().split('T')[0],
        team: 'Opslify Team'
      });
    } catch (error) {
      console.error('Error posting blog:', error);
      alert('Failed to post blog. Please try again.');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        if (isSupabaseConfigured) {
          await SupabaseService.deleteBlog(id);
          const updatedBlogs = await SupabaseService.getBlogs();
          setBlogs(updatedBlogs);
        } else {
          StorageService.deleteBlog(id);
          setBlogs(StorageService.getBlogs());
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog.');
      }
    }
  };

  return (
    <div className="max-w-4xl space-y-12">
      <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm space-y-10">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-900">Write New Blog Post</h3>
          <div className="flex items-center space-x-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
            <FileText size={18} />
            <span className="text-sm font-bold">Draft Mode</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Blog Headline</label>
              <input 
                type="text" 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="Enter a catchy headline..." 
                value={blogData.title}
                onChange={e => setBlogData({...blogData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Blog Sub Headline</label>
              <input 
                type="text" 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="A brief summary or hook..." 
                value={blogData.subHeadline}
                onChange={e => setBlogData({...blogData, subHeadline: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Publish Date</label>
                <input 
                  type="date" 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
                  value={blogData.date}
                  onChange={e => setBlogData({...blogData, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Team</label>
                <select 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                  value={blogData.team}
                  onChange={e => setBlogData({...blogData, team: e.target.value as any})}
                >
                  <option value="Opslify Team">Opslify Team</option>
                  <option value="Content Team">Content Team</option>
                  <option value="Marketing Team">Marketing Team</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Cover Image</label>
              <div className="relative group">
                <div className={cn(
                  "aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden",
                  blogData.image ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-slate-50 hover:border-indigo-400"
                )}>
                  {blogData.image ? (
                    <img src={blogData.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 mb-3">
                        <Upload size={24} />
                      </div>
                      <p className="text-xs font-bold text-slate-500">Click to upload image</p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={handleImageUpload}
                />
                {blogData.image && (
                  <button 
                    onClick={() => setBlogData({...blogData, image: ''})}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-xl text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Blog Content</label>
          <textarea 
            className="w-full px-8 py-6 bg-slate-50 border border-slate-200 rounded-[32px] outline-none focus:ring-2 focus:ring-indigo-500 min-h-[400px] leading-relaxed" 
            placeholder="Write your blog content here... (HTML supported)" 
            value={blogData.content}
            onChange={e => setBlogData({...blogData, content: e.target.value})}
          />
        </div>

        <button 
          onClick={handlePostBlog}
          className="w-full py-6 bg-indigo-600 text-white rounded-[24px] font-bold text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center space-x-3"
        >
          <Send size={24} />
          <span>Post Blog to Website</span>
        </button>
      </div>

      {blogs.length > 0 && (
        <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
          <h3 className="text-2xl font-bold text-slate-900">Manage Published Blogs</h3>
          <div className="grid grid-cols-1 gap-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px] border border-slate-100 group">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 rounded-xl overflow-hidden border border-slate-200">
                    <img src={blog.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 line-clamp-1">{blog.title}</p>
                    <p className="text-xs text-slate-500">{formatDate(blog.date)} • {blog.team}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  title="Delete Blog"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AdminSettingsPage() {
  const [settings, setSettings] = useState(StorageService.getSettings());
  const [newCategory, setNewCategory] = useState('');

  const handleSave = () => {
    const updatedSettings = { ...settings };
    if (settings.announcementBanner && !settings.announcementHistory?.includes(settings.announcementBanner)) {
      updatedSettings.announcementHistory = [settings.announcementBanner, ...(settings.announcementHistory || [])];
    }
    StorageService.saveSettings(updatedSettings);
    setSettings(updatedSettings);
    alert('System settings updated!');
  };

  const deleteFromHistory = (banner: string) => {
    const updatedHistory = (settings.announcementHistory || []).filter(b => b !== banner);
    const updatedSettings = { ...settings, announcementHistory: updatedHistory };
    if (settings.announcementBanner === banner) {
      updatedSettings.announcementBanner = '';
    }
    setSettings(updatedSettings);
    StorageService.saveSettings(updatedSettings);
  };

  const clearCurrentBanner = () => {
    const updatedSettings = { ...settings, announcementBanner: '' };
    setSettings(updatedSettings);
    StorageService.saveSettings(updatedSettings);
    alert('Active banner removed!');
  };

  const addCategory = () => {
    if (newCategory && !settings.enabledCategories.includes(newCategory as JobCategory)) {
      setSettings({
        ...settings,
        enabledCategories: [...settings.enabledCategories, newCategory as JobCategory]
      });
      setNewCategory('');
    }
  };

  const removeCategory = (cat: JobCategory) => {
    setSettings({
      ...settings,
      enabledCategories: settings.enabledCategories.filter(c => c !== cat)
    });
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm space-y-10">
        <h3 className="text-xl font-bold text-slate-900">Platform Configuration</h3>
        
        <div className="space-y-8">
          <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[24px] border border-slate-100">
            <div>
              <p className="font-bold text-slate-900">Maintenance Mode</p>
              <p className="text-xs text-slate-500">Disable platform access for users during updates</p>
            </div>
            <button 
              onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
              className={cn(
                "w-14 h-8 rounded-full transition-all relative",
                settings.maintenanceMode ? "bg-indigo-600" : "bg-slate-300"
              )}
            >
              <div className={cn(
                "absolute top-1 w-6 h-6 bg-white rounded-full transition-all",
                settings.maintenanceMode ? "left-7" : "left-1"
              )} />
            </button>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700">Platform Announcement Banner</label>
            <div className="flex space-x-2">
              <input 
                type="text" 
                className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="e.g. New AI features arriving next week!" 
                value={settings.announcementBanner}
                onChange={e => setSettings({...settings, announcementBanner: e.target.value})}
              />
              {settings.announcementBanner && (
                <button 
                  onClick={clearCurrentBanner}
                  className="px-6 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all border border-red-100"
                >
                  Delete Active
                </button>
              )}
            </div>
            
            {settings.announcementHistory && settings.announcementHistory.length > 0 && (
              <div className="mt-6 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Announcements</p>
                <div className="space-y-2">
                  {settings.announcementHistory.map((banner, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group">
                      <p className="text-sm text-slate-600 truncate flex-1 mr-4">{banner}</p>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSettings({...settings, announcementBanner: banner})}
                          className="text-[10px] font-bold text-indigo-600 hover:underline"
                        >
                          Reuse
                        </button>
                        <button 
                          onClick={() => deleteFromHistory(banner)}
                          className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700">Manage Job Categories</label>
            <div className="flex space-x-2 mb-4">
              <input 
                type="text" 
                className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="New category name..." 
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
              />
              <button 
                onClick={addCategory}
                className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {settings.enabledCategories.map((cat) => (
                <div key={cat} className="flex items-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl border border-indigo-100 text-xs font-bold">
                  {cat}
                  <button onClick={() => removeCategory(cat)} className="ml-2 hover:text-red-500">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
        >
          Save All System Settings
        </button>
      </div>
    </div>
  );
}
