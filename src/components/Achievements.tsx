import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  Award,
  ExternalLink,
  Sparkles,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { IAchievement, AchievementCategory } from '../types';

interface AchievementsProps {
  achievements: IAchievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Certification', 'Hackathon', 'Technical', 'Workshop', 'Academic'];

  const filteredAchievements = activeCategory === 'All'
    ? achievements
    : achievements.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section
      id="achievements"
      className="py-20 relative bg-[#030712] dark:bg-[#030712] light:bg-slate-50 border-t border-white/10 dark:border-white/10 light:border-slate-200 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors &amp; Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 mb-4">
            Certifications &amp; Achievements
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base sm:text-lg">
            Industry-recognized developer credentials, competitive hackathon awards, algorithmic achievements, and technical workshops.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredAchievements.map((ach, idx) => (
            <motion.div
              key={ach.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="group rounded-[2rem] bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-indigo-500/40 hover:bg-white/[0.07] transition-all"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/5 text-indigo-400 border border-white/10">
                        {ach.category}
                      </span>
                      <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mt-1 group-hover:text-indigo-400 transition-colors">
                        {ach.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400">
                        {ach.issuer}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-mono text-slate-400 shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{ach.date}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-4">
                  {ach.description}
                </p>

                {/* Skills Gained Tags */}
                {ach.skillsGained && ach.skillsGained.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {ach.skillsGained.map((sk, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 text-[11px] font-mono border border-white/10"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action footer */}
              {ach.credentialUrl && (
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Credential</span>
                  </span>
                  <a
                    href={ach.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
