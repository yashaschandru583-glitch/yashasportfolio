import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialExperience,
  initialEducation,
  initialAchievements,
  initialMessages
} from './initialData.js';
import {
  IProject,
  ISkill,
  IExperience,
  IEducation,
  IAchievement,
  IProfileConfig,
  IMessage,
  IDashboardStats
} from '../src/types.js';

// Mongoose Schemas
const ProjectSchema = new Schema<IProject>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, required: true, enum: ['Web', 'Java', 'C/C++', 'Arduino', 'Other'] },
  shortDescription: { type: String, required: true },
  problemStatement: { type: String, default: '' },
  solution: { type: String, default: '' },
  features: [{ type: String }],
  technologies: [{ type: String }],
  challenges: { type: String, default: '' },
  results: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: String, default: () => new Date().toISOString() }
});

const SkillSchema = new Schema<ISkill>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Frontend', 'Backend', 'Database', 'Programming', 'Tools'] },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
  iconName: { type: String, default: 'Code' },
  experienceLevel: { type: String, default: 'Intermediate', enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
  tags: [{ type: String }]
});

const ExperienceSchema = new Schema<IExperience>({
  id: { type: String, required: true, unique: true },
  organization: { type: String, required: true },
  role: { type: String, required: true },
  type: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, default: 'Present' },
  current: { type: Boolean, default: false },
  location: { type: String, default: '' },
  description: [{ type: String }],
  technologies: [{ type: String }]
});

const EducationSchema = new Schema<IEducation>({
  id: { type: String, required: true, unique: true },
  degree: { type: String, required: true },
  field: { type: String, required: true },
  institution: { type: String, required: true },
  university: { type: String, required: true },
  startYear: { type: String, required: true },
  endYear: { type: String, required: true },
  cgpaOrPercentage: { type: String, required: true },
  location: { type: String, default: '' },
  relevantCoursework: [{ type: String }],
  honors: { type: String, default: '' }
});

const AchievementSchema = new Schema<IAchievement>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  credentialUrl: { type: String, default: '' },
  certificateImage: { type: String, default: '' },
  description: { type: String, default: '' },
  skillsGained: [{ type: String }]
});

const MessageSchema = new Schema<IMessage>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: String, default: () => new Date().toISOString() }
});

const ProfileSchema = new Schema({
  id: { type: String, default: 'main_profile', unique: true },
  config: { type: Schema.Types.Mixed, required: true }
});

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, default: 'Admin User' },
  role: { type: String, default: 'admin' }
});

export const ProjectModel = mongoose.model('Project', ProjectSchema);
export const SkillModel = mongoose.model('Skill', SkillSchema);
export const ExperienceModel = mongoose.model('Experience', ExperienceSchema);
export const EducationModel = mongoose.model('Education', EducationSchema);
export const AchievementModel = mongoose.model('Achievement', AchievementSchema);
export const MessageModel = mongoose.model('Message', MessageSchema);
export const ProfileModel = mongoose.model('Profile', ProfileSchema);
export const UserModel = mongoose.model('User', UserSchema);

// In-Memory Fallback Store (Ensures seamless instant zero-config operations)
class MemoryStore {
  profile: IProfileConfig = JSON.parse(JSON.stringify(initialProfile));
  projects: IProject[] = JSON.parse(JSON.stringify(initialProjects));
  skills: ISkill[] = JSON.parse(JSON.stringify(initialSkills));
  experience: IExperience[] = JSON.parse(JSON.stringify(initialExperience));
  education: IEducation[] = JSON.parse(JSON.stringify(initialEducation));
  achievements: IAchievement[] = JSON.parse(JSON.stringify(initialAchievements));
  messages: IMessage[] = JSON.parse(JSON.stringify(initialMessages));
  users: Array<{ id: string; email: string; passwordHash: string; name: string; role: 'admin' }> = [];

