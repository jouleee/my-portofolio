import Header from '@/components/portfolio/header';
import Hero from '@/components/portfolio/hero';
import About from '@/components/portfolio/about';
import Experience from '@/components/portfolio/experience';
import ProjectsShowcase from '@/components/portfolio/projects-showcase';
import ContactForm from '@/components/portfolio/contact-form';
import Footer from '@/components/portfolio/footer';
import {
  getProfile,
  getExperiences,
  getSkills,
  getProjects,
} from '@/app/actions';

export const revalidate = 60; // short cache revalidation time for dynamic dashboard sync

export default async function HomePage() {
  // Fetch data concurrently on the server
  const [profile, experiences, skills, projects] = await Promise.all([
    getProfile(),
    getExperiences(),
    getSkills(),
    getProjects(),
  ]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-clip bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="flex-1 w-full">
        {/* Direct Personal Introduction with Focal Photo and Multi-Layer Parallax */}
        <Hero profile={profile} />

        {/* Technical Stack, Architecture & Engineering Principles - Directly following Hero */}
        <About profile={profile} skills={skills} />

        {/* Work Experience with Scroll Progress Timeline */}
        <Experience experiences={experiences} />

        {/* Curated Works & Projects */}
        <ProjectsShowcase projects={projects} />

        {/* Contact & Inquiry */}
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
