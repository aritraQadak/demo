import React from 'react';
import { Outlet } from 'react-router-dom';
import BuyerHeader from '../components/BuyerHeader';
import Footer from '../components/Footer';

export default function BuyerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-sans antialiased">
      <BuyerHeader />
      <main className="flex-1 w-full pt-20">
        <Outlet />
      </main>
      <Footer variant="buyer" />
    </div>
  );
}
