import { getCategories } from '@/app/actions';
import ProjectForm from '@/components/portfolio/project-form';

export const revalidate = 0;

export default async function NewProjectPage() {
  const categories = await getCategories();

  return <ProjectForm categories={categories} />;
}
