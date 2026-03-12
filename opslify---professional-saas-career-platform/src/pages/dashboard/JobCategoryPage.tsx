import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Calendar, ArrowRight, ExternalLink, Search, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StorageService } from '../../services/storageService';
import { Job, JobCategory, Application } from '../../types';
import { formatCurrency, formatDate, cn } from '../../utils/helpers';

export default function JobCategoryPage() {
  const { categoryId } = useParams();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  
  const currentUser = StorageService.getCurrentUser();
  const jobs = StorageService.getJobs();
  const applications = StorageService.getApplications();

  // Map URL param to actual category name
  const categoryMap: Record<string, JobCategory> = {
    'tech': 'Remote Tech',
    'data-analyst': 'Remote Data Analyst',
    'hr-admin': 'Remote HR & Administration',
    'customer-success': 'Remote Customer Success',
    'data-entry': 'Remote Data Entry',
    'ai-engineers': 'Remote AI Engineers',
    'data-scientist': 'Remote Data Scientist'
  };

  const categoryName = categoryMap[categoryId || ''] || 'Remote Tech';
  const filteredJobs = jobs.filter(j => 
    j.jobCategory === categoryName && 
    (j.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
     j.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleApply = (job: Job) => {
    if (!currentUser) return;
    
    setIsApplying(true);
    
    const application: Application = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      userName: currentUser.fullName,
      userEmail: currentUser.email,
      jobId: job.id,
      jobRole: job.role,
      jobCategory: job.jobCategory,
      applicationDate: new Date().toISOString(),
      status: 'Applied'
    };

    StorageService.applyToJob(application);
    
    // Simulate redirect to external link
    setTimeout(() => {
      window.open(job.externalLink, '_blank');
      setIsApplying(false);
      setSelectedJob(null);
    }, 1000);
  };

  const isAlreadyApplied = (jobId: string) => {
    return applications.some(a => a.jobId === jobId && a.userId === currentUser?.id);
  };

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{categoryName}</h1>
          <p className="text-slate-500">Browse verified remote opportunities in this category</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search roles or companies..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <motion.div
            key={job.id}
            layoutId={job.id}
            onClick={() => setSelectedJob(job)}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <Briefcase size={24} />
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-wider">
                {job.jobType}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{job.role}</h3>
            <p className="text-sm font-medium text-slate-500 mb-4">{job.companyName}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {job.skills.slice(0, 3).map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase">
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase">
                  +{job.skills.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium uppercase">Salary</span>
                <span className="text-sm font-bold text-slate-900">{formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}</span>
              </div>
              <button className="p-2 bg-slate-900 text-white rounded-lg group-hover:bg-indigo-600 transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        ))}
        {filteredJobs.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No jobs found</h3>
            <p className="text-slate-500">Try adjusting your search or check back later.</p>
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              layoutId={selectedJob.id}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <Briefcase size={32} />
                  </div>
                  <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedJob.role}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-slate-500">
                    <span className="flex items-center"><Briefcase size={16} className="mr-1.5" /> {selectedJob.companyName}</span>
                    <span className="flex items-center"><MapPin size={16} className="mr-1.5" /> {selectedJob.jobType}</span>
                    <span className="flex items-center"><DollarSign size={16} className="mr-1.5" /> {formatCurrency(selectedJob.salaryMin)} - {formatCurrency(selectedJob.salaryMax)}</span>
                    <span className="flex items-center"><Calendar size={16} className="mr-1.5" /> {formatDate(selectedJob.postedDate)}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 uppercase text-xs tracking-wider">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg uppercase">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 uppercase text-xs tracking-wider">Job Description</h4>
                    <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {selectedJob.jobDescription}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Application Status</p>
                  {isAlreadyApplied(selectedJob.id) ? (
                    <span className="text-emerald-600 font-bold flex items-center">
                      <CheckCircle2 size={16} className="mr-1.5" /> Applied
                    </span>
                  ) : (
                    <span className="text-slate-500 font-bold">Not Applied</span>
                  )}
                </div>
                <button
                  disabled={isAlreadyApplied(selectedJob.id) || isApplying}
                  onClick={() => handleApply(selectedJob)}
                  className={cn(
                    "px-8 py-3.5 rounded-xl font-bold flex items-center transition-all",
                    isAlreadyApplied(selectedJob.id) 
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed" 
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                  )}
                >
                  {isApplying ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Redirecting...
                    </span>
                  ) : isAlreadyApplied(selectedJob.id) ? (
                    "Already Applied"
                  ) : (
                    <>
                      Apply Now
                      <ExternalLink size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
