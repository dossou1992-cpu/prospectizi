"use client";

import "./globals.css";
import React, { useState } from "react";
import { ProspectiziProvider } from "@/lib/store";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import UpgradeModal from "@/components/UpgradeModal";
import LoomModal from "@/components/LoomModal";
import VideoTutorialModal from "@/components/VideoTutorialModal";
import LegalModal from "@/components/LegalModal";
import Toast from "@/components/Toast";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isLoomOpen, setIsLoomOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenLegal={() => setIsLegalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Topbar onOpenLoomModal={() => setIsLoomOpen(true)} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <UpgradeModal />
      <LoomModal isOpen={isLoomOpen} onClose={() => setIsLoomOpen(false)} />
      <VideoTutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
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
    <html lang="fr" className="dark">
      <body className="bg-dark-950 text-slate-100 antialiased selection:bg-cyan selection:text-dark-950">
        <ProspectiziProvider>
          <LayoutContent>{children}</LayoutContent>
        </ProspectiziProvider>
      </body>
    </html>
  );
}
