import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Lock,
  LayoutDashboard,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { IProfileConfig } from '../types';

interface NavbarProps {
  profile?: IProfileConfig | null;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isAdminView?: boolean;
  setIsAdminView?: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeSection,
  onNavigate,
  isAdminView = false,
  setIsAdminView = (_val: boolean) => {}
}) => {
  const { theme, toggleTheme } = useTheme();
  const { isAdmin, setShowLoginModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    if (isAdminView && setIsAdminView) {
      setIsAdminView(false);
    }
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-2"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[#030712]/80 dark:bg-[#030712]/80 light:bg-white/90 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-slate-200/80 px-4 sm:px-6 py-3 rounded-2xl shadow-2xl shadow-black/20">
        {/* Brand Logo Bento Monogram & Photo */}
        <button
          id="nav-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-indigo-500/40 shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform bg-indigo-600 flex items-center justify-center font-bold text-white">
            {profile?.avatarUrl || '/profile.jpg' ? (
              <img
                src={profile?.avatarUrl || '/profile.jpg'}
                alt={profile?.name || 'Yashas C.'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              (profile?.name || 'Y').charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base sm:text-lg tracking-tight text-white dark:text-white light:text-slate-900 group-hover:text-indigo-400 transition-colors">
              {profile?.name || 'Yashas C.'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-400">
          {navItems.map(item => {
            const isActive = !isAdminView && activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'hover:text-white text-slate-400'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right side controls (Available Pill, Theme, Hire Me / Admin) */}
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              Available for Work
            </span>
          </div>

          {/* Admin Dashboard Switcher Button */}
          {isAdmin ? (
            <button
              id="admin-view-toggle-btn"
              onClick={() => setIsAdminView(!isAdminView)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isAdminView
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
              title="Toggle Admin CMS"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isAdminView ? 'Live View' : 'CMS'}</span>
            </button>
          ) : (
            <button
              id="admin-login-launcher-btn"
              onClick={() => setShowLoginModal(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors cursor-pointer"
              title="Admin Portal Login"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Hire Me / Contact Button */}
          <button
            id="nav-hire-me-btn"
            onClick={() => handleNavClick('contact')}
            className="bg-white text-black px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-200 transition-colors shadow-lg cursor-pointer"
          >
            Hire Me
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden mt-2 bg-[#030712]/95 dark:bg-[#030712]/95 light:bg-white/95 backdrop-blur-2xl border border-white/10 dark:border-white/10 light:border-slate-200 p-5 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-left text-xs font-semibold transition-colors ${
                    activeSection === item.id && !isAdminView
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (isAdmin) setIsAdminView(!isAdminView);
                  else setShowLoginModal(true);
                }}
                className="text-xs text-slate-400 flex items-center gap-1.5 hover:text-white"
              >
                <Lock className="w-3.5 h-3.5" />
                {isAdmin ? (isAdminView ? 'Live Portfolio' : 'Admin CMS') : 'Admin Login'}
              </button>
              <button
                onClick={() => handleNavClick('resume')}
                className="px-3.5 py-1.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-slate-200"
              >
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
