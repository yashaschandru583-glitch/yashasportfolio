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

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('portfolio_admin_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // Health & Stats
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  async getDashboardStats(): Promise<IDashboardStats> {
    const res = await fetch(`${API_BASE}/stats/dashboard`);
    const data = await res.json();
    return data.data;
  },

  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: IAuthUser }> {
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
  },

  async checkAuth(): Promise<IAuthUser> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error('Not authenticated');
    }
    return data.user;
  },

  // Profile
  async getProfile(): Promise<IProfileConfig> {
    const res = await fetch(`${API_BASE}/profile`);
    const data = await res.json();
    return data.data;
  },

  async updateProfile(profile: Partial<IProfileConfig>): Promise<IProfileConfig> {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profile)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update profile');
    return data.data;
  },

  async uploadPhoto(imageBase64: string): Promise<{ avatarUrl: string }> {
    const res = await fetch(`${API_BASE}/profile/upload-photo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64 })
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to upload photo');
    return data;
  },

  // Projects
  async getProjects(params?: { category?: string; featured?: boolean; search?: string }): Promise<IProject[]> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'All') query.append('category', params.category);
    if (params?.featured !== undefined) query.append('featured', String(params.featured));
    if (params?.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/projects?${query.toString()}`);
    const data = await res.json();
    return data.data || [];
  },

  async getProjectById(id: string): Promise<IProject> {
    const res = await fetch(`${API_BASE}/projects/${id}`);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error('Project not found');
    return data.data;
  },

  async createProject(project: Partial<IProject>): Promise<IProject> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(project)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to create project');
    return data.data;
  },

  async updateProject(id: string, project: Partial<IProject>): Promise<IProject> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(project)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update project');
    return data.data;
  },

  async deleteProject(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to delete project');
  },

  // Skills
  async getSkills(): Promise<ISkill[]> {
    const res = await fetch(`${API_BASE}/skills`);
    const data = await res.json();
    return data.data || [];
  },

  async createSkill(skill: Partial<ISkill>): Promise<ISkill> {
    const res = await fetch(`${API_BASE}/skills`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(skill)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to create skill');
    return data.data;
  },

  async updateSkill(id: string, skill: Partial<ISkill>): Promise<ISkill> {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(skill)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update skill');
    return data.data;
  },

  async deleteSkill(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to delete skill');
  },

  // Experience
  async getExperience(): Promise<IExperience[]> {
    const res = await fetch(`${API_BASE}/experience`);
    const data = await res.json();
    return data.data || [];
  },

  async createExperience(exp: Partial<IExperience>): Promise<IExperience> {
    const res = await fetch(`${API_BASE}/experience`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(exp)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to add experience');
    return data.data;
  },

  async updateExperience(id: string, exp: Partial<IExperience>): Promise<IExperience> {
    const res = await fetch(`${API_BASE}/experience/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(exp)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update experience');
    return data.data;
  },

  async deleteExperience(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/experience/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to delete experience');
  },

  // Education
  async getEducation(): Promise<IEducation[]> {
    const res = await fetch(`${API_BASE}/education`);
    const data = await res.json();
    return data.data || [];
  },

  async createEducation(edu: Partial<IEducation>): Promise<IEducation> {
    const res = await fetch(`${API_BASE}/education`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(edu)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to add education');
    return data.data;
  },

  async updateEducation(id: string, edu: Partial<IEducation>): Promise<IEducation> {
    const res = await fetch(`${API_BASE}/education/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(edu)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update education');
    return data.data;
  },

  async deleteEducation(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/education/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to delete education');
  },

  // Achievements
  async getAchievements(): Promise<IAchievement[]> {
    const res = await fetch(`${API_BASE}/achievements`);
    const data = await res.json();
    return data.data || [];
  },

  async createAchievement(ach: Partial<IAchievement>): Promise<IAchievement> {
    const res = await fetch(`${API_BASE}/achievements`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(ach)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to add achievement');
    return data.data;
  },

  async updateAchievement(id: string, ach: Partial<IAchievement>): Promise<IAchievement> {
    const res = await fetch(`${API_BASE}/achievements/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(ach)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update achievement');
    return data.data;
  },

  async deleteAchievement(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/achievements/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to delete achievement');
  },

  // Messages (Contact)
  async sendMessage(formData: { name: string; email: string; phone?: string; subject: string; message: string; honeypot?: string }): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to send message');
    return data;
  },

  async getMessages(): Promise<IMessage[]> {
    const res = await fetch(`${API_BASE}/messages`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to fetch messages');
    return data.data || [];
  },

  async markMessageRead(id: string, isRead: boolean = true): Promise<IMessage> {
    const res = await fetch(`${API_BASE}/messages/${id}/read`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ isRead })
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update message');
    return data.data;
  },

  async deleteMessage(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to delete message');
  },

  // Seed reset
  async resetSeedData(): Promise<void> {
    const res = await fetch(`${API_BASE}/seed/reset`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to reset seed data');
  }
};
