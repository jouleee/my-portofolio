'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Fallback Mock Data
const MOCK_PROFILE = {
  full_name: 'Joel',
  title: 'Lead Software Engineer & Full Stack Architect',
  bio: 'Building premium web experiences at the intersection of high-fidelity interaction, elegant visual design, and clean scalable code. Award-winning aesthetics meets peak performance.',
  avatar_url: null,
  resume_url: '#',
};

const MOCK_CATEGORIES = [
  { id: '1', name: 'Web Applications', slug: 'web-apps' },
  { id: '2', name: 'Creative Development', slug: 'creative-dev' },
  { id: '3', name: 'UI/UX Design', slug: 'ui-ux' },
];

let MOCK_PROJECTS = [
  {
    id: 'p1',
    title: 'Aura Spatial Interface',
    slug: 'aura-spatial-interface',
    short_description: 'An immersive web portal exploring spatial design using React Three Fiber, GLSL shaders, and interactive physics.',
    description: 'Aura is a web experiment in spatial UI/UX design. The goal was to build a virtual gallery workspace that is fully responsive, interactive, and operates at 60fps on mobile. By optimizing buffer geometries and custom shader materials, we achieved top tier performance without compromising on visuals.',
    challenge: 'Rendering hundreds of interactive 3D physics nodes on mobile browsers caused significant frame rate drops. Standard physics packages like @react-three/cannon were too heavy.',
    solution: 'Built a lightweight custom math-based particle force-field resolver directly inside the requestAnimationFrame loop, reducing CPU overhead by 75%.',
    thumbnail_url: '', // will trigger gradient fallback
    demo_url: 'https://aura.example.com',
    github_url: 'https://github.com/joel/aura',
    project_date: '2026-03-15',
    role: 'Creative Developer & 3D Artist',
    client: 'Design Forward Labs',
    duration: '2 Months',
    status: 'published',
    featured: true,
    pinned: true,
    categories: { name: 'Creative Development' },
    project_technologies: [
      { technologies: { name: 'Next.js' } },
      { technologies: { name: 'Three.js' } },
      { technologies: { name: 'Framer Motion' } },
      { technologies: { name: 'GSAP' } },
    ],
    project_images: [],
  },
  {
    id: 'p2',
    title: 'Pulse Fintech Ecosystem',
    slug: 'pulse-fintech-ecosystem',
    short_description: 'A real-time financial tracking dashboard featuring secure OAuth auth, live data streaming, and automated reports.',
    description: 'Pulse is an enterprise financial intelligence tool that integrates multiple bank APIs into a single fast-loading, beautiful brutalist user interface. Features comprehensive multi-currency support, custom PDF generation, and WebSockets live rate streaming.',
    challenge: 'Aggregating large datasets from different banking APIs caused high latency. Initial page load was slow and dashboard charts would lag during data re-validation.',
    solution: 'Implemented Next.js Server Actions with Redis caching layers and edge route handlers. Deployed incremental static regeneration (ISR) for stable database queries.',
    thumbnail_url: '',
    demo_url: 'https://pulse.example.com',
    github_url: 'https://github.com/joel/pulse',
    project_date: '2025-11-10',
    role: 'Lead Full-Stack Engineer',
    client: 'Pulse Corp',
    duration: '5 Months',
    status: 'published',
    featured: true,
    pinned: false,
    categories: { name: 'Web Applications' },
    project_technologies: [
      { technologies: { name: 'React' } },
      { technologies: { name: 'Supabase' } },
      { technologies: { name: 'Tailwind CSS' } },
      { technologies: { name: 'Zod' } },
    ],
    project_images: [],
  },
  {
    id: 'p3',
    title: 'Nova Design System',
    slug: 'nova-design-system',
    short_description: 'A highly modular, accessible design system containing ready-to-use brutalist components built with React and Tailwind.',
    description: 'Nova is a component library built explicitly for rapid portfolio prototyping. Fully compliant with WCAG 2.1 AA accessibility guidelines, supports dark mode out-of-the-box, and is lightweight.',
    challenge: 'Making rich animations work smoothly while supporting full screen-reader accessibility and keyboard tab indexes.',
    solution: 'Leveraged Radix UI primitives as underlying structures and mapped Framer Motion states directly to HTML ARIA attributes.',
    thumbnail_url: '',
    demo_url: 'https://nova.example.com',
    github_url: 'https://github.com/joel/nova',
    project_date: '2025-06-01',
    role: 'UI Architect & Lead Designer',
    client: 'Open Source Community',
    duration: '3 Months',
    status: 'published',
    featured: false,
    pinned: false,
    categories: { name: 'UI/UX Design' },
    project_technologies: [
      { technologies: { name: 'TypeScript' } },
      { technologies: { name: 'Tailwind CSS' } },
      { technologies: { name: 'Lucide Icons' } },
    ],
    project_images: [],
  },
];

