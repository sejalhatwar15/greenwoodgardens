/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, X, ArrowUpRight, Check } from 'lucide-react';
import { GARDEN_ZONES, GardenZone, filterZones } from '../utils/gardenData';
import { ScrollReveal } from '../utils/useScrollAnimation';

export const GardenGroundsExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | GardenZone['category']>('all');
  const [selectedZone, setSelectedZone] = useState<GardenZone | null>(null);

  const displayedZones = filterZones(GARDEN_ZONES, activeCategory);

  return (
    <section id="grounds" className="py-24 bg-[#FAF8F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200/80">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-600 block mb-3 font-sans">
                Curatorial Landscape Portfolio
              </span>
              <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-stone-900 tracking-tight">
                The Historic Sanctuaries &amp; Terraces
              </h2>
            </div>
            <p className="text-stone-600 text-sm sm:text-base font-light max-w-md leading-relaxed">
              Constructed between 1906 and 1938, each precinct was conceived as an outdoor room harmonizing Italian Renaissance classical stonecraft with indigenous New Jersey flora.
            </p>
          </div>
        </ScrollReveal>

        {/* Clean Segmented Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 pt-8 pb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-xs transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-stone-900 text-stone-50 shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/80'
            }`}
          >
            All Sanctuaries ({GARDEN_ZONES.length})
          </button>
          <button
            onClick={() => setActiveCategory('terraces')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-xs transition-colors cursor-pointer ${
              activeCategory === 'terraces'
                ? 'bg-stone-900 text-stone-50 shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/80'
            }`}
          >
            Italianate Terraces
          </button>
          <button
            onClick={() => setActiveCategory('water')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-xs transition-colors cursor-pointer ${
              activeCategory === 'water'
                ? 'bg-stone-900 text-stone-50 shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/80'
            }`}
          >
            Water Basins
          </button>
          <button
            onClick={() => setActiveCategory('woodlands')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-xs transition-colors cursor-pointer ${
              activeCategory === 'woodlands'
                ? 'bg-stone-900 text-stone-50 shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/80'
            }`}
          >
            Ancient Woodlands
          </button>
        </div>

        {/* Minimalistic Scroll Reveal Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {displayedZones.map((zone, idx) => (
            <ScrollReveal key={zone.id} delay={idx * 100}>
              <article
                className="group flex flex-col bg-white border border-stone-200/80 rounded-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer h-full"
                onClick={() => setSelectedZone(zone)}
              >
                {/* Card Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={zone.image}
                    alt={zone.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider bg-stone-900/80 text-stone-100 px-2.5 py-1 backdrop-blur-xs rounded-xs">
                      {zone.elevation}
                    </span>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata (NO PILLS) */}
                    <div className="flex items-center gap-2 text-xs text-stone-600 mb-2 font-sans">
                      <span>{zone.historicalPeriod}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{zone.ambience} Ambiance</span>
                    </div>

                    <h3 className="font-serif italic font-normal text-2xl sm:text-3xl text-stone-900 group-hover:text-stone-700 transition-colors">
                      {zone.name}
                    </h3>

                    <p className="text-stone-600 text-sm mt-3 leading-relaxed font-light line-clamp-3">
                      {zone.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-stone-600 font-serif italic">
                      <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                      <span>Key Flora: {zone.featuredPlants.slice(0, 2).join(', ')}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-medium text-stone-900 group-hover:underline">
                      <span>Archival Notes</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Archival Detail Modal */}
      {selectedZone && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-zone-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-[#FAF8F5] max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-sm border border-stone-300 shadow-xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedZone(null)}
              className="absolute top-5 right-5 p-2 text-stone-500 hover:text-stone-900 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-600 cursor-pointer"
              aria-label="Close archival details modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-widest font-sans text-stone-600 block mb-1">
              Field Archive · {selectedZone.elevation}
            </span>
            <h3 id="modal-zone-title" className="font-serif italic text-3xl text-stone-900 mb-2">
              {selectedZone.name}
            </h3>
            <p className="font-serif italic text-sm text-stone-600 mb-6">
              {selectedZone.subtitle}
            </p>

            <div className="rounded-sm overflow-hidden aspect-[16/9] mb-6 bg-stone-200 border border-stone-200">
              <img
                src={selectedZone.image}
                alt={selectedZone.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-stone-700 leading-relaxed font-light">
              <p>{selectedZone.description}</p>

              <div className="p-4 bg-[#F3EFEA] rounded-sm border border-stone-200/80 my-4">
                <h4 className="text-xs uppercase tracking-widest font-sans font-medium text-stone-900 mb-2">
                  Featured Botanical Specimens:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedZone.featuredPlants.map((plant) => (
                    <li key={plant} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-stone-700" />
                      <span className="font-serif italic text-stone-800">{plant}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-4 border-t border-stone-200 text-xs text-stone-600">
                <span>{selectedZone.historicalPeriod}</span>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-xs text-xs uppercase tracking-wider font-medium hover:bg-stone-800 cursor-pointer"
                >
                  Close Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
