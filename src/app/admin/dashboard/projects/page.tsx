import { getAdminProjects } from '@/app/actions';
import ProjectsListClient from './projects-list-client';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="pb-6 border-b border-white/[0.08]">
        <h1 className="text-3xl sm:text-4xl font-black font-syne tracking-tight text-foreground">
          Projects Directory
        </h1>
        <p className="text-xs sm:text-sm font-space-grotesk text-foreground/60 mt-1.5">
          Manage your published projects portfolio, upload thumbnails, and reorder items.
        </p>
      </div>

      {/* Dynamic Projects List */}
      <ProjectsListClient initialProjects={projects} />
    </div>
  );
}
