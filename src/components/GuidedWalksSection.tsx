/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { GUIDED_WALKS } from '../utils/gardenData';
import { ScrollReveal } from '../utils/useScrollAnimation';

interface GuidedWalksSectionProps {
  onSelectWalk: (walkId: string) => void;
}

export const GuidedWalksSection: React.FC<GuidedWalksSectionProps> = ({ onSelectWalk }) => {
  return (
    <section id="guided-walks" className="py-24 bg-[#FAF8F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200/80">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-600 block mb-3 font-sans">
                Curator &amp; Arborist Guided Walks
              </span>
              <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-stone-900 tracking-tight">
                Deepen Your Journey Through Living History
              </h2>
            </div>
            <p className="text-stone-600 text-sm sm:text-base font-light max-w-md leading-relaxed">
              Led by resident landscape historians and certified arborists, these intimate walking seminars unveil hidden architectural motifs, rare specimen trees, and conservation lore.
            </p>
          </div>
        </ScrollReveal>

        {/* Guided Walks Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {GUIDED_WALKS.map((walk, idx) => (
            <ScrollReveal key={walk.id} delay={idx * 100}>
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/90 flex flex-col justify-between hover:shadow-sm transition-shadow h-full">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-600 font-sans mb-3">
                    <span className="font-mono uppercase tracking-wider text-[11px] text-stone-700">
                      {walk.time}
                    </span>
                    <span>{walk.duration}</span>
                  </div>

                  <h3 className="font-serif italic text-2xl text-stone-900 mb-2 font-normal">
                    {walk.title}
                  </h3>

                  <p className="text-xs uppercase tracking-wider text-stone-700 font-sans mb-4">
                    Led by {walk.lead}
                  </p>

                  <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                    {walk.description}
                  </p>

                  <div className="py-3 px-3.5 bg-[#F3EFEA] rounded-xs text-xs text-stone-800 mb-6 flex items-start gap-2">
                    <Award className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                    <span>{walk.highlight}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-600 block">Tour Admission</span>
                    <span className="font-serif text-lg font-medium text-stone-900">
                      +${walk.pricePerPerson} <span className="text-xs font-sans text-stone-600 font-normal">/ guest</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectWalk(walk.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xs text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                  >
                    <span>Select Walk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
