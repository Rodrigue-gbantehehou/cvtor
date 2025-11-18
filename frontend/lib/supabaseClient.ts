// lib/supabaseClient.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase env variables");
}

// Validate that URL and key are not swapped
if (!SUPABASE_URL.startsWith('http')) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL semble contenir une clé au lieu d'une URL. Vérifiez vos secrets Replit - les valeurs sont probablement inversées.");
}

if (!SUPABASE_ANON_KEY.startsWith('eyJ')) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY semble contenir une URL au lieu d'une clé. Vérifiez vos secrets Replit - les valeurs sont probablement inversées.");
}

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
