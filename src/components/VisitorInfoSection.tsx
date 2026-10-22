/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Car, Train, Accessibility, Coffee, ChevronDown, ChevronUp } from 'lucide-react';

export const VisitorInfoSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the recommended duration for a visit?',
      a: 'Most visitors take between 90 minutes to two hours to comfortably wander the Italianate terraces, reflecting basins, and woodland trails at an unhurried, contemplative pace.',
    },
    {
      q: 'Is the garden accessible for wheelchairs and strollers?',
      a: 'The upper esplanade, main terraces, and reflecting basin feature compacted stone gravel paths. We offer complimentary electric golf cart escorts upon request for guests with mobility limitations.',
    },
    {
      q: 'May we bring a picnic or outside refreshments?',
      a: 'Picnicking is warmly welcomed in the designated upper Wildflower Meadow and lawn areas. We ask that guests carry out all waste and refrain from dining along the formal stone balustrades.',
    },
    {
      q: 'What is the photography policy for casual guests?',
      a: 'Handheld smartphone photography for personal memory is encouraged and requires no fee. Professional equipment, portrait sessions, tripods, and commercial gear require a $25 photography permit.',
    },
  ];

  return (
    <section id="visitor-info" className="py-24 bg-[#F7F4EE] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200/80">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-600 block mb-3 font-sans">
              Practical Field Guidance
            </span>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-stone-900 tracking-tight">
              Visitor Information &amp; Sanctuary Protocol
            </h2>
          </div>
          <p className="text-stone-600 text-sm sm:text-base font-light max-w-md leading-relaxed">
            Everything you need for an unhurried arrival, transit from the greater New York metropolitan area, and mindful exploration of the grounds.
          </p>
        </div>

        {/* 3 Practical Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {/* Transit & Location */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200">
            <div className="w-9 h-9 rounded-xs bg-[#F3EFEA] flex items-center justify-center text-stone-800 mb-4">
              <MapPin className="w-4 h-4" />
            </div>
            <h3 className="font-serif italic text-2xl text-stone-900 mb-2">Location &amp; Address</h3>
            <p className="text-sm font-light text-stone-700 leading-relaxed mb-4">
              274 Old Short Hills Road<br />
              Short Hills, New Jersey 07078
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Located in Essex County, approximately 22 miles west of Midtown Manhattan.
            </p>
          </div>

          {/* By Train / Transit */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200">
            <div className="w-9 h-9 rounded-xs bg-[#F3EFEA] flex items-center justify-center text-stone-800 mb-4">
              <Train className="w-4 h-4" />
            </div>
            <h3 className="font-serif italic text-2xl text-stone-900 mb-2">Rail From Manhattan</h3>
            <p className="text-sm font-light text-stone-700 leading-relaxed mb-4">
              NJ Transit Midtown Direct train from New York Penn Station to Short Hills Station (approx. 40 minutes).
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              A 5-minute rideshare or a scenic 1.2-mile walk through the historic Short Hills parkway.
            </p>
          </div>

          {/* Accessibility & Amenities */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200">
            <div className="w-9 h-9 rounded-xs bg-[#F3EFEA] flex items-center justify-center text-stone-800 mb-4">
              <Accessibility className="w-4 h-4" />
            </div>
            <h3 className="font-serif italic text-2xl text-stone-900 mb-2">Accessibility &amp; Parking</h3>
            <p className="text-sm font-light text-stone-700 leading-relaxed mb-4">
              Complimentary on-site gravel parking with designated accessible spaces and Level 2 EV charging stalls.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Electric cart transport assistance is available upon request at the gatehouse.
            </p>
          </div>
        </div>

        {/* Accordion FAQ Section */}
        <div className="mt-14 pt-10 border-t border-stone-200">
          <h3 className="font-serif italic text-2xl sm:text-3xl text-stone-900 mb-6">
            Frequently Inquired Sanctuary Details
          </h3>

          <div className="space-y-3 max-w-3xl">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-stone-200 bg-white rounded-xs overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50/50 cursor-pointer"
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-serif text-lg text-stone-900 font-normal">
                    {faq.q}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-stone-600 font-light leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
