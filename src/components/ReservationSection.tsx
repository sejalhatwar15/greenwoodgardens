/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Clock, Ticket, ShieldCheck, CheckCircle2, Download, Printer, X, Plus, Minus } from 'lucide-react';
import {
  TicketCounts,
  ReservationPricing,
  calculateTicketTotal,
  validateReservationForm,
  GUIDED_WALKS,
  TICKET_RATES,
} from '../utils/gardenData';
import { ScrollReveal } from '../utils/useScrollAnimation';

interface ReservationSectionProps {
  selectedTourId: string | null;
  onClearTour: () => void;
  onSelectTour: (id: string | null) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  selectedTourId,
  onClearTour,
  onSelectTour,
}) => {
  // Available upcoming dates (Wed-Sun)
  const availableDates = [
    { label: 'Thu, Oct 22', value: '2026-10-22', status: 'available' },
    { label: 'Fri, Oct 23', value: '2026-10-23', status: 'available' },
    { label: 'Sat, Oct 24', value: '2026-10-24', status: 'limited' },
    { label: 'Sun, Oct 25', value: '2026-10-25', status: 'available' },
    { label: 'Wed, Oct 28', value: '2026-10-28', status: 'available' },
    { label: 'Thu, Oct 29', value: '2026-10-29', status: 'available' },
  ];

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '1:00 PM',
    '2:30 PM',
    '4:00 PM',
  ];

  const [date, setDate] = useState('2026-10-24');
  const [timeslot, setTimeslot] = useState('11:30 AM');
  const [tickets, setTickets] = useState<TicketCounts>({
    adult: 2,
    senior: 0,
    student: 0,
    member: 0,
  });
  const [photographyPermit, setPhotographyPermit] = useState(false);
  const [donation, setDonation] = useState(10);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmedReservation, setConfirmedReservation] = useState<{
    confirmationNumber: string;
    date: string;
    timeslot: string;
    name: string;
    pricing: ReservationPricing;
    tourTitle?: string;
  } | null>(null);

  const pricing = calculateTicketTotal(tickets, {
    guidedTourId: selectedTourId,
    photographyPermit,
    donationAmount: donation,
  });

  const updateTicketCount = (type: keyof TicketCounts, delta: number) => {
    setTickets((prev) => {
      const nextVal = Math.max(0, (prev[type] || 0) + delta);
      return { ...prev, [type]: nextVal };
    });
    if (formErrors.tickets) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next.tickets;
        return next;
      });
    }
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateReservationForm({
      date,
      timeslot,
      name,
      email,
      tickets,
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    const randomCode = `GWG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedWalk = GUIDED_WALKS.find((w) => w.id === selectedTourId);

    setConfirmedReservation({
      confirmationNumber: randomCode,
      date,
      timeslot,
      name,
      pricing,
      tourTitle: selectedWalk?.title,
    });
  };

  return (
    <section id="reserve" className="py-24 bg-[#FAF8F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200/80">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-600 block mb-3 font-sans">
                Timed Entry &amp; Tour Reservations
              </span>
              <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-stone-900 tracking-tight">
                Plan Your Visit to Greenwood
              </h2>
            </div>
            <p className="text-stone-600 text-sm sm:text-base font-light max-w-md leading-relaxed">
              To preserve the unhurried atmosphere and contemplative calm of the grounds, admissions are scheduled in staggered timed intervals.
            </p>
          </div>
        </ScrollReveal>

        {/* Reservation Engine Form */}
        <form onSubmit={handleReservationSubmit} className="pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Columns: Selection Parameters */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Date Selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-sans font-medium text-stone-800 mb-3">
                  1. Select Arrival Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableDates.map((item) => (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() => {
                        setDate(item.value);
                        if (formErrors.date) {
                          setFormErrors((prev) => {
                            const n = { ...prev };
                            delete n.date;
                            return n;
                          });
                        }
                      }}
                      className={`p-3 text-left rounded-xs border transition-colors cursor-pointer ${
                        date === item.value
                          ? 'border-stone-900 bg-white ring-1 ring-stone-900'
                          : 'border-stone-200 bg-[#F3EFEA] hover:bg-stone-200/60'
                      }`}
                    >
                      <span className="block text-xs font-medium text-stone-900">{item.label}</span>
                      <span className="text-[10px] text-stone-600 block mt-0.5">
                        {item.status === 'limited' ? 'Few entries remaining' : 'Grounds open'}
                      </span>
                    </button>
                  ))}
                </div>
                {formErrors.date && (
                  <p className="text-xs text-rose-700 mt-2">{formErrors.date}</p>
                )}
              </div>

              {/* Step 2: Timed Entry Slot */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-sans font-medium text-stone-800 mb-3">
                  2. Choose Timed Arrival Window
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTimeslot(slot)}
                      className={`px-4 py-2.5 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                        timeslot === slot
                          ? 'border-stone-900 bg-stone-900 text-stone-50'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-500'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Admission Ticket Counters */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs uppercase tracking-widest font-sans font-medium text-stone-800">
                    3. Admission Passes
                  </label>
                  <span className="text-xs text-stone-600">Free admission for Greenwood Members</span>
                </div>

                <div className="space-y-3 bg-white p-5 rounded-xs border border-stone-200">
                  {/* Adult */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <div>
                      <span className="font-serif text-base text-stone-900 block font-normal">Adult General Admission</span>
                      <span className="text-xs text-stone-500 font-mono">${TICKET_RATES.adult}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateTicketCount('adult', -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-xs border border-stone-300 hover:bg-stone-100 text-stone-700 cursor-pointer"
                        aria-label="Decrease adult tickets"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-mono font-medium">{tickets.adult}</span>
                      <button
                        type="button"
                        onClick={() => updateTicketCount('adult', 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-xs border border-stone-300 hover:bg-stone-100 text-stone-700 cursor-pointer"
                        aria-label="Increase adult tickets"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Senior 65+ */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <div>
                      <span className="font-serif text-base text-stone-900 block font-normal">Senior (Ages 65+)</span>
                      <span className="text-xs text-stone-500 font-mono">${TICKET_RATES.senior}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateTicketCount('senior', -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-xs border border-stone-300 hover:bg-stone-100 text-stone-700 cursor-pointer"
                        aria-label="Decrease senior tickets"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-mono font-medium">{tickets.senior}</span>
                      <button
                        type="button"
                        onClick={() => updateTicketCount('senior', 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-xs border border-stone-300 hover:bg-stone-100 text-stone-700 cursor-pointer"
                        aria-label="Increase senior tickets"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Student / Youth */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <div>
                      <span className="font-serif text-base text-stone-900 block font-normal">Student &amp; Youth (Ages 12-18 / ID)</span>
                      <span className="text-xs text-stone-500 font-mono">${TICKET_RATES.student}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateTicketCount('student', -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-xs border border-stone-300 hover:bg-stone-100 text-stone-700 cursor-pointer"
                        aria-label="Decrease student tickets"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-mono font-medium">{tickets.student}</span>
                      <button
                        type="button"
                        onClick={() => updateTicketCount('student', 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-xs border border-stone-300 hover:bg-stone-100 text-stone-700 cursor-pointer"
                        aria-label="Increase student tickets"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Greenwood Member */}
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <span className="font-serif text-base text-stone-900 block font-normal">Greenwood Member Pass</span>
                      <span className="text-xs text-emerald-800 font-medium">Complimentary Admission</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateTicketCount('member', -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-xs border border-stone-300 hover:bg-stone-100 text-stone-700 cursor-pointer"
                        aria-label="Decrease member tickets"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-mono font-medium">{tickets.member}</span>
                      <button
                        type="button"
                        onClick={() => updateTicketCount('member', 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-xs border border-stone-300 hover:bg-stone-100 text-stone-700 cursor-pointer"
                        aria-label="Increase member tickets"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                {formErrors.tickets && (
                  <p className="text-xs text-rose-700 mt-2">{formErrors.tickets}</p>
                )}
              </div>

              {/* Step 4: Guided Tour Add-on */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-sans font-medium text-stone-800 mb-2">
                  4. Curator Walk Add-On (Optional)
                </label>
                <div className="space-y-2">
                  {GUIDED_WALKS.map((w) => (
                    <label
                      key={w.id}
                      className={`flex items-start gap-3 p-3.5 rounded-xs border cursor-pointer transition-colors ${
                        selectedTourId === w.id
                          ? 'border-stone-900 bg-white ring-1 ring-stone-900'
                          : 'border-stone-200 bg-[#F3EFEA] hover:bg-stone-200/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="tour"
                        checked={selectedTourId === w.id}
                        onChange={() => onSelectTour(selectedTourId === w.id ? null : w.id)}
                        className="mt-1 accent-stone-900"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-serif italic text-sm text-stone-900 font-normal">{w.title}</span>
                          <span className="font-mono text-stone-700">+${w.pricePerPerson} / guest</span>
                        </div>
                        <span className="text-[11px] text-stone-500 block mt-0.5">{w.time} · {w.duration}</span>
                      </div>
                    </label>
                  ))}
                  {selectedTourId && (
                    <button
                      type="button"
                      onClick={onClearTour}
                      className="text-xs text-stone-600 underline hover:text-stone-900 cursor-pointer"
                    >
                      Remove curator tour selection
                    </button>
                  )}
                </div>
              </div>

              {/* Step 5: Permits & Conservation Gift */}
              <div className="pt-2 border-t border-stone-200 space-y-4">
                <label className="flex items-start gap-3 p-3 bg-white border border-stone-200 rounded-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={photographyPermit}
                    onChange={(e) => setPhotographyPermit(e.target.checked)}
                    className="mt-0.5 accent-stone-900"
                  />
                  <div>
                    <span className="text-xs font-medium text-stone-900 block">
                      Include Portrait / Fine Art Photography Permit (+${TICKET_RATES.photographyPermit})
                    </span>
                    <span className="text-[11px] text-stone-500 font-light block">
                      Required for staged portrait sessions, tripods, and commercial gear. Casual phone photography is free.
                    </span>
                  </div>
                </label>

                <div>
                  <span className="text-xs uppercase tracking-widest font-sans font-medium text-stone-800 block mb-2">
                    Greenwood Conservation Stewardship Gift
                  </span>
                  <div className="flex items-center gap-2">
                    {[0, 10, 25, 50].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setDonation(amt)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-xs border cursor-pointer ${
                          donation === amt
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                        }`}
                      >
                        {amt === 0 ? 'None' : `+$${amt}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Visitor Details & Summary Sticky Box */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200 shadow-xs lg:sticky lg:top-28">
                <h3 className="font-serif italic text-2xl text-stone-900 mb-6 font-normal">
                  Reservation Summary
                </h3>

                {/* Primary Visitor Info Inputs */}
                <div className="space-y-4 mb-6 pb-6 border-b border-stone-100">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-sans text-stone-700 mb-1.5">
                      Lead Guest Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (formErrors.name) {
                          setFormErrors((prev) => {
                            const n = { ...prev };
                            delete n.name;
                            return n;
                          });
                        }
                      }}
                      placeholder="e.g. Lady Katherine Howard"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs focus:outline-hidden focus:border-stone-800"
                    />
                    {formErrors.name && (
                      <p className="text-xs text-rose-700 mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-sans text-stone-700 mb-1.5">
                      Confirmation Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formErrors.email) {
                          setFormErrors((prev) => {
                            const n = { ...prev };
                            delete n.email;
                            return n;
                          });
                        }
                      }}
                      placeholder="katherine@example.com"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs focus:outline-hidden focus:border-stone-800"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-rose-700 mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Itemized Breakdown with Tabular Figures */}
                <div className="space-y-2.5 text-xs text-stone-600 mb-6 font-sans">
                  <div className="flex justify-between">
                    <span>Visit Date &amp; Window:</span>
                    <span className="font-medium text-stone-900">{date} · {timeslot}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Admissions ({pricing.totalGuests} Guests):</span>
                    <span className="font-mono tabular-nums font-medium text-stone-900">${pricing.ticketSubtotal}</span>
                  </div>

                  {pricing.guidedTourCost > 0 && (
                    <div className="flex justify-between">
                      <span>Curator Guided Tour:</span>
                      <span className="font-mono tabular-nums font-medium text-stone-900">+${pricing.guidedTourCost}</span>
                    </div>
                  )}

                  {pricing.photographyPermitCost > 0 && (
                    <div className="flex justify-between">
                      <span>Photography Permit:</span>
                      <span className="font-mono tabular-nums font-medium text-stone-900">+${pricing.photographyPermitCost}</span>
                    </div>
                  )}

                  {pricing.donation > 0 && (
                    <div className="flex justify-between">
                      <span>Conservation Stewardship:</span>
                      <span className="font-mono tabular-nums font-medium text-stone-900">+${pricing.donation}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-stone-200 flex justify-between items-baseline">
                    <span className="font-serif italic text-lg text-stone-900">Total Admission</span>
                    <span className="font-mono tabular-nums text-2xl font-semibold text-stone-900">${pricing.total}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs uppercase tracking-widest font-medium rounded-xs transition-colors shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-600"
                >
                  Confirm &amp; Issue Digital Pass
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 mt-4 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                  <span>Rain or shine sanctuary · Reschedule anytime up to 2 hours prior</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Confirmed Digital Pass Modal */}
      {confirmedReservation && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-[#FAF8F5] max-w-lg w-full rounded-sm border border-stone-300 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setConfirmedReservation(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 cursor-pointer"
              aria-label="Close digital pass confirmation"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-6 border-b border-stone-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-800 mx-auto mb-3" />
              <span className="text-[11px] uppercase tracking-widest font-sans text-stone-500 block">
                Greenwood Gardens · Digital Admission Pass
              </span>
              <h3 className="font-serif italic text-3xl text-stone-900 mt-1">
                Reservation Confirmed
              </h3>
              <p className="font-mono text-xs text-stone-600 mt-1">
                Pass #{confirmedReservation.confirmationNumber}
              </p>
            </div>

            {/* Pass details */}
            <div className="py-6 space-y-3 text-xs font-sans border-b border-stone-200">
              <div className="flex justify-between">
                <span className="text-stone-500">Guest of Record:</span>
                <span className="font-medium text-stone-900">{confirmedReservation.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Scheduled Date:</span>
                <span className="font-medium text-stone-900">{confirmedReservation.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Arrival Window:</span>
                <span className="font-medium text-stone-900">{confirmedReservation.timeslot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Party Size:</span>
                <span className="font-mono tabular-nums font-medium text-stone-900">{confirmedReservation.pricing.totalGuests} Guests</span>
              </div>
              {confirmedReservation.tourTitle && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Curator Tour:</span>
                  <span className="font-medium text-stone-900">{confirmedReservation.tourTitle}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-stone-100">
                <span className="text-stone-500">Amount Paid:</span>
                <span className="font-mono tabular-nums font-semibold text-stone-900">${confirmedReservation.pricing.total}</span>
              </div>
            </div>

            {/* Stylized QR / Entry Code */}
            <div className="pt-6 pb-2 text-center">
              <div className="inline-block p-4 bg-white border border-stone-200 rounded-sm shadow-2xs mb-2">
                <svg className="w-28 h-28 mx-auto" viewBox="0 0 100 100" fill="currentColor">
                  <rect width="100" height="100" fill="#FAF8F5" />
                  <path
                    fill="#1C1917"
                    d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z M50,15 h5 v5 h-5 z M50,30 h8 v8 h-8 z M60,50 h10 v10 h-10 z M75,50 h15 v5 h-15 z M50,65 h10 v10 h-10 z M70,70 h10 v15 h-10 z M85,75 h5 v15 h-5 z M55,85 h10 v5 h-10 z"
                  />
                </svg>
              </div>
              <p className="text-[11px] text-stone-500 font-sans">
                Present this pass or your name at the Welcome Center gatehouse.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xs text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Pass</span>
              </button>
              <button
                type="button"
                onClick={() => setConfirmedReservation(null)}
                className="flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xs text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