  constructor() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@developer.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123password';
    const salt = bcrypt.genSaltSync(10);
    this.users.push({
      id: 'admin-1',
      email: adminEmail.toLowerCase(),
      passwordHash: bcrypt.hashSync(adminPass, salt),
      name: 'Yashas C.',
      role: 'admin'
    });
  }

  reset() {
    this.profile = JSON.parse(JSON.stringify(initialProfile));
    this.projects = JSON.parse(JSON.stringify(initialProjects));
    this.skills = JSON.parse(JSON.stringify(initialSkills));
    this.experience = JSON.parse(JSON.stringify(initialExperience));
    this.education = JSON.parse(JSON.stringify(initialEducation));
    this.achievements = JSON.parse(JSON.stringify(initialAchievements));
    this.messages = JSON.parse(JSON.stringify(initialMessages));
  }
}

export const memoryStore = new MemoryStore();
let isMongoConnected = false;

export async function initDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.trim() === '') {
    console.log('ℹ️ No MONGODB_URI provided. Operating in high-performance in-memory active store mode with live seed data.');
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB Atlas successfully.');

    // Seed if empty
    const count = await ProjectModel.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding initial data into MongoDB...');
      await ProjectModel.insertMany(initialProjects);
      await SkillModel.insertMany(initialSkills);
      await ExperienceModel.insertMany(initialExperience);
      await EducationModel.insertMany(initialEducation);
      await AchievementModel.insertMany(initialAchievements);
      await MessageModel.insertMany(initialMessages);
      await ProfileModel.create({ id: 'main_profile', config: initialProfile });

      const adminEmail = (process.env.ADMIN_EMAIL || 'admin@developer.com').toLowerCase();
      const adminPass = process.env.ADMIN_PASSWORD || 'admin123password';
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(adminPass, salt);
      await UserModel.create({ email: adminEmail, passwordHash: hash, name: 'Admin', role: 'admin' });
      console.log('✅ Seed completed in MongoDB.');
    }
  } catch (err: any) {
    console.warn(`⚠️ MongoDB connection error (${err?.message}). Seamlessly utilizing active fallback store.`);
    isMongoConnected = false;
  }
}

