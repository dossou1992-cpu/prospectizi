"use client";

import React from 'react';
import { useStore } from '@/lib/store';
import { CheckCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="bg-dark-900 border border-cyan/50 text-white px-4 py-3 rounded-2xl shadow-cyan-glow flex items-center gap-3 text-xs max-w-md">
        <div className="w-2 h-2 rounded-full bg-cyan animate-ping shrink-0" />
        <span className="font-medium text-slate-100">{toastMessage}</span>
      </div>
    </div>
  );
}
