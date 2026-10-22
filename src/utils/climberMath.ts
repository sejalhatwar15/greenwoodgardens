/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpiralPoint {
  x: number;
  y: number;
  z: number; // -1 (deep background) to +1 (foreground)
  scale: number; // depth scale between 0.75 and 1.25
  angleDeg: number;
  phaseRad: number;
}

export interface SpiralLeafNode {
  id: string;
  x: number;
  y: number;
  z: number;
  scale: number;
  angleDeg: number;
  type: 'leaf' | 'tendril' | 'bloom';
  strand: 'primary' | 'secondary';
  progressThreshold: number;
}

export interface HelixPaths {
  primaryPath: string;
  secondaryPath: string;
  fullPath: string;
  frontPath: string;
  backPath: string;
}

/**
 * Calculates a point on a 3D circular helix / spiral projected onto 2D.
 * @param y Vertical position in pixels
 * @param centerX Center X coordinate
 * @param radius Radius of the circular spiral cylinder
 * @param pitch Vertical height for one full 360-degree circular spiral turn
 * @param rotationAngle Continuous rotation or scroll-driven spin angle in radians
 * @param phaseOffset Optional phase shift in radians (e.g., Math.PI for intertwined twin vine)
 */
export function getSpiralPoint(
  y: number,
  centerX: number = 28,
  radius: number = 14,
  pitch: number = 130,
  rotationAngle: number = 0,
  phaseOffset: number = 0
): SpiralPoint {
  const k = (2 * Math.PI) / pitch;
  const phase = y * k + rotationAngle + phaseOffset;

  const rawX = centerX + radius * Math.cos(phase);
  const rawZ = Math.sin(phase);
  const z = Math.abs(rawZ) < 0.0001 ? 0 : rawZ;

  // Scale simulates 3D depth perspective
  const scale = 1 + 0.25 * z;

  // Tangent derivative dx/dy
  const dxDy = -radius * k * Math.sin(phase);
  const angleRad = Math.atan2(dxDy, 1);
  const angleDeg = (angleRad * 180) / Math.PI;

  const cleanX = Math.abs(rawX - centerX) < 0.0001 ? centerX : rawX;

  return {
    x: Number(cleanX.toFixed(2)),
    y: Number(y.toFixed(2)),
    z: Number(z.toFixed(3)),
    scale: Number(scale.toFixed(3)),
    angleDeg: Number(angleDeg.toFixed(2)),
    phaseRad: phase,
  };
}

/**
 * Generates continuous, unbroken SVG paths for the spinning botanical helix.
 * Produces a primary flowing vine stem and a companion intertwined shoot.
 * Both paths are unbroken, continuous splines from top to bottom.
 */
