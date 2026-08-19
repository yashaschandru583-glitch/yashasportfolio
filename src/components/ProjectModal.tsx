import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Layers,
  Sparkles,
  Calendar
} from 'lucide-react';
import { IProject } from '../types';

interface ProjectModalProps {
  project: IProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Modal Header Bar with Close */}
          <div className="px-6 py-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-between bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  ★ Featured
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Scroll Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            {/* Project Hero Header */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 mb-3">
                {project.title}
              </h2>
              <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Media Image Banner */}
            {project.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950 aspect-video relative group">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-rose-500/5 dark:bg-rose-500/5 light:bg-rose-50 border border-rose-500/20">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <AlertCircle className="w-4 h-4" />
                  Problem Statement
                </div>
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                  {project.problemStatement || 'Identified inefficiencies and architectural bottlenecks in standard implementations.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/5 light:bg-emerald-50 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  Engineered Solution
                </div>
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                  {project.solution || 'Implemented a modular, scalable architecture addressing core performance and usability metrics.'}
                </p>
              </div>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  Key Features &amp; Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies Used */}
            <div>
              <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Technologies &amp; Architecture Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-lg bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 text-xs font-mono font-medium border border-slate-700 dark:border-slate-700 light:border-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges & Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.challenges && (
                <div className="p-5 rounded-2xl bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    Key Technical Challenges
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}

              {project.results && (
                <div className="p-5 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/5 light:bg-cyan-50 border border-cyan-500/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4" />
                    Measured Impact &amp; Results
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    {project.results}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer with Actions */}
          <div className="px-6 py-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>Project ID: {project.id}</span>
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 text-xs font-semibold hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repo</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo / Release</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
