import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Loader2, AlertCircle } from 'lucide-react';
import { IEducation } from '../../types';

interface EducationEditorModalProps {
  education: IEducation | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<IEducation>) => Promise<void>;
}

export const EducationEditorModal: React.FC<EducationEditorModalProps> = ({
  education,
  isOpen,
  onClose,
  onSave
}) => {
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [university, setUniversity] = useState('');
  const [field, setField] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [cgpaOrPercentage, setCgpaOrPercentage] = useState('');
  const [honors, setHonors] = useState('');
  const [location, setLocation] = useState('');
  const [courseworkRaw, setCourseworkRaw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (education) {
      setDegree(education.degree);
      setInstitution(education.institution);
      setUniversity(education.university);
      setField(education.field);
      setStartYear(education.startYear);
      setEndYear(education.endYear);
      setCgpaOrPercentage(education.cgpaOrPercentage);
      setHonors(education.honors || '');
      setLocation(education.location || '');
      setCourseworkRaw((education.relevantCoursework || []).join(', '));
    } else {
      setDegree('Bachelor of Engineering (B.E.)');
      setInstitution('');
      setUniversity('');
      setField('Computer Science & Engineering');
      setStartYear('2022');
      setEndYear('2026');
      setCgpaOrPercentage('CGPA: 8.85 / 10.0');
      setHonors('');
      setLocation('Karnataka, India');
      setCourseworkRaw('Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks');
    }
  }, [education, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!degree.trim() || !institution.trim() || !startYear.trim() || !endYear.trim()) {
      setError('Degree, Institution, and Years are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parsedCoursework = courseworkRaw
        .split(',')
        .map(c => c.trim())
        .filter(c => c.length > 0);

      await onSave({
        degree,
        institution,
        university,
        field,
        startYear,
        endYear,
        cgpaOrPercentage,
        honors,
        location,
        relevantCoursework: parsedCoursework
      });
      setLoading(false);
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Failed to save education');
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
              {education ? 'Edit Education' : 'Add Education Record'}
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
                  Degree *
                </label>
                <input
                  type="text"
                  required
                  value={degree}
                  onChange={e => setDegree(e.target.value)}
                  placeholder="e.g. B.E., B.Tech, High School"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Field / Specialization
                </label>
                <input
                  type="text"
                  value={field}
                  onChange={e => setField(e.target.value)}
                  placeholder="Computer Science & Engineering"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Institution / College *
                </label>
                <input
                  type="text"
                  required
                  value={institution}
                  onChange={e => setInstitution(e.target.value)}
                  placeholder="Engineering College Name"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  University / Board
                </label>
                <input
                  type="text"
                  value={university}
                  onChange={e => setUniversity(e.target.value)}
                  placeholder="e.g. VTU"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Start Year *
                </label>
                <input
                  type="text"
                  required
                  value={startYear}
                  onChange={e => setStartYear(e.target.value)}
                  placeholder="2022"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  End Year *
                </label>
                <input
                  type="text"
                  required
                  value={endYear}
                  onChange={e => setEndYear(e.target.value)}
                  placeholder="2026"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  CGPA / Grade
                </label>
                <input
                  type="text"
                  value={cgpaOrPercentage}
                  onChange={e => setCgpaOrPercentage(e.target.value)}
                  placeholder="8.85 CGPA"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Honors &amp; Awards
              </label>
              <input
                type="text"
                value={honors}
                onChange={e => setHonors(e.target.value)}
                placeholder="e.g. Dean's Honor Roll, First Class with Distinction"
                className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Relevant Coursework (Comma-separated)
              </label>
              <textarea
                rows={2}
                value={courseworkRaw}
                onChange={e => setCourseworkRaw(e.target.value)}
                placeholder="Data Structures, Algorithms, Computer Networks, Operating Systems, Database Systems"
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
                <span>Save Education</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
