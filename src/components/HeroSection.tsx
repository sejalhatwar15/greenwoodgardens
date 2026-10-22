/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowDown, ArrowRight, Compass } from 'lucide-react';
import { ASSETS } from '../utils/gardenData';
import { useParallaxScroll, ScrollReveal } from '../utils/useScrollAnimation';

interface HeroSectionProps {
  onReserveClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onReserveClick }) => {
  const scrollY = useParallaxScroll();

  // Subtle parallax translation
  const parallaxOffset = Math.min(32, Math.max(0, scrollY * 0.08));

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 overflow-hidden bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        {/* Main 2-Column Balanced Editorial Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (7 cols): Editorial Typography & Headline */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            {/* Subtle Editorial Kicker (No pills, quiet unboxed text) */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs tracking-[0.16em] uppercase font-sans text-stone-600">
              <span>Historic Arboretum</span>
              <span aria-hidden="true" className="text-stone-300">/</span>
              <span>Italianate Terraces</span>
              <span aria-hidden="true" className="text-stone-300">/</span>
              <span>Short Hills, NJ</span>
            </div>

            {/* CRITICAL USER REQUIREMENT: HOMEPAGE IN ITALIC HEADLINE */}
            <h1 className="font-serif italic font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.08] tracking-[-0.02em] text-stone-900 text-balance">
              Where living architecture whispers through sunlit terraces &amp; century-old flora.
            </h1>

            {/* Editorial Subhead */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-stone-600 font-light leading-relaxed max-w-xl text-balance">
              Cascading limestone balustrades, classical reflecting basins, and twenty-eight acres of protected old-growth woodlands. A timeless sanctuary preserved for peaceful contemplation and horticultural wonder.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onReserveClick}
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs uppercase tracking-widest font-medium rounded-xs transition-all shadow-xs hover:shadow-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-600 cursor-pointer"
              >
                <span>Reserve Timed Entry</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-300" />
              </button>

              <a
                href="#grounds"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-stone-100 hover:bg-stone-200/80 text-stone-900 text-xs uppercase tracking-widest font-medium rounded-xs border border-stone-300/80 transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-600"
              >
                <Compass className="w-3.5 h-3.5 text-stone-700" />
                <span>Explore The Grounds</span>
              </a>
            </div>

            {/* Minimalist Unboxed Metadata Line (Strictly No Pills) */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 pt-1 font-sans">
              <span>28 Preserved Acres</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span>Level II ArbNet Arboretum</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span>Est. 1906 by William W. Renwick</span>
            </div>
          </div>

          {/* Right Column (5 cols): Featured Estate Visual with Parallax Depth */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={100}>
              <div className="relative rounded-sm overflow-hidden aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] border border-stone-200/90 shadow-sm bg-stone-200 group">
                <div
                  style={{
                    transform: `translateY(${parallaxOffset}px)`,
                    transition: 'transform 80ms ease-out',
                    willChange: 'transform',
                  }}
                  className="w-full h-full relative"
                >
                  <img
                    src={ASSETS.heroGardenEstate}
                    alt="Panoramic sunlit view of Greenwood Gardens reflecting pool and stone balustrade"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    loading="eager"
                  />
                </div>

                {/* Scrim Overlay & Caption */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent flex flex-wrap items-end justify-between gap-2 text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-sans text-stone-300 block mb-0.5">
                      The Great Reflecting Basin
                    </span>
                    <p className="font-serif italic text-base sm:text-lg text-stone-100">
                      Weeping European Beeches &amp; Limestone Balustrade
                    </p>
                  </div>
                  <span className="text-[11px] font-sans text-stone-300 hidden sm:inline-block">
                    Elev. 385 ft
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Minimalist Scroll Cue */}
        <div className="flex items-center justify-between pt-12 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <span className="tracking-widest uppercase text-[10px] text-stone-600">Scroll to wander the sanctuaries</span>
            <div className="w-16 h-[1px] bg-stone-300" aria-hidden="true" />
          </div>
          <a
            href="#grounds"
            className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
            aria-label="Scroll down to the grounds"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
