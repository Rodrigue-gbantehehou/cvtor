import { createServerClient } from './supabase-server';
import { createClient } from './supabaseClient';

export async function signOut() {
  'use server';
  const supabase = createServerClient();
  await supabase.auth.signOut();
  return { redirect: { destination: '/login', permanent: false } };
}

// Pour les composants serveur
export async function getUser() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Pour les composants client
export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Pour les composants serveur
export async function getSession() {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Pour les composants client
export async function getCurrentSession() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
