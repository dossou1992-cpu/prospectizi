"use client";

import React from 'react';
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
  Gift, 
  MessageCircle, 
  FileText,
  Zap,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useStore } from '@/lib/store';

interface SidebarProps {
  onOpenTutorial: () => void;
  onOpenLegal: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ onOpenTutorial, onOpenLegal, collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const { subscription } = useStore();

  const navItems = [
    { href: "/avatar", label: "1. Avatar Client", icon: UserCheck, desc: "Paramétrage IA" },
    { href: "/prospects", label: "2. Prospects & CRM", icon: Users, desc: "Recherche & Leads" },
    { href: "/dashboard", label: "3. Dashboard", icon: LayoutDashboard, desc: "Pilotage Quotidien" },
    { href: "/audit", label: "Audit Mensuel IA", icon: Sparkles, badge: "IA 30j" },
    { href: "/pricing", label: "Plans & Tarifs", icon: CreditCard, badge: subscription.plan_type },
    { href: "/team", label: "Mon Équipe", icon: Users2, badge: "AGENCE" },
    { href: "/settings", label: "Paramètres", icon: Settings, desc: "Compte & Alertes" },
    { href: "/admin", label: "Espace Superadmin", icon: ShieldCheck, badge: "VIP" },
  ];

  return (
    <aside className={`${
      collapsed ? "w-16" : "w-60"
    } bg-dark-900 border-r border-dark-600/60 flex flex-col justify-between fixed top-0 bottom-0 left-0 z-30 select-none transition-all duration-300`}>
      <div>
        {/* Brand Header */}
        <div className={`p-3.5 border-b border-dark-600/60 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan to-cyan-intense flex items-center justify-center text-dark-950 font-black shadow-cyan-glow shrink-0">
              <Zap className="w-5 h-5 fill-dark-950" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-tight text-white">Prospectizi</span>
                </div>
                <p className="text-[10px] text-cyan font-semibold truncate">Trouver &amp; contactez mieux</p>
              </div>
            )}
          </Link>

          {/* Collapse button */}
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-lg text-slate-400 hover:text-cyan hover:bg-dark-800 transition-colors"
            title={collapsed ? "Agrandir le menu" : "Réduire le menu"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)]">
          {!collapsed && (
            <div className="px-2.5 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>
          )}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center ${
                  collapsed ? "justify-center px-2 py-2.5" : "justify-between px-3 py-2"
                } rounded-xl font-medium text-xs transition-all duration-200 ${
                  isActive
                    ? "bg-dark-700 text-cyan border border-cyan/30 shadow-cyan-border font-bold"
                    : "text-slate-300 hover:text-white hover:bg-dark-700/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-cyan" : "text-slate-400"}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase shrink-0 ${
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
      <div className="p-2.5 border-t border-dark-600/60 bg-dark-950/60 space-y-1.5">
        {/* Loom Video Tutorial Button */}
        <button
          onClick={onOpenTutorial}
          title="Guide Loom (+3 leads offerts)"
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold bg-cyan/15 hover:bg-cyan/25 text-cyan border border-cyan/30 transition-all shadow-cyan-border"
        >
          <Gift className="w-3.5 h-3.5 shrink-0 text-cyan" />
          {!collapsed && <span className="truncate font-bold">Guide Loom (+3 leads)</span>}
        </button>

        {/* WhatsApp Support Direct Button */}
        <a
          href="https://wa.me/22890123456?text=Bonjour%20Prospectizi,%20j'ai%20une%20question%20concernant%20mon%20compte."
          target="_blank"
          rel="noopener noreferrer"
          title="Support WhatsApp"
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          {!collapsed && <span className="truncate">Support WhatsApp</span>}
        </a>

        {/* Legal & Version */}
        {!collapsed ? (
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 px-1">
            <button onClick={onOpenLegal} className="hover:text-cyan transition-colors underline flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>CGU &amp; Légal</span>
            </button>
            <span>v1.0</span>
          </div>
        ) : (
          <button onClick={onOpenLegal} title="Légal" className="w-full flex justify-center py-1 text-slate-400 hover:text-cyan">
            <FileText className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </aside>
  );
}
