/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export const OperationalRibbon: React.FC = () => {
  const [isPlayingSoundscape, setIsPlayingSoundscape] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Minimalist gentle procedural botanical soundscape (gentle breeze & soft distant chime) using Web Audio API
  const toggleSoundscape = () => {
    if (!isPlayingSoundscape) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        
        // Brown/pink filtered noise buffer for gentle rustling garden breeze
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.95 * b1 + white * 0.05;
          b2 = 0.85 * b2 + white * 0.05;
          output[i] = (b0 + b1 + b2) * 0.03;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();

        setAudioCtx(ctx);
        setIsPlayingSoundscape(true);
      } catch {
        // Fallback gracefully
        setIsPlayingSoundscape(false);
      }
    } else {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setIsPlayingSoundscape(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, [audioCtx]);

  return (
    <div className="w-full bg-[#F3EFEA] border-b border-stone-200/80 text-xs text-stone-700 py-2.5 px-4 sm:px-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:pr-18 lg:pr-24 flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
        {/* Left: Operational Metadata (unboxed, separated by subtle dots) */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-medium text-stone-900">Today: 10:00 AM – 5:00 PM</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>Timed Entry Suggested</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>Short Hills, NJ</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span className="text-stone-600 hidden sm:inline">28-Acre Historic ArbNet Sanctuary</span>
        </div>

        {/* Right: Garden Condition & Ambient Soundscape affordance */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-1.5 text-stone-600">
            <Sparkles className="w-3.5 h-3.5 text-stone-600" aria-hidden="true" />
            <span>Currently: Dappled Sunlight, 68°F · Peak Autumn Leaves</span>
          </div>

          <button
            onClick={toggleSoundscape}
            className="flex items-center gap-1.5 text-stone-700 hover:text-stone-900 transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-stone-600 px-2 py-0.5 rounded-sm"
            aria-label={isPlayingSoundscape ? 'Mute garden breeze soundscape' : 'Listen to garden breeze soundscape'}
            title="Procedural ambient garden breeze & foliage"
          >
            {isPlayingSoundscape ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-800 animate-pulse" />
                <span className="text-[11px] font-medium text-emerald-900">Soundscape Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-[11px]">Garden Ambiance</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
