import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yzcwmurokfzawegkocms.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const source = searchParams.get('source');
  const search = searchParams.get('search');

  try {
    let query = supabase
      .from('appointments')
      .select('*')
      .eq('is_active', true)
      .order('date', { ascending: true });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    if (source) {
      query = query.eq('source', source);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    // If no data in Supabase, fall back to static data
    if (!data || data.length === 0) {
      return NextResponse.json({
        success: true,
        count: 0,
        data: [],
        source: 'supabase',
        message: 'No appointments found. Run scrapers to populate database.',
        lastUpdated: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      count: data.length,
      data: data,
      source: 'supabase',
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Supabase error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Database error',
      message: 'Could not fetch from database',
    }, { status: 500 });
  }
}
