'use client';

import { useState } from 'react';
import Link from 'next/link';
import { deleteProject, updateProjectsOrder } from '@/app/actions';
import { toast } from 'sonner';
import { Edit, Trash2, Plus, Pin, Star, GripVertical, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Reorder } from 'framer-motion';

type Project = {
  id: string;
  title: string;
  slug: string;
  status: string;
  project_date: string;
  featured?: boolean;
  pinned?: boolean;
  thumbnail_url?: string;
  categories?: { name: string } | null;
};

export default function ProjectsListClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project "${title}"?`)) return;

    try {
      const res = await deleteProject(id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        toast.success(`Project "${title}" deleted successfully.`);
      } else {
        toast.error('Failed to delete project.');
      }
    } catch {
      toast.error('An error occurred.');
    }
  };

  const handleReorder = async (newOrder: Project[]) => {
    setProjects(newOrder);
    try {
      const orderPayload = newOrder.map((proj, idx) => ({
        id: proj.id,
        sort_order: idx,
      }));
      const res = await updateProjectsOrder(orderPayload);
      if (res.success) {
        toast.success('Projects order updated successfully.');
      } else {
        toast.error(res.error || 'Failed to update projects order.');
      }
    } catch {
      toast.error('An error occurred while updating order.');
    }
  };

  return (
    <div className="space-y-6 font-space-grotesk">
      {/* Create Trigger button */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-space-grotesk text-foreground/50">
          Drag and drop rows using the grip handle to adjust display order.
        </span>
        <Link
          href="/admin/dashboard/projects/new"
          className="px-6 py-3 rounded-full bg-foreground text-background font-space-grotesk font-bold text-xs sm:text-sm tracking-wide hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-[0_6px_25px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_35px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Directory list grid wrapper */}
      <div className="rounded-3xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="overflow-x-auto min-w-[768px]">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 border-b border-white/[0.08] bg-white/[0.02] p-4 text-xs font-space-grotesk font-bold uppercase tracking-wider text-foreground/60">
            <div className="col-span-1 flex items-center justify-center">Order</div>
            <div className="col-span-2">Thumbnail</div>
            <div className="col-span-3">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-center">Actions</div>
          </div>

          {/* Reorderable List Body */}
          <Reorder.Group
            axis="y"
            values={projects}
            onReorder={handleReorder}
            className="divide-y divide-white/[0.06]"
          >
            {projects.length === 0 ? (
              <div className="p-12 text-center text-sm font-space-grotesk text-foreground/50 flex flex-col items-center justify-center gap-2">
                <ImageIcon className="w-8 h-8 text-foreground/30" />
                <p className="font-bold text-foreground/70">No projects registered yet</p>
                <p className="text-xs text-foreground/40">Click "New Project" above to create and publish your first work.</p>
              </div>
            ) : (
              projects.map((proj) => {
                const categoryName = proj.categories?.name || 'Development';
                const year = proj.project_date
                  ? new Date(proj.project_date).getFullYear().toString()
                  : '2026';
                return (
                  <Reorder.Item
                    key={proj.id}
                    value={proj}
                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors select-none text-sm"
                  >
                    {/* Grip drag handle */}
                    <div className="col-span-1 flex items-center justify-center cursor-grab active:cursor-grabbing text-foreground/30 hover:text-sky-400 transition-colors p-2">
                      <GripVertical className="w-5 h-5" />
                    </div>

                    {/* Thumbnail */}
                    <div className="col-span-2">
                      <div className="relative w-16 h-10 rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.08]">
                        {proj.thumbnail_url ? (
                          <Image
                            src={proj.thumbnail_url}
                            alt={proj.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-foreground/30">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="col-span-3 font-syne font-bold text-foreground truncate">
                      {proj.title}
                    </div>

                    {/* Category */}
                    <div className="col-span-2 text-xs font-space-grotesk text-foreground/60 truncate">
                      {categoryName}
                    </div>

                    {/* Year */}
                    <div className="col-span-1 text-xs font-space-grotesk text-foreground/60">
                      {year}
                    </div>

                    {/* Badges */}
                    <div className="col-span-2">
                      <div className="flex flex-wrap gap-1.5 text-[10px] font-space-grotesk font-bold">
                        {proj.status === 'published' ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-foreground/50">
                            Draft
                          </span>
                        )}
                        {proj.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            Feat
                          </span>
                        )}
                        {proj.pinned && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 flex items-center gap-1">
                            <Pin className="w-2.5 h-2.5 fill-current" />
                            Pin
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="col-span-1 flex justify-center items-center gap-2">
                      <Link
                        href={`/admin/dashboard/projects/${proj.id}/edit`}
                        className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-foreground/70 hover:text-foreground transition-all cursor-pointer"
                        title="Edit project"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-2 rounded-xl bg-white/[0.03] hover:bg-red-500/10 border border-white/[0.08] hover:border-red-500/25 text-foreground/70 hover:text-red-400 transition-all cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Reorder.Item>
                );
              })
            )}
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
}
