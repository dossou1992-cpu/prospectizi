-- ==============================================================================
-- PROSPECTIZI — SCHÉMA OFFICIEL SUPABASE (PostgreSQL + RLS + Triggers)
-- À copier-coller dans l'Éditeur SQL de votre tableau de bord Supabase (SQL Editor)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE DES PROFILS UTILISATEURS (reliée à l'authentification Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone_number TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'superadmin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE DES ABONNEMENTS & QUOTAS MENSUELS
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  plan_type TEXT DEFAULT 'DECOUVERTE' CHECK (plan_type IN ('DECOUVERTE', 'PRO', 'AGENCE')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'expired', 'exhausted')),
  prospects_quota INTEGER DEFAULT 3,
  prospects_used INTEGER DEFAULT 0,
  bonus_prospects INTEGER DEFAULT 0,
  current_period_end TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  auto_renew BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE DES AVATARS CLIENTS (Calibration IA de prospection)
CREATE TABLE IF NOT EXISTS public.user_avatars (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  profession TEXT DEFAULT 'Agence Marketing Digital',
  company_name TEXT DEFAULT 'Mon Agence',
  offer TEXT DEFAULT 'Audit de conversion et acquisition B2B',
  target_audience TEXT DEFAULT 'PME & Professionnels locaux',
  major_benefit TEXT DEFAULT '+35% de rendez-vous qualifiés sous 30 jours',
  tone TEXT DEFAULT 'chaleureux' CHECK (tone IN ('professionnel', 'chaleureux', 'direct', 'persuasif')),
  followup_frequency TEXT DEFAULT 'J+3' CHECK (followup_frequency IN ('J+3', 'J+5', 'J+10')),
  auto_reminders BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLE DES PROSPECTS QUALIFIÉS EXTRAITS
CREATE TABLE IF NOT EXISTS public.prospects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  activity TEXT,
  city TEXT,
  country TEXT,
  qualification_score INTEGER DEFAULT 80,
  qualification_reason TEXT,
  flaws_identified TEXT,
  recommended_offer TEXT,
  opportunity TEXT,
  channel TEXT DEFAULT 'google_maps',
  email TEXT,
  phone TEXT,
  website_url TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'nouveau' CHECK (status IN ('nouveau', 'non_contacte', 'en_discussion', 'gagne', 'perdu')),
  generated_messages JSONB DEFAULT '{}'::jsonb,
  private_notes TEXT DEFAULT '',
  sent_variant TEXT CHECK (sent_variant IN ('A', 'B')),
  estimated_deal_value NUMERIC DEFAULT 0,
  is_closed BOOLEAN DEFAULT FALSE,
  last_contact_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLE DES RECHERCHES ASYNCHRONES (Apify Scraping Tracker)
CREATE TABLE IF NOT EXISTS public.searches (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  keyword TEXT NOT NULL,
  location TEXT NOT NULL,
  channel TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED')),
  dataset_id TEXT,
  prospects_found INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLE DES AVIS CLIENTS & TÉMOIGNAGES (Loom & LinkedIn +3 Crédits)
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  type TEXT DEFAULT 'loom' CHECK (type IN ('loom', 'linkedin')),
  loom_url TEXT NOT NULL,
  review_text TEXT,
  rating INTEGER DEFAULT 5,
  commercial_consent BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLE DES MEMBRES D'ÉQUIPE (Formule Agence Multi-Comptes)
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'viewer')),
  status TEXT DEFAULT 'invited' CHECK (status IN ('invited', 'active', 'revoked')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- SÉCURITÉ ROW LEVEL SECURITY (RLS) — Isolation stricte des données de chaque client
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_avatars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Politiques RLS (Chaque utilisateur ne lit et modifie que ses propres données)
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users read own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own avatar" ON public.user_avatars FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own prospects" ON public.prospects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own searches" ON public.searches FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users read own team" ON public.team_members FOR ALL USING (auth.uid() = owner_id);

-- Superadmin Bypass Policy (dossou1992@gmail.com a accès pour modérer et surclasser)
CREATE POLICY "Superadmin full access profiles" ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (email = 'dossou1992@gmail.com' OR role = 'superadmin'))
);
CREATE POLICY "Superadmin full access subscriptions" ON public.subscriptions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (email = 'dossou1992@gmail.com' OR role = 'superadmin'))
);
CREATE POLICY "Superadmin full access testimonials" ON public.testimonials FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (email = 'dossou1992@gmail.com' OR role = 'superadmin'))
);

-- ==============================================================================
-- TRIGGER AUTOMATIQUE : Inscription d'un nouvel utilisateur = Création de profil & abonnement
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- 1. Création du profil
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Membre Prospectizi'),
    CASE WHEN NEW.email = 'dossou1992@gmail.com' THEN 'superadmin' ELSE 'user' END
  );

  -- 2. Création de l'abonnement initial (3 prospects offerts en formule Découverte)
  INSERT INTO public.subscriptions (user_id, plan_type, status, prospects_quota, prospects_used, bonus_prospects)
  VALUES (
    NEW.id,
    'DECOUVERTE',
    'active',
    CASE WHEN NEW.email = 'dossou1992@gmail.com' THEN 999999 ELSE 3 END,
    0,
    0
  );

  -- 3. Création de l'avatar par défaut
  INSERT INTO public.user_avatars (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Déclencheur sur la table auth.users de Supabase
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
