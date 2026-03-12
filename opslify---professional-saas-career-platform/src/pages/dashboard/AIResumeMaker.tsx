import React, { useState } from 'react';
import { Sparkles, Download, Copy, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { GeminiService } from '../../services/geminiService';
import { StorageService } from '../../services/storageService';
import { cn } from '../../utils/helpers';
import Markdown from 'react-markdown';

export default function AIResumeMaker() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [resume, setResume] = useState('');
  const [copied, setCopied] = useState(false);
  const currentUser = StorageService.getCurrentUser();

  const handleGenerate = async () => {
    if (!currentUser) return;
    setIsGenerating(true);
    try {
      const result = await GeminiService.generateResume(currentUser);
      setResume(result || '');
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI ATS Resume Maker</h1>
            <p className="text-slate-500 text-sm">Generate a professional, ATS-optimized resume based on your profile.</p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
          <h3 className="font-bold text-slate-900 mb-2">How it works</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our AI analyzes your profile data (experience, education, skills) and crafts a high-impact resume that passes Applicant Tracking Systems (ATS). Make sure your profile is up to date for the best results.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw size={20} className="mr-2 animate-spin" />
              Generating your resume...
            </>
          ) : (
            <>
              <Sparkles size={20} className="mr-2" />
              Generate AI Resume
            </>
          )}
        </button>
      </div>

      {resume && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-900 flex items-center">
              <FileText size={20} className="mr-2 text-indigo-600" />
              Generated Resume
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-white rounded-lg text-slate-500 transition-colors flex items-center text-xs font-bold"
              >
                {copied ? <CheckCircle2 size={16} className="mr-1.5 text-emerald-500" /> : <Copy size={16} className="mr-1.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button className="p-2 hover:bg-white rounded-lg text-slate-500 transition-colors flex items-center text-xs font-bold">
                <Download size={16} className="mr-1.5" />
                Download PDF
              </button>
            </div>
          </div>
          <div className="p-8 prose prose-slate max-w-none">
            <div className="markdown-body">
              <Markdown>{resume}</Markdown>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
