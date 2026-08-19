import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Code,
  Sparkles,
  Target,
  Compass,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  FolderGit2,
  Award,
  Layers,
  Clock,
  Camera,
  Upload,
  Check,
  Loader2
} from 'lucide-react';
import { IProfileConfig } from '../types';
import { api } from '../services/api';

interface AboutProps {
  profile: IProfileConfig | null;
  onProfileUpdate?: () => void;
}

export const About: React.FC<AboutProps> = ({ profile, onProfileUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        setLocalAvatar(base64);
        try {
          await api.uploadPhoto(base64);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
          if (onProfileUpdate) {
            onProfileUpdate();
          }
        } catch (err) {
          console.error('Failed to upload photo:', err);
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };
  const stats = [
    {
      label: 'Projects Completed',
      value: `${profile?.stats?.projectsCompleted || 15}+`,
      description: 'Production full-stack web apps & cloud utilities',
      icon: FolderGit2,
      color: 'bg-indigo-600'
    },
    {
      label: 'Technologies Mastered',
      value: `${profile?.stats?.technologiesCount || 22}+`,
      description: 'Languages, modern frameworks & DB systems',
      icon: Layers,
      color: 'bg-emerald-600'
    },
    {
      label: 'Certifications',
      value: `${profile?.stats?.certificationsCount || 6}+`,
      description: 'Industry-verified technical competencies',
      icon: Award,
      color: 'bg-amber-600'
    },
    {
      label: 'Years Experience',
      value: `${profile?.stats?.yearsExperience || '4+'}`,
      description: 'Hands-on software architecture & engineering',
      icon: Clock,
      color: 'bg-purple-600'
    }
  ];

  const pillars = [
    {
      title: 'Full-Stack Architecture',
      description: 'Designing end-to-end applications from MongoDB/PostgreSQL schemas to animated, accessible React and Tailwind UIs.'
    },
    {
      title: 'Systems & Algorithmic Design',
      description: 'Solid foundation in data structures, time/space complexity optimization, concurrency, and OOP in TypeScript, Java & C++.'
    },
    {
      title: 'Cloud & Embedded Solutions',
      description: 'Bridging distributed microservices, RESTful APIs, IoT microcontrollers, and cloud deployments.'
    }
  ];

  return (
    <section
      id="about"
      className="py-20 relative bg-[#030712] dark:bg-[#030712] light:bg-slate-50 border-t border-white/10 dark:border-white/10 light:border-slate-200 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile &amp; Biography</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 mb-4">
            About Me
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base sm:text-lg">
            Engineering robust software solutions with curiosity, clean architecture, and modern best practices.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
          {/* Profile Bento Card (col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 rounded-[2rem] p-6 sm:p-7 flex flex-col items-center text-center shadow-xl justify-between"
          >
            {/* Visual Avatar Container with Upload Support */}
            <div className="relative w-40 h-40 my-3 group">
              <div className="absolute inset-0 rounded-2xl bg-indigo-600/30 blur-lg group-hover:bg-indigo-600/50 transition-all" />
              <img
                src={localAvatar || profile?.avatarUrl || "/profile.jpg"}
                alt={profile?.name || "Yashas C."}
                referrerPolicy="no-referrer"
                className="relative w-full h-full object-cover rounded-2xl border-2 border-indigo-500/40 shadow-xl group-hover:scale-[1.01] transition-transform duration-300 bg-slate-900"
              />
              
              {/* Click to change photo overlay button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                title="Upload / Change exact photo"
                className="absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1.5 cursor-pointer z-10 backdrop-blur-xs"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                    <span className="text-[11px] font-bold">Uploading...</span>
                  </>
                ) : uploadSuccess ? (
                  <>
                    <Check className="w-6 h-6 text-emerald-400" />
                    <span className="text-[11px] font-bold text-emerald-400">Photo Set!</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-6 h-6 text-indigo-400" />
                    <span className="text-[11px] font-bold">Change Photo</span>
                    <span className="text-[9px] text-slate-300">Click to upload exact file</span>
                  </>
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="absolute -bottom-2.5 -right-2.5 px-3 py-1 rounded-full bg-[#030712] border border-indigo-500/30 text-[10px] font-mono text-indigo-400 font-bold shadow-lg flex items-center gap-1.5 z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Dev</span>
              </div>
            </div>

            <div className="mt-1">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[11px] font-mono font-medium transition-colors mb-2 cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>{isUploading ? 'Uploading...' : 'Upload Exact Photo'}</span>
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-1">
                {profile?.name || 'Yashas C.'}
              </h3>
              <p className="text-xs font-mono text-indigo-400 mb-4">
                {profile?.title || 'Full-Stack Software Developer'}
              </p>
            </div>

            <div className="w-full pt-4 border-t border-white/10 text-left space-y-2.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Education:</span>
                <span className="font-semibold text-white dark:text-white light:text-slate-800">B.E. Computer Science</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="font-semibold text-white dark:text-white light:text-slate-800">Karnataka, India</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Primary Stack:</span>
                <span className="font-mono text-indigo-400">React, Node, Mongo, C++</span>
              </div>
            </div>
          </motion.div>

          {/* Narrative & Philosophy Bento Card (col-span-8) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 bg-[#0a0a0c] dark:bg-[#0a0a0c] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white dark:text-white light:text-slate-900">
                  Career Mission &amp; Approach
                </h3>
              </div>
              <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                {profile?.bio ||
                  'Passionate full-stack developer and software engineer with a strong foundation in data structures, distributed architectures, modern front-end frameworks, and reliable cloud deployments.'}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-6">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Engineering Philosophy</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 italic leading-relaxed">
                  "{profile?.philosophy || 'Code is read far more often than it is written. I prioritize maintainability, performance, security, and human-centered design in every system I architect.'}"
                </p>
              </div>

              {/* Interests Tags */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 block">
                  Core Engineering Interests:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(profile?.interests || [
                    'Distributed Systems',
                    'Full-Stack Web',
                    'Cloud Architecture',
                    'Algorithms & Data Structures',
                    'API Design & Security',
                    'Open Source'
                  ]).map((interest, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl text-xs font-medium bg-white/5 text-slate-200 border border-white/10"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bento Stats Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center shadow-lg hover:border-indigo-500/30 transition-colors"
              >
                <div
                  className={`w-9 h-9 mx-auto mb-3 rounded-xl ${stat.color} flex items-center justify-center text-white shadow-md`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-indigo-400 mb-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Three Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">
                  {p.title}
                </h4>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