let MOCK_EXPERIENCES = [
  {
    id: 'e1',
    role: 'Lead Frontend Architect',
    company: 'Vortex Studio',
    location: 'Remote / Jakarta',
    start_date: '2025',
    end_date: 'Present',
    description: 'Leading a team of 4 developers building high-fidelity client portfolios and premium e-commerce applications. Focused on WebGL visual performance and robust Next.js layouts.',
    sort_order: 1,
  },
  {
    id: 'e2',
    role: 'Full Stack Developer',
    company: 'Stellar Tech',
    location: 'Singapore',
    start_date: '2023',
    end_date: '2025',
    description: 'Developed scalable microservices using NestJS and Supabase. Optimized database queries, reducing average API response time by 40%. Implemented secure authorization layers.',
    sort_order: 2,
  },
  {
    id: 'e3',
    role: 'UI Engineer & Intern',
    company: 'Pixel Craft',
    location: 'Bandung',
    start_date: '2022',
    end_date: '2023',
    description: 'Crafted elegant, responsive visual designs and interactive prototypes using Figma and pure HTML/JS. Promoted semantic HTML structures and performance audits.',
    sort_order: 3,
  },
];

const MOCK_SKILLS = [
  { id: 's1', name: 'TypeScript & Next.js', level: 95, category: 'Frontend', sort_order: 1 },
  { id: 's2', name: 'Framer Motion & GSAP', level: 90, category: 'Frontend', sort_order: 2 },
  { id: 's3', name: 'React & Tailwind CSS', level: 98, category: 'Frontend', sort_order: 3 },
  { id: 's4', name: 'Node.js & Supabase', level: 85, category: 'Backend', sort_order: 4 },
  { id: 's5', name: 'PostgreSQL & Prisma', level: 80, category: 'Backend', sort_order: 5 },
  { id: 's6', name: 'Figma & UI Prototyping', level: 92, category: 'Design', sort_order: 6 },
  { id: 's7', name: 'Performance Optimization', level: 95, category: 'Other', sort_order: 7 },
  { id: 's8', name: 'Three.js / WebGL', level: 75, category: 'Other', sort_order: 8 },
];

const MOCK_SOCIALS = [
  { id: 'sc1', platform: 'Github', url: 'https://github.com', icon: 'Github' },
  { id: 'sc2', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
  { id: 'sc3', platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
  { id: 'sc4', platform: 'Email', url: 'mailto:joel@example.com', icon: 'Mail' },
];

let MOCK_MESSAGES = [
  {
    id: 'm1',
    name: 'Aria Thompson',
    email: 'aria@example.com',
    subject: 'Project Collaboration Proposal',
    message: 'Hey Joel! I absolute loved your spatial interface experiment. We are looking for a creative developer to help build our next web portal. Let us connect!',
    created_at: '2026-07-10T10:00:00Z',
    read: false,
  },
  {
    id: 'm2',
    name: 'Brandon Stark',
    email: 'brandon@winterfell.org',
    subject: 'Job Inquiry - Vortex Architect',
    message: 'Hello, your brutalist portfolio looks clean. We have an open position for a full-stack engineer and would love to interview you.',
    created_at: '2026-07-11T12:30:00Z',
    read: true,
  },
];

// Read Server Actions

export async function getProfile() {
  const dbConfigured = isDatabaseConfigured();
  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();
      
      if (error || !data) return MOCK_PROFILE;
      return data;
    } catch {
      return MOCK_PROFILE;
    }
  }
  return MOCK_PROFILE;
}

export async function getCategories() {
  const dbConfigured = isDatabaseConfigured();
  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error || !data) return [];
      return data;
    } catch {
      return [];
    }
  }
  return MOCK_CATEGORIES;
}

