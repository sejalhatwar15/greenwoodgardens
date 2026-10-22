/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GardenZone {
  id: string;
  name: string;
  subtitle: string;
  category: 'terraces' | 'water' | 'woodlands' | 'architecture' | 'meadow';
  description: string;
  historicalPeriod: string;
  elevation: string;
  featuredPlants: string[];
  image: string;
  ambience: 'tranquil' | 'shaded' | 'panoramic' | 'sunlit' | 'reflective';
  soundscapeType: 'fountain' | 'birds' | 'breeze' | 'chimes';
}

export interface BotanicalSpecimen {
  id: string;
  commonName: string;
  scientificName: string; // Will be displayed in italics
  family: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  location: string;
  sunlight: 'Full Sun' | 'Dappled Shade' | 'Deep Woodland Shade';
  bloomHighlight: string;
  conservationStatus?: string;
  featured?: boolean;
}

export interface GuidedWalk {
  id: string;
  title: string;
  time: string;
  duration: string;
  lead: string;
  description: string;
  capacity: number;
  pricePerPerson: number;
  highlight: string;
}

export interface TicketCounts {
  adult: number;
  senior: number;
  student: number;
  member: number;
}

export interface ReservationOptions {
  guidedTourId?: string | null;
  photographyPermit?: boolean;
  donationAmount?: number;
}

export interface ReservationPricing {
  ticketSubtotal: number;
  guidedTourCost: number;
  photographyPermitCost: number;
  donation: number;
  total: number;
  totalGuests: number;
}

export const TICKET_RATES = {
  adult: 15,
  senior: 10,
  student: 8,
  member: 0,
  photographyPermit: 25,
};

// Generated image assets with timestamps
export const ASSETS = {
  heroGardenEstate: '/src/assets/images/hero_garden_estate_1792677293419.jpg',
  gardenTerracePergola: '/src/assets/images/garden_terrace_pergola_1792677312813.jpg',
  gardenWoodlandSanctuary: '/src/assets/images/garden_woodland_sanctuary_1792677313337.jpg',
  gardenBotanicalFlora: '/src/assets/images/garden_botanical_flora_1792677312751.jpg',
};

export const GARDEN_ZONES: GardenZone[] = [
  {
    id: 'italianate-terraces',
    name: 'The Italianate Terraces & Pergola',
    subtitle: 'Century-Old Classical Stone Balustrades Cascading into Flora',
    category: 'terraces',
    description: 'Carved into the natural hillside, these dramatic tiered stone terraces feature hand-chiseled limestone balustrades, creeping wisteria vines, and terracotta urns overflowing with Mediterranean citrus and fragrant lavender.',
    historicalPeriod: 'Designed 1906–1912 by William W. Renwick',
    elevation: 'Upper Esplanade (Elev. 420 ft)',
    featuredPlants: ['Wisteria sinensis', 'Lavandula angustifolia', 'Citrus limon', 'Buxus sempervirens'],
    image: ASSETS.gardenTerracePergola,
    ambience: 'panoramic',
    soundscapeType: 'breeze',
  },
  {
    id: 'reflecting-pool',
    name: 'The Great Reflecting Basin',
    subtitle: 'Mirror-Still Water Flanked by Weeping Beech & Limestone Fountains',
    category: 'water',
    description: 'A contemplative sanctuary of serene mirror-still water framed by pendulous European weeping beeches and antique stone urns. In warm months, fragrant hardy water lilies bloom across the shimmering surface.',
    historicalPeriod: 'Constructed 1914',
    elevation: 'Central Valley (Elev. 385 ft)',
    featuredPlants: ['Nymphaea alba', 'Fagus sylvatica pendula', 'Iris pseudacorus', 'Carex pendula'],
    image: ASSETS.heroGardenEstate,
    ambience: 'reflective',
    soundscapeType: 'fountain',
  },
  {
    id: 'woodland-sanctuary',
    name: 'The Ancient Hemlock & Beech Woodland',
    subtitle: 'Dappled Trails Through Old-Growth Forest & Mossy Outcrops',
    category: 'woodlands',
    description: 'Twenty-two acres of undisturbed native forest canopy where walking trails wind past ancient hemlocks, native dogwoods, and carpets of royal ferns growing over glacial boulders.',
    historicalPeriod: 'Preserved Old-Growth Forest',
    elevation: 'Woodland Ridge (Elev. 460 ft)',
    featuredPlants: ['Tsuga canadensis', 'Cornus florida', 'Osmunda regalis', 'Polystichum acrostichoides'],
    image: ASSETS.gardenWoodlandSanctuary,
    ambience: 'shaded',
    soundscapeType: 'birds',
  },
  {
    id: 'botanical-herbarium',
    name: 'The Walled Rose & Peony Parterre',
    subtitle: 'Heirloom Shrub Roses, Herbaceous Peonies & Fragrant Herbs',
    category: 'terraces',
    description: 'Enclosed by antique stone walls that trap the warm sun, this formal parterre hosts over eighty cultivars of heritage David Austin roses, double-flowered peonies, and classical medicinal herbs.',
    historicalPeriod: 'Restored 1938 & 2013',
    elevation: 'South Terrace (Elev. 405 ft)',
    featuredPlants: ['Paeonia lactiflora', 'Rosa gallica', 'Salvia officinalis', 'Rosmarinus officinalis'],
    image: ASSETS.gardenBotanicalFlora,
    ambience: 'sunlit',
    soundscapeType: 'breeze',
  },
];

