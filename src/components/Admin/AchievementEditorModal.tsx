import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Loader2, AlertCircle } from 'lucide-react';
import { IAchievement, AchievementCategory } from '../../types';

interface AchievementEditorModalProps {
  achievement: IAchievement | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<IAchievement>) => Promise<void>;
}

export const AchievementEditorModal: React.FC<AchievementEditorModalProps> = ({
  achievement,
  isOpen,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState<AchievementCategory>('Certification');
  const [description, setDescription] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [skillsRaw, setSkillsRaw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (achievement) {
      setTitle(achievement.title);
      setIssuer(achievement.issuer);
      setDate(achievement.date);
      setCategory(achievement.category);
      setDescription(achievement.description);
      setCredentialUrl(achievement.credentialUrl || '');
      setSkillsRaw((achievement.skillsGained || []).join(', '));
    } else {
      setTitle('');
      setIssuer('');
      setDate('');
      setCategory('Certification');
      setDescription('');
      setCredentialUrl('');
      setSkillsRaw('');
    }
  }, [achievement, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim() || !date.trim()) {
      setError('Title, Issuer, and Date are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parsedSkills = skillsRaw
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      await onSave({
        title,
        issuer,
        date,
        category,
        description,
        credentialUrl,
        skillsGained: parsedSkills
      });
      setLoading(false);
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Failed to save achievement');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 z-10"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h3 className="text-lg font-bold text-slate-100">
              {achievement ? 'Edit Achievement' : 'Add Achievement / Certificate'}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Achievement Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Meta Front-End Developer Certificate"
                className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Issuer / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={issuer}
                  onChange={e => setIssuer(e.target.value)}
                  placeholder="e.g. Coursera, Meta, IEEE"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="Certification">Certification</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Technical">Technical</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Academic">Academic</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Date / Year *
                </label>
                <input
                  type="text"
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  placeholder="e.g. Nov 2024"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Verification URL
                </label>
                <input
                  type="url"
                  value={credentialUrl}
                  onChange={e => setCredentialUrl(e.target.value)}
                  placeholder="https://coursera.org/verify/..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Description &amp; Highlights
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Comprehensive certification covering responsive web architecture..."
                className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Skills Validated (Comma-separated)
              </label>
              <input
                type="text"
                value={skillsRaw}
                onChange={e => setSkillsRaw(e.target.value)}
                placeholder="React, Hooks, State Management, Vitest"
                className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
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
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 hover:opacity-95 disabled:opacity-50 transition-all cursor-pointer"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Achievement</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
