'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateProfile } from '@/app/actions';
import { toast } from 'sonner';
import { Loader2, Save, User, Sparkles } from 'lucide-react';

const profileFormSchema = z.object({
  full_name: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  title: z.string().min(5, { message: 'Title / Role must be at least 5 characters.' }),
  bio: z.string().min(10, { message: 'Bio / Hero description must be at least 10 characters.' }),
  years_experience: z.string().min(1, { message: 'Years of experience is required (e.g. 6+).' }),
  resume_url: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type ProfileFormProps = {
  profile?: {
    id?: string;
    full_name?: string;
    title?: string;
    bio?: string;
    years_experience?: string;
    resume_url?: string;
  } | null;
};

export default function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: profile?.full_name || 'Joel',
      title: profile?.title || 'Lead Software Engineer & Full Stack Architect',
      bio: profile?.bio || 'Building premium web experiences at the intersection of high-fidelity interaction, elegant visual design, and clean scalable code. Award-winning aesthetics meets peak performance.',
      years_experience: profile?.years_experience || '6+',
      resume_url: profile?.resume_url || '#',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await updateProfile(data);
      if (res.success) {
        toast.success('Hero profile updated successfully! Homepage refreshed.');
        router.refresh();
      } else {
        toast.error(res.error || 'Failed to update profile.');
      }
    } catch {
      toast.error('An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-space-grotesk">
      <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-zinc-950/75 border border-white/[0.08] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {/* Card Header */}
        <div className="flex items-center gap-3.5 mb-8 pb-5 border-b border-white/[0.08]">
          <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-400/30 text-sky-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.2)] shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-syne text-foreground tracking-tight">
              Profile & Hero Editor
            </h2>
            <p className="text-xs font-space-grotesk text-foreground/50 mt-0.5">
              Live configuration for personal introduction, hero headline, and experience KPI
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Full Name *
              </label>
              <input
                type="text"
                {...register('full_name')}
                placeholder="e.g. Joel"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30"
              />
              {errors.full_name && (
                <span className="text-xs text-rose-400 font-semibold">{errors.full_name.message}</span>
              )}
            </div>

            {/* Years of Experience / KPI */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Years Experience KPI *
              </label>
              <input
                type="text"
                {...register('years_experience')}
                placeholder="e.g. 6+"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30"
              />
              {errors.years_experience && (
                <span className="text-xs text-rose-400 font-semibold">{errors.years_experience.message}</span>
              )}
            </div>
          </div>

          {/* Headline Title */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
              Headline Title / Role *
            </label>
            <input
              type="text"
              {...register('title')}
              placeholder="e.g. Lead Software Engineer & Full Stack Architect"
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all font-medium placeholder:text-foreground/30"
            />
            {errors.title && (
              <span className="text-xs text-rose-400 font-semibold">{errors.title.message}</span>
            )}
          </div>

          {/* Bio / Hero Description */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
              Hero Introduction Bio *
            </label>
            <textarea
              rows={4}
              {...register('bio')}
              placeholder="Building premium web experiences at the intersection of high-fidelity interaction, elegant visual design, and clean scalable code. Award-winning aesthetics meets peak performance."
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all leading-relaxed placeholder:text-foreground/30 resize-none"
            />
            {errors.bio && (
              <span className="text-xs text-rose-400 font-semibold">{errors.bio.message}</span>
            )}
          </div>

          {/* Resume URL */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
              Resume / CV Link
            </label>
            <input
              type="text"
              {...register('resume_url')}
              placeholder="https://example.com/resume.pdf or #"
              className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground text-sm outline-none transition-all placeholder:text-foreground/30"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-full bg-foreground text-background font-space-grotesk font-bold text-xs sm:text-sm tracking-wide hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_6px_25px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_35px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Profile to Database...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
