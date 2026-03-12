import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import JobCategoryPage from './pages/JobCategoryPage';
import AIToolsPage from './pages/AIToolsPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import HelpdeskPage from './pages/HelpdeskPage';
import SystemStatus from './pages/SystemStatus';
import AdminPanel from './pages/AdminPanel';
import ForgotPassword from './pages/ForgotPassword';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import HelpCenter from './pages/HelpCenter';
import ContactUs from './pages/ContactUs';
import AIResumeInfo from './pages/AIResumeInfo';
import AICoverLetterInfo from './pages/AICoverLetterInfo';
import { StorageService } from './services/storageService';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    StorageService.seed();
  }, []);

  const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';

  if (isAdmin) {
    return (
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="*" element={<AdminPanel />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<LandingLayout><Home /></LandingLayout>} />
        <Route path="/login" element={<LandingLayout><Login /></LandingLayout>} />
        <Route path="/signup" element={<LandingLayout><Signup /></LandingLayout>} />
        <Route path="/forgot-password" element={<LandingLayout><ForgotPassword /></LandingLayout>} />
        <Route path="/ai-resume-info" element={<LandingLayout><AIResumeInfo /></LandingLayout>} />
        <Route path="/ai-cover-letter-info" element={<LandingLayout><AICoverLetterInfo /></LandingLayout>} />
        <Route path="/pricing" element={<LandingLayout><Pricing /></LandingLayout>} />
        <Route path="/blog" element={<LandingLayout><Blog /></LandingLayout>} />
        <Route path="/blog/:id" element={<LandingLayout><BlogPost /></LandingLayout>} />
        <Route path="/about-us" element={<LandingLayout><AboutUs /></LandingLayout>} />
        <Route path="/privacy-policy" element={<LandingLayout><PrivacyPolicy /></LandingLayout>} />
        <Route path="/terms-of-service" element={<LandingLayout><TermsOfService /></LandingLayout>} />
        <Route path="/help-center" element={<LandingLayout><HelpCenter /></LandingLayout>} />
        <Route path="/contact-us" element={<LandingLayout><ContactUs /></LandingLayout>} />
        <Route path="/system-status" element={<LandingLayout><SystemStatus /></LandingLayout>} />

        {/* Dashboard Pages */}
        <Route path="/dashboard" element={<DashboardLayout><DashboardOverview /></DashboardLayout>} />
        <Route path="/dashboard/notifications" element={<DashboardLayout><NotificationsPage /></DashboardLayout>} />
        <Route path="/dashboard/helpdesk" element={<DashboardLayout><HelpdeskPage /></DashboardLayout>} />
        <Route path="/dashboard/jobs/:categoryId" element={<DashboardLayout><JobCategoryPage /></DashboardLayout>} />
        <Route path="/dashboard/ai/:toolId" element={<DashboardLayout><AIToolsPage /></DashboardLayout>} />
        <Route path="/dashboard/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
