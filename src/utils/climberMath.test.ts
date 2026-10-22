/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getSpiralPoint,
  generateSpiralHelixPaths,
  generateSpiralNodes,
  getSectionFromProgress,
  computeScrollSpinAngle,
} from './climberMath.ts';

test('getSpiralPoint computes circular coordinates and 3D depth correctly', () => {
  const center = 50;
  const radius = 20;
  const pitch = 100;

  // At y = 0: phase = 0 -> cos(0) = 1 -> x = 70, z = sin(0) = 0
  const pt0 = getSpiralPoint(0, center, radius, pitch, 0);
  assert.equal(pt0.x, 70);
  assert.equal(pt0.z, 0);
  assert.equal(pt0.scale, 1);

  // At y = 25 (quarter pitch, 90 deg): cos(pi/2) = 0 -> x = 50, z = sin(pi/2) = 1 (foreground)
  const pt25 = getSpiralPoint(25, center, radius, pitch, 0);
  assert.equal(pt25.x, 50);
  assert.equal(pt25.z, 1);
  assert.ok(pt25.scale > 1); // Foreground is enlarged

  // At y = 50 (half pitch, 180 deg): cos(pi) = -1 -> x = 30, z = sin(pi) = 0
  const pt50 = getSpiralPoint(50, center, radius, pitch, 0);
  assert.equal(pt50.x, 30);
  assert.equal(pt50.z, 0);

  // At y = 75 (three quarter pitch, 270 deg): cos(3pi/2) = 0 -> x = 50, z = -1 (background)
  const pt75 = getSpiralPoint(75, center, radius, pitch, 0);
  assert.equal(pt75.x, 50);
  assert.equal(pt75.z, -1);
  assert.ok(pt75.scale < 1); // Background is smaller
});

test('getSpiralPoint supports phaseOffset for entwined companion vine', () => {
  const center = 30;
  const radius = 15;
  const pitch = 120;

  const ptPrimary = getSpiralPoint(0, center, radius, pitch, 0, 0);
  const ptCompanion = getSpiralPoint(0, center, radius, pitch, 0, Math.PI);

  // Opposite sides of cylinder
  assert.equal(ptPrimary.x, center + radius);
  assert.equal(ptCompanion.x, center - radius);
});

test('computeScrollSpinAngle computes rotation angle from scroll', () => {
  const angle0 = computeScrollSpinAngle(0);
  assert.equal(angle0, 0);

  const angle100 = computeScrollSpinAngle(100, 0.01);
  assert.equal(angle100, 1);
});

test('generateSpiralHelixPaths creates continuous unbroken primary and secondary paths', () => {
  const paths = generateSpiralHelixPaths(500, 28, 14, 120, 10, 0);

  // Primary path must be continuous: starts with single 'M' and has no extra 'M' commands
  assert.ok(paths.primaryPath.startsWith('M '));
  const primaryMMatches = paths.primaryPath.match(/M /g);
  assert.equal(primaryMMatches?.length, 1, 'Primary path must be one continuous unbroken spline');

  // Secondary path must also be continuous
  assert.ok(paths.secondaryPath.startsWith('M '));
  const secondaryMMatches = paths.secondaryPath.match(/M /g);
  assert.equal(secondaryMMatches?.length, 1, 'Secondary path must be one continuous unbroken spline');
});

test('generateSpiralHelixPaths updates coordinates when rotationAngle changes (spinning by scroll)', () => {
  const unrotated = generateSpiralHelixPaths(200, 28, 14, 100, 10, 0);
  const rotated = generateSpiralHelixPaths(200, 28, 14, 100, 10, Math.PI / 2);

  // The paths should differ because the helix has spun 90 degrees
  assert.notEqual(unrotated.primaryPath, rotated.primaryPath);
});

test('generateSpiralNodes distributes nodes with depth properties across both strands', () => {
  const nodes = generateSpiralNodes(600, 28, 14, 120, 40, 0);
  assert.ok(nodes.length >= 12);
  const hasPrimary = nodes.some((n) => n.strand === 'primary');
  const hasSecondary = nodes.some((n) => n.strand === 'secondary');
  assert.ok(hasPrimary, 'Must contain nodes on primary strand');
  assert.ok(hasSecondary, 'Must contain nodes on secondary strand');

  nodes.forEach((node) => {
    assert.ok(node.z >= -1 && node.z <= 1);
    assert.ok(node.scale >= 0.7 && node.scale <= 1.35);
  });
});

test('getSectionFromProgress returns correct landmarks', () => {
  assert.equal(getSectionFromProgress(0.1), 'The Estate');
  assert.equal(getSectionFromProgress(0.35), 'Historic Terraces');
  assert.equal(getSectionFromProgress(0.55), 'Currently In Bloom');
  assert.equal(getSectionFromProgress(0.75), 'Guided Walks');
  assert.equal(getSectionFromProgress(0.9), 'Timed Reservations');
});

test('generateSpiralHelixPaths handles full document height smoothly', () => {
  const paths = generateSpiralHelixPaths(5000, 28, 14, 130, 12, 0);
  assert.ok(paths.primaryPath.length > 500);
  assert.ok(paths.secondaryPath.length > 500);
  const nodes = generateSpiralNodes(5000, 28, 14, 130, 60, 0);
  assert.ok(nodes.length > 50);
});
