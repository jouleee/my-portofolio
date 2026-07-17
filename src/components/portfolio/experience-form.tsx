'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createExperience, updateExperience } from '@/app/actions';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
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
    <div className="max-w-3xl mx-auto space-y-6 font-space-grotesk">
      {/* Back Link */}
      <div>
        <Link
          href="/admin/dashboard/experiences"
          className="inline-flex items-center gap-2 text-xs font-black uppercase brutalist-border-thin px-3 py-1.5 bg-background hover:bg-muted dark:hover:bg-muted/10 rounded-lg text-foreground cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
      </div>

      <div className="bg-background brutalist-border rounded-2xl p-6 md:p-8 brutalist-shadow-black dark:shadow-[4px_4px_0px_0px_var(--border-color)]">
        <h2 className="text-2xl font-black uppercase font-syne mb-6 text-foreground">
          {experience?.id ? 'Edit Experience Log' : 'Register New Experience'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Role / Title *</label>
              <input
                type="text"
                {...register('role')}
                placeholder="e.g. Lead Developer"
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
              {errors.role && <span className="text-xs text-brutalist-pink font-bold">{errors.role.message}</span>}
            </div>

            {/* Company */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Company Name *</label>
              <input
                type="text"
                {...register('company')}
                placeholder="e.g. Google"
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
              {errors.company && <span className="text-xs text-brutalist-pink font-bold">{errors.company.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Start Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Start Period *</label>
              <input
                type="text"
                {...register('start_date')}
                placeholder="e.g. Jan 2024"
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
              {errors.start_date && (
                <span className="text-xs text-brutalist-pink font-bold">{errors.start_date.message}</span>
              )}
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">End Period *</label>
              <input
                type="text"
                {...register('end_date')}
                placeholder="e.g. Present"
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
              {errors.end_date && (
                <span className="text-xs text-brutalist-pink font-bold">{errors.end_date.message}</span>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Location</label>
              <input
                type="text"
                {...register('location')}
                placeholder="e.g. Remote / Jakarta"
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase text-foreground">Job Description *</label>
            <textarea
              rows={4}
              {...register('description')}
              placeholder="Outline your responsibilities, key achievements, and technologies used..."
              className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none resize-none"
            />
            {errors.description && (
              <span className="text-xs text-brutalist-pink font-bold">{errors.description.message}</span>
            )}
          </div>

          {/* Sort Order */}
          <div className="flex flex-col gap-2 max-w-xs">
            <label className="text-sm font-black uppercase text-foreground">Sort Order</label>
            <input
              type="number"
              {...register('sort_order')}
              className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none font-bold"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-brutalist-yellow text-brutalist-dark brutalist-border font-syne font-black uppercase rounded-xl flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#0f0f0f] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#0f0f0f] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Saving Experience Details...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Experience</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
