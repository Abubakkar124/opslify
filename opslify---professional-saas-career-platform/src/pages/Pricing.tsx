import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Sparkles, Zap, Briefcase, FileText, Search, CheckCircle2, Upload, AlertCircle, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { PaymentRequest, UserSubscription } from '../types';

export default function Pricing() {
  const navigate = useNavigate();
  const currentUser = StorageService.getCurrentUser();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    mobile: currentUser?.mobile || '',
    bankName: '',
    screenshot: '',
    paymentStatus: 'Processing',
    paymentMode: 'Googlepay'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const sub = StorageService.getSubscriptionByUserId(currentUser.id);
      if (sub) {
        // Check if 30 days have passed
        const subDate = new Date(sub.subscriptionDate);
        const now = new Date();
        const diffDays = Math.ceil(Math.abs(now.getTime() - subDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 30) {
          setSubscription(sub);
        } else {
          setSubscription(null);
        }
      }
    }
  }, [currentUser]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, screenshot: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentUser) {
      setError('Please login to subscribe');
      return;
    }

    const { fullName, email, mobile, bankName, screenshot, paymentStatus, paymentMode } = formData;
    
    if (!fullName || !email || !mobile || !bankName || !screenshot || !paymentStatus || !paymentMode) {
      setError('Please fill all details to submit');
      return;
    }

    const paymentRequest: PaymentRequest = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      upiId: 'careerfreshjob@oksbi',
      fullName,
      email,
      mobile,
      bankName,
      screenshotUrl: screenshot,
      status: paymentStatus as any,
      paymentMode,
      timestamp: new Date().toISOString()
    };

    StorageService.savePayment(paymentRequest);
    setSuccess(true);
    setFormData({
      ...formData,
      bankName: '',
      screenshot: '',
      paymentStatus: 'Processing',
      paymentMode: 'Googlepay'
    });
    
    setTimeout(() => setSuccess(false), 5000);
  };

  const plans = [
    {
      name: "Starter",
      price: "0",
      period: "lifetime",
      desc: "Perfect for getting started with your job search.",
      features: [
        "AI ATS Resume Maker",
        "AI Cover Letter Maker",
        "AI Resume Keywords Maker",
        "AI Resume Summary Maker",
        "AI Resume Audit & Score",
        "Basic Job Tracking",
        "Community Support"
      ],
      buttonText: "Get Started Free",
      highlight: false
    },
    {
      name: "Standard",
      price: "999",
      period: "month",
      desc: "Advanced tools for serious job seekers.",
      features: [
        "Everything in Starter",
        "Remote Tech Jobs",
        "Remote Data Analyst Jobs",
        "Remote HR & Administration Jobs",
        "Remote Customer Success Jobs",
        "Remote Data Entry Jobs",
        "Remote AI Engineers Jobs",
        "Remote Data Scientist Jobs",
        "Upcoming Launch Features Free",
        "Priority Support"
      ],
      buttonText: "Upgrade to Standard",
      highlight: true
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the plan that's right for your career goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-8 rounded-[32px] border transition-all ${
                plan.highlight 
                  ? "bg-white border-indigo-600 shadow-2xl scale-105 z-10" 
                  : "bg-slate-50 border-slate-200 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.desc}</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900">₹{plan.price}</span>
                  <span className="text-slate-500 ml-2">/{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center text-slate-600 text-sm">
                    <Check className={`mr-3 flex-shrink-0 ${plan.highlight ? "text-indigo-600" : "text-slate-400"}`} size={18} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                to={currentUser ? "#subscription-form" : "/signup"} 
                onClick={(e) => {
                  if (currentUser) {
                    e.preventDefault();
                    document.getElementById('subscription-form')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`w-full py-4 rounded-xl font-bold text-center block transition-all ${
                  plan.highlight 
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100" 
                    : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        {/* Subscription Form Section */}
        <div id="subscription-form" className="mt-32 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">We Keep Simple, Transparency for Subscribing Standard Plan</h2>
            <p className="text-slate-600">Please complete the payment and fill the details below to activate your subscription.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <form onSubmit={handleSubmit} className="divide-y divide-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 bg-slate-50 font-bold text-slate-700 border-r border-slate-100">UPI ID for Subscription</div>
                <div className="p-6 font-mono text-indigo-600 font-bold bg-indigo-50/30 flex items-center">
                  <CreditCard size={18} className="mr-2" />
                  careerfreshjob@oksbi
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 bg-slate-50 font-bold text-slate-700 border-r border-slate-100">Full Name</div>
                <div className="p-4">
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 bg-slate-50 font-bold text-slate-700 border-r border-slate-100">Account Email Address</div>
                <div className="p-4">
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Enter your registered email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 bg-slate-50 font-bold text-slate-700 border-r border-slate-100">Mobile Number</div>
                <div className="p-4">
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 bg-slate-50 font-bold text-slate-700 border-r border-slate-100">Bank Name</div>
                <div className="p-4">
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Enter your bank name"
                    value={formData.bankName}
                    onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 bg-slate-50 font-bold text-slate-700 border-r border-slate-100">Attach Payment Screenshot</div>
                <div className="p-4">
                  <label className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <Upload size={18} className="mr-2 text-slate-400" />
                    <span className="text-sm text-slate-500">{formData.screenshot ? 'Screenshot Attached' : 'Upload Screenshot'}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </label>
                  {formData.screenshot && (
                    <div className="mt-2 text-xs text-emerald-600 font-medium flex items-center">
                      <CheckCircle2 size={14} className="mr-1" /> Image uploaded successfully
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 bg-slate-50 font-bold text-slate-700 border-r border-slate-100">Payment Status</div>
                <div className="p-4">
                  <select 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({...formData, paymentStatus: e.target.value})}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 bg-slate-50 font-bold text-slate-700 border-r border-slate-100">Payment Mode</div>
                <div className="p-4">
                  <select 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({...formData, paymentMode: e.target.value})}
                  >
                    {['Googlepay', 'Phonepay', 'Amazonpay', 'BharatPe', 'Paytm', 'Slice', 'OneCard', 'Netbanking', 'Kiwi', 'Airtel Pay'].map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-6 bg-slate-50 flex flex-col items-center">
                {error && (
                  <div className="mb-4 flex items-center text-red-600 text-sm font-medium">
                    <AlertCircle size={16} className="mr-2" />
                    {error}
                  </div>
                )}
                {success && (
                  <div className="mb-4 flex items-center text-emerald-600 text-sm font-medium">
                    <CheckCircle2 size={16} className="mr-2" />
                    Payment details submitted successfully! Admin will verify soon.
                  </div>
                )}
                <button 
                  type="submit"
                  className="px-12 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center group"
                >
                  Submit Payment Details
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Subscription Status Section */}
        <div className="mt-32 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Subscription Status</h2>
            <p className="text-slate-600">Track your current subscription details here.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="divide-y divide-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 bg-slate-50 font-bold text-slate-700 border-r border-slate-100">Monthly Subscription date</div>
                <div className="p-6 text-slate-600 font-medium">
                  {subscription ? new Date(subscription.subscriptionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'No active subscription'}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 bg-slate-50 font-bold text-slate-700 border-r border-slate-100">Subscription Status</div>
                <div className="p-6">
                  {subscription ? (
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      subscription.status.includes('Active') ? 'bg-emerald-100 text-emerald-700' : 
                      subscription.status.includes('cancelled') ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {subscription.status}
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">Not available</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Compare AI Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Sparkles className="text-indigo-600" />, title: "AI ATS Resume Maker", desc: "Create high-scoring resumes tailored to job descriptions." },
              { icon: <FileText className="text-emerald-600" />, title: "AI Cover Letter Maker", desc: "Generate personalized cover letters that stand out." },
              { icon: <Search className="text-amber-600" />, title: "AI Resume Keywords", desc: "Identify the most important keywords for your target role." },
              { icon: <Zap className="text-violet-600" />, title: "AI Resume Summary", desc: "Get a powerful professional summary in seconds." },
              { icon: <CheckCircle2 className="text-blue-600" />, title: "AI Resume Audit", desc: "Get a detailed score and feedback on your current resume." }
            ].map((tool, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="mb-4">{tool.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-slate-500">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
