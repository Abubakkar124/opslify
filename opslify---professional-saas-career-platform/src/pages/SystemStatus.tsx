import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Shield, Zap, Activity, Globe, Server } from 'lucide-react';

export default function SystemStatus() {
  const systems = [
    { name: 'User Dashboard', status: 'Operational', uptime: '100%' },
    { name: 'AI ATS Resume Builder', status: 'Operational', uptime: '100%' },
    { name: 'AI Cover Letter Generator', status: 'Operational', uptime: '100%' },
    { name: 'AI Resume Keyword Optimizer', status: 'Operational', uptime: '100%' },
    { name: 'AI Resume Summary Generator', status: 'Operational', uptime: '100%' },
    { name: 'AI Resume Audit System', status: 'Operational', uptime: '100%' },
    { name: 'Job Search Engine', status: 'Operational', uptime: '100%' },
    { name: 'Application Tracker', status: 'Operational', uptime: '100%' },
    { name: 'Notifications Manager', status: 'Operational', uptime: '100%' },
    { name: 'User Authentication', status: 'Operational', uptime: '100%' },
    { name: 'Helpdesk & Support System', status: 'Operational', uptime: '100%' },
    { name: 'Admin Panel Interface', status: 'Operational', uptime: '100%' },
  ];

  // Generate 30 "uptime" bars for each system
  const renderUptimeBars = () => {
    return Array.from({ length: 40 }).map((_, i) => (
      <div 
        key={i} 
        className="h-8 w-1 bg-emerald-500 rounded-full opacity-80 hover:opacity-100 transition-opacity"
        title="100% Uptime"
      />
    ));
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">System Operational Status</h1>
            <p className="text-slate-500">Real-time status of Opslify services and infrastructure.</p>
          </div>
          <div className="flex items-center space-x-3 px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-700 font-bold text-sm">All Systems Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <Globe size={20} />, label: 'Global Network', value: '100%' },
            { icon: <Server size={20} />, label: 'Server Health', value: '99.99%' },
            { icon: <Zap size={20} />, label: 'API Latency', value: '42ms' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 flex items-center">
              <Activity size={20} className="mr-2 text-indigo-600" />
              Core Services
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {systems.map((system, i) => (
              <div key={i} className="p-8 hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-slate-900">{system.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{system.status}</span>
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderUptimeBars()}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">30 Days Ago</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Today</span>
                    </div>
                  </div>
                  <div className="lg:w-32 text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Uptime</p>
                    <p className="text-lg font-bold text-slate-900">{system.uptime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-8 bg-indigo-900 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
              <Shield size={32} className="text-indigo-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Security & Reliability</h3>
              <p className="text-indigo-200 text-sm max-w-md">
                Opslify infrastructure is built on enterprise-grade cloud providers with multi-region redundancy and 24/7 monitoring.
              </p>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-bold hover:bg-indigo-50 transition-all whitespace-nowrap">
            View Security Report
          </button>
        </div>
      </div>
    </div>
  );
}
