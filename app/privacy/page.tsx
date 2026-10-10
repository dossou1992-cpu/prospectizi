import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck, Mail, Database } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan hover:text-cyan-intense transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;accueil Prospectizi
        </Link>

        <div className="flex items-center gap-3 pb-6 border-b border-dark-700">
          <div className="w-12 h-12 rounded-xl bg-cyan/15 text-cyan flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Politique de Confidentialité &amp; Protection des Données</h1>
            <p className="text-xs text-slate-400">Dernière mise à jour : Octobre 2026 — Prospectizi</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          
          {/* Engagement solennel de non-revente */}
          <section className="bg-cyan/10 border border-cyan/30 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-cyan" />
              <h2>Engagement Fondamental de Confidentialité</h2>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Chez Prospectizi, nous respectons scrupuleusement la vie privée de nos utilisateurs et de leurs contacts. <strong>Vos données personnelles ne sont jamais vendues, louées, cédées ou partagées à des fins publicitaires ou à des tiers non autorisés.</strong> Elles sont réservées exclusivement à la fourniture, à la sécurisation et au bon fonctionnement de votre abonnement.
            </p>
          </section>

          {/* 1. Données collectées */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Database className="w-5 h-5 text-cyan" />
              <h2>1. Données Collectées</h2>
            </div>
            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>• <strong>Données de compte utilisateur :</strong> Nom, prénom, adresse e-mail professionnelle, mot de passe chiffré, historique de facturation.</p>
              <p>• <strong>Données de prospection B2B :</strong> Uniquement des informations d&apos;entreprises légalement et publiquement accessibles sur des registres officiels et répertoires publics (dénomination sociale, activité, adresse géographique, téléphone professionnel, site web).</p>
            </div>
          </section>

          {/* 2. Finalités du traitement */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <h2 className="text-base font-bold text-white">2. Finalités &amp; Utilisation des Données</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Les données recueillies sont strictement utilisées pour :
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-slate-300">
              <li>Permettre l&apos;accès à votre espace de travail et la sauvegarde de vos prospects.</li>
              <li>Traiter les paiements sécurisés et la gestion de votre abonnement.</li>
              <li>Vous envoyer des notifications de service (expiration d&apos;abonnement, alertes de compte).</li>
              <li>Améliorer la sécurité de la plateforme contre les fraudes et abus.</li>
            </ul>
          </section>

          {/* 3. Conservation & Sécurité */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <h2 className="text-base font-bold text-white">3. Sécurité &amp; Durée de Conservation</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Toutes les connexions s&apos;effectuent sous protocole sécurisé chiffré SSL/TLS (HTTPS). Vos données de compte sont hébergées dans des centres de données sécurisés conformes aux normes internationales. Vos données sont conservées pendant toute la durée active de votre compte, et supprimées après 12 mois d&apos;inactivité complète.
            </p>
          </section>

          {/* 4. Droit d'accès, de rectification et d'effacement */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Mail className="w-5 h-5 text-cyan" />
              <h2>4. Vos Droits (Accès, Rectification, Suppression)</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Conformément aux réglementations sur la protection des données personnelles (dont la loi sur le numérique et le RGPD), vous disposez à tout moment d&apos;un droit d&apos;accès, de modification ou de suppression totale de vos informations.
            </p>
            <div className="p-3 bg-dark-950 rounded-xl border border-dark-700 text-xs text-slate-200">
              Pour exercer vos droits ou demander la suppression définitive de votre compte, écrivez simplement à :
              <span className="text-cyan font-mono block mt-1">privacy@prospectizi.com</span>
              <span className="text-slate-400 font-mono block text-[11px]">dossou1992@gmail.com</span>
              Toute demande est traitée sans frais sous <strong>48 heures ouvrées</strong>.
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
