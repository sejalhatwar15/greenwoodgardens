/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onReserveClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReserveClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-stone-800 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs'
            : 'bg-transparent border-b border-stone-300/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:pr-18 lg:pr-24 h-18 sm:h-20 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single element wordmark */}
          <a
            href="#"
            className="flex items-baseline gap-2 whitespace-nowrap shrink-0 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-600 rounded-sm"
          >
            <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-tight text-stone-900 font-medium group-hover:text-stone-700 transition-colors">
              Greenwood Gardens
            </span>
            <span className="hidden sm:inline text-[11px] font-sans tracking-widest uppercase text-stone-600 font-normal">
              Est. 1906
            </span>
          </a>

          {/* Zone 2: 4-5 single-line clean text links */}
          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-normal text-stone-700 tracking-wide"
            aria-label="Main Navigation"
          >
            <a
              href="#grounds"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-800 hover:after:w-full after:transition-all"
            >
              The Grounds
            </a>
            <a
              href="#in-bloom"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-800 hover:after:w-full after:transition-all"
            >
              In Bloom
            </a>
            <a
              href="#guided-walks"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-800 hover:after:w-full after:transition-all"
            >
              Guided Walks
            </a>
            <a
              href="#visitor-info"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-800 hover:after:w-full after:transition-all"
            >
              Visitor Info
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={onReserveClick}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-widest font-medium text-white bg-stone-900 rounded-xs hover:bg-stone-800 transition-colors shadow-xs whitespace-nowrap shrink-0 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-600 cursor-pointer"
            >
              Reserve Tickets
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-stone-800 hover:text-stone-950 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-600 rounded-sm"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-stone-200 px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3 text-base font-serif" aria-label="Mobile Navigation">
              <a
                href="#grounds"
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-800 hover:text-stone-950 py-1"
              >
                The Grounds &amp; Terraces
              </a>
              <a
                href="#in-bloom"
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-800 hover:text-stone-950 py-1"
              >
                Currently In Bloom
              </a>
              <a
                href="#guided-walks"
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-800 hover:text-stone-950 py-1"
              >
                Curator Guided Walks
              </a>
              <a
                href="#visitor-info"
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-800 hover:text-stone-950 py-1"
              >
                Visitor Information &amp; Hours
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
