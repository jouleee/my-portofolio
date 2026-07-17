'use client';

import { useState } from 'react';
import Link from 'next/link';
import { deleteExperience, updateExperiencesOrder } from '@/app/actions';
import { toast } from 'sonner';
import { Edit, Trash2, Plus, GripVertical } from 'lucide-react';
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
      <div className="flex justify-end">
        <Link
          href="/admin/dashboard/experiences/new"
          className="px-5 py-3 bg-brutalist-pink text-white brutalist-border rounded-xl shadow-[3px_3px_0px_0px_#0f0f0f] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[4.5px_4.5px_0px_0px_#0f0f0f] font-black uppercase text-sm flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Experience
        </Link>
      </div>

      {/* Directory list grid wrapper */}
      <div className="bg-background brutalist-border rounded-2xl overflow-hidden brutalist-shadow-black dark:shadow-[4px_4px_0px_0px_var(--border-color)]">
        <div className="overflow-x-auto min-w-[768px]">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 border-b-[3px] border-brutalist-dark dark:border-brutalist-light bg-muted/10 p-4 font-black text-sm uppercase">
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
            className="divide-y-[3px] divide-brutalist-dark dark:divide-brutalist-light"
          >
            {experiences.length === 0 ? (
              <div className="p-8 text-center text-sm font-bold text-foreground/50 uppercase">
                No experiences found
              </div>
            ) : (
              experiences.map((exp) => (
                <Reorder.Item
                  key={exp.id}
                  value={exp}
                  className="grid grid-cols-12 gap-4 p-4 items-center bg-background hover:bg-muted/5 font-bold text-sm select-none"
                >
                  {/* Grip drag handle */}
                  <div className="col-span-1 flex items-center justify-center cursor-grab active:cursor-grabbing text-foreground/40 hover:text-foreground transition-colors p-2">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  {/* Role */}
                  <div className="col-span-3 font-black uppercase truncate">{exp.role}</div>

                  {/* Company */}
                  <div className="col-span-3 uppercase text-brutalist-pink truncate">{exp.company}</div>

                  {/* Period */}
                  <div className="col-span-2">{exp.start_date} — {exp.end_date}</div>

                  {/* Location */}
                  <div className="col-span-2 truncate">{exp.location}</div>

                  {/* Action buttons */}
                  <div className="col-span-1 flex justify-center items-center gap-2">
                    <Link
                      href={`/admin/dashboard/experiences/${exp.id}/edit`}
                      className="p-1.5 rounded-lg brutalist-border-thin bg-background hover:bg-brutalist-yellow transition-colors cursor-pointer text-foreground"
                      aria-label="Edit experience"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(exp.id, exp.role, exp.company)}
                      className="p-1.5 rounded-lg brutalist-border-thin bg-background hover:bg-brutalist-pink hover:text-white transition-colors cursor-pointer text-foreground"
                      aria-label="Delete experience"
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
