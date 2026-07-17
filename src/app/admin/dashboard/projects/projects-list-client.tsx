'use client';

import { useState } from 'react';
import Link from 'next/link';
import { deleteProject, updateProjectsOrder } from '@/app/actions';
import { toast } from 'sonner';
import { Edit, Trash2, Plus, Pin, Star, GripVertical } from 'lucide-react';
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
      <div className="flex justify-end">
        <Link
          href="/admin/dashboard/projects/new"
          className="px-5 py-3 bg-brutalist-pink text-white brutalist-border rounded-xl shadow-[3px_3px_0px_0px_#0f0f0f] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[4.5px_4.5px_0px_0px_#0f0f0f] font-black uppercase text-sm flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Project
        </Link>
      </div>

      {/* Directory list grid wrapper */}
      <div className="bg-background brutalist-border rounded-2xl overflow-hidden brutalist-shadow-black dark:shadow-[4px_4px_0px_0px_var(--border-color)]">
        <div className="overflow-x-auto min-w-[768px]">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 border-b-[3px] border-brutalist-dark dark:border-brutalist-light bg-muted/10 p-4 font-black text-sm uppercase">
            <div className="col-span-1 flex items-center justify-center">Order</div>
            <div className="col-span-2">Thumbnail</div>
            <div className="col-span-3">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-2">Badges</div>
            <div className="col-span-1 text-center">Actions</div>
          </div>

          {/* Reorderable List Body */}
          <Reorder.Group
            axis="y"
            values={projects}
            onReorder={handleReorder}
            className="divide-y-[3px] divide-brutalist-dark dark:divide-brutalist-light"
          >
            {projects.length === 0 ? (
              <div className="p-8 text-center text-sm font-bold text-foreground/50 uppercase">
                No projects found
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
                    className="grid grid-cols-12 gap-4 p-4 items-center bg-background hover:bg-muted/5 font-bold text-sm select-none"
                  >
                    {/* Grip drag handle */}
                    <div className="col-span-1 flex items-center justify-center cursor-grab active:cursor-grabbing text-foreground/40 hover:text-foreground transition-colors p-2">
                      <GripVertical className="w-5 h-5" />
                    </div>

                    {/* Thumbnail */}
                    <div className="col-span-2">
                      <div className="relative w-16 h-10 brutalist-border-thin rounded-md overflow-hidden bg-muted">
                        {proj.thumbnail_url ? (
                          <Image
                            src={proj.thumbnail_url}
                            alt={proj.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-brutalist-yellow to-brutalist-pink" />
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="col-span-3 font-black uppercase truncate">{proj.title}</div>

                    {/* Category */}
                    <div className="col-span-2 uppercase truncate">{categoryName}</div>

                    {/* Year */}
                    <div className="col-span-1">{year}</div>

                    {/* Badges */}
                    <div className="col-span-2">
                      <div className="flex flex-wrap gap-1.5 text-[9px] uppercase font-black">
                        {proj.status === 'published' ? (
                          <span className="px-1.5 py-0.5 bg-brutalist-green text-brutalist-dark brutalist-border-thin rounded">Pub</span>
                        ) : (
                          <span className="px-1.5 py-0.5 bg-muted dark:bg-muted/20 brutalist-border-thin rounded text-foreground">Draft</span>
                        )}
                        {proj.featured && (
                          <span className="px-1.5 py-0.5 bg-brutalist-pink text-white brutalist-border-thin rounded flex items-center gap-0.5">
                            <Star className="w-2 h-2 fill-current" />
                            Feat
                          </span>
                        )}
                        {proj.pinned && (
                          <span className="px-1.5 py-0.5 bg-brutalist-yellow text-brutalist-dark brutalist-border-thin rounded flex items-center gap-0.5">
                            <Pin className="w-2 h-2 fill-current" />
                            Pin
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="col-span-1 flex justify-center items-center gap-2">
                      <Link
                        href={`/admin/dashboard/projects/${proj.id}/edit`}
                        className="p-1.5 rounded-lg brutalist-border-thin bg-background hover:bg-brutalist-yellow transition-colors cursor-pointer text-foreground"
                        aria-label="Edit project"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-1.5 rounded-lg brutalist-border-thin bg-background hover:bg-brutalist-pink hover:text-white transition-colors cursor-pointer text-foreground"
                        aria-label="Delete project"
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
