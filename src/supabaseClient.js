import { createClient } from '@supabase/supabase-js';

// Read from .env
// const supabaseUrl = "https://tkoutvcnjunqntdeyhrz.supabase.co";
const supabaseUrl = " https://tkoutvcnjunqntdeyhrz.supabase.co/storage/v1/object/public/avatars/user1.png";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrb3V0dmNuanVucW50ZGV5aHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MTgwODQsImV4cCI6MjA3NTk5NDA4NH0.EFMDcNYjbqmTzZSMuLTY-l4jKRNy5y_KxD3fl8eXgyU";

// Fail-safe check
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or ANON key is missing! Check your .env file.");
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
