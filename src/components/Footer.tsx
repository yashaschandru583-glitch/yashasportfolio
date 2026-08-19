import React from 'react';
import {
  Code2,
  Github,
  Linkedin,
  Instagram,
  Mail,
  ArrowUp,
  Heart,
  Sparkles
} from 'lucide-react';
import { IProfileConfig } from '../types';

interface FooterProps {
  profile: IProfileConfig | null;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
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

  return (
    <footer
      id="main-footer"
      className="bg-[#030712] text-slate-400 dark:text-slate-400 light:text-slate-700 border-t border-white/10 pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                {profile?.name || 'Yashas C.'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Full-stack software developer focused on architecting resilient, production-ready web applications, microservices, and embedded systems.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={profile?.socialLinks.github || 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-indigo-500/40 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile?.socialLinks.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-indigo-500/40 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profile?.socialLinks.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-indigo-500/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile?.socialLinks.email || 'developer@example.com'}`}
                aria-label="Send Email"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-indigo-500/40 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-left text-slate-400 hover:text-white py-1 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Architecture info & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono md:text-right">
                Tech Stack
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed md:text-right">
                Built with React 19, TypeScript, Tailwind CSS, Express.js, and MongoDB.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold hover:border-indigo-500/40 hover:text-white transition-all cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {profile?.name || 'Yashas C.'}. All rights reserved.</p>
          <p className="flex items-center gap-1 font-mono text-[11px]">
            Engineered for performance &amp; high availability
          </p>
        </div>
      </div>
    </footer>
  );
};
