import { getProjectBySlug, getProjects } from '@/app/actions';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/portfolio/header';
import Footer from '@/components/portfolio/footer';
import Magnetic from '@/components/portfolio/magnetic';
import { ArrowLeft, ArrowRight, ExternalLink, Globe, Calendar, User, Briefcase, Clock } from 'lucide-react';
import ScrollProgress from '@/components/portfolio/scroll-progress';

export const revalidate = 60; // Cache pages and revalidate in the background (ISR)

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  
  let project;
  let projects: any[] = [];
  let isError = false;
  
  try {
    const [fetchedProject, fetchedProjects] = await Promise.all([
      getProjectBySlug(slug),
      getProjects(),
    ]);
    project = fetchedProject;
    projects = fetchedProjects;
  } catch (err) {
    console.error('Failed to load project details:', err);
    isError = true;
  }

  if (isError || !project) {
    notFound();
  }

  // Find next project for the teaser footer
  const currentIndex = projects.findIndex((p: any) => p.slug === slug);
  const nextProject = projects.length > 0 
    ? projects[currentIndex !== -1 ? (currentIndex + 1) % projects.length : 0]
    : null;

  const year = project.project_date 
    ? new Date(project.project_date).getFullYear().toString() 
    : '2026';

  const categoryName = project.categories?.name || 'Development';
  
  // Extract technologies
  const techs = project.project_technologies
    ?.map((pt: any) => pt.technologies?.name)
    .filter((name: any): name is string => typeof name === 'string') || ['React', 'Next.js'];

  return (
    <div className="relative min-h-screen flex flex-col">
      <ScrollProgress />
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-space-grotesk font-black uppercase text-sm brutalist-border-thin px-4 py-2 bg-background hover:bg-brutalist-pink hover:text-white transition-colors duration-200 rounded-lg"
            data-cursor="pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>

        {/* Project Header Banner */}
        <div className="relative w-full aspect-[21/9] brutalist-border rounded-2xl overflow-hidden mb-12 bg-brutalist-light dark:bg-brutalist-dark">
          {project.thumbnail_url ? (
            <Image
              src={project.thumbnail_url}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-tr from-brutalist-yellow via-brutalist-pink to-brutalist-blue flex items-center justify-center">
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-syne text-center px-4 drop-shadow-[2px_2px_0px_#000]">
                {project.title}
              </h1>
            </div>
          )}
        </div>

        {/* Project Title & Short Description */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-brutalist-pink text-white rounded-md brutalist-border-thin font-space-grotesk">
              {categoryName}
            </span>
            <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-brutalist-yellow text-brutalist-dark rounded-md brutalist-border-thin font-space-grotesk">
              {year}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase font-syne tracking-tight mb-6">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl font-space-grotesk font-bold text-foreground/85 leading-relaxed">
            {project.short_description}
          </p>
        </div>

        {/* Project Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 brutalist-border rounded-2xl p-6 mb-12 bg-background brutalist-shadow-black">
          <div className="flex items-center gap-3 font-space-grotesk">
            <div className="w-10 h-10 rounded-xl bg-brutalist-yellow/40 brutalist-border-thin flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-brutalist-dark stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-foreground/50 block">Role</span>
              <span className="text-sm font-bold uppercase">{project.role || 'Lead Architect'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-space-grotesk">
            <div className="w-10 h-10 rounded-xl bg-brutalist-pink/40 brutalist-border-thin flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-brutalist-dark stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-foreground/50 block">Client</span>
              <span className="text-sm font-bold uppercase">{project.client || 'Creative Studio'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-space-grotesk">
            <div className="w-10 h-10 rounded-xl bg-brutalist-blue/40 brutalist-border-thin flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-brutalist-dark stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-foreground/50 block">Duration</span>
              <span className="text-sm font-bold uppercase">{project.duration || '3 Months'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-space-grotesk">
            <div className="w-10 h-10 rounded-xl bg-brutalist-green/40 brutalist-border-thin flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-brutalist-dark stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-foreground/50 block">Status</span>
              <span className="text-sm font-bold uppercase">{project.status === 'published' ? 'Active' : 'Draft'}</span>
            </div>
          </div>
        </div>

        {/* Project Description Detail & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-8 font-space-grotesk">
            <h2 className="text-2xl font-black uppercase font-syne mb-4">Project Overview</h2>
            <p className="text-foreground/80 leading-relaxed font-bold mb-8">
              {project.description || 'Full detailed description of the project, including methodologies, challenges, technology integrations, and product architecture outline.'}
            </p>

            {/* Challenges & Solutions */}
            {project.challenge && (
              <div className="space-y-6 pt-6 border-t-2 border-dashed border-border-color/20">
                <div>
                  <h3 className="text-xl font-black uppercase text-brutalist-pink font-syne mb-2">The Challenge</h3>
                  <p className="text-foreground/80 font-bold leading-relaxed">{project.challenge}</p>
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase text-brutalist-green font-syne mb-2">The Solution</h3>
                  <p className="text-foreground/80 font-bold leading-relaxed">{project.solution}</p>
                </div>
              </div>
            )}
          </div>

          {/* Technologies Used */}
          <div className="lg:col-span-4 space-y-8 font-space-grotesk">
            <div>
              <h3 className="text-md font-black uppercase tracking-wider text-foreground/50 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {techs.map((t: any, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-background brutalist-border-thin rounded-lg text-xs font-black uppercase tracking-wider font-space-grotesk"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        {project.project_images && project.project_images.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-black uppercase font-syne mb-8">Visual Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.project_images.map((img: any, idx: number) => (
                <div key={img.id || idx} className="relative w-full aspect-[4/3] brutalist-border rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={img.image_url}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Project Teaser Navigation */}
        {nextProject && (
          <div className="pt-12 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-brutalist-pink font-space-grotesk block mb-2">
              Up Next
            </span>
            
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-brutalist-blue text-white brutalist-border rounded-2xl p-8 shadow-[6px_6px_0px_0px_var(--border-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_var(--border-color)] transition-all"
              data-cursor="pink-view"
            >
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-brutalist-yellow font-space-grotesk mb-1 block">
                  {nextProject.categories?.name || 'Development'}
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase font-syne tracking-tight group-hover:text-brutalist-yellow transition-colors duration-200">
                  {nextProject.title}
                </h2>
              </div>
              
              <div className="w-14 h-14 rounded-full brutalist-border-thin flex items-center justify-center bg-white text-brutalist-dark group-hover:bg-brutalist-yellow transition-colors duration-200 shrink-0">
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
