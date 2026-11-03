'use server';

import { createClient, createPublicClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Helper to check if string is UUID
const isUUID = (val: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val);
};

// Sync technologies tags to project_technologies junction table
async function syncProjectTechnologies(supabase: any, projectId: string, techInput?: string) {
  if (techInput === undefined || techInput === null) return;
  const techNames = techInput
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  // Clear existing links
  await supabase.from('project_technologies').delete().eq('project_id', projectId);

  for (const name of techNames) {
    let { data: existing } = await supabase
      .from('technologies')
      .select('id')
      .eq('name', name)
      .maybeSingle();

    let techId = existing?.id;
    if (!techId) {
      const { data: inserted } = await supabase
        .from('technologies')
        .insert([{ name }])
        .select('id')
        .single();
      techId = inserted?.id;
    }

    if (techId) {
      await supabase
        .from('project_technologies')
        .insert([{ project_id: projectId, technology_id: techId }]);
    }
  }
}

// ============================================================================
// 1. PUBLIC READ SERVER ACTIONS (Pure Database)
// ============================================================================

export async function getProfile() {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('getProfile Supabase error:', error.message);
      return null;
    }
    return data;
  } catch (err: any) {
    console.error('getProfile connection error:', err?.message || err);
    return null;
  }
}

export async function getCategories() {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('getCategories Supabase error:', error.message);
      return [];
    }
    return data || [];
  } catch (err: any) {
    console.error('getCategories connection error:', err?.message || err);
    return [];
  }
}

export async function getProjects() {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*, categories(name), project_technologies(technologies(name))')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .order('project_date', { ascending: false });

    if (error) {
      console.error('getProjects Supabase error:', error.message);
      return [];
    }
    return (data || []) as any;
  } catch (err: any) {
    console.error('getProjects connection error:', err?.message || err);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*, categories(name), project_technologies(technologies(name)), project_images(*)')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      throw new Error(error?.message || 'Project not found');
    }
    return data as any;
  } catch (err: any) {
    console.error('getProjectBySlug error:', err?.message || err);
    throw new Error(err?.message || 'Project not found');
  }
}

export async function getExperiences() {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('getExperiences Supabase error:', error.message);
      return [];
    }
    return data || [];
  } catch (err: any) {
    console.error('getExperiences connection error:', err?.message || err);
    return [];
  }
}

export async function getSkills() {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('getSkills Supabase error:', error.message);
      return [];
    }
    return data || [];
  } catch (err: any) {
    console.error('getSkills connection error:', err?.message || err);
    return [];
  }
}

export async function getSocialLinks() {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('social_links')
      .select('*');

    if (error) {
      console.error('getSocialLinks Supabase error:', error.message);
      return [];
    }
    return data || [];
  } catch (err: any) {
    console.error('getSocialLinks connection error:', err?.message || err);
    return [];
  }
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
      console.error('submitContactMessage Supabase error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('submitContactMessage connection error:', err?.message || err);
    return { success: false, error: err?.message || 'Failed to send message.' };
  }
}

// ============================================================================
// 2. ADMIN AUTHENTICATION ACTIONS
// ============================================================================

export async function adminLogin(formData: any) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Database authentication failed.' };
  }
}

export async function adminLogout() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return { success: true };
  } catch {
    return { success: true };
  }
}

// ============================================================================
// 3. ADMIN PROFILE MANAGEMENT ACTIONS
// ============================================================================

export async function updateProfile(profileData: {
  full_name: string;
  title: string;
  bio: string;
  years_experience?: string;
  avatar_url?: string | null;
  resume_url?: string;
}) {
  try {
    const supabase = await createClient();

    // Check if an existing profile row exists
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const payload: any = {
      full_name: profileData.full_name,
      title: profileData.title,
      bio: profileData.bio,
      avatar_url: profileData.avatar_url || null,
      resume_url: profileData.resume_url || '#',
      updated_at: new Date().toISOString(),
    };

    if (profileData.years_experience) {
      payload.years_experience = profileData.years_experience;
    }

    if (existing?.id) {
      let { error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', existing.id);

      if (error && error.message.includes('years_experience')) {
        delete payload.years_experience;
        const retry = await supabase
          .from('profiles')
          .update(payload)
          .eq('id', existing.id);
        error = retry.error;
      }

      if (error) {
        console.error('updateProfile error:', error);
        return { success: false, error: error.message };
      }
    } else {
      let { error } = await supabase
        .from('profiles')
        .insert([payload]);

      if (error && error.message.includes('years_experience')) {
        delete payload.years_experience;
        const retry = await supabase
          .from('profiles')
          .insert([payload]);
        error = retry.error;
      }

      if (error) {
        console.error('insertProfile error:', error);
        return { success: false, error: error.message };
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/profile');
    return { success: true };
  } catch (err: any) {
    console.error('updateProfile exception:', err);
    return { success: false, error: err?.message || 'Database connection error' };
  }
}

// ============================================================================
// 4. ADMIN PROJECTS CRUD ACTIONS
// ============================================================================

export async function getAdminProjects() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*, categories(name), project_technologies(technologies(name))')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('getAdminProjects Supabase error:', error.message);
      return [];
    }
    return (data || []) as any;
  } catch (err: any) {
    console.error('getAdminProjects error:', err);
    return [];
  }
}

