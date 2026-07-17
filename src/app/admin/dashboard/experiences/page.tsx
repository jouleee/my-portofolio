import { getExperiences } from '@/app/actions';
import ExperiencesListClient from './experiences-list-client';

export const revalidate = 0;

export default async function AdminExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b-2 border-dashed border-border-color/20">
        <div className="font-space-grotesk">
          <h1 className="text-3xl font-black uppercase font-syne tracking-tight">Experiences Directory</h1>
          <p className="text-sm font-bold text-foreground/50 mt-1 uppercase">Manage career history timeline</p>
        </div>
      </div>

      {/* Experiences list table */}
      <ExperiencesListClient initialExperiences={experiences} />
    </div>
  );
}
