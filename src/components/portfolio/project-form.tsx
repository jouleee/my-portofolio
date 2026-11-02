'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createProject, updateProject } from '@/app/actions';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Save, Upload, X, Image as ImageIcon, FolderKanban } from 'lucide-react';
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
  technologies_used: z.string().optional(),
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
      technologies_used: project?.project_technologies
        ? project.project_technologies
            .map((pt: any) => pt.technologies?.name || pt.name)
            .filter((name: any): name is string => typeof name === 'string' && name.length > 0)
            .join(', ')
        : (project?.technologies_used || ''),
    },
  });

  const currentThumbnailUrl = watch('thumbnail_url');
  const displayImage = previewUrl || currentThumbnailUrl;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setThumbnailFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setPreviewUrl(null);
    setValue('thumbnail_url', '');
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      const finalData = { ...data };

      // Handle file upload directly to Supabase Storage bucket 'projects'
      if (thumbnailFile) {
        const supabase = createClient();
        
        // Generate a safe, unique filename
        const fileExt = thumbnailFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `thumbnails/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, thumbnailFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          console.error('Supabase storage upload error:', uploadError);
          throw new Error(`Storage upload failed: ${uploadError.message}. Silakan pastikan bucket 'projects' sudah dibuat dan diatur public di Supabase.`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(filePath);

        finalData.thumbnail_url = publicUrl;
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
    } catch (err) {
      console.error('Submission error:', err);
      const errMsg = err instanceof Error ? err.message : 'An error occurred during submission.';
      toast.error(errMsg);
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
          className="inline-flex items-center gap-2 text-xs font-bold font-space-grotesk text-foreground/50 hover:text-foreground px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Directory</span>
        </Link>
      </div>

      <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-zinc-950/75 border border-white/[0.08] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-8 pb-5 border-b border-white/[0.08]">
          <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-400/30 text-sky-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.2)] shrink-0">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-syne text-foreground tracking-tight">
              {project?.id ? 'Edit Project Profile' : 'Register New Project'}
            </h2>
            <p className="text-xs font-space-grotesk text-foreground/50 mt-0.5">
              Configure showcase content, technical tags, demo links, and uploaded thumbnail
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Project Title *
              </label>
              <input
                type="text"
                {...register('title')}
                placeholder="e.g. Aura Spatial Interface"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30 font-medium"
              />
              {errors.title && <span className="text-xs text-rose-400 font-semibold">{errors.title.message}</span>}
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                URL Slug *
              </label>
              <input
                type="text"
                {...register('slug')}
                placeholder="e.g. aura-spatial-interface"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30 font-mono text-xs"
              />
              {errors.slug && <span className="text-xs text-rose-400 font-semibold">{errors.slug.message}</span>}
            </div>
          </div>

          {/* Short Description */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
              Short Pitch / Summary *
            </label>
            <input
              type="text"
              {...register('short_description')}
              placeholder="A brief one-sentence pitch of the work"
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30"
            />
            {errors.short_description && (
              <span className="text-xs text-rose-400 font-semibold">{errors.short_description.message}</span>
            )}
          </div>

          {/* Full Description */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
              Full Showcase Description *
            </label>
            <textarea
              rows={4}
              {...register('description')}
              placeholder="Elaborate on the background, details, architectural scope of work, etc."
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all leading-relaxed placeholder:text-foreground/30 resize-none"
            />
            {errors.description && (
              <span className="text-xs text-rose-400 font-semibold">{errors.description.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Challenge */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                The Engineering Challenge
              </label>
              <textarea
                rows={3}
                {...register('challenge')}
                placeholder="What major technical hurdle did you solve?"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all leading-relaxed placeholder:text-foreground/30 resize-none"
              />
            </div>

            {/* Solution */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                The Solution & Architecture
              </label>
              <textarea
                rows={3}
                {...register('solution')}
                placeholder="How did your implementation solve the bottleneck?"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all leading-relaxed placeholder:text-foreground/30 resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Select */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Category
              </label>
              <select
                {...register('category_id')}
                className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900 border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all cursor-pointer"
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
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Project Date
              </label>
              <input
                type="date"
                {...register('project_date')}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all"
              />
            </div>

            {/* Sort Order */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Sort Order Position
              </label>
              <input
                type="number"
                {...register('sort_order')}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Role */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Role / Contribution
              </label>
              <input
                type="text"
                {...register('role')}
                placeholder="e.g. Lead Fullstack Architect"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30"
              />
            </div>

            {/* Client */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Client / Company
              </label>
              <input
                type="text"
                {...register('client')}
                placeholder="e.g. Design Forward Labs"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30"
              />
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Project Duration
              </label>
              <input
                type="text"
                {...register('duration')}
                placeholder="e.g. 3 Months"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30"
              />
            </div>
          </div>

          {/* Technologies Used */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
              Technologies Used (Comma separated)
            </label>
            <input
              type="text"
              {...register('technologies_used')}
              placeholder="e.g. React.js, Next.js, Three.js, Tailwind CSS"
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30 font-medium"
            />
            <span className="text-[11px] text-foreground/40 font-medium">Pisahkan dengan koma (contoh: Next.js, React.js, TypeScript, Tailwind CSS)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Demo Link */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Live Demo Link
              </label>
              <input
                type="text"
                {...register('demo_url')}
                placeholder="https://example.com"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30"
              />
            </div>

            {/* Github Link */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                GitHub Repository Link
              </label>
              <input
                type="text"
                {...register('github_url')}
                placeholder="https://github.com/..."
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30"
              />
            </div>
          </div>

          {/* Thumbnail File Selection */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
              Project Thumbnail Image
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 w-full p-8 rounded-2xl border border-dashed border-white/[0.12] hover:border-sky-400/40 flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.04] gap-2.5 transition-colors min-h-[180px]">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-foreground/50">
                  <Upload className="w-5 h-5" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="thumbnail-upload-trigger"
                />
                <label
                  htmlFor="thumbnail-upload-trigger"
                  className="px-5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] text-xs font-bold text-foreground cursor-pointer transition-colors"
                >
                  Choose File
                </label>
                <span className="text-xs text-foreground/40 mt-1 text-center break-all max-w-[280px]">
                  {thumbnailFile ? `Selected: ${thumbnailFile.name}` : 'JPG, PNG, WebP up to 5MB'}
                </span>
              </div>

              {/* Live Preview Panel */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">Live Preview</span>
                {displayImage ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/[0.08] group shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={displayImage}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveThumbnail}
                      className="absolute top-2.5 right-2.5 p-1.5 bg-zinc-950/80 hover:bg-red-500/80 text-white rounded-lg backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
                      title="Remove Image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-2xl border border-dashed border-white/[0.08] flex flex-col items-center justify-center bg-white/[0.01] text-foreground/30 text-xs font-medium gap-1.5 select-none">
                    <ImageIcon className="w-6 h-6" />
                    <span>No Preview Available</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Publication and Toggles */}
          <div className="flex flex-wrap items-center gap-6 py-5 border-t border-white/[0.08]">
            {/* Status toggle */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Publication Status
              </label>
              <select
                {...register('status')}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/[0.08] text-xs font-bold text-foreground outline-none cursor-pointer"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Featured check */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                {...register('featured')}
                className="w-4 h-4 rounded border-white/20 bg-zinc-900 text-sky-400 focus:ring-0 cursor-pointer"
              />
              <label htmlFor="featured" className="text-xs font-bold text-foreground/80 cursor-pointer select-none">
                Featured Project
              </label>
            </div>

            {/* Pinned check */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="pinned"
                {...register('pinned')}
                className="w-4 h-4 rounded border-white/20 bg-zinc-900 text-indigo-400 focus:ring-0 cursor-pointer"
              />
              <label htmlFor="pinned" className="text-xs font-bold text-foreground/80 cursor-pointer select-none">
                Pin to Top
              </label>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-full bg-foreground text-background font-space-grotesk font-bold text-xs sm:text-sm tracking-wide hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_6px_25px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_35px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Project Details...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Project</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
