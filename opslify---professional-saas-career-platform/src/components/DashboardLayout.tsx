import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Bell, Briefcase, FileText, User, LogOut, 
  Code, BarChart, Users, Headphones, Keyboard, Cpu, Microscope,
  Search, Menu, X, ChevronRight, Sparkles, CheckCircle2, Star, Clock,
  Shield, LifeBuoy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StorageService } from '../services/storageService';
import { SupabaseAuthService } from '../services/supabaseAuthService';
import { isSupabaseConfigured } from '../lib/supabase';
import { cn } from '../utils/helpers';

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  category?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = StorageService.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const isProfileUpdated = (user: any) => {
    return user && user.mobile && user.lookingFor && user.city;
  };

  const profileUpdated = isProfileUpdated(currentUser);

  const menuItems: SidebarItem[] = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Notifications', icon: <Bell size={20} />, path: '/dashboard/notifications' },
    { name: 'Helpdesk', icon: <LifeBuoy size={20} />, path: '/dashboard/helpdesk' },
    
    { name: 'Remote Tech', icon: <Code size={20} />, path: '/dashboard/jobs/tech', category: 'Jobs' },
    { name: 'Remote Data Analyst', icon: <BarChart size={20} />, path: '/dashboard/jobs/data-analyst', category: 'Jobs' },
    { name: 'Remote HR & Admin', icon: <Users size={20} />, path: '/dashboard/jobs/hr-admin', category: 'Jobs' },
    { name: 'Remote Customer Success', icon: <Headphones size={20} />, path: '/dashboard/jobs/customer-success', category: 'Jobs' },
    { name: 'Remote Data Entry', icon: <Keyboard size={20} />, path: '/dashboard/jobs/data-entry', category: 'Jobs' },
    { name: 'Remote AI Engineers', icon: <Cpu size={20} />, path: '/dashboard/jobs/ai-engineers', category: 'Jobs' },
    { name: 'Remote Data Scientist', icon: <Microscope size={20} />, path: '/dashboard/jobs/data-scientist', category: 'Jobs' },

    { name: 'AI ATS Resume Maker', icon: <Sparkles size={20} />, path: '/dashboard/ai/resume-maker', category: 'AI Tools' },
    { name: 'AI Cover Letter Maker', icon: <FileText size={20} />, path: '/dashboard/ai/cover-letter', category: 'AI Tools' },
    { name: 'AI Resume Keywords', icon: <Search size={20} />, path: '/dashboard/ai/keywords', category: 'AI Tools' },
    { name: 'AI Resume Summary', icon: <FileText size={20} />, path: '/dashboard/ai/summary', category: 'AI Tools' },
    { name: 'AI Resume Audit', icon: <CheckCircle2 size={20} />, path: '/dashboard/ai/audit', category: 'AI Tools' },

    { name: 'Profile Update', icon: <User size={20} />, path: '/dashboard/profile', category: 'Account' },
  ];

  const handleLogout = async () => {
    try {
      if (isSupabaseConfigured) {
        await SupabaseAuthService.signOut();
      }
      StorageService.setCurrentUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      StorageService.setCurrentUser(null);
      navigate('/');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col",
        isSidebarOpen ? "w-72" : "w-20"
      )}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Briefcase size={18} />
              </div>
              <span className="text-xl font-bold text-black">OPSLIFY</span>
            </Link>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8 custom-scrollbar">
          {['Core', 'Jobs', 'AI Tools', 'Account'].map((cat) => {
            const items = menuItems.filter(item => (item.category || 'Core') === cat);
            return (
              <div key={cat}>
                {isSidebarOpen && <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{cat}</h3>}
                <div className="space-y-1">
                  {items.map((item) => {
                    const isLocked = !profileUpdated && item.path !== '/dashboard' && item.path !== '/dashboard/profile';
                    
                    return (
                      <button
                        key={item.name}
                        onClick={() => !isLocked && navigate(item.path)}
                        disabled={isLocked}
                        className={cn(
                          "flex items-center w-full px-4 py-3 rounded-xl transition-all group relative",
                          location.pathname === item.path 
                            ? "bg-indigo-50 text-indigo-600 font-semibold" 
                            : "text-slate-600 hover:bg-slate-50",
                          isLocked && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <span className={cn(
                          "transition-colors",
                          location.pathname === item.path ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-600"
                        )}>
                          {item.icon}
                        </span>
                        {isSidebarOpen && <span className="ml-3 text-sm">{item.name}</span>}
                        {isSidebarOpen && isLocked && (
                          <Shield size={14} className="ml-auto text-slate-400" />
                        )}
                        {isSidebarOpen && !isLocked && location.pathname === item.path && (
                          <ChevronRight size={16} className="ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-3 text-sm font-semibold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 min-h-screen",
        isSidebarOpen ? "ml-72" : "ml-20"
      )}>
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-xl font-bold text-slate-900">
            {menuItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{currentUser.fullName}</p>
                <p className="text-xs text-slate-500">{currentUser.email}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border-2 border-indigo-200">
                {currentUser.fullName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
