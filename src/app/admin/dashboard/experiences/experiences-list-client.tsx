'use client';

import { useState } from 'react';
import Link from 'next/link';
import { deleteExperience, updateExperiencesOrder } from '@/app/actions';
import { toast } from 'sonner';
import { Edit, Trash2, Plus, GripVertical, Briefcase } from 'lucide-react';
import { Reorder } from 'framer-motion';

type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  sort_order: number;
};

export default function ExperiencesListClient({ initialExperiences }: { initialExperiences: Experience[] }) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);

  const handleDelete = async (id: string, role: string, company: string) => {
    if (!confirm(`Are you sure you want to delete experience "${role} at ${company}"?`)) return;

    try {
      const res = await deleteExperience(id);
      if (res.success) {
        setExperiences((prev) => prev.filter((e) => e.id !== id));
        toast.success(`Experience deleted successfully.`);
      } else {
        toast.error('Failed to delete experience.');
      }
    } catch {
      toast.error('An error occurred.');
    }
  };

  const handleReorder = async (newOrder: Experience[]) => {
    setExperiences(newOrder);
    try {
      const orderPayload = newOrder.map((exp, idx) => ({
        id: exp.id,
        sort_order: idx,
      }));
      const res = await updateExperiencesOrder(orderPayload);
      if (res.success) {
        toast.success('Experiences order updated successfully.');
      } else {
        toast.error(res.error || 'Failed to update experiences order.');
      }
    } catch {
      toast.error('An error occurred while updating order.');
    }
  };

  return (
    <div className="space-y-6 font-space-grotesk">
      {/* Create Button */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-space-grotesk text-foreground/50">
          Drag and drop rows using the grip handle to adjust timeline chronology.
        </span>
        <Link
          href="/admin/dashboard/experiences/new"
          className="px-6 py-3 rounded-full bg-foreground text-background font-space-grotesk font-bold text-xs sm:text-sm tracking-wide hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-[0_6px_25px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_35px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Experience</span>
        </Link>
      </div>

      {/* Directory list grid wrapper */}
      <div className="rounded-3xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="overflow-x-auto min-w-[768px]">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 border-b border-white/[0.08] bg-white/[0.02] p-4 text-xs font-space-grotesk font-bold uppercase tracking-wider text-foreground/60">
            <div className="col-span-1 flex items-center justify-center">Order</div>
            <div className="col-span-3">Role</div>
            <div className="col-span-3">Company</div>
            <div className="col-span-2">Period</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-1 text-center">Actions</div>
          </div>

          {/* Reorderable List Body */}
          <Reorder.Group
            axis="y"
            values={experiences}
            onReorder={handleReorder}
            className="divide-y divide-white/[0.06]"
          >
            {experiences.length === 0 ? (
              <div className="p-12 text-center text-sm font-space-grotesk text-foreground/50 flex flex-col items-center justify-center gap-2">
                <Briefcase className="w-8 h-8 text-foreground/30" />
                <p className="font-bold text-foreground/70">No experiences registered yet</p>
                <p className="text-xs text-foreground/40">Click "New Experience" above to log your career history milestones.</p>
              </div>
            ) : (
              experiences.map((exp) => (
                <Reorder.Item
                  key={exp.id}
                  value={exp}
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors select-none text-sm"
                >
                  {/* Grip drag handle */}
                  <div className="col-span-1 flex items-center justify-center cursor-grab active:cursor-grabbing text-foreground/30 hover:text-sky-400 transition-colors p-2">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  {/* Role */}
                  <div className="col-span-3 font-syne font-bold text-foreground truncate">
                    {exp.role}
                  </div>

                  {/* Company */}
                  <div className="col-span-3 font-medium text-sky-400/90 truncate">
                    {exp.company}
                  </div>

                  {/* Period */}
                  <div className="col-span-2 text-xs text-foreground/60">
                    {exp.start_date} — {exp.end_date}
                  </div>

                  {/* Location */}
                  <div className="col-span-2 text-xs text-foreground/50 truncate">
                    {exp.location || 'Remote'}
                  </div>

                  {/* Action buttons */}
                  <div className="col-span-1 flex justify-center items-center gap-2">
                    <Link
                      href={`/admin/dashboard/experiences/${exp.id}/edit`}
                      className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-foreground/70 hover:text-foreground transition-all cursor-pointer"
                      title="Edit experience"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(exp.id, exp.role, exp.company)}
                      className="p-2 rounded-xl bg-white/[0.03] hover:bg-red-500/10 border border-white/[0.08] hover:border-red-500/25 text-foreground/70 hover:text-red-400 transition-all cursor-pointer"
                      title="Delete experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Reorder.Item>
              ))
            )}
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
}
