import { getExperiences } from '@/app/actions';
import ExperiencesListClient from './experiences-list-client';

export const revalidate = 0;

export default async function AdminExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="pb-6 border-b border-white/[0.08]">
        <h1 className="text-3xl sm:text-4xl font-black font-syne tracking-tight text-foreground">
          Experiences Directory
        </h1>
        <p className="text-xs sm:text-sm font-space-grotesk text-foreground/60 mt-1.5">
          Manage your career history milestones, company roles, and chronological timeline.
        </p>
      </div>

      {/* Experiences list table */}
      <ExperiencesListClient initialExperiences={experiences} />
    </div>
  );
}
