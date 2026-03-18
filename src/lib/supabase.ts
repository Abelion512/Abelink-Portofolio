import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";

// Menggunakan placeholder jika env belum diisi agar build tidak crash
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
