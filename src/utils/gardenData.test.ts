/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTicketTotal,
  filterZones,
  filterSpecimensBySeason,
  validateReservationForm,
  GARDEN_ZONES,
  BOTANICAL_SPECIMENS,
} from './gardenData.ts';

test('calculateTicketTotal computes general admission correctly', () => {
  const result = calculateTicketTotal({
    adult: 2,
    senior: 1,
    student: 1,
    member: 0,
  });

  // 2 * 15 + 1 * 10 + 1 * 8 = 30 + 10 + 8 = 48
  assert.equal(result.ticketSubtotal, 48);
  assert.equal(result.guidedTourCost, 0);
  assert.equal(result.photographyPermitCost, 0);
  assert.equal(result.total, 48);
  assert.equal(result.totalGuests, 4);
});

test('calculateTicketTotal includes member free entry and add-on guided tour', () => {
  const result = calculateTicketTotal(
    {
      adult: 1,
      senior: 0,
      student: 0,
      member: 2,
    },
    {
      guidedTourId: 'architectural-heritage', // $10 per person
      photographyPermit: true, // $25
      donationAmount: 15,
    }
  );

  // Tickets: 1 adult ($15) + 2 members ($0) = $15
  // Total guests: 3
  // Guided tour: 3 * $10 = $30
  // Photo permit: $25
  // Donation: $15
  // Total = 15 + 30 + 25 + 15 = 85
  assert.equal(result.totalGuests, 3);
  assert.equal(result.ticketSubtotal, 15);
  assert.equal(result.guidedTourCost, 30);
  assert.equal(result.photographyPermitCost, 25);
  assert.equal(result.donation, 15);
  assert.equal(result.total, 85);
});

test('filterZones returns all zones or filtered subset', () => {
  const all = filterZones(GARDEN_ZONES, 'all');
  assert.equal(all.length, GARDEN_ZONES.length);

  const water = filterZones(GARDEN_ZONES, 'water');
  assert.equal(water.length, 1);
  assert.equal(water[0].id, 'reflecting-pool');

  const woodlands = filterZones(GARDEN_ZONES, 'woodlands');
  assert.equal(woodlands.length, 1);
  assert.equal(woodlands[0].id, 'woodland-sanctuary');
});

test('filterSpecimensBySeason correctly filters botanical collection', () => {
  const spring = filterSpecimensBySeason(BOTANICAL_SPECIMENS, 'spring');
  assert.ok(spring.length >= 2);
  spring.forEach((specimen) => {
    assert.equal(specimen.season, 'spring');
  });

  const autumn = filterSpecimensBySeason(BOTANICAL_SPECIMENS, 'autumn');
  assert.ok(autumn.length >= 1);
  autumn.forEach((specimen) => {
    assert.equal(specimen.season, 'autumn');
  });
});

test('validateReservationForm detects missing inputs', () => {
  const invalid = validateReservationForm({
    date: '',
    timeslot: '',
    name: '',
    email: 'not-an-email',
    tickets: { adult: 0, senior: 0, student: 0, member: 0 },
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.tickets);
  assert.ok(invalid.errors.date);
  assert.ok(invalid.errors.timeslot);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);

  const valid = validateReservationForm({
    date: '2026-10-25',
    timeslot: '11:00 AM',
    name: 'Eleanor Vance',
    email: 'eleanor@example.com',
    tickets: { adult: 2, senior: 0, student: 0, member: 0 },
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
