import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Sparkles, FileText, Search, CheckCircle2, Send, Loader2, Download, Copy, Plus, Trash2, Upload, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GeminiService } from '../services/geminiService';
import { StorageService } from '../services/storageService';
import { cn } from '../utils/helpers';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function AIToolsPage() {
  const { toolId } = useParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    experiences: [{ companyName: '', role: '', startDate: '', endDate: '', description: '' }],
    projects: [{ title: '', description: '', link: '' }],
    skills: [],
    technicalSkills: [],
    hobbies: []
  });
  const resumeRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolConfigs: Record<string, any> = {
    'resume-maker': {
      title: 'AI ATS Resume Maker',
      desc: 'Create professional, ATS-friendly resumes with unlimited experience entries.',
      icon: <Sparkles className="text-indigo-600" />,
    },
    'cover-letter': {
      title: 'AI Cover Letter Maker',
      desc: 'Generate customized cover letters that highlight your unique value.',
      icon: <FileText className="text-amber-600" />,
      fields: [
        { name: 'role', label: 'Job Role', type: 'text', placeholder: 'e.g. Data Analyst' },
        { name: 'jobDesc', label: 'Job Description', type: 'textarea', placeholder: 'Paste the job description here...' },
        { name: 'experience', label: 'Your Key Experience', type: 'textarea', placeholder: 'Briefly describe your relevant background...' },
      ],
      action: (data: any) => GeminiService.generateCoverLetter(data, data.jobDesc)
    },
    'keywords': {
      title: 'AI Resume Keywords Maker',
      desc: 'Get the exact keywords you need to pass through ATS filters.',
      icon: <Search className="text-emerald-600" />,
      fields: [
        { name: 'role', label: 'Job Role', type: 'text', placeholder: 'e.g. HR Manager' },
      ],
      action: (data: any) => GeminiService.suggestKeywords(data.role)
    },
    'summary': {
      title: 'AI Resume Summary Maker',
      desc: 'Generate powerful professional summaries that grab attention.',
      icon: <FileText className="text-violet-600" />,
      fields: [
        { name: 'role', label: 'Job Role', type: 'text', placeholder: 'e.g. Product Designer' },
        { name: 'experience', label: 'Experience Highlights', type: 'textarea', placeholder: 'Years of experience, key achievements...' },
      ],
      action: GeminiService.generateSummary
    },
    'audit': {
      title: 'AI Resume Audit & Score',
      desc: 'Upload your resume and get a detailed ATS compatibility score.',
      icon: <CheckCircle2 className="text-rose-600" />,
      fields: [
        { name: 'resumeText', label: 'Resume Content', type: 'textarea', placeholder: 'Paste your resume text here for analysis...' },
      ],
      action: (data: any) => GeminiService.auditResume(data.resumeText)
    }
  };

  const currentTool = toolConfigs[toolId || ''] || toolConfigs['resume-maker'];

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { companyName: '', role: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const handleRemoveExperience = (index: number) => {
    const newExp = formData.experiences.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, experiences: newExp });
  };

  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: '', description: '', link: '' }]
    });
  };

  const handleRemoveProject = (index: number) => {
    const newProj = formData.projects.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, projects: newProj });
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      if (toolId === 'resume-maker') {
        const res = await GeminiService.generateResume(formData);
        setResult(res);
      } else {
        const res = await currentTool.action(formData);
        setResult(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    const canvas = await html2canvas(resumeRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`opslify-resume-${Date.now()}.pdf`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setFormData({ ...formData, resumeText: text });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
            {currentTool.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{currentTool.title}</h1>
            <p className="text-slate-500">{currentTool.desc}</p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-8">
          {toolId === 'resume-maker' ? (
            <div className="space-y-8">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                    value={formData.fullName || ''}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                    value={formData.email || ''}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                    value={formData.address || ''}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              {/* Experience Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Work Experience</h3>
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="flex items-center text-indigo-600 font-bold text-sm hover:text-indigo-700"
                  >
                    <Plus size={16} className="mr-1" /> Add Experience
                  </button>
                </div>
                {formData.experiences.map((exp: any, index: number) => (
                  <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 relative">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveExperience(index)}
                        className="absolute top-4 right-4 text-rose-500 hover:text-rose-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        placeholder="Company Name"
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                        value={exp.companyName}
                        onChange={e => {
                          const newExp = [...formData.experiences];
                          newExp[index].companyName = e.target.value;
                          setFormData({ ...formData, experiences: newExp });
                        }}
                      />
                      <input
                        placeholder="Job Role"
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                        value={exp.role}
                        onChange={e => {
                          const newExp = [...formData.experiences];
                          newExp[index].role = e.target.value;
                          setFormData({ ...formData, experiences: newExp });
                        }}
                      />
                      <input
                        type="date"
                        placeholder="Start Date"
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                        value={exp.startDate}
                        onChange={e => {
                          const newExp = [...formData.experiences];
                          newExp[index].startDate = e.target.value;
                          setFormData({ ...formData, experiences: newExp });
                        }}
                      />
                      <input
                        type="date"
                        placeholder="End Date"
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                        value={exp.endDate}
                        onChange={e => {
                          const newExp = [...formData.experiences];
                          newExp[index].endDate = e.target.value;
                          setFormData({ ...formData, experiences: newExp });
                        }}
                      />
                    </div>
                    <textarea
                      placeholder="Job Description & Achievements"
                      rows={3}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                      value={exp.description}
                      onChange={e => {
                        const newExp = [...formData.experiences];
                        newExp[index].description = e.target.value;
                        setFormData({ ...formData, experiences: newExp });
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Skills & Hobbies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Technical Skills (Optional)</label>
                  <input
                    placeholder="e.g. React, Python, AWS"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm"
                    value={formData.technicalSkills || ''}
                    onChange={e => setFormData({ ...formData, technicalSkills: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Hobbies</label>
                  <input
                    placeholder="e.g. Reading, Traveling"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm"
                    value={formData.hobbies || ''}
                    onChange={e => setFormData({ ...formData, hobbies: e.target.value })}
                  />
                </div>
              </div>

              {/* Projects Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Projects (Optional)</h3>
                  <button
                    type="button"
                    onClick={handleAddProject}
                    className="flex items-center text-indigo-600 font-bold text-sm hover:text-indigo-700"
                  >
                    <Plus size={16} className="mr-1" /> Add Project
                  </button>
                </div>
                {formData.projects.map((proj: any, index: number) => (
                  <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 relative">
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(index)}
                      className="absolute top-4 right-4 text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        placeholder="Project Title"
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                        value={proj.title}
                        onChange={e => {
                          const newProj = [...formData.projects];
                          newProj[index].title = e.target.value;
                          setFormData({ ...formData, projects: newProj });
                        }}
                      />
                      <input
                        placeholder="Project Link (Optional)"
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                        value={proj.link}
                        onChange={e => {
                          const newProj = [...formData.projects];
                          newProj[index].link = e.target.value;
                          setFormData({ ...formData, projects: newProj });
                        }}
                      />
                    </div>
                    <textarea
                      placeholder="Project Description"
                      rows={2}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                      value={proj.description}
                      onChange={e => {
                        const newProj = [...formData.projects];
                        newProj[index].description = e.target.value;
                        setFormData({ ...formData, projects: newProj });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {toolId === 'audit' && (
                <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Upload className="text-indigo-600" />
                    <div>
                      <p className="font-bold text-indigo-900">Upload Resume File</p>
                      <p className="text-xs text-indigo-600">Supports .txt files for direct parsing</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".txt"
                    onChange={handleFileUpload}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700"
                  >
                    Select File
                  </button>
                </div>
              )}
              {currentTool.fields?.map((field: any) => (
                <div key={field.name}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                    />
                  ) : (
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Processing with AI...
              </>
            ) : (
              <>
                <Sparkles size={20} className="mr-2" />
                Generate Result
              </>
            )}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">AI Generated Result</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    const text = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
                    navigator.clipboard.writeText(text);
                  }}
                  className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy size={18} />
                </button>
                <button 
                  onClick={downloadPDF}
                  className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
                  title="Download as PDF"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>

            <div ref={resumeRef} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm min-h-[400px]">
              {toolId === 'audit' ? (
                <div className="space-y-8">
                  <div className="flex items-center justify-center py-8">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeDasharray="100, 100"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-indigo-600"
                          strokeDasharray={`${result.score}, 100`}
                          strokeWidth="3"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-slate-900">{result.score}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-bold text-emerald-600 flex items-center">
                        <CheckCircle2 size={18} className="mr-2" /> Strengths
                      </h4>
                      <ul className="space-y-2">
                        {result.strengths?.map((s: string, i: number) => (
                          <li key={i} className="text-sm text-slate-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-rose-600 flex items-center">
                        <AlertCircle size={18} className="mr-2" /> Weaknesses
                      </h4>
                      <ul className="space-y-2">
                        {result.weaknesses?.map((w: string, i: number) => (
                          <li key={i} className="text-sm text-slate-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4">Improvement Suggestions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.suggestions?.map((s: string, i: number) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600">
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="prose prose-slate max-w-none text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {result}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
