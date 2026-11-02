'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createExperience, updateExperience } from '@/app/actions';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Save, Briefcase } from 'lucide-react';
import Link from 'next/link';

const expFormSchema = z.object({
  role: z.string().min(2, { message: 'Role must be at least 2 characters.' }),
  company: z.string().min(2, { message: 'Company must be at least 2 characters.' }),
  location: z.string().optional(),
  start_date: z.string().min(2, { message: 'Start date must be at least 2 characters.' }),
  end_date: z.string().min(2, { message: 'End date must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  sort_order: z.string(),
});

type ExpFormValues = z.infer<typeof expFormSchema>;

type ExpFormProps = {
  experience?: any;
};

export default function ExperienceForm({ experience }: ExpFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpFormValues>({
    resolver: zodResolver(expFormSchema),
    defaultValues: {
      role: experience?.role || '',
      company: experience?.company || '',
      location: experience?.location || '',
      start_date: experience?.start_date || '',
      end_date: experience?.end_date || 'Present',
      description: experience?.description || '',
      sort_order: experience?.sort_order?.toString() || '0',
    },
  });

  const onSubmit = async (data: ExpFormValues) => {
    setIsSubmitting(true);
    try {
      const res = experience?.id
        ? await updateExperience(experience.id, data)
        : await createExperience(data);

      if (res.success) {
        toast.success(experience?.id ? 'Experience updated successfully!' : 'Experience created successfully!');
        router.push('/admin/dashboard/experiences');
        router.refresh();
      } else {
        toast.error(res.error || 'Failed to save experience details.');
      }
    } catch {
      toast.error('An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-space-grotesk">
      {/* Back Link */}
      <div>
        <Link
          href="/admin/dashboard/experiences"
          className="inline-flex items-center gap-2 text-xs font-bold font-space-grotesk text-foreground/50 hover:text-foreground px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Directory</span>
        </Link>
      </div>

      <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-zinc-950/75 border border-white/[0.08] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {/* Card Header */}
        <div className="flex items-center gap-3.5 mb-8 pb-5 border-b border-white/[0.08]">
          <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-400/30 text-sky-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.2)] shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-syne text-foreground tracking-tight">
              {experience?.id ? 'Edit Career Milestone' : 'Register New Experience'}
            </h2>
            <p className="text-xs font-space-grotesk text-foreground/50 mt-0.5">
              Add details about company role, employment period, responsibilities, and key impact
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Role / Title *
              </label>
              <input
                type="text"
                {...register('role')}
                placeholder="e.g. Lead Frontend Architect"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30 font-medium"
              />
              {errors.role && <span className="text-xs text-rose-400 font-semibold">{errors.role.message}</span>}
            </div>

            {/* Company */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Company Name *
              </label>
              <input
                type="text"
                {...register('company')}
                placeholder="e.g. Vortex Studio"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30 font-medium"
              />
              {errors.company && <span className="text-xs text-rose-400 font-semibold">{errors.company.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Start Date */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Start Period *
              </label>
              <input
                type="text"
                {...register('start_date')}
                placeholder="e.g. 2025 or Jan 2025"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30"
              />
              {errors.start_date && (
                <span className="text-xs text-rose-400 font-semibold">{errors.start_date.message}</span>
              )}
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                End Period *
              </label>
              <input
                type="text"
                {...register('end_date')}
                placeholder="e.g. Present or Dec 2025"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30"
              />
              {errors.end_date && (
                <span className="text-xs text-rose-400 font-semibold">{errors.end_date.message}</span>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Location
              </label>
              <input
                type="text"
                {...register('location')}
                placeholder="e.g. Remote / Jakarta"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
              Role Responsibilities & Achievements *
            </label>
            <textarea
              rows={4}
              {...register('description')}
              placeholder="Outline your responsibilities, team leadership, architectural decisions, and technologies deployed..."
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all leading-relaxed placeholder:text-foreground/30 resize-none"
            />
            {errors.description && (
              <span className="text-xs text-rose-400 font-semibold">{errors.description.message}</span>
            )}
          </div>

          {/* Sort Order */}
          <div className="flex flex-col gap-2 max-w-xs">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
              Sort Order Position
            </label>
            <input
              type="number"
              {...register('sort_order')}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all"
            />
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-full bg-foreground text-background font-space-grotesk font-bold text-xs sm:text-sm tracking-wide hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_6px_25px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_35px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Experience Details...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Experience</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
