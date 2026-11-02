-- ==============================================================================
-- SUPABASE COMPLETE PRODUCTION SCHEMA FOR JOEL'S MODERN PORTFOLIO
-- Execute this entire script in the Supabase Dashboard -> SQL Editor.
-- ==============================================================================

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ==============================================================================
-- 2. TABLES DEFINITIONS
-- ==============================================================================

-- 2.1 Profiles Table (Hero & Bio dynamic content)
create table if not exists public.profiles (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete set null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    full_name text not null default 'Joel',
    title text default 'Lead Software Engineer & Full Stack Architect',
    bio text default 'Building premium web experiences at the intersection of high-fidelity interaction, elegant visual design, and clean scalable code. Award-winning aesthetics meets peak performance.',
    years_experience text default '6+',
    avatar_url text,
    resume_url text default '#'
);

-- Ensure columns exist even if profiles table already existed prior to this update
alter table public.profiles add column if not exists years_experience text default '6+';
alter table public.profiles add column if not exists user_id uuid references auth.users(id) on delete set null;

-- 2.2 Categories Table
create table if not exists public.categories (
    id uuid default gen_random_uuid() primary key,
    name text not null unique,
    slug text not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.3 Technologies Table
create table if not exists public.technologies (
    id uuid default gen_random_uuid() primary key,
    name text not null unique,
    icon_name text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.4 Projects Table
create table if not exists public.projects (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    slug text not null unique,
    short_description text,
    description text,
    challenge text,
    solution text,
    category_id uuid references public.categories(id) on delete set null,
    thumbnail_url text,
    video_url text,
    pdf_url text,
    demo_url text,
    github_url text,
    project_date date default current_date,
    role text,
    client text,
    duration text,
    status text default 'published'::text check (status in ('draft', 'published')),
    featured boolean default false,
    pinned boolean default false,
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.5 Project Images (Gallery)
create table if not exists public.project_images (
    id uuid default gen_random_uuid() primary key,
    project_id uuid references public.projects(id) on delete cascade not null,
    image_url text not null,
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.6 Project Technologies Junction Table
create table if not exists public.project_technologies (
    project_id uuid references public.projects(id) on delete cascade,
    technology_id uuid references public.technologies(id) on delete cascade,
    primary key (project_id, technology_id)
);

-- 2.7 Work Experiences Table
create table if not exists public.experiences (
    id uuid default gen_random_uuid() primary key,
    role text not null,
    company text not null,
    location text,
    start_date text not null,
    end_date text default 'Present'::text,
    description text,
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.8 Skills Table
create table if not exists public.skills (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    level integer default 80 check (level >= 0 and level <= 100),
    category text default 'Frontend'::text check (category in ('Frontend', 'Backend', 'Design', 'Other')),
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.9 Social Links Table
create table if not exists public.social_links (
    id uuid default gen_random_uuid() primary key,
    platform text not null unique,
    url text not null,
    icon text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.10 Contact Messages Table
create table if not exists public.contact_messages (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    subject text,
    message text not null,
    read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.technologies enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.project_technologies enable row level security;
alter table public.experiences enable row level security;
alter table public.skills enable row level security;
alter table public.social_links enable row level security;
alter table public.contact_messages enable row level security;

-- Profiles Policies
drop policy if exists "Allow public read access to profiles" on public.profiles;
create policy "Allow public read access to profiles" on public.profiles
    for select using (true);

drop policy if exists "Allow authenticated admin full access to profiles" on public.profiles;
create policy "Allow authenticated admin full access to profiles" on public.profiles
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Categories Policies
drop policy if exists "Allow public read access to categories" on public.categories;
create policy "Allow public read access to categories" on public.categories
    for select using (true);

drop policy if exists "Allow authenticated admin full access to categories" on public.categories;
create policy "Allow authenticated admin full access to categories" on public.categories
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Technologies Policies
drop policy if exists "Allow public read access to technologies" on public.technologies;
create policy "Allow public read access to technologies" on public.technologies
    for select using (true);

drop policy if exists "Allow authenticated admin full access to technologies" on public.technologies;
create policy "Allow authenticated admin full access to technologies" on public.technologies
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Projects Policies
drop policy if exists "Allow public read access to published projects" on public.projects;
create policy "Allow public read access to published projects" on public.projects
    for select using (status = 'published');

drop policy if exists "Allow authenticated admin full access to projects" on public.projects;
create policy "Allow authenticated admin full access to projects" on public.projects
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Project Images Policies
drop policy if exists "Allow public read access to project_images" on public.project_images;
create policy "Allow public read access to project_images" on public.project_images
    for select using (true);

drop policy if exists "Allow authenticated admin full access to project_images" on public.project_images;
create policy "Allow authenticated admin full access to project_images" on public.project_images
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Project Technologies Policies
drop policy if exists "Allow public read access to project_technologies" on public.project_technologies;
create policy "Allow public read access to project_technologies" on public.project_technologies
    for select using (true);

drop policy if exists "Allow authenticated admin full access to project_technologies" on public.project_technologies;
create policy "Allow authenticated admin full access to project_technologies" on public.project_technologies
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Experiences Policies
drop policy if exists "Allow public read access to experiences" on public.experiences;
create policy "Allow public read access to experiences" on public.experiences
    for select using (true);

drop policy if exists "Allow authenticated admin full access to experiences" on public.experiences;
create policy "Allow authenticated admin full access to experiences" on public.experiences
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Skills Policies
drop policy if exists "Allow public read access to skills" on public.skills;
create policy "Allow public read access to skills" on public.skills
    for select using (true);

drop policy if exists "Allow authenticated admin full access to skills" on public.skills;
create policy "Allow authenticated admin full access to skills" on public.skills
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Social Links Policies
drop policy if exists "Allow public read access to social_links" on public.social_links;
create policy "Allow public read access to social_links" on public.social_links
    for select using (true);

drop policy if exists "Allow authenticated admin full access to social_links" on public.social_links;
create policy "Allow authenticated admin full access to social_links" on public.social_links
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Contact Messages Policies
drop policy if exists "Allow public insert to contact_messages" on public.contact_messages;
create policy "Allow public insert to contact_messages" on public.contact_messages
    for insert with check (true);

drop policy if exists "Allow authenticated admin full access to contact_messages" on public.contact_messages;
create policy "Allow authenticated admin full access to contact_messages" on public.contact_messages
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- ==============================================================================
-- 4. STORAGE BUCKET CONFIGURATION (For Project Thumbnails & Images)
-- ==============================================================================

-- Create public bucket 'projects' if it doesn't exist
insert into storage.buckets (id, name, public)
values ('projects', 'projects', true)
on conflict (id) do update set public = true;

-- Storage RLS Policies
drop policy if exists "Allow public read access to projects bucket" on storage.objects;
create policy "Allow public read access to projects bucket" on storage.objects
    for select using (bucket_id = 'projects');

drop policy if exists "Allow authenticated admin full access to projects bucket" on storage.objects;
create policy "Allow authenticated admin full access to projects bucket" on storage.objects
    for all using (
        bucket_id = 'projects' 
        and auth.role() = 'authenticated'
    )
    with check (
        bucket_id = 'projects' 
        and auth.role() = 'authenticated'
    );

-- ==============================================================================
-- 5. INITIAL SEED DATA
-- ==============================================================================

-- 5.1 Initial Profile Seed (Hero Title, Bio, & Years Experience)
insert into public.profiles (full_name, title, bio, years_experience, resume_url)
values (
    'Joel',
    'Lead Software Engineer & Full Stack Architect',
    'Building premium web experiences at the intersection of high-fidelity interaction, elegant visual design, and clean scalable code. Award-winning aesthetics meets peak performance.',
    '6+',
    '#'
)
on conflict do nothing;

-- 5.2 Categories Seed
insert into public.categories (name, slug) values
    ('Web Applications', 'web-applications'),
    ('Mobile Applications', 'mobile-applications'),
    ('Games', 'games'),
    ('AI / Data', 'ai-data')
on conflict (name) do nothing;

-- 5.3 Technologies Seed
insert into public.technologies (name) values
    ('Next.js'),
    ('React.js'),
    ('TypeScript'),
    ('Node.js'),
    ('Go (Golang)'),
    ('Python'),
    ('Flutter'),
    ('PostgreSQL'),
    ('Docker'),
    ('Git'),
    ('Three.js'),
    ('Framer Motion'),
    ('Tailwind CSS'),
    ('Supabase')
on conflict (name) do nothing;

-- 5.4 Initial Work Experiences Seed (Joel's Real Experiences)
insert into public.experiences (role, company, location, start_date, end_date, description, sort_order)
values
    (
        'Fullstack Software Developer',
        'PT Bhinneka Sangkuriang Transport',
        'Bandung',
        'Jul 2026',
        'Present',
        'Architected and developed the comprehensive Fleet Management System for Bhinneka shuttle services. Engineered real-time vehicle telemetry via GPS API integrations, built interactive operational dashboards, and connected internal microservices across fleet scheduling and tracking.',
        1
    ),
    (
        'Fullstack Software Developer Intern',
        'PT Len Inovasi Teknologi',
        'Bandung',
        'Feb 2026',
        'Jul 2026',
        'Developed mission-critical web applications for defense and strategic systems. Built a full-stack microservices versioning and status monitoring dashboard with Node.js and React.js, and contributed to the Combat Management System (CMS) video module for recording electro-optical sensor streams using React.js, Go, and C++.',
        2
    ),
    (
        'Freelance Web Developer',
        'Codifyve',
        'Bandung',
        'Oct 2025',
        'Present',
        'Delivered client-facing web applications including a secure Computer-Based Testing (CBT) platform with automated scoring powered by Laravel, as well as an interactive exhibition website with dynamic content management and responsive UI.',
        3
    ),
    (
        'Frontend Web Developer (Project Based)',
        'Yayasan Inspirasi Semangat Sekolah',
        'Depok',
        'Feb 2025',
        'Present',
        'Engineered responsive web interfaces and admin dashboards for an educational scholarship foundation. Developed the public-facing organization portal, end-to-end applicant tracking and evaluation workflows, and seamlessly integrated REST APIs with backend services.',
        4
    ),
    (
        'Programming Teaching Assistant',
        'Universitas Pendidikan Indonesia',
        'Bandung',
        'Aug 2024',
        'Dec 2025',
        'Conducted weekly lab practicums for 70+ computer science students across core curriculum courses. Designed algorithmic exercises, mentored students in C, C++, Java, and OOP fundamentals, and guided software development best practices and debugging techniques.',
        5
    )
on conflict do nothing;

-- 5.5 Initial Published Projects Seed
do $$
declare
    cat_web uuid;
    cat_mobile uuid;
    cat_ai uuid;
    proj_1 uuid;
    proj_2 uuid;
    proj_3 uuid;
    tech_next uuid;
    tech_three uuid;
    tech_framer uuid;
    tech_react uuid;
    tech_supa uuid;
    tech_tail uuid;
    tech_ts uuid;
begin
    select id into cat_web from public.categories where slug = 'web-applications' limit 1;
    select id into cat_mobile from public.categories where slug = 'mobile-applications' limit 1;
    select id into cat_ai from public.categories where slug = 'ai-data' limit 1;

    -- Project 1: Aura
    insert into public.projects (
        title, slug, short_description, description, challenge, solution,
        category_id, thumbnail_url, demo_url, github_url, project_date,
        role, client, duration, status, featured, pinned, sort_order
    ) values (
        'Aura Spatial Interface',
        'aura-spatial-interface',
        'An immersive web portal exploring spatial design using React Three Fiber, GLSL shaders, and interactive physics.',
        'Aura is a web experiment in spatial UI/UX design. The goal was to build a virtual gallery workspace that is fully responsive, interactive, and operates at 60fps on mobile. By optimizing buffer geometries and custom shader materials, we achieved top tier performance without compromising on visuals.',
        'Rendering hundreds of interactive 3D physics nodes on mobile browsers caused significant frame rate drops. Standard physics packages like @react-three/cannon were too heavy.',
        'Built a lightweight custom math-based particle force-field resolver directly inside the requestAnimationFrame loop, reducing CPU overhead by 75%.',
        cat_web, '', 'https://aura.example.com', 'https://github.com/joel/aura',
        '2026-03-15', 'Creative Developer & 3D Artist', 'Design Forward Labs', '2 Months',
        'published', true, true, 1
    ) on conflict (slug) do nothing
    returning id into proj_1;

    -- Project 2: Pulse
    insert into public.projects (
        title, slug, short_description, description, challenge, solution,
        category_id, thumbnail_url, demo_url, github_url, project_date,
        role, client, duration, status, featured, pinned, sort_order
    ) values (
        'Pulse Fintech Ecosystem',
        'pulse-fintech-ecosystem',
        'A real-time financial tracking dashboard featuring secure OAuth auth, live data streaming, and automated reports.',
        'Pulse is an enterprise financial intelligence tool that integrates multiple bank APIs into a single fast-loading, beautiful modern user interface. Features comprehensive multi-currency support, custom PDF generation, and WebSockets live rate streaming.',
        'Aggregating large datasets from different banking APIs caused high latency. Initial page load was slow and dashboard charts would lag during data re-validation.',
        'Implemented Next.js Server Actions with Redis caching layers and edge route handlers. Deployed incremental static regeneration (ISR) for stable database queries.',
        cat_mobile, '', 'https://pulse.example.com', 'https://github.com/joel/pulse',
        '2025-11-10', 'Lead Full-Stack Engineer', 'Pulse Corp', '5 Months',
        'published', true, false, 2
    ) on conflict (slug) do nothing
    returning id into proj_2;

    -- Project 3: Nova
    insert into public.projects (
        title, slug, short_description, description, challenge, solution,
        category_id, thumbnail_url, demo_url, github_url, project_date,
        role, client, duration, status, featured, pinned, sort_order
    ) values (
        'Nova Design System',
        'nova-design-system',
        'A highly modular, accessible design system containing ready-to-use modern minimalist components built with React and Tailwind.',
        'Nova is a component library built explicitly for rapid portfolio prototyping. Fully compliant with WCAG 2.1 AA accessibility guidelines, supports dark mode out-of-the-box, and is lightweight.',
        'Making rich animations work smoothly while supporting full screen-reader accessibility and keyboard tab indexes.',
        'Leveraged Radix UI primitives as underlying structures and mapped Framer Motion states directly to HTML ARIA attributes.',
        cat_ai, '', 'https://nova.example.com', 'https://github.com/joel/nova',
        '2025-06-01', 'UI Architect & Lead Designer', 'Open Source Community', '3 Months',
        'published', false, false, 3
    ) on conflict (slug) do nothing
    returning id into proj_3;

    -- Link technologies to projects if ids are available
    if proj_1 is not null then
        select id into tech_next from public.technologies where name = 'Next.js' limit 1;
        select id into tech_three from public.technologies where name = 'Three.js' limit 1;
        select id into tech_framer from public.technologies where name = 'Framer Motion' limit 1;
        if tech_next is not null then insert into public.project_technologies values (proj_1, tech_next) on conflict do nothing; end if;
        if tech_three is not null then insert into public.project_technologies values (proj_1, tech_three) on conflict do nothing; end if;
        if tech_framer is not null then insert into public.project_technologies values (proj_1, tech_framer) on conflict do nothing; end if;
    end if;

    if proj_2 is not null then
        select id into tech_react from public.technologies where name = 'React.js' limit 1;
        select id into tech_supa from public.technologies where name = 'Supabase' limit 1;
        select id into tech_tail from public.technologies where name = 'Tailwind CSS' limit 1;
        if tech_react is not null then insert into public.project_technologies values (proj_2, tech_react) on conflict do nothing; end if;
        if tech_supa is not null then insert into public.project_technologies values (proj_2, tech_supa) on conflict do nothing; end if;
        if tech_tail is not null then insert into public.project_technologies values (proj_2, tech_tail) on conflict do nothing; end if;
    end if;

    if proj_3 is not null then
        select id into tech_ts from public.technologies where name = 'TypeScript' limit 1;
        select id into tech_tail from public.technologies where name = 'Tailwind CSS' limit 1;
        if tech_ts is not null then insert into public.project_technologies values (proj_3, tech_ts) on conflict do nothing; end if;
        if tech_tail is not null then insert into public.project_technologies values (proj_3, tech_tail) on conflict do nothing; end if;
    end if;
end $$;

-- 6. Reload PostgREST schema cache
notify pgrst, 'reload schema';
