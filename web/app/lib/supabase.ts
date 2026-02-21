import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for appointments
export async function fetchAppointments(filters?: {
  category?: string;
  location?: string;
  source?: string;
  search?: string;
  limit?: number;
}) {
  let query = supabase
    .from('appointments')
    .select('*')
    .eq('is_active', true)
    .order('date', { ascending: true });

  if (filters?.category && filters.category !== 'all') {
    query = query.eq('category', filters.category);
  }

  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }

  if (filters?.source) {
    query = query.eq('source', filters.source);
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,location.ilike.%${filters.search}%`);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function fetchAppointmentById(id: string) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchCities() {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('population', { ascending: false });

  if (error) throw error;
  return data;
}

export async function fetchSources() {
  const { data, error } = await supabase
    .from('sources')
    .select('*')
    .eq('is_active', true);

  if (error) throw error;
  return data;
}

// For future: user preferences
export async function saveUserPreferences(userId: string, preferences: {
  favorite_categories?: string[];
  favorite_locations?: string[];
  notifications_enabled?: boolean;
  email?: string;
}) {
  const { data, error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: userId,
      ...preferences,
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) throw error;
  return data;
}
