import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Returns potential alert matches for a saved search (preview before wiring real email sender)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const savedSearchId = searchParams.get('savedSearchId');

  if (!savedSearchId) {
    return NextResponse.json({ success: false, error: 'savedSearchId required' }, { status: 400 });
  }

  const { data: ss, error: ssErr } = await supabase
    .from('saved_searches')
    .select('*')
    .eq('id', savedSearchId)
    .single();

  if (ssErr || !ss) {
    return NextResponse.json({ success: false, error: ssErr?.message || 'saved search not found' }, { status: 404 });
  }

  let query = supabase
    .from('appointments')
    .select('*')
    .eq('is_active', true)
    .limit(25);

  if (ss.category) query = query.eq('category', ss.category);
  if (ss.location) query = query.ilike('location', `%${ss.location}%`);
  if (ss.query) query = query.or(`title.ilike.%${ss.query}%,source.ilike.%${ss.query}%,location.ilike.%${ss.query}%`);

  const { data: matches, error: mErr } = await query;
  if (mErr) return NextResponse.json({ success: false, error: mErr.message }, { status: 500 });

  return NextResponse.json({
    success: true,
    savedSearch: ss,
    matchCount: matches?.length || 0,
    matches: matches || [],
  });
}
