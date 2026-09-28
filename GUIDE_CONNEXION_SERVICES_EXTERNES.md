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

### A. Carte Bancaire Internationale & Facturation TVA (Lemon Squeezy)

Lemon Squeezy agit comme **« Merchant of Record »** (commerçant officiel) :
- Ils encaissent légalement les paiements par Carte Bancaire (Visa, MasterCard, Amex), Apple Pay et Google Pay.
- Ils calculent, collectent et reversent automatiquement la TVA dans toute l'Union Européenne et à l'international.
- Ils émettent des factures légales avec mention de TVA pour vos clients professionnels sans aucune démarche fiscale complexe de votre part.

#### Étape 1 : Créer votre compte Lemon Squeezy
1. Rendez-vous sur [https://lemonsqueezy.com](https://lemonsqueezy.com) et cliquez sur **« Get Started »** ou **« Sign Up »** (l'inscription est 100% gratuite).
2. Renseignez votre adresse email, mot de passe et nommez votre boutique (ex: **`Prospectizi`**).
3. Par défaut, votre compte démarre en **« Test Mode »** (interrupteur en haut du tableau de bord), ce qui vous permet de créer vos produits et tester les paiements avec de faux numéros de carte avant de demander l'activation en direct.

#### Étape 2 : Créer vos Produits / Abonnements
Dans le menu de gauche de Lemon Squeezy, cliquez sur **« Store »** ➡️ **« Products »** ➡️ cliquez sur le bouton vert **« + New product »**.

1. **Créer le Produit PRO (29 € / mois) :**
   - **Product Name** : `Prospectizi PRO`
   - **Description** : `90 prospects qualifiés/mois, IA multi-canaux, scoring 3 piliers, exports CSV & CRM.`
   - **Pricing model** : Choisissez **« Subscription »** (Abonnement récurrent).
   - **Billing frequency** : `Every month` (Tous les mois).
   - **Price** : `29` EUR (ou USD selon votre devise).
   - Cliquez sur **« Publish product »**.

2. **Créer le Produit AGENCE (59 € / mois) :**
   - **Product Name** : `Prospectizi AGENCE`
   - **Description** : `450 prospects qualifiés/mois, multi-avatars, accès équipe 5 collaborateurs, support dédié.`
   - **Pricing model** : Choisissez **« Subscription »** (Abonnement récurrent).
   - **Billing frequency** : `Every month` (Tous les mois).
   - **Price** : `59` EUR.
   - Cliquez sur **« Publish product »**.

3. *(Optionnel)* **Créer le Produit DÉCOUVERTE (1 € paiement unique) :**
   - **Product Name** : `Prospectizi DÉCOUVERTE`
   - **Pricing model** : **« Single payment »** (Paiement unique).
   - **Price** : `1` EUR.
   - Cliquez sur **« Publish product »**.

#### Étape 3 : Récupérer vos Liens de Paiement (Checkout URLs)
1. Dans la liste de vos produits (**Store** ➡️ **Products**), cliquez sur les trois petits points `...` ou sur le bouton **« Share »** en face de chaque produit.
2. Cliquez sur **« Copy checkout link »** (ou copiez l'URL de la page de paiement).
3. L'URL ressemble à ceci :
   - Pour PRO : `https://prospectizi.lemonsqueezy.com/buy/a1b2c3d4-xxxx-xxxx`
   - Pour AGENCE : `https://prospectizi.lemonsqueezy.com/buy/e5f6g7h8-yyyy-yyyy`

#### Étape 4 : Configurer le Webhook (Synchronisation automatique en direct)
Le webhook permet à Lemon Squeezy d'avertir Prospectizi instantanément dès qu'un paiement réussit, afin d'augmenter le quota du client à 90 ou 450 prospects sans aucune action manuelle de votre part :

1. Dans le menu de gauche de Lemon Squeezy, cliquez sur **« Settings »** (icône d'engrenage en bas) ➡️ **« Webhooks »**.
2. Cliquez sur le bouton vert **« + New webhook »**.
3. Remplissez les champs comme suit :
   - **Callback URL** : `https://prospectizi.vercel.app/api/webhooks/lemonsqueezy` *(ou l'URL de votre déploiement)*
   - **Signing Secret** : Inventez un mot de passe secret de votre choix (ex: `prospectizi_secret_lemon_2026`). *Gardez-le sous la main !*
   - **Events to send** : Cochez ces 2 événements essentiels :
     - `order_created` (Création de commande / paiement validé)
     - `subscription_created` (Création d'abonnement actif)
4. Cliquez sur **« Save webhook »**.

#### Étape 5 : Les éléments à coller dans Prospectizi
Donnez simplement ces éléments à l'assistant dans le chat pour qu'il les intègre directement dans le projet :
- `NEXT_PUBLIC_LEMONSQUEEZY_PRO_URL` = Le lien de checkout copié pour le plan PRO
- `NEXT_PUBLIC_LEMONSQUEEZY_AGENCE_URL` = Le lien de checkout copié pour le plan AGENCE
- `LEMONSQUEEZY_WEBHOOK_SECRET` = Le signing secret que vous avez inventé à l'étape 4

#### Étape 6 : Tester en mode Test
Lemon Squeezy fournit une carte bancaire fictive pour tester :
- Numéro de carte : `4242 4242 4242 4242`
- Date d'expiration : N'importe quelle date future (ex: `12/28`)
- CVC : `123`
- Code postal : `75001`

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
