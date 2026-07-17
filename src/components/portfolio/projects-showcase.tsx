'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard, { ProjectType } from '@/components/portfolio/project-card';
import ScrollReveal from '@/components/portfolio/scroll-reveal';

type ProjectsShowcaseProps = {
  projects: ProjectType[];
};

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique category names from projects
  const categories = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.categories?.name || 'Development'))),
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => (p.categories?.name || 'Development') === selectedCategory);

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header & Filtering Controls */}
        <ScrollReveal yOffset={35}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="text-sm font-black uppercase tracking-widest text-brutalist-pink font-space-grotesk block mb-2">
                My Works
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase font-syne tracking-tight">
                Projects Showcase
              </h2>
            </div>

          {/* Filtering Tab Triggers */}
          <div className="flex flex-wrap gap-3 font-space-grotesk">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg brutalist-border-thin shadow-[2px_2px_0px_0px_var(--border-color)] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brutalist-pink text-white translate-x-[-1px] translate-y-[-1px] shadow-[3px_3px_0px_0px_var(--border-color)]'
                      : 'bg-background text-foreground hover:bg-muted dark:hover:bg-muted/10'
                  }`}
                  data-cursor="pointer"
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

        {/* Project Grid with Framer Motion AnimatePresence Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 brutalist-border rounded-2xl bg-muted/10 dark:bg-muted/5">
            <p className="text-lg font-space-grotesk font-black uppercase">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
