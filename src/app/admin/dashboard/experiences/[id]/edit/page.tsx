import { getExperiences } from '@/app/actions';
import ExperienceForm from '@/components/portfolio/experience-form';
import { notFound } from 'next/navigation';

type EditExpPageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 0;

export default async function EditExperiencePage({ params }: EditExpPageProps) {
  const { id } = await params;
  const experiences = await getExperiences();

  const exp = experiences.find((e: any) => e.id === id);

  if (!exp) {
    notFound();
  }

  return <ExperienceForm experience={exp} />;
}
