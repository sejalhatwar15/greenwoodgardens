/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Sun, MapPin, Feather } from 'lucide-react';
import { BOTANICAL_SPECIMENS, BotanicalSpecimen, filterSpecimensBySeason } from '../utils/gardenData';
import { ScrollReveal } from '../utils/useScrollAnimation';

export const BotanicalBloomHerbarium: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState<'all' | 'spring' | 'summer' | 'autumn' | 'winter'>('autumn');
  const [searchQuery, setSearchQuery] = useState('');

  const seasonalSpecimens = filterSpecimensBySeason(BOTANICAL_SPECIMENS, activeSeason);
  const filteredSpecimens = seasonalSpecimens.filter((specimen) => {
    const query = searchQuery.toLowerCase();
    return (
      specimen.commonName.toLowerCase().includes(query) ||
      specimen.scientificName.toLowerCase().includes(query) ||
      specimen.family.toLowerCase().includes(query) ||
      specimen.location.toLowerCase().includes(query)
    );
  });

  return (
    <section id="in-bloom" className="py-24 bg-[#F7F4EE] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Title */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200/80">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-600 block mb-3 font-sans">
                Herbarium &amp; Phenology Calendar
              </span>
              <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-stone-900 tracking-tight">
                What Is In Bloom Across The Grounds
              </h2>
            </div>
            <p className="text-stone-600 text-sm sm:text-base font-light max-w-md leading-relaxed">
              The gardens present four distinct seasonal tapestries. Explore documented botanical specimens categorized by their active flowering window and microclimate.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter & Search Bar */}
        <div className="pt-8 pb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Season Segmented Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EAE5DC] rounded-sm">
            {(['all', 'spring', 'summer', 'autumn', 'winter'] as const).map((season) => (
              <button
                key={season}
                onClick={() => setActiveSeason(season)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded-xs transition-colors cursor-pointer ${
                  activeSeason === season
                    ? 'bg-[#FAF8F5] text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {season === 'all' ? 'All Seasons' : season}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative min-w-[260px] max-w-sm">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search botanical specimen or family..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-sm focus:outline-hidden focus:border-stone-800 transition-colors text-stone-800 placeholder-stone-400"
            />
          </div>
        </div>

        {/* Herbarium Specimen Cards Grid */}
        {filteredSpecimens.length === 0 ? (
          <div className="py-16 text-center text-stone-500 bg-white border border-dashed border-stone-300 rounded-sm">
            <Feather className="w-8 h-8 mx-auto mb-3 text-stone-400" />
            <p className="font-serif italic text-lg text-stone-700">No specimens match your search criteria</p>
            <p className="text-xs text-stone-500 mt-1">Try clearing filters or switching seasons</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpecimens.map((specimen, idx) => (
              <ScrollReveal key={specimen.id} delay={idx * 75}>
                <div className="bg-white p-6 rounded-sm border border-stone-200/90 hover:border-stone-400 transition-colors flex flex-col justify-between h-full">
                  <div>
                    {/* Clean unboxed category & family */}
                    <div className="flex items-center justify-between text-xs text-stone-600 font-sans mb-3">
                      <span className="uppercase tracking-wider text-[11px] font-mono">
                        Fam. {specimen.family}
                      </span>
                      <span className="capitalize">{specimen.season} Bloom</span>
                    </div>

                    {/* Common Name */}
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900">
                      {specimen.commonName}
                    </h3>

                    {/* Scientific Name in Italic */}
                    <p className="font-serif italic text-sm text-stone-600 mt-1 mb-4">
                      {specimen.scientificName}
                    </p>

                    {/* Bloom Highlight Description */}
                    <p className="text-xs text-stone-600 leading-relaxed font-light mb-6">
                      {specimen.bloomHighlight}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                    <div className="flex items-center gap-1 text-[11px]">
                      <Sun className="w-3.5 h-3.5 text-stone-500" />
                      <span>{specimen.sunlight}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-sans">
                      <MapPin className="w-3.5 h-3.5 text-stone-500" />
                      <span>{specimen.location}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