export const BOTANICAL_SPECIMENS: BotanicalSpecimen[] = [
  {
    id: 'paeonia-duchesse',
    commonName: 'Duchesse de Nemours Peony',
    scientificName: 'Paeonia lactiflora',
    family: 'Paeoniaceae',
    season: 'spring',
    location: 'Walled Rose & Peony Parterre',
    sunlight: 'Full Sun',
    bloomHighlight: 'Magnificent ruffled ivory blossoms with delicate citrus fragrance',
    featured: true,
  },
  {
    id: 'fagus-weeping',
    commonName: 'Weeping European Beech',
    scientificName: 'Fagus sylvatica var. pendula',
    family: 'Fagaceae',
    season: 'summer',
    location: 'The Reflecting Basin',
    sunlight: 'Full Sun',
    bloomHighlight: 'Sweeping architectural cascades creating natural emerald cathedrals',
    featured: true,
  },
  {
    id: 'cornus-florida',
    commonName: 'Eastern Flowering Dogwood',
    scientificName: 'Cornus florida',
    family: 'Cornaceae',
    season: 'spring',
    location: 'Woodland Ridge Trail',
    sunlight: 'Dappled Shade',
    bloomHighlight: 'Four-petaled pure white floral bracts followed by scarlet autumn berries',
    featured: false,
  },
  {
    id: 'acer-palmatum',
    commonName: 'Laceleaf Japanese Maple',
    scientificName: 'Acer palmatum var. dissectum',
    family: 'Sapindaceae',
    season: 'autumn',
    location: 'Teahouse Glade',
    sunlight: 'Dappled Shade',
    bloomHighlight: 'Intricate feathery foliage turning glowing crimson and burnt copper',
    featured: true,
  },
  {
    id: 'nymphaea-alba',
    commonName: 'European White Water Lily',
    scientificName: 'Nymphaea alba',
    family: 'Nymphaeaceae',
    season: 'summer',
    location: 'Reflecting Pool Basin',
    sunlight: 'Full Sun',
    bloomHighlight: 'Pristine starry floating blooms open during peak morning sunlight',
    featured: true,
  },
  {
    id: 'hamamelis-virginiana',
    commonName: 'American Witch Hazel',
    scientificName: 'Hamamelis virginiana',
    family: 'autumn',
    season: 'autumn',
    location: 'Ravine Brook Path',
    sunlight: 'Dappled Shade',
    bloomHighlight: 'Spidery golden-yellow ribbons with subtle woodsy aromatic scent',
    featured: false,
  },
  {
    id: 'helleborus-orientalis',
    commonName: 'Lenten Rose',
    scientificName: 'Helleborus orientalis',
    family: 'Ranunculaceae',
    season: 'winter',
    location: 'Lower Limestone Grotto',
    sunlight: 'Deep Woodland Shade',
    bloomHighlight: 'Nodding dusty rose and speckled cream flowers emerging through early snow',
    featured: false,
  },
];

