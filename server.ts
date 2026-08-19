import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createServer as createViteServer } from 'vite';
import { dbService, initDatabase } from './server/db.js';
import { requireAdmin, AuthRequest } from './server/middleware/auth.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'portfolio_jwt_super_secret_dev_key_2025';
const PORT = 3000;

async function startServer() {
  const app = express();

  // Basic security & parsing middlewares
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Connect database (with high-performance memory store fallback)
  await initDatabase();

  // ----------------------------------------------------
  // API Health & Stats
  // ----------------------------------------------------
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'online',
      timestamp: new Date().toISOString(),
      database: dbService.getDatabaseStatus()
    });
  });

  app.get('/api/stats/dashboard', async (req: Request, res: Response) => {
    try {
      const stats = await dbService.getDashboardStats();
      res.json({ success: true, data: stats });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // ----------------------------------------------------
  // Auth Routes
  // ----------------------------------------------------
  app.post('/api/auth/login', async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    try {
      const user = await dbService.getUserByEmail(email);
      if (!user) {
        res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
        return;
      }

      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        res.status(401).json({ success: false, message: 'Invalid email or password.' });
        return;
      }

      const userId = (user as any).id || (user as any)._id?.toString() || 'admin-1';
      const token = jwt.sign(
        { id: userId, email: user.email, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        token,
        user: { id: userId, email: user.email, role: user.role, name: user.name }
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.get('/api/auth/me', (req: Request, res: Response): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'No token provided' });
      return;
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({ success: true, user: decoded });
    } catch (err) {
      res.status(401).json({ success: false, message: 'Token is expired or invalid' });
    }
  });

  // ----------------------------------------------------
  // Profile Config
  // ----------------------------------------------------
  app.get('/api/profile', async (req: Request, res: Response) => {
    try {
      const profile = await dbService.getProfile();
      res.json({ success: true, data: profile });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.put('/api/profile', requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const updated = await dbService.updateProfile(req.body);
      res.json({ success: true, data: updated, message: 'Profile updated successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.post('/api/profile/upload-photo', async (req: Request, res: Response): Promise<void> => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64) {
        res.status(400).json({ success: false, message: 'Image base64 data required' });
        return;
      }
      
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      
      const publicDir = path.join(process.cwd(), 'public');
      const publicPath = path.join(publicDir, 'profile.jpg');
      await fs.promises.mkdir(publicDir, { recursive: true });
      await fs.promises.writeFile(publicPath, buffer);

      try {
        const distDir = path.join(process.cwd(), 'dist');
        const distPath = path.join(distDir, 'profile.jpg');
        await fs.promises.mkdir(distDir, { recursive: true });
        await fs.promises.writeFile(distPath, buffer);
      } catch (e) {}

      const timestampUrl = `/profile.jpg?t=${Date.now()}`;
      const profile = await dbService.getProfile();
      if (profile) {
        profile.avatarUrl = timestampUrl;
        await dbService.updateProfile(profile);
      }

      res.json({
        success: true,
        avatarUrl: timestampUrl,
        imageBase64,
        message: 'Original photo uploaded and set successfully!'
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // ----------------------------------------------------
  // Projects Endpoints
  // ----------------------------------------------------
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      const { category, featured, search } = req.query;
      const projects = await dbService.getProjects({
        category: typeof category === 'string' ? category : undefined,
        featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
        search: typeof search === 'string' ? search : undefined
      });
      res.json({ success: true, count: projects.length, data: projects });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.get('/api/projects/:id', async (req: Request, res: Response): Promise<void> => {
    try {
      const project = await dbService.getProjectById(req.params.id);
      if (!project) {
        res.status(404).json({ success: false, message: 'Project not found' });
        return;
      }
      res.json({ success: true, data: project });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.post('/api/projects', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { title, category, shortDescription } = req.body;
      if (!title || !category || !shortDescription) {
        res.status(400).json({ success: false, message: 'Title, category, and short description are required.' });
        return;
      }
      const project = await dbService.createProject(req.body);
      res.status(201).json({ success: true, data: project, message: 'Project created successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.put('/api/projects/:id', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const project = await dbService.updateProject(req.params.id, req.body);
      if (!project) {
        res.status(404).json({ success: false, message: 'Project not found' });
        return;
      }
      res.json({ success: true, data: project, message: 'Project updated successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.delete('/api/projects/:id', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const deleted = await dbService.deleteProject(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Project not found' });
        return;
      }
      res.json({ success: true, message: 'Project deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // ----------------------------------------------------
  // Skills Endpoints
  // ----------------------------------------------------
  app.get('/api/skills', async (req: Request, res: Response) => {
    try {
      const skills = await dbService.getSkills();
      res.json({ success: true, count: skills.length, data: skills });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.post('/api/skills', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { name, category, proficiency } = req.body;
      if (!name || !category) {
        res.status(400).json({ success: false, message: 'Skill name and category are required.' });
        return;
      }
      const skill = await dbService.createSkill({ ...req.body, proficiency: Number(proficiency) || 80 });
      res.status(201).json({ success: true, data: skill, message: 'Skill created successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.put('/api/skills/:id', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const skill = await dbService.updateSkill(req.params.id, req.body);
      if (!skill) {
        res.status(404).json({ success: false, message: 'Skill not found' });
        return;
      }
      res.json({ success: true, data: skill, message: 'Skill updated successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.delete('/api/skills/:id', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const deleted = await dbService.deleteSkill(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Skill not found' });
        return;
      }
      res.json({ success: true, message: 'Skill deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // ----------------------------------------------------
  // Experience Endpoints
  // ----------------------------------------------------
  app.get('/api/experience', async (req: Request, res: Response) => {
    try {
      const experience = await dbService.getExperiences();
      res.json({ success: true, count: experience.length, data: experience });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.post('/api/experience', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { organization, role } = req.body;
      if (!organization || !role) {
        res.status(400).json({ success: false, message: 'Organization and role are required.' });
        return;
      }
      const exp = await dbService.createExperience(req.body);
      res.status(201).json({ success: true, data: exp, message: 'Experience added successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.put('/api/experience/:id', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const exp = await dbService.updateExperience(req.params.id, req.body);
      if (!exp) {
        res.status(404).json({ success: false, message: 'Experience entry not found' });
        return;
      }
      res.json({ success: true, data: exp, message: 'Experience updated successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.delete('/api/experience/:id', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const deleted = await dbService.deleteExperience(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Experience entry not found' });
        return;
      }
      res.json({ success: true, message: 'Experience deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // ----------------------------------------------------
  // Education Endpoints
  // ----------------------------------------------------
  app.get('/api/education', async (req: Request, res: Response) => {
    try {
      const education = await dbService.getEducations();
      res.json({ success: true, count: education.length, data: education });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.post('/api/education', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { degree, institution } = req.body;
      if (!degree || !institution) {
        res.status(400).json({ success: false, message: 'Degree and institution are required.' });
        return;
      }
      const edu = await dbService.createEducation(req.body);
      res.status(201).json({ success: true, data: edu, message: 'Education added successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.put('/api/education/:id', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const edu = await dbService.updateEducation(req.params.id, req.body);
      if (!edu) {
        res.status(404).json({ success: false, message: 'Education entry not found' });
        return;
      }
      res.json({ success: true, data: edu, message: 'Education updated successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.delete('/api/education/:id', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const deleted = await dbService.deleteEducation(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Education entry not found' });
        return;
      }
      res.json({ success: true, message: 'Education deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // ----------------------------------------------------
  // Achievements Endpoints
  // ----------------------------------------------------
  app.get('/api/achievements', async (req: Request, res: Response) => {
    try {
      const achievements = await dbService.getAchievements();
      res.json({ success: true, count: achievements.length, data: achievements });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.post('/api/achievements', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { title, issuer } = req.body;
      if (!title || !issuer) {
        res.status(400).json({ success: false, message: 'Title and issuer are required.' });
        return;
      }
      const ach = await dbService.createAchievement(req.body);
      res.status(201).json({ success: true, data: ach, message: 'Achievement added successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.put('/api/achievements/:id', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const ach = await dbService.updateAchievement(req.params.id, req.body);
      if (!ach) {
        res.status(404).json({ success: false, message: 'Achievement not found' });
        return;
      }
      res.json({ success: true, data: ach, message: 'Achievement updated successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.delete('/api/achievements/:id', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const deleted = await dbService.deleteAchievement(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Achievement not found' });
        return;
      }
      res.json({ success: true, message: 'Achievement deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // ----------------------------------------------------
  // Messages Endpoints (Contact form)
  // ----------------------------------------------------
  app.post('/api/messages', async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, phone, subject, message, honeypot } = req.body;

      // Spam honeypot check
      if (honeypot) {
        res.status(200).json({ success: true, message: 'Message received.' });
        return;
      }

      if (!name || !email || !subject || !message) {
        res.status(400).json({ success: false, message: 'Please fill in all required fields (Name, Email, Subject, Message).' });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
        return;
      }

      if (message.trim().length < 8) {
        res.status(400).json({ success: false, message: 'Message must be at least 8 characters long.' });
        return;
      }

      const savedMessage = await dbService.createMessage({
        name,
        email,
        phone,
        subject,
        message
      });

      res.status(201).json({
        success: true,
        data: savedMessage,
        message: 'Thank you! Your message has been transmitted successfully. I will get back to you shortly.'
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.get('/api/messages', requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const messages = await dbService.getMessages();
      res.json({ success: true, count: messages.length, data: messages });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.patch('/api/messages/:id/read', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { isRead } = req.body;
      const updated = await dbService.markMessageRead(req.params.id, isRead !== undefined ? isRead : true);
      if (!updated) {
        res.status(404).json({ success: false, message: 'Message not found' });
        return;
      }
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.delete('/api/messages/:id', requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const deleted = await dbService.deleteMessage(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Message not found' });
        return;
      }
      res.json({ success: true, message: 'Message deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // ----------------------------------------------------
  // Seed Reset Endpoint (Admin only)
  // ----------------------------------------------------
  app.post('/api/seed/reset', requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      dbService.resetStore();
      res.json({ success: true, message: 'Data store reset to default seed data.' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // ----------------------------------------------------
  // Vite Integration (Dev Middleware & Production Static)
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Portfolio & CMS Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup failure:', err);
});
