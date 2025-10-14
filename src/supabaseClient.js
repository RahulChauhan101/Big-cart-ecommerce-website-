import { createClient } from '@supabase/supabase-js';

// Read from .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fail-safe check
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or ANON key is missing! Check your .env file.");
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