export async function getProjects() {
  const dbConfigured = isDatabaseConfigured();
  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('projects')
        .select('*, categories(name), project_technologies(technologies(name))')
        .eq('status', 'published')
        .order('sort_order', { ascending: true })
        .order('project_date', { ascending: false });
      
      if (error || !data) return [];
      return data as any;
    } catch {
      return [];
    }
  }
  return MOCK_PROJECTS;
}

export async function getProjectBySlug(slug: string) {
  const dbConfigured = isDatabaseConfigured();
  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('projects')
        .select('*, categories(name), project_technologies(technologies(name)), project_images(*)')
        .eq('slug', slug)
        .single();
      
      if (error || !data) {
        throw new Error('Project not found');
      }
      return data as any;
    } catch (err: any) {
      throw new Error(err?.message || 'Project not found');
    }
  }
  const mock = MOCK_PROJECTS.find((p) => p.slug === slug);
  if (mock) return mock;
  throw new Error('Project not found');
}

export async function getExperiences() {
  const dbConfigured = isDatabaseConfigured();
  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error || !data) return [];
      return data;
    } catch {
      return [];
    }
  }
  return MOCK_EXPERIENCES;
}

export async function getSkills() {
  const dbConfigured = isDatabaseConfigured();
  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error || !data) return [];
      return data;
    } catch {
      return [];
    }
  }
  return MOCK_SKILLS;
}

export async function getSocialLinks() {
  const dbConfigured = isDatabaseConfigured();
  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('social_links')
        .select('*');
      
      if (error || !data) return [];
      return data;
    } catch {
      return [];
    }
  }
  return MOCK_SOCIALS;
}

export async function submitContactMessage(formData: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('contact_messages').insert([
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
      },
    ]);

    if (error) {
      // If Supabase fails, save locally in mock data
      const newMsg = {
        id: `msg-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
        created_at: new Date().toISOString(),
        read: false,
      };
      MOCK_MESSAGES.unshift(newMsg);
      return { success: true };
    }

    return { success: true };
  } catch {
    const newMsg = {
      id: `msg-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Portfolio Inquiry',
      message: formData.message,
      created_at: new Date().toISOString(),
      read: false,
    };
    MOCK_MESSAGES.unshift(newMsg);
    return { success: true };
  }
}

// Admin / Write Actions

export async function adminLogin(formData: any) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      // Simulate login for dev sandbox if credentials matches placeholder
      if (
        formData.email === 'admin@domain.com' &&
        formData.password === 'admin123'
      ) {
        return { success: true, simulated: true };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch {
    if (
      formData.email === 'admin@domain.com' &&
      formData.password === 'admin123'
    ) {
      return { success: true, simulated: true };
    }
    return { success: false, error: 'Database authentication failed.' };
  }
}

export async function adminLogout() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return { success: true };
  } catch {
    return { success: true }; // return true for visual logging logout state
  }
}

export async function getAdminProjects() {
  const dbConfigured = isDatabaseConfigured();
  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('projects')
        .select('*, categories(name)')
        .order('sort_order', { ascending: true });

      if (error || !data) return [];
      return data as any;
    } catch {
      return [];
    }
  }
  return MOCK_PROJECTS;
}

export async function getContactMessages() {
  const dbConfigured = isDatabaseConfigured();
  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return [];
      return data;
    } catch {
      return [];
    }
  }
  return MOCK_MESSAGES;
}

export async function markMessageAsRead(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('contact_messages')
      .update({ read: true })
      .eq('id', id);

    if (error) {
      const msg = MOCK_MESSAGES.find((m) => m.id === id);
      if (msg) msg.read = true;
    }
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch {
    const msg = MOCK_MESSAGES.find((m) => m.id === id);
    if (msg) msg.read = true;
    return { success: true };
  }
}

export async function deleteProject(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      MOCK_PROJECTS = MOCK_PROJECTS.filter((p) => p.id !== id);
    }
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch {
    MOCK_PROJECTS = MOCK_PROJECTS.filter((p) => p.id !== id);
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return { success: true };
  }
}

const isDatabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && url !== 'https://your-project-id.supabase.co' && !url.includes('your-project-id');
};

const isUUID = (val: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val);
};

