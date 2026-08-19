import React from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Calendar,
  MapPin,
  Sparkles,
  CheckCircle2,
  Layers,
  Code2
} from 'lucide-react';
import { IExperience } from '../types';

interface ExperienceProps {
  experience: IExperience[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section
      id="experience"
      className="py-20 relative bg-[#030712] dark:bg-[#030712] light:bg-slate-50 border-t border-white/10 dark:border-white/10 light:border-slate-200 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Path</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 mb-4">
            Experience Timeline
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base sm:text-lg">
            Internships, freelance engineering contracts, technical community leadership, and open-source contributions.
          </p>
        </div>

        {/* Timeline Container */}
        {experience.length === 0 ? (
          <div className="p-12 text-center rounded-[2rem] bg-white/5 border border-white/10">
            <p className="text-base font-semibold text-slate-300">
              "Currently building experience through academic and personal projects."
            </p>
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 border-l-2 border-white/10 space-y-10 ml-2 sm:ml-6">
            {experience.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-xl bg-indigo-600 border border-indigo-400/40 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>

                {/* Experience Card */}
                <div className="rounded-[2rem] bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 p-6 sm:p-8 shadow-xl hover:border-indigo-500/30 hover:bg-white/[0.07] transition-all">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {item.type}
                        </span>
                        {item.current && (
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Present
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">
                        {item.role}
                      </h3>
                      <div className="text-sm font-semibold text-indigo-400">
                        {item.organization}
                      </div>
                    </div>

                    <div className="text-xs font-mono text-slate-400 flex flex-col sm:items-end gap-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{item.startDate} – {item.endDate || (item.current ? 'Present' : '')}</span>
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-2.5 mb-6">
                    {item.description.map((desc, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{desc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {item.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 text-xs font-mono border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
