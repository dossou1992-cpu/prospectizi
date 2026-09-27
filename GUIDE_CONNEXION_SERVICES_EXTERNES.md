# 🔌 Guide de Connexion des Services Externes — Prospectizi

Ce guide pas-à-pas est spécialement rédigé pour vous permettre de connecter vos vrais comptes externes (**Supabase, Google Auth, Apify, Lemon Squeezy, Flutterwave**) en quelques clics, sans aucune compétence en programmation.

---

## 1. 🗄️ SUPABASE (Base de Données PostgreSQL & Authentification Google)

### Étape 1 : Créer votre projet Supabase gratuit
1. Rendez-vous sur [https://supabase.com](https://supabase.com) et cliquez sur **« Start your project »**.
2. Connectez-vous avec votre compte GitHub en 1 clic.
3. Cliquez sur **« New project »**, nommez-le **`prospectizi`**, définissez un mot de passe de base de données, et choisissez la région la plus proche (ex: *Frankfurt* ou *London*).

### Étape 2 : Créer toutes les tables en 10 secondes
1. Dans le menu de gauche de Supabase, cliquez sur **« SQL Editor »** (icône de terminal `>_`).
2. Cliquez sur **« New query »**.
3. Ouvrez le fichier **`supabase_schema.sql`** situé à la racine du projet Prospectizi, copiez l'intégralité du texte et collez-le dans la fenêtre.
4. Cliquez sur le bouton vert **« Run »** en bas à droite : **Toutes vos tables (profils, abonnements, prospects, avis, recherches, RLS) sont créées automatiquement !**

### Étape 3 : Récupérer vos clés API
1. Dans le menu de gauche, allez dans **Project Settings** (icône d'engrenage) ➡️ **API**.
2. Copiez les deux valeurs :
   - **Project URL** (ex: `https://xyzcompany.supabase.co`) ➡️ correspond à `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API Anon Key** (longue clé publique) ➡️ correspond à `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Étape 4 : Activer la Connexion Google (Google OAuth)
1. Dans Supabase, allez dans **Authentication** ➡️ **Providers** ➡️ cliquez sur **Google**.
2. Cochez **« Enable Google provider »**.
3. Suivez le mini-tuto affiché pour créer vos identifiants sur Google Cloud Console (prenez 3 minutes pour coller le `Client ID` et `Client Secret`).
4. Cliquez sur **Save** : la connexion Google sur Prospectizi fonctionnera instantanément pour tous vos utilisateurs !

---

## 2. 🕷️ APIFY (Moteur d'Extraction & Scraping B2B)

1. Rendez-vous sur [https://apify.com](https://apify.com) et créez un compte gratuit (5 $ de crédits offerts chaque mois).
2. Cliquez sur votre profil en haut à droite ➡️ **Settings** ➡️ **Integrations**.
3. Copiez votre **Personal API token** :
   - Clé : `APIFY_TOKEN=apify_api_xxxxxxxxxxxxxxxx`
4. L'acteur par défaut utilisé est **`compass~crawler-google-places`** (Google Maps & registres d'entreprises).
5. Dans Vercel, ajoutez :
   - `APIFY_TOKEN=votre_token_apify`
   - `APIFY_ACTOR_ID=compass~crawler-google-places`

---

## 3. 💳 MOYENS DE PAIEMENT (Lemon Squeezy & Flutterwave)

### A. Carte Bancaire Internationale (Lemon Squeezy)
1. Créez un compte sur [https://lemonsqueezy.com](https://lemonsqueezy.com) (Merchant of Record officiel qui gère la TVA pour vous).
2. Créez 2 produits dans votre boutique :
   - **Plan PRO (29 € / mois)**
   - **Plan AGENCE (59 € / mois)**
3. Copiez le lien de partage (Checkout URL) de chaque produit :
   - `NEXT_PUBLIC_LEMONSQUEEZY_PRO_URL=https://prospectizi.lemonsqueezy.com/buy/xxxx`
   - `NEXT_PUBLIC_LEMONSQUEEZY_AGENCE_URL=https://prospectizi.lemonsqueezy.com/buy/yyyy`
4. Dans **Settings** ➡️ **Webhooks**, ajoutez l'URL de votre site :
   - URL : `https://prospectizi.vercel.app/api/webhooks/lemonsqueezy`
   - Secret : `LEMONSQUEEZY_WEBHOOK_SECRET=votre_secret_choisi`

### B. Mobile Money Afrique (Flutterwave)
1. Créez un compte sur [https://flutterwave.com](https://flutterwave.com) (supporte T-Money Togo, Moov, Wave, MTN, Orange).
2. Allez dans **Settings** ➡️ **API Keys** :
   - `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-xxxxxx` (ou LIVE en production)
   - `FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-xxxxxx`
3. Allez dans **Settings** ➡️ **Webhooks** :
   - URL : `https://prospectizi.vercel.app/api/webhooks/flutterwave`
   - Secret hash : `FLUTTERWAVE_SECRET_HASH=votre_hash_secret`
4. Créez deux liens de paiement direct (Payment Links) pour PRO et AGENCE :
   - `NEXT_PUBLIC_FLUTTERWAVE_PRO_URL=https://flutterwave.com/pay/prospectizi-pro`
   - `NEXT_PUBLIC_FLUTTERWAVE_AGENCE_URL=https://flutterwave.com/pay/prospectizi-agence`

---

## 4. 🚀 OÙ COLLER TOUTES CES CLÉS DANS VERCEL ?

Une fois que vous avez récupéré l'une ou l'autre de vos clés (vous pouvez les ajouter au fur et à mesure) :
1. Allez sur votre tableau de bord [https://vercel.com](https://vercel.com).
2. Cliquez sur votre projet **prospectizi**.
3. Allez dans **Settings** (en haut) ➡️ cliquez sur **Environment Variables** (dans le menu de gauche).
4. Ajoutez vos variables nom par nom (ex: `NEXT_PUBLIC_SUPABASE_URL`, `APIFY_TOKEN`, etc.) avec leur valeur.
5. Cliquez sur **Save**.
6. Vercel redéploie automatiquement en 30 secondes et votre site est 100% relié en direct à vos vrais services !
