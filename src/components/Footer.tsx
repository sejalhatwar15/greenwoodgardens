/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-stone-200/90 pt-16 pb-12 text-stone-700">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-stone-200/80">
          {/* Col 1-5: Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl tracking-tight text-stone-900 font-medium">
                Greenwood Gardens
              </span>
              <span className="text-[11px] font-sans tracking-widest uppercase text-stone-400">
                Est. 1906
              </span>
            </div>

            <p className="font-serif italic text-base text-stone-600 leading-relaxed max-w-sm">
              A twenty-eight acre historic garden and nature sanctuary connecting people with the heritage of landscape art and the restorative calm of nature.
            </p>

            <p className="text-xs text-stone-600 font-light pt-2">
              Greenwood Gardens is a 501(c)(3) non-profit public charity accredited at Level II by ArbNet.
            </p>
          </div>

          {/* Col 6-8: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest font-sans font-medium text-stone-900 block mb-3">
              Sanctuary Exploration
            </span>
            <ul className="space-y-2 text-xs text-stone-600 font-sans">
              <li>
                <a href="#grounds" className="hover:text-stone-950 transition-colors">
                  Italianate Terraces &amp; Balustrades
                </a>
              </li>
              <li>
                <a href="#grounds" className="hover:text-stone-950 transition-colors">
                  The Great Reflecting Basin
                </a>
              </li>
              <li>
                <a href="#in-bloom" className="hover:text-stone-950 transition-colors">
                  Phenology &amp; Seasonal Blooms
                </a>
              </li>
              <li>
                <a href="#guided-walks" className="hover:text-stone-950 transition-colors">
                  Curator &amp; Arborist Guided Walks
                </a>
              </li>
              <li>
                <a href="#reserve" className="hover:text-stone-950 transition-colors">
                  Timed Admission Reservations
                </a>
              </li>
              <li>
                <a href="#visitor-info" className="hover:text-stone-950 transition-colors">
                  Accessibility &amp; Getting Here
                </a>
              </li>
            </ul>
          </div>

          {/* Col 9-12: The Phenology Dispatch (Newsletter) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-widest font-sans font-medium text-stone-900 block mb-2">
              The Phenology Dispatch
            </span>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Receive monthly dispatches highlighting peak garden blooms, rare tree alerts, and early booking windows for lantern walks.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>You are subscribed to the seasonal phenology dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-l-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-stone-800"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-medium rounded-r-xs transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
                {error && <p className="text-[11px] text-rose-700">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Clean unboxed copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600 font-sans">
          <p>© {new Date().getFullYear()} Greenwood Gardens Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>274 Old Short Hills Road, Short Hills, NJ 07078</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>(973) 258-4026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