// Unified DAO
export const dbService = {
  getDatabaseStatus(): 'mongodb_connected' | 'in_memory_active' {
    return isMongoConnected ? 'mongodb_connected' : 'in_memory_active';
  },

  async getProfile(): Promise<IProfileConfig> {
    if (isMongoConnected) {
      const doc = await ProfileModel.findOne({ id: 'main_profile' });
      if (doc && doc.config) return doc.config as IProfileConfig;
    }
    return memoryStore.profile;
  },

  async updateProfile(data: Partial<IProfileConfig>): Promise<IProfileConfig> {
    if (isMongoConnected) {
      const updated = await ProfileModel.findOneAndUpdate(
        { id: 'main_profile' },
        { config: { ...memoryStore.profile, ...data } },
        { new: true, upsert: true }
      );
      if (updated && updated.config) {
        memoryStore.profile = updated.config as IProfileConfig;
        return updated.config as IProfileConfig;
      }
    }
    memoryStore.profile = { ...memoryStore.profile, ...data };
    return memoryStore.profile;
  },

  async getProjects(filter?: { category?: string; featured?: boolean; search?: string }): Promise<IProject[]> {
    if (isMongoConnected) {
      const query: any = {};
      if (filter?.category && filter.category !== 'All') query.category = filter.category;
      if (filter?.featured !== undefined) query.featured = filter.featured;
      if (filter?.search) {
        query.$or = [
          { title: { $regex: filter.search, $options: 'i' } },
          { shortDescription: { $regex: filter.search, $options: 'i' } },
          { technologies: { $in: [new RegExp(filter.search, 'i')] } }
        ];
      }
      const docs = await ProjectModel.find(query).sort({ sortOrder: 1, createdAt: -1 });
      return docs.map(d => d.toObject());
    }

    let list = [...memoryStore.projects];
    if (filter?.category && filter.category !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === filter.category?.toLowerCase());
    }
    if (filter?.featured !== undefined) {
      list = list.filter(p => p.featured === filter.featured);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }
    return list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  },

  async getProjectById(id: string): Promise<IProject | null> {
    if (isMongoConnected) {
      const doc = await ProjectModel.findOne({ $or: [{ id }, { slug: id }] });
      return doc ? doc.toObject() : null;
    }
    return memoryStore.projects.find(p => p.id === id || p.slug === id) || null;
  },

  async createProject(data: Partial<IProject>): Promise<IProject> {
    const id = data.id || `proj-${Date.now()}`;
    const slug = data.slug || (data.title ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `proj-${Date.now()}`);
    const newProj: IProject = {
      id,
      title: data.title || 'Untitled Project',
      slug,
      category: data.category || 'Web',
      shortDescription: data.shortDescription || '',
      problemStatement: data.problemStatement || '',
      solution: data.solution || '',
      features: data.features || [],
      technologies: data.technologies || [],
      challenges: data.challenges || '',
      results: data.results || '',
      githubUrl: data.githubUrl || '',
      liveUrl: data.liveUrl || '',
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      featured: Boolean(data.featured),
      sortOrder: data.sortOrder ?? (memoryStore.projects.length + 1),
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected) {
      const doc = await ProjectModel.create(newProj);
      return doc.toObject();
    }
    memoryStore.projects.push(newProj);
    return newProj;
  },

  async updateProject(id: string, data: Partial<IProject>): Promise<IProject | null> {
    if (isMongoConnected) {
      const doc = await ProjectModel.findOneAndUpdate({ id }, data, { new: true });
      return doc ? doc.toObject() : null;
    }
    const index = memoryStore.projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    memoryStore.projects[index] = { ...memoryStore.projects[index], ...data };
    return memoryStore.projects[index];
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isMongoConnected) {
      const res = await ProjectModel.deleteOne({ id });
      return res.deletedCount > 0;
    }
    const idx = memoryStore.projects.findIndex(p => p.id === id);
    if (idx === -1) return false;
    memoryStore.projects.splice(idx, 1);
    return true;
  },

  async getSkills(): Promise<ISkill[]> {
    if (isMongoConnected) {
      const docs = await SkillModel.find().sort({ category: 1, proficiency: -1 });
      return docs.map(d => d.toObject());
    }
    return memoryStore.skills;
  },

  async createSkill(data: Partial<ISkill>): Promise<ISkill> {
    const newSkill: ISkill = {
      id: data.id || `sk-${Date.now()}`,
      name: data.name || 'New Skill',
      category: data.category || 'Frontend',
      proficiency: Number(data.proficiency) || 80,
      iconName: data.iconName || 'Code',
      experienceLevel: data.experienceLevel || 'Intermediate',
      tags: data.tags || []
    };
    if (isMongoConnected) {
      const doc = await SkillModel.create(newSkill);
      return doc.toObject();
    }
    memoryStore.skills.push(newSkill);
    return newSkill;
  },

  async updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill | null> {
    if (isMongoConnected) {
      const doc = await SkillModel.findOneAndUpdate({ id }, data, { new: true });
      return doc ? doc.toObject() : null;
    }
    const idx = memoryStore.skills.findIndex(s => s.id === id);
    if (idx === -1) return null;
    memoryStore.skills[idx] = { ...memoryStore.skills[idx], ...data };
    return memoryStore.skills[idx];
  },

  async deleteSkill(id: string): Promise<boolean> {
    if (isMongoConnected) {
      const res = await SkillModel.deleteOne({ id });
      return res.deletedCount > 0;
    }
    const idx = memoryStore.skills.findIndex(s => s.id === id);
    if (idx === -1) return false;
    memoryStore.skills.splice(idx, 1);
    return true;
  },

  async getExperiences(): Promise<IExperience[]> {
    if (isMongoConnected) {
      const docs = await ExperienceModel.find();
      return docs.map(d => d.toObject());
    }
    return memoryStore.experience;
  },

  async createExperience(data: Partial<IExperience>): Promise<IExperience> {
    const newExp: IExperience = {
      id: data.id || `exp-${Date.now()}`,
      organization: data.organization || 'Organization',
      role: data.role || 'Role',
      type: data.type || 'Internship',
      startDate: data.startDate || '2024',
      endDate: data.endDate || 'Present',
      current: Boolean(data.current),
      location: data.location || '',
      description: data.description || [],
      technologies: data.technologies || []
    };
    if (isMongoConnected) {
      const doc = await ExperienceModel.create(newExp);
      return doc.toObject();
    }
    memoryStore.experience.push(newExp);
    return newExp;
  },

  async updateExperience(id: string, data: Partial<IExperience>): Promise<IExperience | null> {
    if (isMongoConnected) {
      const doc = await ExperienceModel.findOneAndUpdate({ id }, data, { new: true });
      return doc ? doc.toObject() : null;
    }
    const idx = memoryStore.experience.findIndex(e => e.id === id);
    if (idx === -1) return null;
    memoryStore.experience[idx] = { ...memoryStore.experience[idx], ...data };
    return memoryStore.experience[idx];
  },

  async deleteExperience(id: string): Promise<boolean> {
    if (isMongoConnected) {
      const res = await ExperienceModel.deleteOne({ id });
      return res.deletedCount > 0;
    }
    const idx = memoryStore.experience.findIndex(e => e.id === id);
    if (idx === -1) return false;
    memoryStore.experience.splice(idx, 1);
    return true;
  },

  async getEducations(): Promise<IEducation[]> {
    if (isMongoConnected) {
      const docs = await EducationModel.find();
      return docs.map(d => d.toObject());
    }
    return memoryStore.education;
  },

  async createEducation(data: Partial<IEducation>): Promise<IEducation> {
    const newEdu: IEducation = {
      id: data.id || `edu-${Date.now()}`,
      degree: data.degree || 'Degree',
      field: data.field || 'Field',
      institution: data.institution || 'College',
      university: data.university || 'University',
      startYear: data.startYear || '2022',
      endYear: data.endYear || '2026',
      cgpaOrPercentage: data.cgpaOrPercentage || '8.5 CGPA',
      location: data.location || '',
      relevantCoursework: data.relevantCoursework || [],
      honors: data.honors || ''
    };
    if (isMongoConnected) {
      const doc = await EducationModel.create(newEdu);
      return doc.toObject();
    }
    memoryStore.education.push(newEdu);
    return newEdu;
  },

  async updateEducation(id: string, data: Partial<IEducation>): Promise<IEducation | null> {
    if (isMongoConnected) {
      const doc = await EducationModel.findOneAndUpdate({ id }, data, { new: true });
      return doc ? doc.toObject() : null;
    }
    const idx = memoryStore.education.findIndex(e => e.id === id);
    if (idx === -1) return null;
    memoryStore.education[idx] = { ...memoryStore.education[idx], ...data };
    return memoryStore.education[idx];
  },

  async deleteEducation(id: string): Promise<boolean> {
    if (isMongoConnected) {
      const res = await EducationModel.deleteOne({ id });
      return res.deletedCount > 0;
    }
    const idx = memoryStore.education.findIndex(e => e.id === id);
    if (idx === -1) return false;
    memoryStore.education.splice(idx, 1);
    return true;
  },

  async getAchievements(): Promise<IAchievement[]> {
    if (isMongoConnected) {
      const docs = await AchievementModel.find();
      return docs.map(d => d.toObject());
    }
    return memoryStore.achievements;
  },

  async createAchievement(data: Partial<IAchievement>): Promise<IAchievement> {
    const newAch: IAchievement = {
      id: data.id || `ach-${Date.now()}`,
      title: data.title || 'Achievement',
      category: data.category || 'Certification',
      issuer: data.issuer || 'Issuer',
      date: data.date || '2024',
      credentialUrl: data.credentialUrl || '',
      certificateImage: data.certificateImage || 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=800&q=80',
      description: data.description || '',
      skillsGained: data.skillsGained || []
    };
    if (isMongoConnected) {
      const doc = await AchievementModel.create(newAch);
      return doc.toObject();
    }
    memoryStore.achievements.push(newAch);
    return newAch;
  },

  async updateAchievement(id: string, data: Partial<IAchievement>): Promise<IAchievement | null> {
    if (isMongoConnected) {
      const doc = await AchievementModel.findOneAndUpdate({ id }, data, { new: true });
      return doc ? doc.toObject() : null;
    }
    const idx = memoryStore.achievements.findIndex(a => a.id === id);
    if (idx === -1) return null;
    memoryStore.achievements[idx] = { ...memoryStore.achievements[idx], ...data };
    return memoryStore.achievements[idx];
  },

  async deleteAchievement(id: string): Promise<boolean> {
    if (isMongoConnected) {
      const res = await AchievementModel.deleteOne({ id });
      return res.deletedCount > 0;
    }
    const idx = memoryStore.achievements.findIndex(a => a.id === id);
    if (idx === -1) return false;
    memoryStore.achievements.splice(idx, 1);
    return true;
  },

  async getMessages(): Promise<IMessage[]> {
    if (isMongoConnected) {
      const docs = await MessageModel.find().sort({ createdAt: -1 });
      return docs.map(d => d.toObject());
    }
    return [...memoryStore.messages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async createMessage(data: { name: string; email: string; phone?: string; subject: string; message: string }): Promise<IMessage> {
    const newMsg: IMessage = {
      id: `msg-${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || '',
      subject: data.subject.trim(),
      message: data.message.trim(),
      isRead: false,
      createdAt: new Date().toISOString()
    };
    if (isMongoConnected) {
      const doc = await MessageModel.create(newMsg);
      return doc.toObject();
    }
    memoryStore.messages.unshift(newMsg);
    return newMsg;
  },

  async markMessageRead(id: string, isRead: boolean): Promise<IMessage | null> {
    if (isMongoConnected) {
      const doc = await MessageModel.findOneAndUpdate({ id }, { isRead }, { new: true });
      return doc ? doc.toObject() : null;
    }
    const msg = memoryStore.messages.find(m => m.id === id);
    if (!msg) return null;
    msg.isRead = isRead;
    return msg;
  },

  async deleteMessage(id: string): Promise<boolean> {
    if (isMongoConnected) {
      const res = await MessageModel.deleteOne({ id });
      return res.deletedCount > 0;
    }
    const idx = memoryStore.messages.findIndex(m => m.id === id);
    if (idx === -1) return false;
    memoryStore.messages.splice(idx, 1);
    return true;
  },

  async getUserByEmail(email: string) {
    const cleanEmail = email.toLowerCase().trim();
    if (isMongoConnected) {
      const user = await UserModel.findOne({ email: cleanEmail });
      return user ? user.toObject() : null;
    }
    return memoryStore.users.find(u => u.email.toLowerCase() === cleanEmail) || null;
  },

  async getDashboardStats(): Promise<IDashboardStats> {
    const [projects, skills, messages, achievements, experiences] = await Promise.all([
      this.getProjects(),
      this.getSkills(),
      this.getMessages(),
      this.getAchievements(),
      this.getExperiences()
    ]);
    return {
      totalProjects: projects.length,
      totalSkills: skills.length,
      totalMessages: messages.length,
      unreadMessages: messages.filter(m => !m.isRead).length,
      totalCertifications: achievements.filter(a => a.category === 'Certification').length || achievements.length,
      totalExperiences: experiences.length,
      databaseStatus: isMongoConnected ? 'mongodb_connected' : 'in_memory_active'
    };
  },

  resetStore() {
    memoryStore.reset();
  }
};
