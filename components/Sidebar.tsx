"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  UserCheck, 
  Users, 
  LayoutDashboard, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  Users2, 
  Video, 
  MessageCircle, 
  FileText,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useStore } from '@/lib/store';

interface SidebarProps {
  onOpenTutorial: () => void;
  onOpenLegal: () => void;
}

export default function Sidebar({ onOpenTutorial, onOpenLegal }: SidebarProps) {
  const pathname = usePathname();
  const { user, subscription } = useStore();

  const navItems = [
    { href: "/avatar", label: "1. Avatar Client", icon: UserCheck, desc: "Paramétrage IA" },
    { href: "/prospects", label: "2. Prospects & CRM", icon: Users, desc: "Recherche & Leads" },
    { href: "/dashboard", label: "3. Dashboard", icon: LayoutDashboard, desc: "Pilotage Quotidien" },
    { href: "/audit", label: "Audit Mensuel IA", icon: Sparkles, badge: "IA 30j" },
    { href: "/pricing", label: "Plans & Tarifs", icon: CreditCard, badge: subscription.plan_type },
    { href: "/team", label: "Mon Équipe", icon: Users2, badge: "AGENCE" },
    { href: "/admin", label: "Espace Superadmin", icon: ShieldCheck, badge: "VIP" },
  ];

  return (
    <aside className="w-64 bg-dark-900 border-r border-dark-600/60 flex flex-col justify-between fixed top-0 bottom-0 left-0 z-30 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-dark-600/60">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-cyan-intense flex items-center justify-center text-dark-950 font-black shadow-cyan-glow transition-transform group-hover:scale-105">
              <Zap className="w-6 h-6 fill-dark-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white">Prospectizi</span>
                <span className="text-[10px] font-bold uppercase bg-cyan/15 text-cyan border border-cyan/40 px-1.5 py-0.5 rounded-full">MVP</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">Trouvez & contactez mieux</p>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)]">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Navigation Principale
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-dark-700 text-cyan border border-cyan/30 shadow-cyan-border font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-dark-700/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                    isActive ? "bg-cyan text-dark-950" : "bg-dark-600 text-slate-300 border border-slate-700"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Support & Tools */}
      <div className="p-4 border-t border-dark-600/60 bg-dark-950/60 space-y-2">
        {/* Loom Video Tutorial Button */}
        <button
          onClick={onOpenTutorial}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-dark-700 hover:bg-dark-600 text-cyan border border-cyan/25 transition-all"
        >
          <Video className="w-3.5 h-3.5" />
          <span>Vidéo Tuto (2m30)</span>
        </button>

        {/* WhatsApp Support Direct Button */}
        <a
          href="https://wa.me/22890123456?text=Bonjour%20Prospectizi,%20j'ai%20une%20question%20concernant%20mon%20compte."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Support WhatsApp</span>
        </a>

        {/* Legal & Version */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 px-1">
          <button onClick={onOpenLegal} className="hover:text-cyan transition-colors underline flex items-center gap-1">
            <FileText className="w-3 h-3" />
            <span>CGU / CGV & Légal</span>
          </button>
          <span>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
