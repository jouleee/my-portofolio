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
      <div className="bg-background brutalist-border rounded-2xl p-6 md:p-8 brutalist-shadow-black dark:shadow-[4px_4px_0px_0px_var(--border-color)]">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-dashed border-border-color/20">
          <div className="w-10 h-10 rounded-xl bg-brutalist-pink text-white flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase font-syne text-foreground">
              Profile & Hero Editor
            </h2>
            <p className="text-xs font-bold text-foreground/50 uppercase mt-0.5">
              Live configuration for personal introduction, hero headline, and experience KPI
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Full Name *</label>
              <input
                type="text"
                {...register('full_name')}
                placeholder="e.g. Joel"
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
              {errors.full_name && (
                <span className="text-xs text-brutalist-pink font-bold">{errors.full_name.message}</span>
              )}
            </div>

            {/* Years of Experience / KPI */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground">Years Experience KPI *</label>
              <input
                type="text"
                {...register('years_experience')}
                placeholder="e.g. 6+"
                className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
              />
              {errors.years_experience && (
                <span className="text-xs text-brutalist-pink font-bold">{errors.years_experience.message}</span>
              )}
            </div>
          </div>

          {/* Headline Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase text-foreground">Headline Title / Role *</label>
            <input
              type="text"
              {...register('title')}
              placeholder="e.g. Lead Software Engineer & Full Stack Architect"
              className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none font-medium"
            />
            {errors.title && (
              <span className="text-xs text-brutalist-pink font-bold">{errors.title.message}</span>
            )}
          </div>

          {/* Bio / Hero Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase text-foreground">Hero Introduction Bio *</label>
            <textarea
              rows={4}
              {...register('bio')}
              placeholder="Building premium web experiences at the intersection of high-fidelity interaction, elegant visual design, and clean scalable code. Award-winning aesthetics meets peak performance."
              className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none leading-relaxed"
            />
            {errors.bio && (
              <span className="text-xs text-brutalist-pink font-bold">{errors.bio.message}</span>
            )}
          </div>

          {/* Resume URL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase text-foreground">Resume / CV Link</label>
            <input
              type="text"
              {...register('resume_url')}
              placeholder="https://example.com/resume.pdf or #"
              className="w-full px-4 py-3 brutalist-border rounded-xl bg-background text-sm text-foreground focus:outline-none"
            />
          </div>

          {/* Preview Box */}
          <div className="p-4 rounded-xl bg-muted/20 border border-border-color/20 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Sync Notice</span>
            </div>
            <p className="text-xs text-foreground/70 leading-relaxed">
              Updating this form modifies the row in Supabase <code className="text-sky-300 font-mono">public.profiles</code> and revalidates the homepage instantly.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3.5 rounded-xl font-black uppercase brutalist-border bg-brutalist-yellow hover:bg-brutalist-pink hover:text-white text-brutalist-dark transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer brutalist-shadow-black disabled:opacity-50"
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
