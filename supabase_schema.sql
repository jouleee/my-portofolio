-- Supabase Schema for Modern Brutalist Portfolio
-- Execute this SQL script in your Supabase SQL Editor.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (For portfolio owner bio)
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    full_name text not null,
    title text,
    bio text,
    avatar_url text,
    resume_url text
);

alter table public.profiles enable row level security;

create policy "Allow public read access to profiles" on public.profiles
    for select using (true);

create policy "Allow authenticated users to update profiles" on public.profiles
    for update using (auth.uid() = id);

-- 2. Categories Table
create table if not exists public.categories (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,
    slug text not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;

create policy "Allow public read access to categories" on public.categories
    for select using (true);

create policy "Allow authenticated admin full access to categories" on public.categories
    for all using (auth.role() = 'authenticated');

-- 3. Projects Table
create table if not exists public.projects (
    id uuid default uuid_generate_v4() primary key,
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
    project_date date,
    role text,
    client text,
    duration text,
    status text default 'draft'::text check (status in ('draft', 'published')),
    featured boolean default false,
    pinned boolean default false,
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.projects enable row level security;

create policy "Allow public read access to published projects" on public.projects
    for select using (status = 'published');

create policy "Allow authenticated admin select projects" on public.projects
    for select using (auth.role() = 'authenticated');

create policy "Allow authenticated admin full access to projects" on public.projects
    for all using (auth.role() = 'authenticated');

-- 4. Project Images (Gallery)
create table if not exists public.project_images (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references public.projects(id) on delete cascade not null,
    image_url text not null,
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.project_images enable row level security;

create policy "Allow public read access to project_images" on public.project_images
    for select using (true);

create policy "Allow authenticated admin full access to project_images" on public.project_images
    for all using (auth.role() = 'authenticated');

-- 5. Tags Table
create table if not exists public.tags (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tags enable row level security;

create policy "Allow public read access to tags" on public.tags
    for select using (true);

create policy "Allow authenticated admin full access to tags" on public.tags
    for all using (auth.role() = 'authenticated');

-- 6. Project Tags Junction Table
create table if not exists public.project_tags (
    project_id uuid references public.projects(id) on delete cascade,
    tag_id uuid references public.tags(id) on delete cascade,
    primary key (project_id, tag_id)
);

alter table public.project_tags enable row level security;

create policy "Allow public read access to project_tags" on public.project_tags
    for select using (true);

create policy "Allow authenticated admin full access to project_tags" on public.project_tags
    for all using (auth.role() = 'authenticated');

-- 7. Technologies Table
create table if not exists public.technologies (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,
    icon_name text, -- Lucide icon name or generic identifier
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.technologies enable row level security;

create policy "Allow public read access to technologies" on public.technologies
    for select using (true);

create policy "Allow authenticated admin full access to technologies" on public.technologies
    for all using (auth.role() = 'authenticated');

-- 8. Project Technologies Junction Table
create table if not exists public.project_technologies (
    project_id uuid references public.projects(id) on delete cascade,
    technology_id uuid references public.technologies(id) on delete cascade,
    primary key (project_id, technology_id)
);

alter table public.project_technologies enable row level security;

create policy "Allow public read access to project_technologies" on public.project_technologies
    for select using (true);

create policy "Allow authenticated admin full access to project_technologies" on public.project_technologies
    for all using (auth.role() = 'authenticated');

-- 9. Experiences Table
create table if not exists public.experiences (
    id uuid default uuid_generate_v4() primary key,
    role text not null,
    company text not null,
    location text,
    start_date text not null, -- e.g. "Jan 2024" or "2024-01-01"
    end_date text default 'Present'::text, -- e.g. "Present" or "Dec 2025"
    description text,
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.experiences enable row level security;

create policy "Allow public read access to experiences" on public.experiences
    for select using (true);

create policy "Allow authenticated admin full access to experiences" on public.experiences
    for all using (auth.role() = 'authenticated');

-- 10. Skills Table
create table if not exists public.skills (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    level integer default 80 check (level >= 0 and level <= 100),
    category text default 'Frontend'::text check (category in ('Frontend', 'Backend', 'Design', 'Other')),
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.skills enable row level security;

create policy "Allow public read access to skills" on public.skills
    for select using (true);

create policy "Allow authenticated admin full access to skills" on public.skills
    for all using (auth.role() = 'authenticated');

-- 11. Social Links Table
create table if not exists public.social_links (
    id uuid default uuid_generate_v4() primary key,
    platform text not null unique, -- e.g., 'Github', 'LinkedIn', 'Instagram', 'Twitter'
    url text not null,
    icon text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.social_links enable row level security;

create policy "Allow public read access to social_links" on public.social_links
    for select using (true);

create policy "Allow authenticated admin full access to social_links" on public.social_links
    for all using (auth.role() = 'authenticated');

-- 12. Certificates Table
create table if not exists public.certificates (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    issuer text not null,
    issue_date date,
    credential_url text,
    credential_id text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.certificates enable row level security;

create policy "Allow public read access to certificates" on public.certificates
    for select using (true);

create policy "Allow authenticated admin full access to certificates" on public.certificates
    for all using (auth.role() = 'authenticated');

-- 13. Contact Messages Table
create table if not exists public.contact_messages (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    email text not null,
    subject text,
    message text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    read boolean default false
);

alter table public.contact_messages enable row level security;

-- Anybody can create a contact message, but only authenticated admins can select, update, or delete them
create policy "Allow public insert to contact_messages" on public.contact_messages
    for insert with check (true);

create policy "Allow authenticated admin full access to contact_messages" on public.contact_messages
    for all using (auth.role() = 'authenticated');

-- 14. Trigger to create profile when auth.users is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, full_name, title, bio, avatar_url)
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'full_name', 'Administrator'),
        'Full Stack Developer & Software Engineer',
        'Creating high-end web experiences.',
        null
    );
    return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();