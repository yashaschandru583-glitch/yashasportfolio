import {
  IProject,
  ISkill,
  IExperience,
  IEducation,
  IAchievement,
  IMessage,
  IProfileConfig,
  IDashboardStats,
  IAuthUser
} from '../types';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialExperience,
  initialEducation,
  initialAchievements,
  initialMessages
} from '../data/initialData';
import { safeStorage } from '../utils/storage';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = safeStorage.getItem('portfolio_admin_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// Local Storage helpers for static GitHub Pages fallback mode
function getLocalItem<T>(key: string, fallback: T): T {
  try {
    const raw = safeStorage.getItem(`portfolio_${key}`);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn(`Error reading ${key} from storage`, e);
  }
  return fallback;
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    safeStorage.setItem(`portfolio_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing ${key} to storage`, e);
  }
}

export const api = {
  // Health & Stats
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch {
      return { status: 'ok', mode: 'static_fallback' };
    }
  },

  async getDashboardStats(): Promise<IDashboardStats> {
    try {
      const res = await fetch(`${API_BASE}/stats/dashboard`);
      if (!res.ok) throw new Error('Stats fetch failed');
      const data = await res.json();
      return data.data;
    } catch {
      const projects = getLocalItem('projects', initialProjects);
      const skills = getLocalItem('skills', initialSkills);
      const messages = getLocalItem('messages', initialMessages);
      const achievements = getLocalItem('achievements', initialAchievements);
      const experience = getLocalItem('experience', initialExperience);
      return {
        totalProjects: projects.length,
        totalSkills: skills.length,
        totalMessages: messages.length,
        unreadMessages: messages.filter(m => !m.isRead).length,
        totalCertifications: achievements.length,
        totalExperiences: experience.length,
        databaseStatus: 'in_memory_active'
      };
    }
  },

  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: IAuthUser }> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }
      return { token: data.token, user: data.user };
    } catch (err: any) {
      // Static fallback login for testing in static mode
      if (email.toLowerCase() === 'admin@developer.com' && password === 'admin123password') {
        const dummyUser: IAuthUser = { id: 'admin-1', email: 'admin@developer.com', name: 'Admin', role: 'admin' };
        return { token: 'static_demo_token', user: dummyUser };
      }
      throw err;
    }
  },

  async checkAuth(): Promise<IAuthUser> {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error('Not authenticated');
      }
      return data.user;
    } catch (err) {
      const token = safeStorage.getItem('portfolio_admin_token');
      if (token === 'static_demo_token') {
        return { id: 'admin-1', email: 'admin@developer.com', name: 'Admin', role: 'admin' };
      }
      throw err;
    }
  },

  // Profile
  async getProfile(): Promise<IProfileConfig> {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      if (data && data.data) {
        setLocalItem('profile', data.data);
        return data.data;
      }
    } catch {
      // Fallback for static hosting (GitHub Pages)
    }
    return getLocalItem('profile', initialProfile);
  },

  async updateProfile(profile: Partial<IProfileConfig>): Promise<IProfileConfig> {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLocalItem('profile', data.data);
        return data.data;
      }
    } catch {
      // Fallback for static hosting
    }
    const current = getLocalItem('profile', initialProfile);
    const updated = { ...current, ...profile };
    setLocalItem('profile', updated);
    return updated;
  },

  async uploadPhoto(imageBase64: string): Promise<{ avatarUrl: string }> {
    try {
      const res = await fetch(`${API_BASE}/profile/upload-photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 })
      });
      const data = await res.json();
      if (res.ok && data.avatarUrl) {
        return data;
      }
    } catch {
      // Fallback for static hosting
    }
    const current = getLocalItem('profile', initialProfile);
    current.avatarUrl = imageBase64;
    setLocalItem('profile', current);
    return { avatarUrl: imageBase64 };
  },

  // Projects
  async getProjects(params?: { category?: string; featured?: boolean; search?: string }): Promise<IProject[]> {
    try {
      const query = new URLSearchParams();
      if (params?.category && params.category !== 'All') query.append('category', params.category);
      if (params?.featured !== undefined) query.append('featured', String(params.featured));
      if (params?.search) query.append('search', params.search);

      const res = await fetch(`${API_BASE}/projects?${query.toString()}`);
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setLocalItem('projects', data.data);
        return data.data;
      }
    } catch {
      // Fallback for static hosting
    }
    let list = getLocalItem('projects', initialProjects);
    if (params?.category && params.category !== 'All') {
      list = list.filter(p => p.category === params.category);
    }
    if (params?.featured !== undefined) {
      list = list.filter(p => p.featured === params.featured);
    }
    if (params?.search) {
      const s = params.search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(s) || p.shortDescription.toLowerCase().includes(s));
    }
    return list;
  },

  async getProjectById(id: string): Promise<IProject> {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.data) return data.data;
      }
    } catch {
      // Fallback
    }
    const list = getLocalItem('projects', initialProjects);
    const found = list.find(p => p.id === id || p.slug === id);
    if (!found) throw new Error('Project not found');
    return found;
  },

  async createProject(project: Partial<IProject>): Promise<IProject> {
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(project)
      });
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {
      // Fallback
    }
    const list = getLocalItem('projects', initialProjects);
    const newProj: IProject = {
      id: `proj-${Date.now()}`,
      title: project.title || 'Untitled Project',
      slug: (project.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: project.category || 'Web',
      shortDescription: project.shortDescription || '',
      problemStatement: project.problemStatement || '',
      solution: project.solution || '',
      features: project.features || [],
      technologies: project.technologies || [],
      challenges: project.challenges || '',
      results: project.results || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || '',
      featured: !!project.featured,
      sortOrder: list.length + 1,
      createdAt: new Date().toISOString()
    };
    list.push(newProj);
    setLocalItem('projects', list);
    return newProj;
  },

  async updateProject(id: string, project: Partial<IProject>): Promise<IProject> {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(project)
      });
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {
      // Fallback
    }
    const list = getLocalItem('projects', initialProjects);
    const idx = list.findIndex(p => p.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...project };
      setLocalItem('projects', list);
      return list[idx];
    }
    throw new Error('Project not found');
  },

  async deleteProject(id: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) return;
    } catch {
      // Fallback
    }
    const list = getLocalItem('projects', initialProjects);
    setLocalItem('projects', list.filter(p => p.id !== id));
  },

  // Skills
  async getSkills(): Promise<ISkill[]> {
    try {
      const res = await fetch(`${API_BASE}/skills`);
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setLocalItem('skills', data.data);
        return data.data;
      }
    } catch {
      // Fallback
    }
    return getLocalItem('skills', initialSkills);
  },

  async createSkill(skill: Partial<ISkill>): Promise<ISkill> {
    try {
      const res = await fetch(`${API_BASE}/skills`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(skill)
      });
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {
      // Fallback
    }
    const list = getLocalItem('skills', initialSkills);
    const newSkill: ISkill = {
      id: `skill-${Date.now()}`,
      name: skill.name || 'New Skill',
      category: skill.category || 'Frontend',
      proficiency: skill.proficiency || 80,
      iconName: skill.iconName || 'Code',
      experienceLevel: skill.experienceLevel || 'Intermediate',
      tags: skill.tags || []
    };
    list.push(newSkill);
    setLocalItem('skills', list);
    return newSkill;
  },

  async updateSkill(id: string, skill: Partial<ISkill>): Promise<ISkill> {
    try {
      const res = await fetch(`${API_BASE}/skills/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(skill)
      });
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {
      // Fallback
    }
    const list = getLocalItem('skills', initialSkills);
    const idx = list.findIndex(s => s.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...skill };
      setLocalItem('skills', list);
      return list[idx];
    }
    throw new Error('Skill not found');
  },

  async deleteSkill(id: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/skills/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) return;
    } catch {
      // Fallback
    }
    const list = getLocalItem('skills', initialSkills);
    setLocalItem('skills', list.filter(s => s.id !== id));
  },

  // Experience
  async getExperience(): Promise<IExperience[]> {
    try {
      const res = await fetch(`${API_BASE}/experience`);
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setLocalItem('experience', data.data);
        return data.data;
      }
    } catch {
      // Fallback
    }
    return getLocalItem('experience', initialExperience);
  },

  async createExperience(exp: Partial<IExperience>): Promise<IExperience> {
    try {
      const res = await fetch(`${API_BASE}/experience`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(exp)
      });
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {
      // Fallback
    }
    const list = getLocalItem('experience', initialExperience);
    const descriptionArr = Array.isArray(exp.description)
      ? exp.description
      : typeof exp.description === 'string'
      ? [exp.description]
      : [];

    const newExp: IExperience = {
      id: `exp-${Date.now()}`,
      organization: exp.organization || 'Organization',
      role: exp.role || 'Role',
      type: exp.type || 'Internship',
      startDate: exp.startDate || '2024',
      endDate: exp.endDate || 'Present',
      current: !!exp.current,
      location: exp.location || 'Remote',
      description: descriptionArr,
      technologies: exp.technologies || []
    };
    list.push(newExp);
    setLocalItem('experience', list);
    return newExp;
  },

  async updateExperience(id: string, exp: Partial<IExperience>): Promise<IExperience> {
    try {
      const res = await fetch(`${API_BASE}/experience/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(exp)
      });
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {
      // Fallback
    }
    const list = getLocalItem('experience', initialExperience);
    const idx = list.findIndex(e => e.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...exp };
      setLocalItem('experience', list);
      return list[idx];
    }
    throw new Error('Experience not found');
  },

  async deleteExperience(id: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/experience/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) return;
    } catch {
      // Fallback
    }
    const list = getLocalItem('experience', initialExperience);
    setLocalItem('experience', list.filter(e => e.id !== id));
  },

  // Education
  async getEducation(): Promise<IEducation[]> {
    try {
      const res = await fetch(`${API_BASE}/education`);
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setLocalItem('education', data.data);
        return data.data;
      }
    } catch {
      // Fallback
    }
    return getLocalItem('education', initialEducation);
  },

  async createEducation(edu: Partial<IEducation>): Promise<IEducation> {
    try {
      const res = await fetch(`${API_BASE}/education`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(edu)
      });
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {
      // Fallback
    }
    const list = getLocalItem('education', initialEducation);
    const newEdu: IEducation = {
      id: `edu-${Date.now()}`,
      institution: edu.institution || 'University',
      degree: edu.degree || 'Bachelor of Engineering',
      field: edu.field || 'Computer Science & Engineering',
      university: edu.university || 'Visvesvaraya Technological University',
      startYear: edu.startYear || '2022',
      endYear: edu.endYear || '2026',
      cgpaOrPercentage: edu.cgpaOrPercentage || '8.5 CGPA',
      location: edu.location || 'Bengaluru, India',
      relevantCoursework: edu.relevantCoursework || []
    };
    list.push(newEdu);
    setLocalItem('education', list);
    return newEdu;
  },

  async updateEducation(id: string, edu: Partial<IEducation>): Promise<IEducation> {
    try {
      const res = await fetch(`${API_BASE}/education/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(edu)
      });
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {
      // Fallback
    }
    const list = getLocalItem('education', initialEducation);
    const idx = list.findIndex(e => e.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...edu };
      setLocalItem('education', list);
      return list[idx];
    }
    throw new Error('Education record not found');
  },

  async deleteEducation(id: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/education/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) return;
    } catch {
      // Fallback
    }
    const list = getLocalItem('education', initialEducation);
    setLocalItem('education', list.filter(e => e.id !== id));
  },

  // Achievements
  async getAchievements(): Promise<IAchievement[]> {
    try {
      const res = await fetch(`${API_BASE}/achievements`);
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setLocalItem('achievements', data.data);
        return data.data;
      }
    } catch {
      // Fallback
    }
    return getLocalItem('achievements', initialAchievements);
  },

  async createAchievement(ach: Partial<IAchievement>): Promise<IAchievement> {
    try {
      const res = await fetch(`${API_BASE}/achievements`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(ach)
      });
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {
      // Fallback
    }
    const list = getLocalItem('achievements', initialAchievements);
    const newAch: IAchievement = {
      id: `ach-${Date.now()}`,
      title: ach.title || 'Achievement',
      category: ach.category || 'Certification',
      issuer: ach.issuer || '',
      date: ach.date || '2025',
      description: ach.description || '',
      credentialUrl: ach.credentialUrl || '',
      certificateImage: ach.certificateImage || ''
    };
    list.push(newAch);
    setLocalItem('achievements', list);
    return newAch;
  },

  async updateAchievement(id: string, ach: Partial<IAchievement>): Promise<IAchievement> {
    try {
      const res = await fetch(`${API_BASE}/achievements/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(ach)
      });
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {
      // Fallback
    }
    const list = getLocalItem('achievements', initialAchievements);
    const idx = list.findIndex(a => a.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...ach };
      setLocalItem('achievements', list);
      return list[idx];
    }
    throw new Error('Achievement not found');
  },

  async deleteAchievement(id: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/achievements/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) return;
    } catch {
      // Fallback
    }
    const list = getLocalItem('achievements', initialAchievements);
    setLocalItem('achievements', list.filter(a => a.id !== id));
  },

  // Messages (Contact)
  async sendMessage(formData: { name: string; email: string; phone?: string; subject: string; message: string; honeypot?: string }): Promise<{ message: string }> {
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) return data;
    } catch {
      // Fallback for static hosting
    }
    const messages = getLocalItem('messages', initialMessages);
    const newMsg: IMessage = {
      id: `msg-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      subject: formData.subject,
      message: formData.message,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    messages.unshift(newMsg);
    setLocalItem('messages', messages);
    return { message: 'Thank you! Your message has been dispatched successfully.' };
  },

  async getMessages(): Promise<IMessage[]> {
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (res.ok && data.success) return data.data || [];
    } catch {
      // Fallback
    }
    return getLocalItem('messages', initialMessages);
  },

  async markMessageRead(id: string, isRead: boolean = true): Promise<IMessage> {
    try {
      const res = await fetch(`${API_BASE}/messages/${id}/read`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isRead })
      });
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {
      // Fallback
    }
    const messages = getLocalItem('messages', initialMessages);
    const msg = messages.find(m => m.id === id);
    if (msg) {
      msg.isRead = isRead;
      setLocalItem('messages', messages);
      return msg;
    }
    throw new Error('Message not found');
  },

  async deleteMessage(id: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/messages/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) return;
    } catch {
      // Fallback
    }
    const messages = getLocalItem('messages', initialMessages);
    setLocalItem('messages', messages.filter(m => m.id !== id));
  },

  // Seed reset
  async resetSeedData(): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/seed/reset`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (res.ok) return;
    } catch {
      // Fallback
    }
    setLocalItem('profile', initialProfile);
    setLocalItem('projects', initialProjects);
    setLocalItem('skills', initialSkills);
    setLocalItem('experience', initialExperience);
    setLocalItem('education', initialEducation);
    setLocalItem('achievements', initialAchievements);
    setLocalItem('messages', initialMessages);
  }
};
