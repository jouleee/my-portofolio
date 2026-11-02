'use client';

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
