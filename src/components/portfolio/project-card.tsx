'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export type ProjectType = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  thumbnail_url: string;
  project_date: string;
  categories?: { name: string } | null;
  project_technologies?: { technologies: { name: string } }[] | null;
  featured?: boolean;
};

type ProjectCardProps = {
  project: ProjectType;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  // Alternate tilt rotations for brutalism vibe
  const rotateAngle = index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1';
  
  // Extract year
  const year = project.project_date 
    ? new Date(project.project_date).getFullYear().toString() 
    : '2026';

  const categoryName = project.categories?.name || 'Development';

  // Get up to 3 technologies
  const techs = project.project_technologies
    ?.map((pt) => pt.technologies.name)
    .slice(0, 3) || ['React', 'Next.js', 'Tailwind'];

  // Playful colors for flat shadows on hover
  const shadowColors = [
    'hover:shadow-[8px_8px_0px_0px_#ffe600]', // Yellow
    'hover:shadow-[8px_8px_0px_0px_#ff007a]', // Pink
    'hover:shadow-[8px_8px_0px_0px_#0057ff]', // Blue
    'hover:shadow-[8px_8px_0px_0px_#ff5c00]', // Orange
  ];
  const hoverShadow = shadowColors[index % shadowColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-5%' }}
      transition={{ 
        duration: 1.0, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] // ultra-smooth deceleration
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="view"
        className={`group block bg-background brutalist-border rounded-2xl p-5 transition-all duration-300 transform brutalist-shadow-black ${rotateAngle} ${hoverShadow} hover:-translate-x-1 hover:-translate-y-1`}
      >
        {/* Card Thumbnail */}
        <div className="relative w-full aspect-[16/10] brutalist-border rounded-xl overflow-hidden mb-5 bg-brutalist-light dark:bg-brutalist-dark">
          {project.thumbnail_url ? (
            <Image
              src={project.thumbnail_url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brutalist-blue to-brutalist-pink text-white font-bold text-lg uppercase font-syne">
              {project.title}
            </div>
          )}
          
          {/* Top-Right Year Stamp */}
          <div className="absolute top-4 right-4 bg-brutalist-dark text-brutalist-light dark:bg-brutalist-light dark:text-brutalist-dark brutalist-border-thin px-3 py-1 text-xs font-black uppercase tracking-wider rounded-md font-space-grotesk">
            {year}
          </div>
        </div>

        {/* Category & Icon Button */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-black uppercase tracking-widest text-brutalist-pink font-space-grotesk">
            {categoryName}
          </span>
          <div className="w-8 h-8 rounded-full brutalist-border-thin flex items-center justify-center bg-background group-hover:bg-brutalist-yellow text-foreground transition-colors duration-200">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Project Title */}
        <h3 className="text-2xl font-black uppercase tracking-tight mb-2 font-syne">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-foreground/80 mb-5 font-space-grotesk line-clamp-2">
          {project.short_description}
        </p>

        {/* Tech Stack List */}
        <div className="flex flex-wrap gap-2 pt-4 border-t brutalist-border-thin border-dashed">
          {techs.map((t, idx) => (
            <span
              key={idx}
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-brutalist-light dark:bg-brutalist-dark brutalist-border-thin rounded-md font-space-grotesk"
            >
              {t}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
