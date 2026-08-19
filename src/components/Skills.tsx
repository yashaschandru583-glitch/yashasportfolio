import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Server,
  Database,
  Terminal,
  Wrench,
  Sparkles,
  Layers,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { ISkill, SkillCategory } from '../types';

interface SkillsProps {
  skills: ISkill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories: Array<{ id: string; label: string; icon: any }> = [
    { id: 'All', label: 'All Tech', icon: Sparkles },
    { id: 'Frontend', label: 'Frontend', icon: Code2 },
    { id: 'Backend', label: 'Backend', icon: Server },
    { id: 'Database', label: 'Database', icon: Database },
    { id: 'Programming', label: 'Programming', icon: Terminal },
    { id: 'Tools', label: 'Tools & DevOps', icon: Wrench }
  ];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  const getCategoryColor = (cat: SkillCategory) => {
    switch (cat) {
      case 'Frontend':
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
      case 'Backend':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Database':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'Programming':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'Tools':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      default:
        return 'text-slate-300 bg-white/5 border-white/10';
    }
  };

  const getProgressGradient = (cat: SkillCategory) => {
    switch (cat) {
      case 'Frontend':
        return 'from-indigo-500 to-blue-500';
      case 'Backend':
        return 'from-emerald-500 to-teal-500';
      case 'Database':
        return 'from-blue-500 to-indigo-500';
      case 'Programming':
        return 'from-purple-500 to-pink-500';
      case 'Tools':
        return 'from-amber-500 to-orange-500';
      default:
        return 'from-indigo-500 to-blue-500';
    }
  };

  return (
    <section
      id="skills"
      className="py-20 relative bg-[#030712] dark:bg-[#030712] light:bg-slate-50 border-t border-white/10 dark:border-white/10 light:border-slate-200 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Technical Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 mb-4">
            Skills &amp; Technologies
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base sm:text-lg">
            A comprehensive matrix of programming languages, modern frameworks, database management systems, and engineering tools.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:border-white/20 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              className="group rounded-2xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 p-5 hover:border-indigo-500/40 hover:bg-white/[0.07] transition-all"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white dark:text-white light:text-slate-900">
                      {skill.name}
                    </h3>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getCategoryColor(
                        skill.category
                      )}`}
                    >
                      {skill.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-white dark:text-white light:text-slate-700">
                    {skill.proficiency}%
                  </span>
                  <div className="text-[10px] text-slate-500">
                    {skill.experienceLevel || 'Proficient'}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${getProgressGradient(skill.category)} rounded-full`}
                />
              </div>

              {/* Tags */}
              {skill.tags && skill.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {skill.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-white/5 text-slate-400 text-[10px] font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
