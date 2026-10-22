/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  getSpiralPoint,
  generateSpiralHelixPaths,
  generateSpiralNodes,
  computeScrollSpinAngle,
  SpiralLeafNode,
} from '../utils/climberMath';

export const BotanicalClimber: React.FC = () => {
  const [docHeight, setDocHeight] = useState(4500);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(800);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [continuousAngle, setContinuousAngle] = useState(0);

  const prevScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Geometric parameters - strict compact bounds so it never intrudes on page elements
  const width = 56;
  const centerX = 28;
  const radius = 14; // Tight spiral radius so the helix stays cleanly inside the 56px rail
  const pitch = 130; // Vertical distance per full 360° corkscrew turn

  // Gentle natural ambient drift
  useEffect(() => {
    let lastTime = performance.now();
    const animateDrift = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      setContinuousAngle((prev) => (prev + delta * 0.4) % (Math.PI * 2));
      rafRef.current = requestAnimationFrame(animateDrift);
    };

    rafRef.current = requestAnimationFrame(animateDrift);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);

    const updateDocMetrics = () => {
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight
      );
      setDocHeight(scrollHeight);
      setViewportHeight(window.innerHeight || 800);
    };

    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);

      if (Math.abs(y - prevScrollYRef.current) > 1) {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = window.setTimeout(() => {
          setIsScrolling(false);
        }, 220);
        prevScrollYRef.current = y;
      }
    };

    updateDocMetrics();
    handleScroll();

    window.addEventListener('resize', updateDocMetrics, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && document.body) {
      resizeObserver = new ResizeObserver(() => {
        updateDocMetrics();
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      window.removeEventListener('resize', updateDocMetrics);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  // 3D helical spin angle: smoothly responsive to scroll (0.012 rad/px) plus subtle ambient drift
  const scrollSpinAngle = useMemo(() => {
    return computeScrollSpinAngle(scrollY, 0.012) + continuousAngle * 0.1;
  }, [scrollY, continuousAngle]);

  // Climber head position along the full-page vine
  const climberY = useMemo(() => {
    const targetY = scrollY + viewportHeight * 0.42;
    return Math.max(45, Math.min(docHeight - 65, targetY));
  }, [scrollY, viewportHeight, docHeight]);

  // 3D coordinates for the climber head
  const climberPoint = useMemo(() => {
    return getSpiralPoint(climberY, centerX, radius, pitch, scrollSpinAngle, 0);
  }, [climberY, centerX, radius, pitch, scrollSpinAngle]);

  // Continuous, unbroken helical paths: primary vine and companion shoot
  const helixPaths = useMemo(() => {
    return generateSpiralHelixPaths(docHeight, centerX, radius, pitch, 12, scrollSpinAngle);
  }, [docHeight, centerX, radius, pitch, scrollSpinAngle]);

  // Botanically distributed leaf & bloom nodes orbiting along the spinning helix
  const spiralNodes: SpiralLeafNode[] = useMemo(() => {
    return generateSpiralNodes(docHeight, centerX, radius, pitch, 52, scrollSpinAngle);
  }, [docHeight, centerX, radius, pitch, scrollSpinAngle]);

  // Dynamic degrees for rotating head and florets
  const continuousDeg = (continuousAngle * 180) / Math.PI;
  const spinDeg = (scrollSpinAngle * 180) / Math.PI;

  if (!isMounted) return null;

  return (
    <div
      aria-label="Full-Page Spinning Spiral Botanical Vine"
      className="absolute right-2 md:right-4 lg:right-6 top-0 bottom-0 w-[56px] pointer-events-none z-20 select-none hidden md:block"
      style={{ height: `${docHeight}px` }}
    >
      <svg
        className="w-full h-full overflow-hidden"
        viewBox={`0 0 ${width} ${docHeight}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle antique guideline */}
          <linearGradient id="fullAxisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A8A29E" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#78716C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#A8A29E" stopOpacity="0.15" />
          </linearGradient>

          {/* Continuous unbroken primary vine gradient */}
          <linearGradient id="primaryStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E4720" />
            <stop offset="50%" stopColor="#2E6932" />
            <stop offset="100%" stopColor="#225426" />
          </linearGradient>

          {/* Continuous companion intertwined shoot */}
          <linearGradient id="companionStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#357039" />
            <stop offset="100%" stopColor="#4A8A4E" />
          </linearGradient>

          {/* Foliage leaf gradient */}
          <linearGradient id="fullLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4C8A42" />
            <stop offset="100%" stopColor="#224F1E" />
          </linearGradient>

          {/* Wisteria flower drop gradient */}
          <linearGradient id="fullWisteriaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DDD6FE" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>

          {/* Active climber aura filter */}
          <filter id="climberAura" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Slim Antique Trellis Axis Guideline (unbroken, subtle background anchor) */}
        <line
          x1={centerX}
          y1={8}
          x2={centerX}
          y2={docHeight - 8}
          stroke="url(#fullAxisGrad)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />

        {/* 2. BACKGROUND FOLIAGE & NODES (z < 0): Rendered behind the stems for natural 3D depth */}
        {spiralNodes
          .filter((n) => n.z < 0)
          .map((node) => {
            const flip = node.x >= centerX ? 1 : -1;
            const isSecondary = node.strand === 'secondary';

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y}) scale(${node.scale * 0.78}) rotate(${node.angleDeg * 0.3})`}
                opacity={0.7}
              >
                {node.type === 'leaf' && (
                  <g transform={`scale(${flip}, 1)`}>
                    <path d="M 0,0 C 2,-2 5,-2 7,-3" fill="none" stroke="#25521E" strokeWidth="1" />
                    <path
                      d="M 7,-3 C 10,-8 16,-7 18,-4 C 17,0 12,2 7,-3 Z"
                      fill="url(#fullLeafGrad)"
                      stroke="#143A10"
                      strokeWidth="0.5"
                    />
                  </g>
                )}

                {node.type === 'tendril' && (
                  <g transform={`scale(${flip}, 1)`}>
                    <path
                      d="M 0,0 C 4,-2 8,0 10,4 C 11,7 8,9 5,7 C 4,5 5,4 6,4"
                      fill="none"
                      stroke={isSecondary ? '#3A7844' : '#285F2C'}
                      strokeWidth="0.9"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {node.type === 'bloom' && (
                  <g transform={`scale(${flip}, 1)`}>
                    <path d="M 0,0 C 2,-1 4,1 6,3" fill="none" stroke="#25521E" strokeWidth="0.9" />
                    <ellipse
                      cx="7"
                      cy="4"
                      rx="2.1"
                      ry="2.8"
                      transform="rotate(18 7 4)"
                      fill="url(#fullWisteriaGrad)"
                      opacity="0.85"
                    />
                  </g>
                )}

                {/* Small joint node */}
                <circle cx="0" cy="0" r="1.5" fill="#25521E" />
              </g>
            );
          })}

        {/* 3. COMPANION INTERTWINED VINE: Continuous, unbroken, rich botanical shoot */}
        <path
          d={helixPaths.secondaryPath}
          fill="none"
          stroke="url(#companionStemGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 4. PRIMARY BOTANICAL VINE: Continuous, unbroken, uniform forest vine from top to bottom */}
        <path
          d={helixPaths.primaryPath}
          fill="none"
          stroke="url(#primaryStemGrad)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 5. FOREGROUND FOLIAGE & NODES (z >= 0): Rendered in front of the stems */}
        {spiralNodes
          .filter((n) => n.z >= 0)
          .map((node) => {
            const flip = node.x >= centerX ? 1 : -1;
            const isSecondary = node.strand === 'secondary';

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y}) scale(${node.scale * 0.95}) rotate(${node.angleDeg * 0.35})`}
                className="transition-transform duration-75"
              >
                {node.type === 'leaf' && (
                  <g transform={`scale(${flip}, 1)`}>
                    {/* Stemlet */}
                    <path d="M 0,0 C 3,-2 7,-1 10,-3" fill="none" stroke="#1B4316" strokeWidth="1.2" />
                    {/* Main Leaf blade */}
                    <path
                      d="M 10,-3 C 13,-9 22,-8 24,-5 C 23,0 16,3 10,-3 Z"
                      fill="url(#fullLeafGrad)"
                      stroke="#143A10"
                      strokeWidth="0.6"
                      className="drop-shadow-xs"
                    />
                    {/* Central vein */}
                    <path
                      d="M 10,-3 C 14,-5 19,-5 22,-5"
                      fill="none"
                      stroke="#86EFAC"
                      strokeWidth="0.5"
                      opacity="0.8"
                    />
                  </g>
                )}

                {node.type === 'tendril' && (
                  <g transform={`scale(${flip}, 1)`}>
                    <path
                      d="M 0,0 C 5,-3 10,-1 12,4 C 13,8 9,11 6,9 C 4,7 5,5 7,5 C 8,5 9,6 9,7"
                      fill="none"
                      stroke={isSecondary ? '#3A7844' : '#285F2C'}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {node.type === 'bloom' && (
                  <g transform={`scale(${flip}, 1)`}>
                    <path d="M 0,0 C 2,-1 5,1 7,4" fill="none" stroke="#225426" strokeWidth="1.1" />
                    <ellipse
                      cx="8"
                      cy="5"
                      rx="2.6"
                      ry="3.5"
                      transform="rotate(20 8 5)"
                      fill="url(#fullWisteriaGrad)"
                      stroke="#5B21B6"
                      strokeWidth="0.5"
                      className="drop-shadow-xs"
                    />
                    <circle cx="8" cy="3.5" r="1.1" fill="#DDD6FE" />
                  </g>
                )}

                {/* Growth joint node */}
                <circle cx="0" cy="0" r="1.8" fill="#1C4B18" stroke="#86EFAC" strokeWidth="0.4" />
              </g>
            );
          })}

        {/* 6. THE ACTIVE CLIMBER HEAD: CIRCULAR SPIRAL REVOLVING BLOSSOM */}
        {/* Revolves in 3D circular orbit along the full-page vine as you scroll down */}
        <g
          transform={`translate(${climberPoint.x}, ${climberPoint.y}) scale(${climberPoint.scale}) rotate(${climberPoint.angleDeg * 0.4})`}
          className="transition-transform duration-75 ease-out"
          filter={isScrolling ? 'url(#climberAura)' : undefined}
        >
          {/* Outer revolving tendril curl that spins with scroll angle */}
          <g transform={`rotate(${spinDeg.toFixed(1)})`}>
            <path
              d="M 0,0 C 3,4 7,5 10,3 C 12,1 12,-3 9,-5 C 6,-7 1,-5 -2,-2 C -4,2 -3,6 0,8 C 3,10 8,9 11,6"
              fill="none"
              stroke="#22C55E"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <circle cx="9" cy="4" r="1.4" fill="#86EFAC" />
            <circle cx="-2" cy="-2" r="1.2" fill="#BBF7D0" />
            <circle cx="9" cy="-4" r="1.5" fill="#4ADE80" />
          </g>

          {/* Central circular core with subtle translucent halo */}
          <circle
            cx="0"
            cy="0"
            r={isScrolling ? 11 : 9}
            fill="#4ADE80"
            opacity={isScrolling ? 0.35 : 0.2}
            className="transition-all duration-300"
          />

          <circle
            cx="0"
            cy="0"
            r="4.2"
            fill="#14532D"
            stroke="#FAF8F5"
            strokeWidth="1.4"
          />

          {/* Symmetrical unfurling leaf petals in circular spin arrangement */}
          <g transform={`rotate(${((spinDeg * 0.7) + (continuousDeg * 0.3)).toFixed(1)})`}>
            <path
              d="M 0,0 C -4,-4 -9,-2 -11,1 C -9,5 -4,3 0,0 Z"
              fill="#22C55E"
              stroke="#14532D"
              strokeWidth="0.7"
            />
            <path
              d="M 0,0 C 4,-4 9,-2 11,1 C 9,5 4,3 0,0 Z"
              fill="#4ADE80"
              stroke="#15803D"
              strokeWidth="0.7"
            />
            <path
              d="M 0,0 C -2,5 -1,9 2,10 C 5,8 4,3 0,0 Z"
              fill="#16A34A"
              stroke="#14532D"
              strokeWidth="0.7"
            />
            <path
              d="M 0,0 C 2,-5 1,-9 -2,-10 C -5,-8 -4,-3 0,0 Z"
              fill="#22C55E"
              stroke="#14532D"
              strokeWidth="0.7"
            />
          </g>

          {/* Circular Wisteria Flower Crown at Center of the head */}
          <ellipse
            cx="0"
            cy="-3.5"
            rx="3"
            ry="4"
            fill="url(#fullWisteriaGrad)"
            stroke="#5B21B6"
            strokeWidth="0.6"
          />
          <circle cx="0" cy="-3.5" r="1.2" fill="#FAF5FF" />
        </g>
      </svg>
    </div>
  );
};