export function generateSpiralHelixPaths(
  totalHeight: number,
  centerX: number = 28,
  radius: number = 14,
  pitch: number = 130,
  step: number = 12,
  rotationAngle: number = 0
): HelixPaths {
  if (totalHeight <= 0) {
    return {
      primaryPath: '',
      secondaryPath: '',
      fullPath: '',
      frontPath: '',
      backPath: '',
    };
  }

  const k = (2 * Math.PI) / pitch;
  const companionRadius = radius * 0.75;

  let primaryPath = '';
  let secondaryPath = '';
  let frontPath = '';
  let backPath = '';

  let prevX1 = 0;
  let prevY1 = 0;
  let prevZ1 = 0;
  let hasPrev = false;

  for (let y = 0; y <= totalHeight; y += step) {
    const phase1 = y * k + rotationAngle;
    const x1 = Math.round((centerX + radius * Math.cos(phase1)) * 100) / 100;
    const z1 = Math.sin(phase1);

    const phase2 = phase1 + Math.PI;
    const x2 = Math.round((centerX + companionRadius * Math.cos(phase2)) * 100) / 100;

    if (!hasPrev) {
      primaryPath = `M ${x1} ${y}`;
      secondaryPath = `M ${x2} ${y}`;
    } else {
      primaryPath += ` L ${x1} ${y}`;
      secondaryPath += ` L ${x2} ${y}`;

      if (z1 >= 0 || prevZ1 >= 0) {
        if (!frontPath.endsWith(`${prevX1} ${prevY1}`)) {
          frontPath += ` M ${prevX1} ${prevY1}`;
        }
        frontPath += ` L ${x1} ${y}`;
      }
      if (z1 < 0 || prevZ1 < 0) {
        if (!backPath.endsWith(`${prevX1} ${prevY1}`)) {
          backPath += ` M ${prevX1} ${prevY1}`;
        }
        backPath += ` L ${x1} ${y}`;
      }
    }

    prevX1 = x1;
    prevY1 = y;
    prevZ1 = z1;
    hasPrev = true;
  }

  // Ensure path spans to exact totalHeight
  if (totalHeight % step !== 0) {
    const phase1 = totalHeight * k + rotationAngle;
    const x1 = Math.round((centerX + radius * Math.cos(phase1)) * 100) / 100;
    const phase2 = phase1 + Math.PI;
    const x2 = Math.round((centerX + companionRadius * Math.cos(phase2)) * 100) / 100;

    primaryPath += ` L ${x1} ${totalHeight}`;
    secondaryPath += ` L ${x2} ${totalHeight}`;
  }

  return {
    primaryPath: primaryPath.trim(),
    secondaryPath: secondaryPath.trim(),
    fullPath: primaryPath.trim(),
    frontPath: frontPath.trim(),
    backPath: backPath.trim(),
  };
}

/**
 * Generates botanical leaves, tendrils and blooms distributed along the spinning spiral helix.
 * Populates both primary and intertwined companion strands with depth-ordered nodes.
 */
export function generateSpiralNodes(
  totalHeight: number,
  centerX: number = 28,
  radius: number = 14,
  pitch: number = 130,
  spacing: number = 52,
  rotationAngle: number = 0
): SpiralLeafNode[] {
  const nodes: SpiralLeafNode[] = [];
  let count = 0;

  for (let y = 30; y < totalHeight - 25; y += spacing) {
    // Alternate between primary and secondary strands for balanced botanical density
    const isPrimary = count % 2 === 0;
    const strand = isPrimary ? 'primary' : 'secondary';
    const strandRadius = isPrimary ? radius : radius * 0.75;
    const strandOffset = isPrimary ? 0 : Math.PI;

    const pt = getSpiralPoint(y, centerX, strandRadius, pitch, rotationAngle, strandOffset);
    const typeMod = count % 4;
    const type = typeMod === 0 ? 'bloom' : typeMod === 1 || typeMod === 3 ? 'leaf' : 'tendril';

    nodes.push({
      id: `spiral-node-${count}`,
      x: pt.x,
      y: pt.y,
      z: pt.z,
      scale: pt.scale,
      angleDeg: pt.angleDeg,
      type,
      strand,
      progressThreshold: Number((y / Math.max(1, totalHeight)).toFixed(3)),
    });
    count++;
  }

  return nodes;
}

/**
 * Computes the circular spin rotation angle in radians based on scroll position.
 * @param scrollY Current scroll offset in pixels
 * @param rate Rotation factor per pixel (default 0.012 = 1 full spin per ~524px of scroll)
 */
export function computeScrollSpinAngle(scrollY: number, rate: number = 0.012): number {
  return (scrollY * rate) % (Math.PI * 2);
}

/**
 * Returns section name according to scroll progress.
 */
export function getSectionFromProgress(progress: number): string {
  const clamped = Math.max(0, Math.min(1, progress));
  if (clamped < 0.18) return 'The Estate';
  if (clamped < 0.42) return 'Historic Terraces';
  if (clamped < 0.65) return 'Currently In Bloom';
  if (clamped < 0.82) return 'Guided Walks';
  return 'Timed Reservations';
}