export async function createProject(projectData: any) {
  const categoryId = projectData.category_id && isUUID(projectData.category_id) ? projectData.category_id : null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .insert([
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
      ])
      .select('id')
      .single();

    if (error) {
      console.error('createProject Supabase error:', error);
      return { success: false, error: error.message };
    }

    if (data?.id) {
      await syncProjectTechnologies(supabase, data.id, projectData.technologies_used);
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/projects');
    return { success: true };
  } catch (err: any) {
    console.error('createProject exception:', err);
    return { success: false, error: err?.message || 'Database connection error' };
  }
}

export async function updateProject(id: string, projectData: any) {
  const categoryId = projectData.category_id && isUUID(projectData.category_id) ? projectData.category_id : null;

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
      console.error('updateProject Supabase error:', error);
      return { success: false, error: error.message };
    }

    await syncProjectTechnologies(supabase, id, projectData.technologies_used);

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/projects');
    return { success: true };
  } catch (err: any) {
    console.error('updateProject exception:', err);
    return { success: false, error: err?.message || 'Database connection error' };
  }
}

export async function deleteProject(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      console.error('deleteProject error:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/projects');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Database error' };
  }
}

export async function updateProjectsOrder(order: { id: string; sort_order: number }[]) {
  try {
    const supabase = await createClient();
    const updates = order.map((item) =>
      supabase
        .from('projects')
        .update({ sort_order: item.sort_order })
        .eq('id', item.id)
    );

    const results = await Promise.all(updates);
    const hasError = results.find((res) => res.error);
    if (hasError) {
      return { success: false, error: hasError.error?.message || 'Database update failed' };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/projects');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Database error' };
  }
}

// ============================================================================
// 5. ADMIN EXPERIENCES CRUD ACTIONS
// ============================================================================

export async function createExperience(expData: any): Promise<{ success: boolean; error?: string }> {
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
      console.error('createExperience error:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/experiences');
    return { success: true };
  } catch (err: any) {
    console.error('createExperience exception:', err);
    return { success: false, error: err?.message || 'Database connection error' };
  }
}

export async function updateExperience(id: string, expData: any): Promise<{ success: boolean; error?: string }> {
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
      console.error('updateExperience error:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/experiences');
    return { success: true };
  } catch (err: any) {
    console.error('updateExperience exception:', err);
    return { success: false, error: err?.message || 'Database connection error' };
  }
}

export async function deleteExperience(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('experiences').delete().eq('id', id);

    if (error) {
      console.error('deleteExperience error:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/experiences');
    return { success: true };
  } catch (err: any) {
    console.error('deleteExperience exception:', err);
    return { success: false, error: err?.message || 'Database connection error' };
  }
}

export async function updateExperiencesOrder(order: { id: string; sort_order: number }[]) {
  try {
    const supabase = await createClient();
    const updates = order.map((item) =>
      supabase
        .from('experiences')
        .update({ sort_order: item.sort_order })
        .eq('id', item.id)
    );

    const results = await Promise.all(updates);
    const hasError = results.find((res) => res.error);
    if (hasError) {
      return { success: false, error: hasError.error?.message || 'Database update failed' };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/experiences');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Database error' };
  }
}

// ============================================================================
// 6. CONTACT MESSAGES ACTIONS
// ============================================================================

export async function getContactMessages() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('getContactMessages error:', error.message);
      return [];
    }
    return data || [];
  } catch (err: any) {
    console.error('getContactMessages error:', err);
    return [];
  }
}

export async function markMessageAsRead(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('contact_messages')
      .update({ read: true })
      .eq('id', id);

    if (error) {
      console.error('markMessageAsRead error:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Database error' };
  }
}
