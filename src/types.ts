export type ProjectCategory = 'All' | 'Web' | 'Java' | 'C/C++' | 'Arduino' | 'Other';

export interface IProject {
  id: string;
  title: string;
  slug: string;
  category: 'Web' | 'Java' | 'C/C++' | 'Arduino' | 'Other';
  shortDescription: string;
  problemStatement: string;
  solution: string;
  features: string[];
  technologies: string[];
  challenges: string;
  results: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Programming' | 'Tools';

export interface ISkill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0 - 100
  iconName: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  tags?: string[];
}

export type ExperienceType = 'Internship' | 'Freelance' | 'Technical Project' | 'College Activity' | 'Full-time';

export interface IExperience {
  id: string;
  organization: string;
  role: string;
  type: ExperienceType;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string[];
  technologies: string[];
}

export interface IEducation {
  id: string;
  degree: string;
  field: string;
  institution: string;
  university: string;
  startYear: string;
  endYear: string;
  cgpaOrPercentage: string;
  location: string;
  relevantCoursework: string[];
  honors?: string;
}

export type AchievementCategory = 'Certification' | 'Hackathon' | 'Workshop' | 'Technical' | 'Academic';

export interface IAchievement {
  id: string;
  title: string;
  category: AchievementCategory;
  issuer: string;
  date: string;
  credentialUrl: string;
  certificateImage: string;
  description: string;
  skillsGained?: string[];
}

export interface IMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface IProfileConfig {
  name: string;
  title: string;
  avatarUrl?: string;
  roles: string[];
  tagline: string;
  bio: string;
  careerObjective: string;
  interests: string[];
  philosophy: string;
  availableForHire: boolean;
  statusBadgeText: string;
  stats: {
    projectsCompleted: number;
    technologiesCount: number;
    certificationsCount: number;
    yearsExperience: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    phone: string;
    instagram: string;
    twitter: string;
    leetcode: string;
  };
  resumeUrl: string;
}

export interface IDashboardStats {
  totalProjects: number;
  totalSkills: number;
  totalMessages: number;
  unreadMessages: number;
  totalCertifications: number;
  totalExperiences: number;
  databaseStatus: 'mongodb_connected' | 'in_memory_active';
}

export interface IAuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}
