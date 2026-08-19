import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { api } from './services/api';
import {
  IProject,
  ISkill,
  IExperience,
  IEducation,
  IAchievement,
  IProfileConfig
} from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Achievements } from './components/Achievements';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { AdminLoginModal } from './components/Admin/AdminLoginModal';
import { Sparkles, Shield, ArrowUp } from 'lucide-react';

const PortfolioContent: React.FC = () => {
  const { isAdmin, setShowLoginModal } = useAuth();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showAdminView, setShowAdminView] = useState<boolean>(false);

  // Entities state
  const [projects, setProjects] = useState<IProject[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [experience, setExperience] = useState<IExperience[]>([]);
  const [education, setEducation] = useState<IEducation[]>([]);
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [profile, setProfile] = useState<IProfileConfig | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      const [projData, skillData, expData, eduData, achData, profData] = await Promise.all([
        api.getProjects(),
        api.getSkills(),
        api.getExperience(),
        api.getEducation(),
        api.getAchievements(),
        api.getProfile()
      ]);

      setProjects(projData);
      setSkills(skillData);
      setExperience(expData);
      setEducation(eduData);
      setAchievements(achData);
      setProfile(profData);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to load portfolio data', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'admin') {
      if (isAdmin) {
        setShowAdminView(true);
      } else {
        setShowLoginModal(true);
      }
      return;
    }

    setShowAdminView(false);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] dark:bg-[#030712] light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] opacity-70" />
        <div className="absolute top-[40%] right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] opacity-60" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] opacity-50" />
      </div>

      {/* Main Top Navigation Header */}
      <Navbar
        activeSection={showAdminView ? 'admin' : activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main App Content */}
      <main className="relative z-10 pt-20">
        {showAdminView && isAdmin ? (
          <div className="pt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <button
                onClick={() => setShowAdminView(false)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-indigo-400 text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer"
              >
                ← Back to Live Portfolio View
              </button>
            </div>
            <AdminDashboard onDataChanged={loadData} />
          </div>
        ) : (
          <>
            <Hero profile={profile} onNavigate={handleNavigate} />
            <About profile={profile} onProfileUpdate={loadData} />
            <Skills skills={skills} />
            <Projects projects={projects} isLoading={isLoading} />
            <Experience experience={experience} />
            <Education education={education} />
            <Achievements achievements={achievements} />
            <ResumeSection
              profile={profile}
              experience={experience}
              education={education}
              skills={skills}
              achievements={achievements}
            />
            <Contact profile={profile} />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer profile={profile} onNavigate={handleNavigate} />

      {/* Admin Login Modal */}
      <AdminLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
