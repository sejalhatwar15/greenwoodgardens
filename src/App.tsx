/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { OperationalRibbon } from './components/OperationalRibbon';
import { HeroSection } from './components/HeroSection';
import { GardenGroundsExplorer } from './components/GardenGroundsExplorer';
import { BotanicalBloomHerbarium } from './components/BotanicalBloomHerbarium';
import { EditorialPullQuote } from './components/EditorialPullQuote';
import { GuidedWalksSection } from './components/GuidedWalksSection';
import { ReservationSection } from './components/ReservationSection';
import { VisitorInfoSection } from './components/VisitorInfoSection';
import { Footer } from './components/Footer';
import { BotanicalClimber } from './components/BotanicalClimber';

export default function App() {
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);

  const scrollToReservation = () => {
    const el = document.getElementById('reserve');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectWalk = (walkId: string) => {
    setSelectedTourId(walkId);
    scrollToReservation();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 selection:bg-stone-900 selection:text-stone-50 relative overflow-x-clip pr-0 md:pr-18 lg:pr-24">
      {/* Top Header */}
      <Header onReserveClick={scrollToReservation} />

      {/* Operational Utility Ribbon */}
      <OperationalRibbon />

      <main>
        {/* Hero Section with Prominent Italic Headline & Minimalistic Scroll Animation */}
        <HeroSection onReserveClick={scrollToReservation} />

        {/* Curated Historic Sanctuaries & Terraces */}
        <GardenGroundsExplorer />

        {/* Archival Pull Quote */}
        <EditorialPullQuote />

        {/* What Is In Bloom Botanical Collection */}
        <BotanicalBloomHerbarium />

        {/* Guided Walks & Arboretum Heritage Tours */}
        <GuidedWalksSection onSelectWalk={handleSelectWalk} />

        {/* Timed Entry & Tour Reservation Engine */}
        <ReservationSection
          selectedTourId={selectedTourId}
          onClearTour={() => setSelectedTourId(null)}
          onSelectTour={(id) => setSelectedTourId(id)}
        />

        {/* Visitor Directions, Transit & Guidelines */}
        <VisitorInfoSection />
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Botanical Climber: Extends from the first page till the ending page */}
      <BotanicalClimber />
    </div>
  );
}
