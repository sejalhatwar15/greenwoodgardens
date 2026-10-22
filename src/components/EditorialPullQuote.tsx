/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScrollReveal } from '../utils/useScrollAnimation';

export const EditorialPullQuote: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-b border-stone-200/80">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <ScrollReveal>
          <div className="space-y-6">
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-stone-600 block">
              The Founding Ethos
            </span>

            <blockquote className="font-serif italic font-normal text-2xl sm:text-3xl md:text-4xl text-stone-900 leading-[1.25] text-balance">
              &ldquo;To step into Greenwood is to step out of time—where ancient limestone, weeping foliage, and the music of falling water restore the contemplative spirit.&rdquo;
            </blockquote>

            <div className="pt-2">
              <cite className="not-italic text-xs uppercase tracking-widest text-stone-700 font-sans block">
                Peter P. Blanchard Jr.
              </cite>
              <span className="text-xs text-stone-600 font-serif italic block mt-0.5">
                Founder &amp; Conservation Steward, Greenwood Gardens
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
