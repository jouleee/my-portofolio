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
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About profile={profile} skills={skills} />
        <Experience experiences={experiences} />
        <ProjectsShowcase projects={projects} />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
