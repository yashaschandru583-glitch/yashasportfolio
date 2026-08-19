import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { IEducation } from '../types';

interface EducationProps {
  education: IEducation[];
}

export const Education: React.FC<EducationProps> = ({ education }) => {
  return (
    <section
      id="education"
      className="py-20 relative bg-[#030712] dark:bg-[#030712] light:bg-slate-50 border-t border-white/10 dark:border-white/10 light:border-slate-200 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 mb-4">
            Education &amp; Credentials
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base sm:text-lg">
            Rigorous undergraduate studies in Computer Science &amp; Engineering, core computing fundamentals, and scholastic distinctions.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-[2rem] bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 p-6 sm:p-8 shadow-xl hover:border-indigo-500/30 hover:bg-white/[0.07] transition-all"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {edu.startYear} – {edu.endYear}
                    </span>
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {edu.cgpaOrPercentage}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-indigo-400 font-mono">
                    Affiliated to {edu.university}
                  </p>
                </div>

                {edu.location && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{edu.location}</span>
                  </div>
                )}
              </div>

              {/* Honors Badge if any */}
              {edu.honors && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-xs font-semibold text-amber-300 mb-6">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{edu.honors}</span>
                </div>
              )}

              {/* Relevant Coursework */}
              {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Relevant Coursework &amp; Academic Modules</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {edu.relevantCoursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-3 py-1 rounded-lg bg-white/5 text-slate-300 text-xs font-medium border border-white/10"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