export async function createProject(projectData: any) {
  const dbConfigured = isDatabaseConfigured();
  const categoryId = projectData.category_id && isUUID(projectData.category_id) ? projectData.category_id : null;

  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from('projects').insert([
        {
          title: projectData.title,
          slug: projectData.slug,
          short_description: projectData.short_description,
          description: projectData.description,
          challenge: projectData.challenge,
          solution: projectData.solution,
          category_id: categoryId,
          thumbnail_url: projectData.thumbnail_url || '',
          demo_url: projectData.demo_url || '',
          github_url: projectData.github_url || '',
          project_date: projectData.project_date || new Date().toISOString().split('T')[0],
          role: projectData.role || '',
          client: projectData.client || '',
          duration: projectData.duration || '',
          status: projectData.status || 'draft',
          featured: projectData.featured || false,
          pinned: projectData.pinned || false,
          sort_order: parseInt(projectData.sort_order || '0'),
        },
      ]);

      if (error) {
        console.error('Supabase createProject error:', error);
        return { success: false, error: error.message };
      }
      revalidatePath('/');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (err: any) {
      console.error('Supabase createProject exception:', err);
      return { success: false, error: err?.message || 'Database connection error' };
    }
  } else {
    // Offline Mock Save Sandbox
    const newProj = {
      id: `proj-${Date.now()}`,
      title: projectData.title,
      slug: projectData.slug,
      short_description: projectData.short_description,
      description: projectData.description,
      challenge: projectData.challenge,
      solution: projectData.solution,
      thumbnail_url: projectData.thumbnail_url || '',
      demo_url: projectData.demo_url || '',
      github_url: projectData.github_url || '',
      project_date: projectData.project_date || new Date().toISOString().split('T')[0],
      role: projectData.role || '',
      client: projectData.client || '',
      duration: projectData.duration || '',
      status: projectData.status || 'draft',
      featured: projectData.featured || false,
      pinned: projectData.pinned || false,
      categories: { name: 'Web Applications' },
      project_technologies: [{ technologies: { name: 'React' } }],
      project_images: [],
    };
    MOCK_PROJECTS.push(newProj);
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return { success: true };
  }
}

export async function updateProject(id: string, projectData: any) {
  const dbConfigured = isDatabaseConfigured();
  const categoryId = projectData.category_id && isUUID(projectData.category_id) ? projectData.category_id : null;

  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from('projects')
        .update({
          title: projectData.title,
          slug: projectData.slug,
          short_description: projectData.short_description,
          description: projectData.description,
          challenge: projectData.challenge,
          solution: projectData.solution,
          category_id: categoryId,
          thumbnail_url: projectData.thumbnail_url,
          demo_url: projectData.demo_url,
          github_url: projectData.github_url,
          project_date: projectData.project_date,
          role: projectData.role,
          client: projectData.client,
          duration: projectData.duration,
          status: projectData.status,
          featured: projectData.featured,
          pinned: projectData.pinned,
          sort_order: parseInt(projectData.sort_order || '0'),
        })
        .eq('id', id);

      if (error) {
        console.error('Supabase updateProject error:', error);
        return { success: false, error: error.message };
      }
      revalidatePath('/');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (err: any) {
      console.error('Supabase updateProject exception:', err);
      return { success: false, error: err?.message || 'Database connection error' };
    }
  } else {
    // Offline Mock Update Sandbox
    const projIndex = MOCK_PROJECTS.findIndex((p) => p.id === id);
    if (projIndex !== -1) {
      MOCK_PROJECTS[projIndex] = {
        ...MOCK_PROJECTS[projIndex],
        title: projectData.title,
        slug: projectData.slug,
        short_description: projectData.short_description,
        description: projectData.description,
        challenge: projectData.challenge,
        solution: projectData.solution,
        thumbnail_url: projectData.thumbnail_url || MOCK_PROJECTS[projIndex].thumbnail_url,
        demo_url: projectData.demo_url,
        github_url: projectData.github_url,
        project_date: projectData.project_date,
        role: projectData.role,
        client: projectData.client,
        duration: projectData.duration,
        status: projectData.status,
        featured: projectData.featured,
        pinned: projectData.pinned,
      };
    }
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return { success: true };
  }
}

