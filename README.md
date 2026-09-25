# ⚡ Prospectizi — SaaS B2B de Prospection Intelligente

> **"Trouver & contactez mieux"**

Plateforme SaaS B2B conçue pour les freelances, consultants, agences et entrepreneurs : recherche intelligente multi-sources (Google Maps, Annuaires pros, LinkedIn), fiches d'opportunité commerciale scorées de 60 à 100, génération de messages d'approche personnalisés par IA, CRM intégré, Audit Mensuel de conversion avec A/B testing et routage de paiement adapté (Mobile Money Afrique & Cartes bancaires internationales).

---

## 🎨 Identité Visuelle & UX
- **Couleurs Principales** : Noir profond (`#07090E` / `#0D1117`), Cyan Électrique (`#00F0FF` / `#00D8F6`), Accents Or/Ambre pour l'offre Agence.
- **Typographie** : Inter / Poppins moderne avec accents néon et bordures phosphorescentes.
- **Ergonomie** : Sidebar rétractable, navigation fluide, persistance instantanée (`localStorage` et cloud).

---

## 🚀 Architecture Complète de l'Application

### 1. Avatar Client & Offre (`/avatar`)
- Paramétrage de l'activité, cible idéale, offre irrésistible et bénéfice garanti.
- Sélecteur de tonalité et de fréquence de relance (J+3, J+5, J+10).
- Prévisualisation dynamique en temps réel : *"Ce que l'IA a compris de votre profil"*.
- 4 modèles d'avatars préconfigurés en 1 clic (Agence Web, Ghostwriter/Copywriter, Closer High-Ticket, Consultant SEO).
- Persistance automatique en direct lors de la saisie.

