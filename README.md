# ⚡ Prospectizi — SaaS MVP B2B

> *"Trouvez les bons prospects. Contactez-les mieux."*

SaaS B2B de prospection intelligente multi-canaux (Google Maps, Google, LinkedIn, Facebook, Instagram) avec génération de messages hyper-personnalisés par IA, CRM intégré, Audit Mensuel de conversion et système de paiement intelligent (Mobile Money Afrique via Flutterwave & Cartes internationales via Lemon Squeezy).

---

## 🎨 Identité Visuelle
- **Thème** : Dark / Cyberpunk élégant (Noir profond `#07090E` / `#0D1117`)
- **Accents** : Cyan Électrique (`#00F0FF` / `#00D8F6`)

---

## 🚀 Fonctionnalités Développées & Validées

1. **Page Avatar Client (`/avatar`)** :
   - Paramétrage du profil (Métier, Offre irrésistible, Cible visée, Bénéfice garanti).
   - Sélecteur de Ton (Professionnel, Chaleureux, Direct, Persuasif) & Fréquence (J+3, J+5, J+10).
   - Dynamic Card *"Ce que l'IA a compris"* en temps réel.
   - Modèles d'avatars pré-configurés en 1 clic.
   - Synchronisation côté serveur.

2. **Page Prospects & CRM (`/prospects`)** :
   - Moteur de scraping multi-canaux (Google Maps, LinkedIn, etc.).
   - Compteur de quota visuel avec modale de blocage (*Strike Modal*) sur l'offre Découverte.
   - Fiche Prospect à 2 colonnes (Analyse des failles & solution sur-mesure à gauche, Coordonnées directes à droite).
   - Algorithme de scoring de 60 à 100 points.
   - Séquence de 5 messages IA (< 75 mots, ton "Je", sans jargon).
   - One-Click Outreach : Bouton WhatsApp (`wa.me`) prérempli et lien direct `mailto:`.
   - Bouton *"Signaler un contact erroné"* avec vérification anti-fraude automatique et recrédit.
   - Export CSV / Excel en 1 clic.

3. **Page Dashboard (`/dashboard`)** :
   - Topbar personnalisée avec statut de plan et quotas.
   - 4 Cartes KPIs clés (Gagnés, En discussion, Relances du jour, Taux de closing %).
   - Bloc interactif *"Focus du Jour"* (relances prioritaires avec modal de copie rapide).
   - Bloc *"Top Prospects Chauds"* (scores ≥ 80/100).
   - Badges de gamification et progression commerciale.

4. **Module Audit Mensuel IA (`/audit`)** :
   - Verrouillage temporel de 30 jours avec compte à rebours dynamique.
   - Diagnostic en 4 blocs : Bilan de conversion, failles & goulots, nouveaux scripts A/B optimisés et recommandations Avatar.

5. **Grille Tarifaire & Smart Routing (`/pricing`)** :
   - Découverte (1 € paiement unique, 3 prospects).
   - PRO (29 € / mois, 90 prospects, exports, audit).
   - AGENCE (59 € / mois, 450 prospects, multi-avatars, module équipe).
   - Smart Routing : Flutterwave (Afrique / Mobile Money) vs Lemon Squeezy (International / Apple Pay).

6. **Espace Superadmin (`/admin`)** :
   - Réservé à `dossou1992@gmail.com` avec bypass total des limitations.
   - Gestion des comptes, surclassements manuels, réinitialisation de quotas.
   - Modération des vidéos Loom pour l'attribution des +3 prospects bonus.

7. **Module Équipe (`/team`)** :
   - Réservé au plan AGENCE : jusqu'à 5 sous-comptes avec pool partagé de 450 leads.

8. **Webhooks Backend Unifiés** :
   - `/api/webhooks/flutterwave`
   - `/api/webhooks/lemonsqueezy`

---

## 🛠️ Stack Technique
- **Frontend** : Next.js 14+ (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons.
- **Base de Données** : Supabase PostgreSQL avec Row Level Security (script `supabase_schema.sql`).
- **Déploiement** : Vercel.

---

## 📦 Guide Débutante : Déploiement en Ligne

### Étape 1 : Créer votre dépôt sur GitHub
1. Connectez-vous sur [github.com](https://github.com).
2. Cliquez sur **"New Repository"**, nommez-le `prospectizi` et laissez-le en public ou privé.
3. Copiez l'URL de votre dépôt.

### Étape 2 : Envoyer le code
Dans votre terminal :
```bash
cd prospectizi
git remote add origin https://github.com/VOTRE_PSEUDO/prospectizi.git
git push -u origin main
```

### Étape 3 : Déployer sur Vercel (Gratuit)
1. Rendez-vous sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
2. Cliquez sur **"Add New Project"** et sélectionnez le projet `prospectizi`.
3. Cliquez sur **"Deploy"**. En 1 minute, votre SaaS sera en ligne avec une adresse web officielle !
