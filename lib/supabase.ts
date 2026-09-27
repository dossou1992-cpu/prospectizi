import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://votre-projet.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

// Client Supabase officiel pour le navigateur et le serveur
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==============================================================================
// FONCTIONS AUTHENTIFICATION SUPABASE (Email & Google OAuth)
// ==============================================================================

export async function supabaseSignInWithGoogle() {
  if (!supabase) {
    console.warn("[Supabase Auth] Supabase n'est pas configuré. Utilisation du mode démonstration.");
    return { success: false, fallback: true, message: "Mode démo actif (clés Supabase en attente)" };
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/dashboard`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error("[Supabase Google Error]", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function supabaseSignInWithEmail(email: string, password: string) {
  if (!supabase) {
    return { success: false, fallback: true, message: "Mode démo actif" };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, user: data.user, session: data.session };
}

export async function supabaseSignUpWithEmail(email: string, password: string, fullName: string) {
  if (!supabase) {
    return { success: false, fallback: true, message: "Mode démo actif" };
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${origin}/dashboard`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, user: data.user, session: data.session };
}

export async function supabaseSignOut() {
  if (!supabase) return { success: true };
  const { error } = await supabase.auth.signOut();
  if (error) return { success: false, error: error.message };
  return { success: true };
}
