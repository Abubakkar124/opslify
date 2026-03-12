import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Sparkles, Briefcase, FileText, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const faqs = [
    { q: "Is OPSLIFY really free?", a: "Our Starter plan is completely free and includes all AI tools with generous daily limits." },
    { q: "How does the AI Resume Builder work?", a: "It uses advanced Gemini AI to analyze your experience and generate ATS-friendly content tailored to your target roles." },
    { q: "Can I manage my job applications here?", a: "Yes! Our CRM-style dashboard allows you to track every stage of your job search journey." },
    { q: "Are the jobs listed real?", a: "Yes, our admin team and partners post verified remote opportunities daily across multiple categories." }
  ];

  const jobCategories = [
    { title: "Remote Tech", desc: "Software engineering, DevOps, and infrastructure roles at top global startups." },
    { title: "Remote Data Analyst", desc: "Analyze data and drive business insights from anywhere in the world." },
    { title: "Remote HR & Admin", desc: "Manage people and operations for remote-first organizations." },
    { title: "Remote Customer Success", desc: "Help customers succeed and grow with innovative products." },
    { title: "Remote Data Entry", desc: "Flexible data management roles for organized professionals." },
    { title: "Remote AI Engineers", desc: "Build the future of technology with cutting-edge AI roles." },
    { title: "Remote Data Scientist", desc: "Solve complex problems using advanced statistical models." }
  ];

  const aiTools = [
    { title: "AI ATS Resume Maker", desc: "Generate high-scoring, ATS-friendly resumes tailored to specific job descriptions in seconds." },
    { title: "AI Cover Letter Maker", desc: "Craft personalized, professional cover letters that highlight your unique value proposition." },
    { title: "AI Resume Keywords", desc: "Instantly identify the most important keywords to include in your resume for any role." },
    { title: "AI Resume Summary", desc: "Get a powerful, punchy professional summary that grabs recruiter attention immediately." },
    { title: "AI Resume Audit", desc: "Receive a detailed score and actionable feedback to improve your existing resume." }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100 rounded-full blur-[120px] opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100">
              <Sparkles size={16} className="mr-2" />
              AI-Powered Career Growth
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
              Find Remote Jobs Faster with <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                AI-Powered Career Tools
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Opslify helps professionals discover remote opportunities, improve their resumes with AI, and track job applications from a single powerful dashboard.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center">
                Get Started Free
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link to="/pricing" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                View Pricing
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-2">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" 
                alt="Opslify Dashboard Preview" 
                className="rounded-xl w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">Explore Remote Opportunities</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We curate the best remote jobs across various industries to help you find your perfect fit.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobCategories.map((cat, i) => (
              <div key={i} className="group p-8 rounded-[32px] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-indigo-100 transition-all">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{cat.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{cat.desc}</p>
                <Link to="/signup" className="inline-flex items-center text-indigo-600 font-bold text-sm">
                  View Jobs <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="px-4 py-1 bg-indigo-600/30 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">The AI Advantage</span>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Master Your Job Search with AI</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our suite of AI tools is designed to give you a competitive edge at every stage of the application process.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiTools.map((tool, i) => (
              <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{tool.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Quick answers to common questions about OPSLIFY.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold text-slate-900">{faq.q}</span>
                    <span className="transition-transform group-open:rotate-180">
                      <ArrowRight size={18} className="rotate-90" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
