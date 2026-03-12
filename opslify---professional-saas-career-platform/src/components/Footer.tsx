import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Instagram, Twitter, Cloud, BookOpen, Mail, Facebook } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://www.instagram.com/opslifysolution/' },
    { name: 'X', icon: <Twitter size={20} />, url: 'https://x.com/opslifysolution' },
    { name: 'Bluesky', icon: <Cloud size={20} />, url: 'https://bsky.app/profile/opslify.bsky.social' },
    { name: 'Medium', icon: <BookOpen size={20} />, url: 'https://medium.com/@abubakkarahamed2000' },
    { name: 'Substack', icon: <Mail size={20} />, url: 'https://substack.com/@opslifysolution' },
    { name: 'Facebook', icon: <Facebook size={20} />, url: 'https://www.facebook.com/profile.php?id=61583581957226' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Rocket size={18} />
              </div>
              <span className="text-xl font-bold text-white">OPSLIFY</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              The ultimate SaaS platform for career growth. AI-powered tools to help you land your dream job faster than ever.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors p-2 bg-slate-900 rounded-lg"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Product</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/signup" className="hover:text-white transition-colors">AI ATS Resume</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">AI Cover Letter</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">AI Resume Keywords</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">AI Resume Summary</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">AI Resume Audit</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Remote Jobs</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/signup" className="hover:text-white transition-colors">Remote Tech</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Remote Data Analyst</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Remote HR & Admin</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Remote Customer Success</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Remote Data Entry</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Remote AI Engineers</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Remote Data Scientist</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><a href="/?admin=true" className="hover:text-white transition-colors">Admin Panel</a></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-12 pt-12 border-t border-slate-900">
          <div className="md:col-span-4">
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ul className="space-y-4 text-sm">
                <li><Link to="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li>
                  <Link to="/system-status" className="hover:text-white transition-colors flex items-center">
                    SYSTEM OPERATIONAL STATUS
                    <span className="ml-2 flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </Link>
                </li>
              </ul>
              <div className="text-sm space-y-2">
                <p className="text-white font-medium">Email Support</p>
                <p>info@opslify.in</p>
              </div>
              <div className="text-sm space-y-2">
                <p className="text-white font-medium">Office Hours</p>
                <p>9am to 6pm (Mon-Fri)</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-900 text-center text-xs">
          <p>© {new Date().getFullYear()} OPSLIFY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
