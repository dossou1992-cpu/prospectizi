import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Building2, Server, Shield, Mail } from 'lucide-react';

export default function LegalPage() {
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
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Mentions Légales</h1>
            <p className="text-xs text-slate-400">Dernière mise à jour : Octobre 2026 — Prospectizi</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          
          {/* 1. Éditeur de la plateforme */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <Building2 className="w-5 h-5 text-cyan" />
              <h2>1. Éditeur de la plateforme &amp; Publication</h2>
            </div>
            <div className="text-xs text-slate-300 space-y-1.5 pl-1 leading-relaxed">
              <p>• <strong>Nom commercial :</strong> Prospectizi</p>
              <p>• <strong>Nature de l&apos;activité :</strong> Édition de logiciels SaaS, solutions d&apos;aide à la prospection B2B et outils d&apos;analyse commerciale</p>
              <p>• <strong>Directeur de la publication &amp; Fondateur :</strong> Doris DOSSOU</p>
              <p>• <strong>Statut :</strong> Entrepreneur Individuel / Professionnel Indépendant</p>
              <p>• <strong>Siège d&apos;exploitation :</strong> Agbavi, Lomé, Région Maritime, Togo</p>
              <p>• <strong>E-mail de contact officiel :</strong> <span className="text-cyan font-mono">contact@prospectizi.com</span></p>
              <p>• <strong>Slogan officiel :</strong> « Trouvez &amp; contactez mieux ! »</p>
            </div>
          </section>

          {/* 2. Hébergement */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <Server className="w-5 h-5 text-cyan" />
              <h2>2. Hébergement Technique de l&apos;Application</h2>
            </div>
            <div className="text-xs text-slate-300 space-y-1.5 pl-1 leading-relaxed">
              <p>L&apos;infrastructure web et le déploiement applicatif haute disponibilité du site <span className="text-cyan font-mono">https://prospectizi.vercel.app</span> sont assurés par :</p>
              <p>• <strong>Société d&apos;hébergement :</strong> Vercel Inc.</p>
              <p>• <strong>Adresse légale :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
              <p>• <strong>Site web officiel :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">https://vercel.com</a></p>
              <p>• <strong>Base de données &amp; Authentification :</strong> Supabase Inc., 970 Toa Payoh North #07-04, Singapour 318992</p>
            </div>
          </section>

          {/* 3. Propriété Intellectuelle */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <Shield className="w-5 h-5 text-cyan" />
              <h2>3. Propriété Intellectuelle &amp; Droits d&apos;Auteur</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              L&apos;ensemble des éléments composant le site web et la plateforme Prospectizi (notamment les marques, logos, chartes graphiques, architectures logicielles, codes sources, bases de connaissances de prompts, algorithmes de détection des failles et contenus rédactionnels) sont protégés par les lois internationales relatives à la propriété intellectuelle et aux droits d&apos;auteur.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Toute reproduction, représentation, diffusion, adaptation ou exploitation, totale ou partielle, des éléments de la plateforme, par quelque procédé que ce soit, sans l&apos;autorisation écrite préalable de Doris DOSSOU / Prospectizi, est formellement interdite et constitutive de contrefaçon.
            </p>
          </section>

          {/* 4. Protection des Données Personnelles */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <Mail className="w-5 h-5 text-cyan" />
              <h2>4. Données Personnelles, Confidentialité &amp; Cookies</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prospectizi traite les données de ses utilisateurs dans le respect des dispositions de la loi togolaise n° 2019-014 relative à la protection des données à caractère personnel, de la Convention de l&apos;Union Africaine sur la cybersécurité et la protection des données personnelles, ainsi que du Règlement Général sur la Protection des Données (RGPD 2016/679) pour ses utilisateurs et prospects internationaux.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Chaque utilisateur dispose d&apos;un droit d&apos;accès, de rectification, de portabilité et d&apos;effacement de ses données personnelles, qu&apos;il peut exercer à tout moment en adressant un e-mail à : <span className="text-cyan font-mono">contact@prospectizi.com</span>.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pour plus d&apos;informations, veuillez consulter notre <Link href="/privacy" className="text-cyan underline hover:text-cyan-intense">Politique de Confidentialité</Link> et nos <Link href="/terms" className="text-cyan underline hover:text-cyan-intense">Conditions Générales d&apos;Utilisation</Link>.
            </p>
          </section>

          {/* 5. Contact */}
          <section className="bg-cyan/10 border border-cyan/30 p-5 rounded-2xl">
            <h2 className="text-white font-bold text-sm mb-1">Assistance &amp; Réclamations</h2>
            <p className="text-xs text-slate-200">
              Pour tout signalement de contenu illicite, réclamation ou question administrative, vous pouvez contacter directement l&apos;éditeur à l&apos;adresse suivante :
              <span className="text-cyan font-mono block mt-1">contact@prospectizi.com</span>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
