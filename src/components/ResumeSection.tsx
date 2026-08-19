import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Phone,
  Mail,
  MapPin,
  Globe
} from 'lucide-react';
import { IProfileConfig, IExperience, IEducation, ISkill, IAchievement } from '../types';

interface ResumeSectionProps {
  profile: IProfileConfig | null;
  experience: IExperience[];
  education: IEducation[];
  skills: ISkill[];
  achievements: IAchievement[];
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  profile,
  experience,
  education,
  skills,
  achievements
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'skills_breakdown'>('preview');

  const handlePrintResume = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Generates print dialog or downloads
    window.print();
  };

  return (
    <section
      id="resume"
      className="py-20 relative bg-[#030712] dark:bg-[#030712] light:bg-slate-50 border-t border-white/10 dark:border-white/10 light:border-slate-200 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 mb-4">
            Download My Resume
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base sm:text-lg">
            Review my ATS-optimized professional resume or download a printer-ready copy for hiring consideration.
          </p>
        </div>

        {/* Action Header Banner */}
        <div className="p-6 rounded-[2rem] bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900">
              {profile?.name || 'Yashas C.'} — Software Engineering Resume
            </h3>
            <p className="text-xs text-slate-400">
              Updated for 2025/2026 Developer Placements &amp; Full-Time Roles
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrintResume}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-bold hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Resume</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* ATS-Optimized Clean Resume Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 p-8 sm:p-12 shadow-2xl space-y-8 print:p-0 print:border-none print:shadow-none print:bg-white print:text-black"
        >
          {/* Header */}
          <div className="border-b border-white/10 pb-6 print:border-black">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-md shrink-0 print:hidden">
                  <img
                    src={profile?.avatarUrl || "/profile.jpg"}
                    alt={profile?.name || "Yashas C."}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 print:text-black">
                    {profile?.name || 'Yashas C.'}
                  </h1>
                  <p className="text-sm font-semibold text-indigo-400 font-mono mt-1 print:text-blue-800">
                    {profile?.title || 'Full-Stack Software Developer'}
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 space-y-1 font-mono print:text-black">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{profile?.socialLinks?.email || 'yashaschandru583@gmail.com'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{profile?.socialLinks?.phone || '+91 8147837927'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{profile?.socialLinks?.github?.replace('https://', '') || 'github.com/yashaschandru'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 font-mono print:text-blue-800">
              Professional Summary
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed print:text-black">
              {profile?.bio}
            </p>
          </div>

          {/* Technical Skills Categorized */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 font-mono print:text-blue-800">
              Technical Skill Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 print:text-black">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-white print:text-black">Languages: </span>
                <span>Java, C++, C, Python, JavaScript (ES6+), TypeScript, SQL</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-white print:text-black">Frameworks &amp; Web: </span>
                <span>React.js, Node.js, Express.js, Tailwind CSS, REST APIs, WebSockets</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-white print:text-black">Databases &amp; Systems: </span>
                <span>MongoDB, Mongoose, MySQL, PostgreSQL, Embedded IoT, Arduino</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-white print:text-black">Tools &amp; DevOps: </span>
                <span>Git, GitHub, Docker, Postman, VS Code, Linux, Vercel, Render</span>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-4 font-mono print:text-blue-800">
              Work &amp; Technical Experience
            </h4>
            <div className="space-y-4">
              {experience.map((exp, eIdx) => (
                <div key={eIdx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-white print:text-black font-bold">
                      {exp.role} — <span className="text-indigo-400">{exp.organization}</span>
                    </span>
                    <span className="text-slate-400 font-mono text-xs">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 space-y-1 print:text-black">
                    {exp.description.map((desc, dIdx) => (
                      <li key={dIdx}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-4 font-mono print:text-blue-800">
              Education
            </h4>
            <div className="space-y-3">
              {education.map((edu, edIdx) => (
                <div key={edIdx} className="text-xs sm:text-sm space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold">
                    <span className="text-white print:text-black font-bold">
                      {edu.degree} in {edu.field}
                    </span>
                    <span className="text-slate-400 font-mono text-xs">{edu.startYear} – {edu.endYear} | {edu.cgpaOrPercentage}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {edu.institution}, {edu.university}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
