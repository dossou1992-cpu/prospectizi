-- ==============================================================================
-- PROSPECTIZI — SCHÉMA SQL COMPLET SUPABASE AVEC ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- 1. PROFILES (Extension auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'superadmin')),
  avatar_data JSONB DEFAULT '{}'::jsonb, -- Métier, offre, cible, ton, fréquence
  last_audit_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  last_audit_report JSONB DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. SUBSCRIPTIONS (Abonnements & Quotas)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  plan_type TEXT CHECK (plan_type IN ('DECOUVERTE', 'PRO', 'AGENCE')) DEFAULT 'DECOUVERTE',
  status TEXT CHECK (status IN ('active', 'canceled', 'expired', 'exhausted')) DEFAULT 'active',
  prospects_quota INT DEFAULT 3, -- 3 (Découverte 1€), 90 (PRO 29€), 450 (AGENCE 59€)
  prospects_used INT DEFAULT 0,
  bonus_prospects INT DEFAULT 0, -- +3 bonus si avis Loom validé
  current_period_end TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. PROSPECTS (Base CRM & Scraping Apify)
CREATE TABLE IF NOT EXISTS prospects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  activity TEXT,
  city TEXT,
  country TEXT,
  channel TEXT NOT NULL, -- google_maps, linkedin, facebook, instagram, google
  email TEXT,
  phone TEXT,
  website_url TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  qualification_score INT CHECK (qualification_score BETWEEN 0 AND 100),
  qualification_reason TEXT,
  flaws_identified TEXT, -- Problème ou Faille identifiée
  recommended_offer TEXT, -- Offre / Solution exacte sur-mesure
  opportunity TEXT,
  status TEXT CHECK (status IN ('nouveau', 'non_contacte', 'en_discussion', 'gagne', 'perdu')) DEFAULT 'nouveau',
  generated_messages JSONB DEFAULT '{}'::jsonb, -- Premier contact, offre, relances 1, 2, finale
  private_notes TEXT,
  closing_tips JSONB DEFAULT '[]'::jsonb,
  estimated_deal_value INT DEFAULT 1500,
  last_contact_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. TESTIMONIALS (Bonus Vidéos Loom)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  loom_url TEXT NOT NULL,
  commercial_consent BOOLEAN DEFAULT FALSE,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 5. TEAM_MEMBERS (Gestion des Sous-comptes Agence)
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  member_email TEXT NOT NULL,
  member_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'editor',
  status TEXT CHECK (status IN ('invited', 'active', 'revoked')) DEFAULT 'invited',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- ==============================================================================
-- POLITIQUES DE SÉCURITÉ ROW LEVEL SECURITY (RLS)
-- ==============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Profiles : lecture et modification pour son propre compte + bypass Superadmin
CREATE POLICY "Users can view and edit own profile" ON profiles
  FOR ALL USING (auth.uid() = id OR (SELECT email FROM profiles WHERE id = auth.uid()) = 'dossou1992@gmail.com');

-- Subscriptions : accessible par son propriétaire + bypass Superadmin
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id OR (SELECT email FROM profiles WHERE id = auth.uid()) = 'dossou1992@gmail.com');

-- Prospects : cloisonnement strict par utilisateur
CREATE POLICY "Users can manage own prospects" ON prospects
  FOR ALL USING (auth.uid() = user_id OR (SELECT email FROM profiles WHERE id = auth.uid()) = 'dossou1992@gmail.com');

-- Testimonials : utilisateur crée son témoignage, superadmin lit et modère
CREATE POLICY "Users can submit testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Superadmin can manage testimonials" ON testimonials
  FOR ALL USING ((SELECT email FROM profiles WHERE id = auth.uid()) = 'dossou1992@gmail.com');

-- Team members : propriétaire Agence gère ses sous-comptes
CREATE POLICY "Agency owner can manage team" ON team_members
  FOR ALL USING (auth.uid() = owner_id OR (SELECT email FROM profiles WHERE id = auth.uid()) = 'dossou1992@gmail.com');
