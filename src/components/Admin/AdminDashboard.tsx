import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderGit2,
  Code2,
  Briefcase,
  GraduationCap,
  Trophy,
  Mail,
  User,
  Plus,
  Trash2,
  Edit2,
  Star,
  CheckCircle2,
  Database,
  RefreshCw,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Loader2,
  AlertCircle,
  Camera,
  Upload
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  IProject,
  ISkill,
  IExperience,
  IEducation,
  IAchievement,
  IMessage,
  IProfileConfig
} from '../../types';
import { ProjectEditorModal } from './ProjectEditorModal';
import { SkillEditorModal } from './SkillEditorModal';
import { ExperienceEditorModal } from './ExperienceEditorModal';
import { EducationEditorModal } from './EducationEditorModal';
import { AchievementEditorModal } from './AchievementEditorModal';

interface AdminDashboardProps {
  onDataChanged: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onDataChanged }) => {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'projects' | 'skills' | 'experience' | 'education' | 'achievements' | 'messages' | 'profile'
  >('projects');

  // Entities state
  const [projects, setProjects] = useState<IProject[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [experience, setExperience] = useState<IExperience[]>([]);
  const [education, setEducation] = useState<IEducation[]>([]);
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [profile, setProfile] = useState<IProfileConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modal states
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  const [selectedExp, setSelectedExp] = useState<IExperience | null>(null);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);

  const [selectedEdu, setSelectedEdu] = useState<IEducation | null>(null);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);

  const [selectedAch, setSelectedAch] = useState<IAchievement | null>(null);
  const [isAchModalOpen, setIsAchModalOpen] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [projData, skillData, expData, eduData, achData, msgData, profData] =
        await Promise.all([
          api.getProjects(),
          api.getSkills(),
          api.getExperience(),
          api.getEducation(),
          api.getAchievements(),
          api.getMessages().catch(() => []),
          api.getProfile()
        ]);

      setProjects(projData);
      setSkills(skillData);
      setExperience(expData);
      setEducation(eduData);
      setAchievements(achData);
      setMessages(msgData);
      setProfile(profData);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      showToast(err.message || 'Failed to fetch admin data', 'error');
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // --- Handlers for Projects ---
  const handleSaveProject = async (data: Partial<IProject>) => {
    if (selectedProject?.id) {
      await api.updateProject(selectedProject.id, data);
      showToast('Project updated successfully!');
    } else {
      await api.createProject(data);
      showToast('Project created successfully!');
    }
    await fetchAllData();
    onDataChanged();
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      showToast('Project deleted.');
      await fetchAllData();
      onDataChanged();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // --- Handlers for Skills ---
  const handleSaveSkill = async (data: Partial<ISkill>) => {
    if (selectedSkill?.id) {
      await api.updateSkill(selectedSkill.id, data);
      showToast('Skill updated!');
    } else {
      await api.createSkill(data);
      showToast('Skill created!');
    }
    await fetchAllData();
    onDataChanged();
  };

  const handleDeleteSkill = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await api.deleteSkill(id);
      showToast('Skill deleted.');
      await fetchAllData();
      onDataChanged();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // --- Handlers for Experience ---
  const handleSaveExperience = async (data: Partial<IExperience>) => {
    if (selectedExp?.id) {
      await api.updateExperience(selectedExp.id, data);
      showToast('Experience updated!');
    } else {
      await api.createExperience(data);
      showToast('Experience created!');
    }
    await fetchAllData();
    onDataChanged();
  };

  const handleDeleteExperience = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this experience record?')) return;
    try {
      await api.deleteExperience(id);
      showToast('Experience record deleted.');
      await fetchAllData();
      onDataChanged();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // --- Handlers for Education ---
  const handleSaveEducation = async (data: Partial<IEducation>) => {
    if (selectedEdu?.id) {
      await api.updateEducation(selectedEdu.id, data);
      showToast('Education updated!');
    } else {
      await api.createEducation(data);
      showToast('Education record created!');
    }
    await fetchAllData();
    onDataChanged();
  };

  const handleDeleteEducation = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this education record?')) return;
    try {
      await api.deleteEducation(id);
      showToast('Education record deleted.');
      await fetchAllData();
      onDataChanged();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // --- Handlers for Achievements ---
  const handleSaveAchievement = async (data: Partial<IAchievement>) => {
    if (selectedAch?.id) {
      await api.updateAchievement(selectedAch.id, data);
      showToast('Achievement updated!');
    } else {
      await api.createAchievement(data);
      showToast('Achievement record created!');
    }
    await fetchAllData();
    onDataChanged();
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) return;
    try {
      await api.deleteAchievement(id);
      showToast('Achievement record deleted.');
      await fetchAllData();
      onDataChanged();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // --- Handlers for Messages ---
  const handleMarkMessageRead = async (id: string) => {
    try {
      await api.markMessageRead(id);
      showToast('Message marked as read.');
      await fetchAllData();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.deleteMessage(id);
      showToast('Message deleted.');
      await fetchAllData();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // --- Handlers for Profile Configuration ---
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      await api.updateProfile(profile);
      showToast('Profile configuration saved!');
      onDataChanged();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const unreadMessagesCount = messages.filter(m => !m.read).length;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2.5 ${
              toast.type === 'success'
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-rose-500 text-white shadow-rose-500/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Top Dashboard Bar */}
      <div className="rounded-3xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">
                  Portfolio CMS Dashboard
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                Logged in as <span className="text-cyan-400 font-mono">{user?.email || 'admin@developer.com'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-cyan-400 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-8 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 mt-6 scrollbar-none">
          {[
            { id: 'projects', label: 'Projects', count: projects.length, icon: FolderGit2 },
            { id: 'skills', label: 'Skills', count: skills.length, icon: Code2 },
            { id: 'experience', label: 'Experience', count: experience.length, icon: Briefcase },
            { id: 'education', label: 'Education', count: education.length, icon: GraduationCap },
            { id: 'achievements', label: 'Achievements', count: achievements.length, icon: Trophy },
            { id: 'messages', label: 'Messages Inbox', count: unreadMessagesCount, icon: Mail, highlight: unreadMessagesCount > 0 },
            { id: 'profile', label: 'Profile Config', icon: User }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-cyan-400 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                      tab.highlight
                        ? 'bg-rose-500 text-white font-bold animate-pulse'
                        : isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area by Tab */}
      <div className="rounded-3xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 p-6 sm:p-8 shadow-xl">
        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                Projects Management ({projects.length})
              </h2>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setIsProjectModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map(proj => (
                <div
                  key={proj.id}
                  className="rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-300" />
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 line-clamp-2 mb-3">
                      {proj.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {proj.technologies.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedProject(proj);
                        setIsProjectModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                Skills Management ({skills.length})
              </h2>
              <button
                onClick={() => {
                  setSelectedSkill(null);
                  setIsSkillModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map(sk => (
                <div
                  key={sk.id}
                  className="rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
                        {sk.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        {sk.proficiency}%
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mb-2">{sk.category}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedSkill(sk);
                        setIsSkillModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(sk.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                Experience Timeline ({experience.length})
              </h2>
              <button
                onClick={() => {
                  setSelectedExp(null);
                  setIsExpModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            </div>

            <div className="space-y-4">
              {experience.map(exp => (
                <div
                  key={exp.id}
                  className="rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mr-2">
                      {exp.type}
                    </span>
                    <h3 className="font-bold text-base text-slate-100 dark:text-slate-100 light:text-slate-900 inline">
                      {exp.role} — <span className="text-cyan-400">{exp.organization}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {exp.startDate} – {exp.endDate || (exp.current ? 'Present' : '')} ({exp.location})
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setSelectedExp(exp);
                        setIsExpModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                Education Records ({education.length})
              </h2>
              <button
                onClick={() => {
                  setSelectedEdu(null);
                  setIsEduModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Education</span>
              </button>
            </div>

            <div className="space-y-4">
              {education.map(edu => (
                <div
                  key={edu.id}
                  className="rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-base text-slate-100 dark:text-slate-100 light:text-slate-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {edu.institution} ({edu.startYear} – {edu.endYear}) • {edu.cgpaOrPercentage}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setSelectedEdu(edu);
                        setIsEduModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                Certifications &amp; Milestones ({achievements.length})
              </h2>
              <button
                onClick={() => {
                  setSelectedAch(null);
                  setIsAchModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Achievement</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map(ach => (
                <div
                  key={ach.id}
                  className="rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {ach.category}
                    </span>
                    <h3 className="font-bold text-base text-slate-100 dark:text-slate-100 light:text-slate-900 mt-2">
                      {ach.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {ach.issuer} • {ach.date}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2 mt-3">
                    <button
                      onClick={() => {
                        setSelectedAch(ach);
                        setIsAchModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteAchievement(ach.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES INBOX TAB */}
        {activeTab === 'messages' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                Visitor Inquiries &amp; Messages ({messages.length})
              </h2>
            </div>

            {messages.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-slate-800">
                <Mail className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">No contact messages received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`rounded-2xl border p-5 transition-all ${
                      msg.read
                        ? 'bg-slate-950/40 border-slate-800'
                        : 'bg-cyan-500/5 border-cyan-500/30'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900">
                            {msg.name}
                          </h3>
                          <span className="text-xs text-cyan-400">&lt;{msg.email}&gt;</span>
                          {!msg.read && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-white">
                              New
                            </span>
                          )}
                        </div>
                        {msg.phone && (
                          <div className="text-xs text-slate-400">Phone: {msg.phone}</div>
                        )}
                      </div>

                      <div className="text-xs font-mono text-slate-500">
                        {new Date(msg.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="font-semibold text-xs text-slate-200 mb-1">
                      Subject: {msg.subject}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-3 whitespace-pre-wrap">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="text-xs font-semibold text-cyan-400 hover:underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Reply via Email</span>
                      </a>

                      <div className="flex items-center gap-2">
                        {!msg.read && (
                          <button
                            onClick={() => handleMarkMessageRead(msg.id)}
                            className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white cursor-pointer"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROFILE CONFIG TAB */}
        {activeTab === 'profile' && profile && (
          <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-3xl">
            <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mb-4">
              Profile Configuration
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={e => setProfile({ ...profile, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="relative group w-20 h-20 rounded-xl overflow-hidden border-2 border-indigo-500/40 shrink-0 bg-black/40">
                <img
                  src={profile.avatarUrl || '/profile.jpg'}
                  alt="Profile Avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer">
                  <Camera className="w-5 h-5 text-indigo-400" />
                  <span className="text-[9px] font-bold mt-1">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = async () => {
                        const base64 = reader.result as string;
                        try {
                          showToast('Uploading original image...');
                          const res = await api.uploadPhoto(base64);
                          setProfile({ ...profile, avatarUrl: res.avatarUrl });
                          showToast('Photo uploaded and set successfully!');
                          onDataChanged();
                        } catch (err: any) {
                          showToast(err.message || 'Upload failed', 'error');
                        }
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              </div>
              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Avatar Photo Source
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-400 text-xs font-medium cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = async () => {
                          const base64 = reader.result as string;
                          try {
                            showToast('Uploading original photo...');
                            const res = await api.uploadPhoto(base64);
                            setProfile({ ...profile, avatarUrl: res.avatarUrl });
                            showToast('Photo uploaded and updated everywhere!');
                            onDataChanged();
                          } catch (err: any) {
                            showToast(err.message || 'Upload failed', 'error');
                          }
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={profile.avatarUrl || ''}
                  placeholder="/profile.jpg"
                  onChange={e => setProfile({ ...profile, avatarUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Bio / Career Objective
              </label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={e => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Development Philosophy Quote
              </label>
              <input
                type="text"
                value={profile.philosophy}
                onChange={e => setProfile({ ...profile, philosophy: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={profile.socialLinks.email}
                  onChange={e =>
                    setProfile({
                      ...profile,
                      socialLinks: { ...profile.socialLinks, email: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={profile.socialLinks.phone}
                  onChange={e =>
                    setProfile({
                      ...profile,
                      socialLinks: { ...profile.socialLinks, phone: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 hover:opacity-95 transition-all cursor-pointer"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        )}
      </div>

      {/* MODALS */}
      <ProjectEditorModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
      />

      <SkillEditorModal
        skill={selectedSkill}
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        onSave={handleSaveSkill}
      />

      <ExperienceEditorModal
        experience={selectedExp}
        isOpen={isExpModalOpen}
        onClose={() => setIsExpModalOpen(false)}
        onSave={handleSaveExperience}
      />

      <EducationEditorModal
        education={selectedEdu}
        isOpen={isEduModalOpen}
        onClose={() => setIsEduModalOpen(false)}
        onSave={handleSaveEducation}
      />

      <AchievementEditorModal
        achievement={selectedAch}
        isOpen={isAchModalOpen}
        onClose={() => setIsAchModalOpen(false)}
        onSave={handleSaveAchievement}
      />
    </div>
  );
};