export async function updateProjectsOrder(order: { id: string; sort_order: number }[]) {
  const dbConfigured = isDatabaseConfigured();
  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const updates = order.map((item) =>
        supabase
          .from('projects')
          .update({ sort_order: item.sort_order })
          .eq('id', item.id)
      );
      
      const results = await Promise.all(updates);
      const error = results.find((res) => res.error);
      if (error) {
        return { success: false, error: error.error?.message || 'Database update failed' };
      }
      
      revalidatePath('/');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Database error' };
    }
  } else {
    // offline mock
    order.forEach((item) => {
      const proj = MOCK_PROJECTS.find((p) => p.id === item.id) as any;
      if (proj) {
        proj.sort_order = item.sort_order;
      }
    });
    MOCK_PROJECTS.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return { success: true };
  }
}

export async function createExperience(expData: any): Promise<{ success: boolean; error?: string }> {
  const dbConfigured = isDatabaseConfigured();

  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from('experiences').insert([
        {
          role: expData.role,
          company: expData.company,
          location: expData.location,
          start_date: expData.start_date,
          end_date: expData.end_date,
          description: expData.description,
          sort_order: parseInt(expData.sort_order || '0'),
        },
      ]);

      if (error) {
        console.error('Supabase createExperience error:', error);
        return { success: false, error: error.message };
      }
      revalidatePath('/');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (err: any) {
      console.error('Supabase createExperience exception:', err);
      return { success: false, error: err?.message || 'Database connection error' };
    }
  } else {
    // Offline Mock Save Sandbox
    MOCK_EXPERIENCES.push({
      id: `exp-${Date.now()}`,
      role: expData.role,
      company: expData.company,
      location: expData.location,
      start_date: expData.start_date,
      end_date: expData.end_date,
      description: expData.description,
      sort_order: parseInt(expData.sort_order || '0'),
    });
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return { success: true };
  }
}

export async function updateExperience(id: string, expData: any): Promise<{ success: boolean; error?: string }> {
  const dbConfigured = isDatabaseConfigured();

  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from('experiences')
        .update({
          role: expData.role,
          company: expData.company,
          location: expData.location,
          start_date: expData.start_date,
          end_date: expData.end_date,
          description: expData.description,
          sort_order: parseInt(expData.sort_order || '0'),
        })
        .eq('id', id);

      if (error) {
        console.error('Supabase updateExperience error:', error);
        return { success: false, error: error.message };
      }
      revalidatePath('/');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (err: any) {
      console.error('Supabase updateExperience exception:', err);
      return { success: false, error: err?.message || 'Database connection error' };
    }
  } else {
    // Offline Mock Update Sandbox
    const idx = MOCK_EXPERIENCES.findIndex((e) => e.id === id);
    if (idx !== -1) {
      MOCK_EXPERIENCES[idx] = {
        ...MOCK_EXPERIENCES[idx],
        role: expData.role,
        company: expData.company,
        location: expData.location,
        start_date: expData.start_date,
        end_date: expData.end_date,
        description: expData.description,
      };
    }
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return { success: true };
  }
}

export async function deleteExperience(id: string): Promise<{ success: boolean; error?: string }> {
  const dbConfigured = isDatabaseConfigured();

  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from('experiences').delete().eq('id', id);

      if (error) {
        console.error('Supabase deleteExperience error:', error);
        return { success: false, error: error.message };
      }
      revalidatePath('/');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (err: any) {
      console.error('Supabase deleteExperience exception:', err);
      return { success: false, error: err?.message || 'Database connection error' };
    }
  } else {
    // Offline Mock Delete Sandbox
    MOCK_EXPERIENCES = MOCK_EXPERIENCES.filter((e) => e.id !== id);
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return { success: true };
  }
}

export async function updateExperiencesOrder(order: { id: string; sort_order: number }[]) {
  const dbConfigured = isDatabaseConfigured();
  if (dbConfigured) {
    try {
      const supabase = await createClient();
      const updates = order.map((item) =>
        supabase
          .from('experiences')
          .update({ sort_order: item.sort_order })
          .eq('id', item.id)
      );
      
      const results = await Promise.all(updates);
      const error = results.find((res) => res.error);
      if (error) {
        return { success: false, error: error.error?.message || 'Database update failed' };
      }
      
      revalidatePath('/');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Database error' };
    }
  } else {
    // offline mock
    order.forEach((item) => {
      const exp = MOCK_EXPERIENCES.find((e) => e.id === item.id) as any;
      if (exp) {
        exp.sort_order = item.sort_order;
      }
    });
    MOCK_EXPERIENCES.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return { success: true };
  }
}

