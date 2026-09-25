"use client";

import "./globals.css";
import React, { useState } from "react";
import { ProspectiziProvider, useStore } from "@/lib/store";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import UpgradeModal from "@/components/UpgradeModal";
import LoomModal from "@/components/LoomModal";
import LoomTutorialModal from "@/components/LoomTutorialModal";
import LegalModal from "@/components/LegalModal";
import AuthModal from "@/components/AuthModal";
import Toast from "@/components/Toast";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useStore();
  const [isLoomSubmitOpen, setIsLoomSubmitOpen] = useState(false);
  const [isLoomTutorialOpen, setIsLoomTutorialOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If user is NOT authenticated, render the public landing layout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-950 text-slate-100 font-sans">
        {children}
        <AuthModal />
        <LegalModal />
        <Toast />
      </div>
    );
  }

  // If user IS authenticated, render the full SaaS workspace
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col md:flex-row relative font-sans">
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm animate-fadeIn"
        />
      )}

      {/* Sidebar: Responsive Drawer on mobile, Fixed on Desktop */}
      <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 md:translate-x-0 ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          onOpenTutorial={() => {
            setMobileMenuOpen(false);
            setIsLoomTutorialOpen(true);
          }}
          onOpenLegal={() => {
            setMobileMenuOpen(false);
            setIsLegalOpen(true);
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 ${collapsed ? "md:ml-16" : "md:ml-60"} flex flex-col min-h-screen transition-all duration-300 w-full`}>
        <Topbar 
          onOpenLoomModal={() => setIsLoomSubmitOpen(true)} 
          onOpenTutorialModal={() => setIsLoomTutorialOpen(true)}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <main className="flex-1 p-3 sm:p-4 md:p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <UpgradeModal />
      <LoomTutorialModal 
        isOpen={isLoomTutorialOpen} 
        onClose={() => setIsLoomTutorialOpen(false)} 
        onOpenSubmitLoom={() => setIsLoomSubmitOpen(true)}
      />
      <LoomModal isOpen={isLoomSubmitOpen} onClose={() => setIsLoomSubmitOpen(false)} />
      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
      <AuthModal />
      <Toast />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <body className="bg-dark-950 text-slate-100 antialiased selection:bg-cyan selection:text-dark-950 font-sans">
        <ProspectiziProvider>
          <LayoutContent>{children}</LayoutContent>
        </ProspectiziProvider>
      </body>
    </html>
  );
}
