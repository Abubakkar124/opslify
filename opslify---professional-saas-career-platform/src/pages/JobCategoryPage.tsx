import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Briefcase, MapPin, Calendar, DollarSign, ArrowRight, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StorageService } from '../services/storageService';
import { Job, JobCategory } from '../types';
import { formatCurrency, formatDate, cn } from '../utils/helpers';

export default function JobCategoryPage() {
  const { categoryId } = useParams();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const jobs = StorageService.getJobs();
  const currentUser = StorageService.getCurrentUser();

  const categoryMap: Record<string, JobCategory> = {
    'tech': 'Remote Tech',
    'data-analyst': 'Remote Data Analyst',
    'hr-admin': 'Remote HR & Administration',
    'customer-success': 'Remote Customer Success',
    'data-entry': 'Remote Data Entry',
    'ai-engineers': 'Remote AI Engineers',
    'data-scientist': 'Remote Data Scientist',
  };

  const currentCategory = categoryMap[categoryId || ''] || 'Remote Tech';
  const filteredJobs = jobs.filter(j => j.jobCategory === currentCategory);

  const handleApply = (job: Job) => {
    if (!currentUser) return;
    
    const application = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      userName: currentUser.fullName,
      userEmail: currentUser.email,
      jobId: job.id,
      jobRole: job.role,
      jobCategory: job.jobCategory,
      applicationDate: new Date().toISOString(),
      status: 'Applied' as const
    };

    StorageService.applyToJob(application);
    window.open(job.externalLink, '_blank');
    setSelectedJob(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{currentCategory}</h1>
          <p className="text-slate-500 mt-1">Discover verified remote opportunities in {currentCategory.toLowerCase()}.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600">
          {filteredJobs.length} Jobs Found
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-indigo-100/50 transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <Briefcase size={24} />
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-wider">
                {job.jobType}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{job.role}</h3>
            <p className="text-slate-500 font-medium text-sm mb-4">{job.companyName}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {job.skills.map((skill, si) => (
                <span key={si} className="px-2.5 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg uppercase tracking-tight border border-slate-100">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Salary Range</p>
                <p className="text-sm font-bold text-slate-900">{formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}</p>
              </div>
              <button
                onClick={() => setSelectedJob(job)}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
              <Briefcase size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No jobs found in this category</h3>
            <p className="text-slate-500 mt-1">Check back later or explore other categories.</p>
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                    <Briefcase size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedJob.role}</h2>
                    <p className="text-slate-500 font-medium">{selectedJob.companyName} • {selectedJob.jobCategory}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Salary</p>
                    <p className="text-sm font-bold text-slate-900">{formatCurrency(selectedJob.salaryMin)} - {formatCurrency(selectedJob.salaryMax)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</p>
                    <p className="text-sm font-bold text-slate-900">{selectedJob.jobType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Posted</p>
                    <p className="text-sm font-bold text-slate-900">{formatDate(selectedJob.postedDate)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="text-sm font-bold text-slate-900">Global Remote</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-xl border border-indigo-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Job Description</h4>
                  <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedJob.jobDescription}
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500 font-medium italic">
                  * You will be redirected to the external application portal.
                </div>
                <button
                  onClick={() => handleApply(selectedJob)}
                  className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center"
                >
                  Apply Now
                  <ExternalLink size={18} className="ml-2" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
