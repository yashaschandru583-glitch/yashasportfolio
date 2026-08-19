import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Loader2, AlertCircle } from 'lucide-react';
import { IExperience } from '../../types';

interface ExperienceEditorModalProps {
  experience: IExperience | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<IExperience>) => Promise<void>;
}

export const ExperienceEditorModal: React.FC<ExperienceEditorModalProps> = ({
  experience,
  isOpen,
  onClose,
  onSave
}) => {
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [current, setCurrent] = useState(false);
  const [type, setType] = useState<'Internship' | 'Full-Time' | 'Freelance' | 'Leadership' | 'Project'>('Internship');
  const [descRaw, setDescRaw] = useState('');
  const [techRaw, setTechRaw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (experience) {
      setRole(experience.role);
      setOrganization(experience.organization);
      setLocation(experience.location || '');
      setStartDate(experience.startDate);
      setEndDate(experience.endDate || '');
      setCurrent(experience.current || false);
      setType(experience.type);
      setDescRaw((experience.description || []).join('\n'));
      setTechRaw((experience.technologies || []).join(', '));
    } else {
      setRole('');
      setOrganization('');
      setLocation('');
      setStartDate('');
      setEndDate('');
      setCurrent(false);
      setType('Internship');
      setDescRaw('');
      setTechRaw('');
    }
  }, [experience, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !organization.trim() || !startDate.trim()) {
      setError('Role, Organization and Start Date are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parsedDesc = descRaw
        .split('\n')
        .map(d => d.trim())
        .filter(d => d.length > 0);

      const parsedTech = techRaw
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      await onSave({
        role,
        organization,
        location,
        startDate,
        endDate: current ? 'Present' : endDate,
        current,
        type,
        description: parsedDesc,
        technologies: parsedTech
      });
      setLoading(false);
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Failed to save experience');
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
          className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h3 className="text-lg font-bold text-slate-100">
              {experience ? 'Edit Experience' : 'Add Experience Entry'}
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Role / Title *
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  placeholder="e.g. Software Engineer Intern"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Organization / Company *
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={e => setOrganization(e.target.value)}
                  placeholder="e.g. TechCorp Labs"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Type
                </label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="Internship">Internship</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Project">Project</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Start Date *
                </label>
                <input
                  type="text"
                  required
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  placeholder="e.g. June 2024"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  End Date
                </label>
                <input
                  type="text"
                  disabled={current}
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  placeholder="e.g. Aug 2024"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 disabled:opacity-40"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                <input
                  type="checkbox"
                  checked={current}
                  onChange={e => setCurrent(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-800"
                />
                <span>I currently work / lead here</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Bullet Points (One description per line)
              </label>
              <textarea
                rows={3}
                value={descRaw}
                onChange={e => setDescRaw(e.target.value)}
                placeholder="Architected RESTful microservices...&#10;Reduced latency by 35% across SQL endpoints..."
                className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Technologies Used (Comma-separated)
              </label>
              <input
                type="text"
                value={techRaw}
                onChange={e => setTechRaw(e.target.value)}
                placeholder="React, TypeScript, Express, MongoDB, Docker"
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
                <span>Save Experience</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
