import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  FileText,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Terminal,
  Sparkles,
  CheckCircle2,
  Code,
  Layers,
  Cpu,
  Database,
  ExternalLink
} from 'lucide-react';
import { IProfileConfig } from '../types';
import { ProfileImage } from './ProfileImage';

interface HeroProps {
  profile: IProfileConfig | null;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onNavigate }) => {
  const roles = profile?.roles || [
    'Full-Stack Engineer & Architect',
    'Software Systems Developer',
    'Cloud & Embedded Systems Engineer',
    'Open Source Contributor'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex(prev => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const terminalCode = `// ${profile?.name?.replace(/\s+/g, '') || 'YashasC'}.config.ts
const engineer = {
  name: "${profile?.name || 'Yashas C.'}",
  role: "${profile?.title || 'Full-Stack Software Developer'}",
  stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "C++"],
  status: "Available for Hire",
  build: () => "Scale high-performance digital products"
};`;

  const copyTerminalSnippet = () => {
    navigator.clipboard.writeText(terminalCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative min-h-[85vh] pt-12 pb-16 flex items-center justify-center overflow-hidden bg-[#030712] dark:bg-[#030712] light:bg-slate-50 transition-colors duration-300"
    >
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-indigo-600/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Large Hero Bento Card (col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-gradient-to-br from-indigo-600/20 via-white/5 to-transparent border border-white/10 dark:border-white/10 light:border-slate-300/80 rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div>
              {/* Eyebrow, Profile Avatar with subtle glowing border & Status */}
              <div className="flex items-center gap-4 mb-6">
                <ProfileImage
                  src={profile?.avatarUrl}
                  alt={profile?.name || 'Yashas C.'}
                  size="md"
                  showStatusIndicator={true}
                  isAvailable={true}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                        {profile?.statusBadgeText || 'Available for Opportunities'}
                      </span>
                    </div>
                    <span className="text-slate-300 text-xs font-mono font-semibold">
                      {profile?.name || 'Yashas C.'}
                    </span>
                  </div>
                  <span className="text-slate-400 text-xs font-mono block mt-0.5">
                    {profile?.title || 'Full-Stack Software Developer'}
                  </span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white dark:text-white light:text-slate-900 mb-5 leading-[0.95]">
                Building digital products that scale.
              </h1>

              {/* Dynamic role switch */}
              <div className="h-8 flex items-center mb-5 overflow-hidden">
                <motion.span
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-base sm:text-lg font-mono font-medium text-indigo-400"
                >
                  &gt; {roles[currentRoleIndex]}
                </motion.span>
              </div>

              {/* Bio description */}
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
                {profile?.tagline ||
                  'I craft high-performance web applications, scalable architectures, and modern cloud systems. Specialized in full-stack engineering and fluid user experiences.'}
              </p>
            </div>

            {/* Bento Metrics / Stats Bar */}
            <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6 sm:gap-8">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-slate-900">
                    {profile?.stats?.yearsExperience || '4+'}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-slate-500 font-bold">
                    Years Exp.
                  </span>
                </div>

                <div className="w-px h-10 bg-white/10 self-center"></div>

                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-slate-900">
                    {profile?.stats?.projectsCompleted || 15}+
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-slate-500 font-bold">
                    Projects
                  </span>
                </div>

                <div className="w-px h-10 bg-white/10 self-center"></div>

                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-slate-900">
                    {profile?.stats?.certificationsCount || 6}+
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-slate-500 font-bold">
                    Certs
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3">
                <button
                  id="hero-view-work-btn"
                  onClick={() => onNavigate('projects')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs sm:text-sm hover:bg-slate-200 transition-colors shadow-lg cursor-pointer"
                >
                  <span>Explore Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-download-resume-btn"
                  onClick={() => onNavigate('resume')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-xs sm:text-sm hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Resume</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Bento Card: Interactive Terminal (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 bg-[#0a0a0c] dark:bg-[#0a0a0c] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl"
          >
            {/* Header */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs uppercase tracking-widest font-bold text-slate-500">
                    Terminal Config
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-lg border border-indigo-500/30 font-mono">
                    v2.4.0
                  </span>
                  <button
                    onClick={copyTerminalSnippet}
                    className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedCode ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Terminal code preview */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto my-3">
                <p className="text-slate-500 mb-1">// System Profile Manifest</p>
                <div className="text-indigo-400 font-bold">const engineer = &#123;</div>
                <div className="pl-3 space-y-1 my-1">
                  <div>
                    <span className="text-slate-400">name:</span>{' '}
                    <span className="text-emerald-300">"{profile?.name || 'Yashas C.'}"</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">role:</span>{' '}
                    <span className="text-amber-300">"{profile?.title || 'Full-Stack Developer'}"</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">stack:</span>{' '}
                    <span className="text-indigo-300">["React", "TypeScript", "Node.js", "MongoDB", "C++"]</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">status:</span>{' '}
                    <span className="text-emerald-400">"Available for Hire"</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">mission:</span>{' '}
                    <span className="text-cyan-300">() =&gt; "Building scalable systems"</span>
                  </div>
                </div>
                <div className="text-indigo-400 font-bold">&#125;;</div>

                {/* Prompt command line */}
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-2 text-indigo-400 text-[11px]">
                  <span>$</span>
                  <span className="text-slate-300">npm run deploy --production</span>
                  <span className="w-1.5 h-3.5 bg-indigo-400 animate-pulse ml-0.5" />
                </div>
              </div>
            </div>

            {/* Social Connect Bento Bar */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={profile?.socialLinks?.github || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile?.socialLinks?.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile?.socialLinks?.email || 'alex@example.com'}`}
                  aria-label="Send Email"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-indigo-600/20 blur-3xl pointer-events-none rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