export const GUIDED_WALKS: GuidedWalk[] = [
  {
    id: 'architectural-heritage',
    title: 'Historic Terraces & Architectural Promenade',
    time: '11:00 AM & 2:00 PM',
    duration: '60 minutes',
    lead: 'Head Landscape Historian',
    description: 'An intimate exploration of William Renwick’s Italianate terrace design, Beaux-Arts stonework, mosaic grottoes, and historic tea houses.',
    capacity: 18,
    pricePerPerson: 10,
    highlight: 'Includes private access to upper balustrade vista',
  },
  {
    id: 'arboretum-canopy',
    title: 'Arboretum Heritage & Rare Tree Canopy Walk',
    time: '1:30 PM',
    duration: '75 minutes',
    lead: 'Certified Master Arborist',
    description: 'Discover monumental century-old specimens including rare weeping beeches, towering tulip poplars, and native old-growth hemlocks.',
    capacity: 15,
    pricePerPerson: 10,
    highlight: 'Level II ArbNet accredited collections',
  },
  {
    id: 'mindful-shinrin-yoku',
    title: 'Morning Forest Immersion (Shinrin-yoku)',
    time: '9:30 AM (Sat & Sun)',
    duration: '90 minutes',
    lead: 'Certified Nature & Forest Therapy Guide',
    description: 'A contemplative slow-paced walking meditation through the quiet woodland ravines and moss gardens before general visitor hours.',
    capacity: 12,
    pricePerPerson: 15,
    highlight: 'Silent tea gathering included at the stone teahouse',
  },
];

/**
 * Calculates total ticket and add-on pricing with itemized summary.
 */
export function calculateTicketTotal(
  tickets: TicketCounts,
  options: ReservationOptions = {}
): ReservationPricing {
  const safeAdult = Math.max(0, tickets.adult || 0);
  const safeSenior = Math.max(0, tickets.senior || 0);
  const safeStudent = Math.max(0, tickets.student || 0);
  const safeMember = Math.max(0, tickets.member || 0);

  const totalGuests = safeAdult + safeSenior + safeStudent + safeMember;

  const ticketSubtotal =
    safeAdult * TICKET_RATES.adult +
    safeSenior * TICKET_RATES.senior +
    safeStudent * TICKET_RATES.student +
    safeMember * TICKET_RATES.member;

  let guidedTourCost = 0;
  if (options.guidedTourId && totalGuests > 0) {
    const selectedWalk = GUIDED_WALKS.find((w) => w.id === options.guidedTourId);
    const rate = selectedWalk ? selectedWalk.pricePerPerson : 10;
    // Guided tours are charged per guest attending
    guidedTourCost = totalGuests * rate;
  }

  const photographyPermitCost = options.photographyPermit
    ? TICKET_RATES.photographyPermit
    : 0;

  const donation = Math.max(0, options.donationAmount || 0);

  const total = ticketSubtotal + guidedTourCost + photographyPermitCost + donation;

  return {
    ticketSubtotal,
    guidedTourCost,
    photographyPermitCost,
    donation,
    total,
    totalGuests,
  };
}

/**
 * Filters garden zones by category.
 */
export function filterZones(
  zones: GardenZone[],
  category: 'all' | GardenZone['category']
): GardenZone[] {
  if (category === 'all') {
    return zones;
  }
  return zones.filter((zone) => zone.category === category);
}

/**
 * Filters botanical specimens by season.
 */
export function filterSpecimensBySeason(
  specimens: BotanicalSpecimen[],
  season: 'all' | 'spring' | 'summer' | 'autumn' | 'winter'
): BotanicalSpecimen[] {
  if (season === 'all') {
    return specimens;
  }
  return specimens.filter((s) => s.season === season);
}

/**
 * Validates a reservation submission.
 */
export interface ReservationFormInput {
  date: string;
  timeslot: string;
  name: string;
  email: string;
  tickets: TicketCounts;
}

export function validateReservationForm(input: ReservationFormInput): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  const totalGuests =
    (input.tickets.adult || 0) +
    (input.tickets.senior || 0) +
    (input.tickets.student || 0) +
    (input.tickets.member || 0);

  if (totalGuests <= 0) {
    errors.tickets = 'Please select at least 1 admission ticket.';
  }

  if (!input.date) {
    errors.date = 'Please select your preferred visit date.';
  }

  if (!input.timeslot) {
    errors.timeslot = 'Please choose a timed entry arrival slot.';
  }

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please provide the primary visitor name.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailPattern.test(input.email.trim())) {
    errors.email = 'Please provide a valid email for ticket delivery.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
