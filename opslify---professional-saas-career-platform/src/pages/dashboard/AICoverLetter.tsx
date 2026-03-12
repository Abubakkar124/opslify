import React, { useState } from 'react';
import { Sparkles, RefreshCw, FileText, Copy, CheckCircle2, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { GeminiService } from '../../services/geminiService';
import { StorageService } from '../../services/storageService';
import Markdown from 'react-markdown';

export default function AICoverLetter() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [copied, setCopied] = useState(false);
  const currentUser = StorageService.getCurrentUser();

  const handleGenerate = async () => {
    if (!currentUser || !jobDesc) return;
    setIsGenerating(true);
    try {
      const result = await GeminiService.generateCoverLetter(currentUser, jobDesc);
      setCoverLetter(result || '');
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Cover Letter Maker</h1>
            <p className="text-slate-500 text-sm">Generate tailored cover letters for specific job roles.</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 block">Job Description / Role Details</label>
          <textarea
            rows={6}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            placeholder="Paste the job description or role details here..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !jobDesc}
            className="w-full py-4 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-all shadow-xl shadow-amber-100 flex items-center justify-center disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw size={20} className="mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} className="mr-2" />
                Generate Cover Letter
              </>
            )}
          </button>
        </div>
      </div>

      {coverLetter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Generated Cover Letter</h3>
            <button
              onClick={() => {
                navigator.clipboard.writeText(coverLetter);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="p-2 hover:bg-white rounded-lg text-slate-500 transition-colors flex items-center text-xs font-bold"
            >
              {copied ? <CheckCircle2 size={16} className="mr-1.5 text-emerald-500" /> : <Copy size={16} className="mr-1.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="p-8 prose prose-slate max-w-none">
            <div className="markdown-body">
              <Markdown>{coverLetter}</Markdown>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
