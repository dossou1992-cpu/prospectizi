"use client";

import React from 'react';
import { useStore } from '@/lib/store';
import LandingPage from '@/components/LandingPage';
import DashboardPage from './dashboard/page';

export default function Home() {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return <DashboardPage />;
}
