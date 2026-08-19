import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { IProject, ProjectCategory } from '../../types';

interface ProjectEditorModalProps {
  project: IProject | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectData: Partial<IProject>) => Promise<void>;
}

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<IProject>>({
    title: '',
    category: 'Web',
    shortDescription: '',
    problemStatement: '',
    solution: '',
    features: [],
    technologies: [],
    challenges: '',
    results: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    featured: false,
    sortOrder: 1
  });

  const [featuresRaw, setFeaturesRaw] = useState('');
  const [techRaw, setTechRaw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      setFormData(project);
      setFeaturesRaw((project.features || []).join('\n'));
      setTechRaw((project.technologies || []).join(', '));
    } else {
      setFormData({
        title: '',
        category: 'Web',
        shortDescription: '',
        problemStatement: '',
        solution: '',
        features: [],
        technologies: [],
        challenges: '',
        results: '',
        githubUrl: '',
        liveUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        featured: false,
        sortOrder: 1
      });
      setFeaturesRaw('');
      setTechRaw('React, Node.js, Express, MongoDB');
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.shortDescription?.trim()) {
      setError('Title and Short Description are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parsedFeatures = featuresRaw
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const parsedTech = techRaw
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      await onSave({
        ...formData,
        features: parsedFeatures,
        technologies: parsedTech
      });
      setLoading(false);
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Failed to save project');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50 shrink-0">
            <h3 className="text-lg font-bold text-slate-100">
              {project ? 'Edit Project' : 'Add New Project'}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Scroll Area */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Student Management Portal"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="Web">Web</option>
                  <option value="Java">Java</option>
                  <option value="C/C++">C/C++</option>
                  <option value="Arduino">Arduino</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Short Description (Summary) *
              </label>
              <textarea
                required
                rows={2}
                value={formData.shortDescription}
                onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Concise overview of the project shown on the card..."
                className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Problem Statement
                </label>
                <textarea
                  rows={2}
                  value={formData.problemStatement}
                  onChange={e => setFormData({ ...formData, problemStatement: e.target.value })}
                  placeholder="What problem does this project address?"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Solution Architecture
                </label>
                <textarea
                  rows={2}
                  value={formData.solution}
                  onChange={e => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="How does your architecture solve the problem?"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Key Features (One feature per line)
              </label>
              <textarea
                rows={3}
                value={featuresRaw}
                onChange={e => setFeaturesRaw(e.target.value)}
                placeholder="Role-Based Access Control&#10;Real-time attendance analytics&#10;Instant PDF transcript export"
                className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Technologies (Comma-separated)
              </label>
              <input
                type="text"
                value={techRaw}
                onChange={e => setTechRaw(e.target.value)}
                placeholder="React, Node.js, Express, MongoDB, Tailwind CSS"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Technical Challenges
                </label>
                <textarea
                  rows={2}
                  value={formData.challenges}
                  onChange={e => setFormData({ ...formData, challenges: e.target.value })}
                  placeholder="Concurrency, complex algorithms, sensor calibration..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Results &amp; Impact
                </label>
                <textarea
                  rows={2}
                  value={formData.results}
                  onChange={e => setFormData({ ...formData, results: e.target.value })}
                  placeholder="Optimized processing by 75%, 99.8% precision..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Live Demo / Release URL
                </label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-800 focus:ring-cyan-500"
                />
                <span>Mark as Featured Project</span>
              </label>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 hover:opacity-95 disabled:opacity-50 transition-all cursor-pointer"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Project</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
