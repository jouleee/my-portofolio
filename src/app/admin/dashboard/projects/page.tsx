import { getAdminProjects } from '@/app/actions';
import ProjectsListClient from './projects-list-client';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b-2 border-dashed border-border-color/20">
        <div className="font-space-grotesk">
          <h1 className="text-3xl font-black uppercase font-syne tracking-tight">Projects Directory</h1>
          <p className="text-sm font-bold text-foreground/50 mt-1 uppercase">Manage details, order, and toggle visibility</p>
        </div>
      </div>

      {/* Dynamic Projects List table */}
      <ProjectsListClient initialProjects={projects} />
    </div>
  );
}
