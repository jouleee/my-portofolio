import { getAdminProjects, getCategories } from '@/app/actions';
import ProjectForm from '@/components/portfolio/project-form';
import { notFound } from 'next/navigation';

type EditPageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 0;

export default async function EditProjectPage({ params }: EditPageProps) {
  const { id } = await params;
  const [projects, categories] = await Promise.all([
    getAdminProjects(),
    getCategories(),
  ]);

  const project = projects.find((p: any) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectForm project={project} categories={categories} />;
}
