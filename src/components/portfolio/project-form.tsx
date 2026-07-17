'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createProject, updateProject } from '@/app/actions';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Save, Upload } from 'lucide-react';
import Link from 'next/link';

const projectFormSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  slug: z.string().min(2, { message: 'Slug must be at least 2 characters.' }),
  short_description: z.string().min(10, { message: 'Short description must be at least 10 characters.' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  category_id: z.string().optional(),
  thumbnail_url: z.string().optional(),
  demo_url: z.string().optional(),
  github_url: z.string().optional(),
  project_date: z.string().optional(),
  role: z.string().optional(),
  client: z.string().optional(),
  duration: z.string().optional(),
  status: z.enum(['draft', 'published']),
  featured: z.boolean(),
  pinned: z.boolean(),
  sort_order: z.string(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

type ProjectFormProps = {
  project?: any;
  categories: any[];
};

export default function ProjectForm({ project, categories }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title || '',
      slug: project?.slug || '',
      short_description: project?.short_description || '',
      description: project?.description || '',
      challenge: project?.challenge || '',
      solution: project?.solution || '',
      category_id: project?.category_id || '',
      thumbnail_url: project?.thumbnail_url || '',
      demo_url: project?.demo_url || '',
      github_url: project?.github_url || '',
      project_date: project?.project_date || new Date().toISOString().split('T')[0],
      role: project?.role || '',
      client: project?.client || '',
      duration: project?.duration || '',
      status: project?.status || 'draft',
      featured: project?.featured || false,
      pinned: project?.pinned || false,
      sort_order: project?.sort_order?.toString() || '0',
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      const finalData = { ...data };

      // Handle file upload simulation
      if (thumbnailFile) {
        // Simulated upload: generate a temporary blob URL or save mock path
        finalData.thumbnail_url = URL.createObjectURL(thumbnailFile);
        toast.info('File uploaded in simulated local storage.');
      }

      const res = project?.id
        ? await updateProject(project.id, finalData)
        : await createProject(finalData);

      if (res.success) {
        toast.success(project?.id ? 'Project updated successfully!' : 'Project created successfully!');
        router.push('/admin/dashboard/projects');
        router.refresh();
      } else {
        toast.error(res.error || 'Failed to save project details.');
      }
    } catch {
      toast.error('An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-space-grotesk">
      {/* Back link */}
      <div>
        <Link
          href="/admin/dashboard/projects"
          className="inline-flex items-center gap-2 text-xs font-black uppercase brutalist-border-thin px-3 py-1.5 bg-background hover:bg-muted dark:hover:bg-muted/10 rounded-lg text-foreground cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
      </div>

      <div className="bg-background brutalist-border rounded-2xl p-6 md:p-8 brutalist-shadow-black dark:shadow-[4px_4px_0px_0px_var(--border-color)]">
        <h2 className="text-2xl font-black uppercase font-syne mb-6 text-foreground">
          {project?.id ? 'Edit Project Profile' : 'Register New Project'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Project Title *</label>
              <input
                type="text"
                {...register('title')}
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
              {errors.title && <span className="text-xs text-brutalist-pink font-bold">{errors.title.message}</span>}
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">URL Slug *</label>
              <input
                type="text"
                {...register('slug')}
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
              {errors.slug && <span className="text-xs text-brutalist-pink font-bold">{errors.slug.message}</span>}
            </div>
          </div>

          {/* Short Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase text-foreground">Short Summary *</label>
            <input
              type="text"
              {...register('short_description')}
              placeholder="A brief one-sentence pitch of the work"
              className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
            />
            {errors.short_description && (
              <span className="text-xs text-brutalist-pink font-bold">{errors.short_description.message}</span>
            )}
          </div>

          {/* Full Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase text-foreground">Full Showcase Description *</label>
            <textarea
              rows={4}
              {...register('description')}
              placeholder="Elaborate on the background, details, scope of work, etc."
              className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none resize-none"
            />
            {errors.description && (
              <span className="text-xs text-brutalist-pink font-bold">{errors.description.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Challenge */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">The Challenge</label>
              <textarea
                rows={3}
                {...register('challenge')}
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none resize-none"
              />
            </div>

            {/* Solution */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">The Solution</label>
              <textarea
                rows={3}
                {...register('solution')}
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Select */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Category</label>
              <select
                {...register('category_id')}
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none font-bold"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Project Date</label>
              <input
                type="date"
                {...register('project_date')}
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none font-bold"
              />
            </div>

            {/* Sort Order */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Sort Order</label>
              <input
                type="number"
                {...register('sort_order')}
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Role */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Role</label>
              <input
                type="text"
                {...register('role')}
                placeholder="e.g. Fullstack Architect"
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
            </div>

            {/* Client */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Client Name</label>
              <input
                type="text"
                {...register('client')}
                placeholder="e.g. Intel"
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Duration</label>
              <input
                type="text"
                {...register('duration')}
                placeholder="e.g. 4 Months"
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Demo Link */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Live Demo Link</label>
              <input
                type="text"
                {...register('demo_url')}
                placeholder="https://example.com"
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
            </div>

            {/* Github Link */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">GitHub Repository Link</label>
              <input
                type="text"
                {...register('github_url')}
                placeholder="https://github.com/..."
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
            </div>
          </div>

          {/* Thumbnail File Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase text-foreground font-space-grotesk">Thumbnail Image</label>
            <div className="w-full p-6 brutalist-border rounded-xl border-dashed flex flex-col items-center justify-center bg-muted/5 gap-2 hover:bg-muted/10 transition-colors">
              <Upload className="w-8 h-8 text-foreground/50" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                className="hidden"
                id="thumbnail-upload-trigger"
              />
              <label
                htmlFor="thumbnail-upload-trigger"
                className="px-4 py-2 bg-brutalist-pink text-white brutalist-border-thin rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer shadow-[2px_2px_0px_0px_var(--border-color)] active:translate-x-0.5 active:translate-y-0.5"
              >
                Select Thumbnail
              </label>
              <span className="text-xs font-bold text-foreground/50 mt-1 uppercase">
                {thumbnailFile ? `Selected: ${thumbnailFile.name}` : 'JPG, PNG, WebP up to 5MB'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 py-4 border-t brutalist-border-thin border-dashed">
            {/* Status toggle */}
            <div className="flex items-center gap-3 font-space-grotesk">
              <label className="text-sm font-black uppercase text-foreground">Publication Status</label>
              <select
                {...register('status')}
                className="px-4 py-2 brutalist-border rounded-xl bg-background font-bold text-sm text-foreground focus:outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Featured check */}
            <div className="flex items-center gap-2 font-space-grotesk">
              <input
                type="checkbox"
                id="featured"
                {...register('featured')}
                className="w-5 h-5 rounded brutalist-border bg-background focus:outline-none"
              />
              <label htmlFor="featured" className="text-sm font-black uppercase text-foreground select-none">
                Featured Project
              </label>
            </div>

            {/* Pinned check */}
            <div className="flex items-center gap-2 font-space-grotesk">
              <input
                type="checkbox"
                id="pinned"
                {...register('pinned')}
                className="w-5 h-5 rounded brutalist-border bg-background focus:outline-none"
              />
              <label htmlFor="pinned" className="text-sm font-black uppercase text-foreground select-none">
                Pin to Top
              </label>
            </div>
          </div>

          {/* Action Trigger */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-brutalist-yellow text-brutalist-dark brutalist-border font-syne font-black uppercase rounded-xl flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#0f0f0f] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#0f0f0f] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Saving Project Details...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Project</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