### 2. Moteur d'Acquisition & CRM Fiches Prospects (`/prospects`)
- Moteur de détection multi-canaux (Google Maps, Pages d'entreprises, LinkedIn B2B, Réseaux Sociaux).
- Fiches d'opportunités à 2 colonnes :
  - **Colonne Gauche** : Faille détectée, solution sur-mesure recommandée, score de pertinence (60 à 100/100).
  - **Colonne Droite** : Coordonnées directes (Nom, email pro vérifié, téléphone direct, ville), déclencheurs 1-clic WhatsApp direct (`wa.me`) et email (`mailto:`).
- Séquence de prospection complète : Premier contact, Message de Valeur offert (avec guide d'utilisation pédagogique), Relance douce J+3, Relance J+5, Rupture courtoise J+10.
- Module de test A/B sur chaque prospect : choix et confirmation de la Variante envoyée (*"J'ai envoyé la Variante A"* ou *"J'ai envoyé la Variante B"*).
- Compteur de quota strict : dès 3 prospects consommés en mode test, la modale d'abonnement se déclenche automatiquement.
- Bouton *"Signaler un contact erroné"* avec audit anti-rebond SMTP/HLR automatique et réattribution instantanée du quota.
- Export CSV & Excel complet.

### 3. Tableau de Bord & Focus du Jour (`/dashboard`)
- 4 KPIs clés calculés en temps réel (Prospects gagnés, En négociation, Relances prévues aujourd'hui, Taux de closing %).
- **Focus du Jour** : Flux des relances prioritaires du jour avec bouton d'action *"✔ Relancé aujourd'hui"* qui met à jour le statut du prospect et recalcule l'échéance.
- Bloc *"Top Prospects Chauds"* (scores de closing ≥ 80/100).
- Vidéo Tutoriel interactive (2m30) accessible depuis le Dashboard et la barre supérieure.
- Badges de gamification commerciale débloqués au fil des étapes (Premier Pas, Closer Élite, Tireur d'Élite).

### 4. Audit Mensuel IA & Optimisation des Scripts (`/audit`)
- Verrouillage temporel strict de 30 jours pour les utilisateurs standards (contournable uniquement en mode Superadmin).
- Bilan de conversion chiffré (Volume contacté, Taux de réponse, Taux de transformation).
- Diagnostic précis du goulot d'étranglement commercial.
- **Module Test A/B des Scripts** : comparaison chiffrée des performances de la Variante A vs Variante B avec bouton d'activation et bouton d'application définitive à tout le compte.
- Recommandation stratégique d'ajustement de l'Avatar client applicable en 1 clic.

### 5. Tarifs & Passerelles de Paiement (`/pricing`)
- **Découverte (1 €)** : 3 prospects complets pour tester sans risque.
- **PRO (29 € / mois)** : 90 prospects / mois (0,32 € / prospect), exports CSV, Audit Mensuel IA.
- **AGENCE (59 € / mois)** : 450 prospects / mois (0,13 € / prospect), jusqu'à 5 sous-comptes équipe et multi-avatars.
- Wording de paiement professionnel et souverain :
  - *Mobile Money (Orange Money, MTN, Wave, Moov) & Cartes Locales*
  - *Carte Bancaire Internationale, Apple Pay & Google Pay*

### 6. Administration Superadmin (`/admin`) vs Équipe Agence (`/team`)
- **/admin** : Réservé exclusivement à `dossou1992@gmail.com`. Vision globale de l'ensemble des utilisateurs de la plateforme, ajustement des plans et quotas, et file de validation des vidéos Loom (attribution de +3 crédits bonus).
- **/team** : Réservé aux souscripteurs de l'offre Agence pour inviter jusqu'à 5 collaborateurs ou assistants virtuels (VAs) sur leur quota partagé.

### 7. Centre Légal & Conformité B2B (`components/LegalModal.tsx`)
- **Mentions Légales** : Éditeur, capital, hébergement Vercel & Supabase UE.
- **CGU / CGV** : Clause de renonciation expresse au droit de rétractation (Art. L221-28, 13° du Code de la Consommation) pour livraison immédiate de leads numériques.
- **Politique de Confidentialité RGPD B2B** : Traitement sous la base légale de l'Intérêt Légitime (Art. 6.1.f RGPD), conformité doctrine CNIL prospection B2B, droit d'opposition et d'effacement sans délai via `privacy@prospectizi.com`.

---

## 🛠️ Guide Pas-à-Pas pour Débutant : Déploiement en 5 Minutes

Vous n'avez aucune connaissance en code informatique ? Suivez simplement ces 3 étapes :

### Étape 1 : Créer votre Dépôt sur GitHub
1. Rendez-vous sur [github.com](https://github.com) et connectez-vous (ou créez un compte gratuit).
2. Cliquez sur le bouton vert **"New"** (ou **"Nouveau dépôt"**).
3. Nommez le dépôt : `prospectizi`.
4. Laissez-le en **Public** ou **Private** (votre choix).
5. **Ne cochez pas** "Add a README file" (nous en avons déjà un complet).
6. Cliquez sur **"Create repository"**.
7. Dans votre terminal ou sandbox, exécutez simplement les commandes suivantes :

```bash
cd /home/user/prospectizi
git remote add origin https://github.com/<VOTRE_NOM_UTILISATEUR>/prospectizi.git
git branch -M main
git push -u origin main
```

*(Remplacez `<VOTRE_NOM_UTILISATEUR>` par votre pseudo GitHub).*

---

### Étape 2 : Configurer la Base de Données Gratuite sur Supabase
1. Créez un compte gratuit sur [supabase.com](https://supabase.com).
2. Cliquez sur **"New Project"**, choisissez un nom (`prospectizi-db`) et un mot de passe sécurisé.
3. Sélectionnez la région la plus proche (ex: **Frankfurt / Paris**).
4. Une fois créé, allez dans le menu de gauche **"SQL Editor"** -> **"New Query"**.
5. Ouvrez le fichier `supabase_schema.sql` présent dans ce dossier, copiez l'intégralité du texte et collez-le dans l'éditeur Supabase.
6. Cliquez sur le bouton vert **"Run"** : toutes vos tables, clés de sécurité et règles de protection des données (RLS) sont créées en 2 secondes !
7. Allez dans **"Project Settings"** -> **"API"** pour copier votre URL et votre clé publique `anon`.

---

### Étape 3 : Déployer en 1 Clic sur Vercel
1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
2. Cliquez sur **"Add New..."** -> **"Project"**.
3. Sélectionnez le dépôt `prospectizi` que vous venez d'importer.
4. Dans la section **"Environment Variables"**, ajoutez les clés suivantes (voir `.env.example`) :
   - `NEXT_PUBLIC_SUPABASE_URL` = (Votre URL Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (Votre clé Supabase anon)
   - `SUPABASE_SERVICE_ROLE_KEY` = (Votre clé service role Supabase)
   - `FLUTTERWAVE_SECRET_HASH` = (Une chaîne secrète pour sécuriser vos webhooks)
   - `LEMONSQUEEZY_WEBHOOK_SECRET` = (Le secret de webhook Lemon Squeezy)
5. Cliquez sur le bouton bleu **"Deploy"**.
6. En 90 secondes, votre SaaS Prospectizi est en ligne avec un lien mondial sécurisé en HTTPS (ex: `https://prospectizi.vercel.app`) !

---

## 📦 Fichiers et Livrables Fournis dans le Workspace

1. `/home/user/PROSPECTIZI_Presentation_MVP.pptx` : Diaporama PowerPoint professionnel complet prêt pour vos démonstrations et investisseurs.
2. `/home/user/PROSPECTIZI_Dossier_Cahier_des_Charges.docx` : Dossier Word de spécifications fonctionnelles détaillées.
3. `/home/user/prospectizi/supabase_schema.sql` : Script SQL complet pour la base de données de production avec sécurité RLS.
4. Code source complet Next.js 14 / TypeScript / Tailwind CSS testé et compilé avec succès.
