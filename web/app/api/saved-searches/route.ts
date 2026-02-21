import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// MVP: userId is passed as query/body for now. Replace with Supabase Auth session later.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ success: false, error: 'userId required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('saved_searches')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, name, category, location, query, notifyEmail = true, notifyPush = false } = body || {};

  if (!userId || !name) {
    return NextResponse.json({ success: false, error: 'userId and name are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('saved_searches')
    .insert({
      user_id: userId,
      name,
      category: category ?? null,
      location: location ?? null,
      query: query ?? null,
      notify_email: notifyEmail,
      notify_push: notifyPush,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
