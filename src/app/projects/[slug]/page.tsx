import { getProjectBySlug, getProjects } from '@/app/actions';
import Image from 'next/image';
import Link from 'next/link';
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
  
  // Fetch database queries concurrently to reduce query latency by half
  const [project, projects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  // Find next project for the teaser footer
  const currentIndex = projects.findIndex((p: any) => p.slug === slug);
  const nextProject = projects[currentIndex !== -1 ? (currentIndex + 1) % projects.length : 0];

  const year = project.project_date 
    ? new Date(project.project_date).getFullYear().toString() 
    : '2026';

  const categoryName = project.categories?.name || 'Development';
  
  // Extract technologies
  const techs = project.project_technologies?.map((pt: any) => pt.technologies.name) || ['React', 'Next.js'];

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
            <div className="w-10 h-10 rounded-xl bg-brutalist-yellow/20 brutalist-border-thin flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-brutalist-dark dark:text-brutalist-light" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-foreground/50 block">Role</span>
              <span className="text-sm font-bold uppercase">{project.role || 'Lead Architect'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-space-grotesk">
            <div className="w-10 h-10 rounded-xl bg-brutalist-pink/20 brutalist-border-thin flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-brutalist-dark dark:text-brutalist-light" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-foreground/50 block">Client</span>
              <span className="text-sm font-bold uppercase">{project.client || 'Creative Studio'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-space-grotesk">
            <div className="w-10 h-10 rounded-xl bg-brutalist-blue/20 brutalist-border-thin flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-brutalist-dark dark:text-brutalist-light" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-foreground/50 block">Duration</span>
              <span className="text-sm font-bold uppercase">{project.duration || '3 Months'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-space-grotesk">
            <div className="w-10 h-10 rounded-xl bg-brutalist-green/20 brutalist-border-thin flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-brutalist-dark dark:text-brutalist-light" />
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

          {/* Links and Tech Stack */}
          <div className="lg:col-span-4 space-y-8 font-space-grotesk">
            {/* Action buttons */}
            <div className="space-y-4">
              <h3 className="text-md font-black uppercase tracking-wider text-foreground/50">Actions</h3>
              
              {project.demo_url && (
                <Magnetic>
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-5 py-3.5 bg-brutalist-yellow text-brutalist-dark brutalist-border font-syne font-black uppercase rounded-xl flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_#0f0f0f] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[5px_5px_0px_0px_#0f0f0f] transition-all cursor-pointer"
                    data-cursor="pointer"
                  >
                    <Globe className="w-5 h-5" />
                    Live Demo
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                </Magnetic>
              )}

              {project.github_url && (
                <Magnetic>
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-5 py-3.5 bg-background text-foreground brutalist-border font-syne font-black uppercase rounded-xl flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_var(--border-color)] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[5px_5px_0px_0px_var(--border-color)] transition-all cursor-pointer"
                    data-cursor="pointer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Source Code
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                </Magnetic>
              )}
            </div>

            {/* Tech Stack */}
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
        <div className="pt-12 border-t-4 border-brutalist-dark dark:border-brutalist-light mb-12">
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
      </main>

      <Footer />
    </div>
  );
}
