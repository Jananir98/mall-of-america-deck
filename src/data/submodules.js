// Sub-module content. Four expandable deep-dives, each opened by a zone
// CTA via useDeck.openSubmodule(id). The data shape is intentionally
// open — each sub-module renderer reads only what it needs.

const i = (name) => `/ai/images/submodule/${name}`;

// ---------------------------------------------------------------------------
//   LEASING PATHS — four segmented routes, one for each tenant profile
// ---------------------------------------------------------------------------
export const LEASING_PATHS = [
  {
    id: "luxury",
    label: "Luxury / Flagship",
    image: i("leasing-luxury.jpg"),
    rate: "$340 – 450 / sqft / yr",
    footprint: "4,000 – 18,000 sq ft",
    coTenants: ["Tiffany & Co.", "Apple", "Coach", "Sephora"],
    buildOut: "Landlord contribution up to $200/sqft; brand-led architect",
    leadTime: "10 – 14 weeks · LOI → walkthrough → signing",
    audience: "HNW visitor share 11.6% · avg basket $340",
    cta: "Tour available flagship footprints",
    pitch: "The 2010-2015 unified concourse renovation rebuilt the property's luxury wing for prestige adjacency. End-cap and corner positions hold flagship energy without the cost of a downtown Madison Avenue address — and with traffic that no standalone urban location matches.",
    timeline: [
      ["Week 1-2", "LOI signed · trade-area study delivered"],
      ["Week 3-5", "On-site walkthrough · architect aligned"],
      ["Week 6-8", "Term sheet · co-tenancy clauses negotiated"],
      ["Week 9-12", "Lease executed · build-out begins"],
    ],
  },
  {
    id: "retail",
    label: "Mid-tier Retail",
    image: i("leasing-luxury.jpg"),
    rate: "$165 – 240 / sqft / yr",
    footprint: "1,200 – 6,500 sq ft",
    coTenants: ["UNIQLO", "H&M", "Sephora", "Lululemon"],
    buildOut: "Standard vanilla-shell + landlord allowance",
    leadTime: "6 – 9 weeks",
    audience: "Concourse-passers / yr 31.4M",
    cta: "See L1 / L2 mid-tier footprints",
    pitch: "Three concourse levels of continuous mid-tier retail, anchored at every corner. Average dwell of 2 hours 47 minutes means a measured first-pass and a return-pass on the same trip. Minnesota's zero apparel sales tax is a structural pricing advantage every transaction inherits.",
    timeline: [
      ["Week 1", "Letter of intent · footprint reserved"],
      ["Week 2-3", "Walkthrough · co-tenancy review"],
      ["Week 4-6", "Lease execution · build-out kickoff"],
      ["Week 7-9", "Storefront install · soft open"],
    ],
  },
  {
    id: "fb",
    label: "Food & Beverage",
    image: i("leasing-fb.jpg"),
    rate: "$220 – 380 / sqft / yr · % rent variants",
    footprint: "800 – 5,200 sq ft",
    coTenants: ["FireLake Grill", "Crave", "Tucci Benucch", "Cantina #1"],
    buildOut: "Kitchen build-out support · landlord contribution available",
    leadTime: "10 – 14 weeks · permit-dependent",
    audience: "8,400 covers / day · F&B sales index 1.4× US mall median",
    cta: "F&B leasing path",
    pitch: "Level 3 is the social spine of MOA — fine-dining concepts, fast-casual innovators, and a central food court converge in one daylit gallery. Liquor licence is on-site, full. The two attached hotels (JW Marriott + Radisson Blu, 800 keys combined) absorb late-night demand standalone restaurants cannot capture.",
    timeline: [
      ["Week 1-2", "LOI · concept review · audience match"],
      ["Week 3-5", "Walkthrough · kitchen layout"],
      ["Week 6-8", "Permit submission · lease finalisation"],
      ["Week 9-14", "Build-out · staff hiring · soft open"],
    ],
  },
  {
    id: "popup",
    label: "Pop-up / Limited",
    image: i("leasing-popup.jpg"),
    rate: "$8K – 75K / week · activation-flat",
    footprint: "200 – 4,000 sq ft",
    coTenants: ["Aritzia (rotation)", "Stüssy 6-week", "LEGO holiday installation"],
    buildOut: "Plug-and-play infrastructure · custom signage",
    leadTime: "6 – 10 weeks",
    audience: "Concentrated weekend traffic + brand-takeover programming",
    cta: "Reserve a pop-up slot",
    pitch: "Pop-ups live or die on traffic and timing. Mall of America gives both: 40 million visitors a year and a Rotunda calendar where the next slot is six to ten weeks away — not six to ten months. Branded floor decals are bookable by quarter, the LED ribbons are programmable per activation, and the in-house production team handles install end-to-end.",
    timeline: [
      ["Week 1", "Date held · creative brief shared"],
      ["Week 2-3", "Floor plan + signage approved"],
      ["Week 4-5", "Production · install"],
      ["Week 6-10", "Live · daily reporting"],
    ],
  },
];

// ---------------------------------------------------------------------------
//   SPONSORSHIP TIERS — ladder of presence
// ---------------------------------------------------------------------------
export const SPONSORSHIP_TIERS = [
  {
    id: "title",
    label: "Title",
    investment: "$1.8M – 4.2M / yr",
    description: "Naming rights to a venue or zone. Architectural integration + year-round programming.",
    includes: [
      "Permanent venue naming + signage",
      "Year-round LED ribbon presence (180°)",
      "Q1, Q3, Q4 holiday activations",
      "Broadcast partnership · facility-grade I/O",
      "Hospitality on-site · branded suite",
    ],
    examples: ["Huntington Bank Rotunda · 2024 onward", "Pepsi Orange Streak · permanent naming"],
    renewal: "92% multi-year renewal rate · avg 4.2 yrs",
    cta: "Title-tier sponsorship inquiry",
  },
  {
    id: "presenting",
    label: "Presenting",
    investment: "$680K – 1.4M / yr",
    description: "Dominant brand presence at a major venue, without permanent naming.",
    includes: [
      "Co-branded venue signage",
      "Quarterly activation series",
      "LED ribbon priority slots",
      "Annual hospitality block",
      "Loyalty-app cross-promo · 1.1M opt-ins",
    ],
    examples: ["Microsoft demo bays · Samsung pop-up theatres", "Amex Centurion lounge integration"],
    renewal: "84% renewal · avg 2.7 yrs",
    cta: "Presenting partnership inquiry",
  },
  {
    id: "activation",
    label: "Activation",
    investment: "$145K – 480K per activation",
    description: "Single-event takeovers — product launches, broadcast moments, holiday programming.",
    includes: [
      "Rotunda or Atrium footprint (7-day standard)",
      "LED & projection rigging included",
      "Digital wayfinding takeover",
      "Press + influencer programming",
      "Full production support · in-house team",
    ],
    examples: ["Disney+ Star Wars premiere takeover", "Macy's Thanksgiving Parade satellite", "Amazon Alexa launch"],
    renewal: "Per-activation; 67% return clients",
    cta: "Build an activation package",
  },
  {
    id: "popup",
    label: "Pop-up",
    investment: "$28K – 95K / week",
    description: "Branded floor decals, sampling stations, micro-pop-ups in trafficked corridors.",
    includes: [
      "200 – 4,000 sq ft footprint",
      "Concourse-level placement",
      "Wayfinding takeover · digital screens",
      "Quarterly slot calendar",
      "Plug-and-play infra · 6-wk lead time",
    ],
    examples: ["Stüssy 6-week pop-up", "LEGO holiday installation", "Aritzia tour stop"],
    renewal: "Per-week; 41% repeat",
    cta: "Reserve a pop-up slot",
  },
];

// ---------------------------------------------------------------------------
//   EVENT FORMATS — what a venue booking can look like
// ---------------------------------------------------------------------------
export const EVENT_FORMATS = [
  {
    id: "launch",
    label: "Product launch",
    capacity: "Atrium · 5,500 standing",
    leadTime: "8 – 12 weeks",
    venues: ["Rotunda", "Atrium L1"],
    inclusions: ["Stage rigging", "LED + projection", "Press riser", "Talent green room"],
    pastExamples: ["Apple iPad Pro", "Microsoft Surface Pro launch", "Lululemon brand reveal"],
    image: i("events-hero.jpg"),
  },
  {
    id: "concert",
    label: "Concert / performance",
    capacity: "Atrium · 5,500 standing · 1,400 seated",
    leadTime: "12 – 20 weeks",
    venues: ["Huntington Bank Rotunda", "Theatres at MOA"],
    inclusions: ["3-phase 1200A house power", "Direct truck access · 2 bays", "8-camera livestream rig"],
    pastExamples: ["Imagine Dragons acoustic", "Dua Lipa MOA in-store", "Olivia Rodrigo intimate"],
    image: i("events-hero.jpg"),
  },
  {
    id: "activation",
    label: "Brand activation",
    capacity: "Custom · 200 – 8,500 attendees",
    leadTime: "6 – 10 weeks",
    venues: ["Rotunda", "Atrium L1", "Sea Life portal", "Luxury Wing"],
    inclusions: ["Custom-build footprint", "Wayfinding takeover", "LED ribbons", "Loyalty cross-promo"],
    pastExamples: ["Disney+ Star Wars takeover", "Marvel Day", "Canada Goose Cold Room"],
    image: i("events-hero.jpg"),
  },
  {
    id: "broadcast",
    label: "Broadcast moment",
    capacity: "Talent + crew · audience as backdrop",
    leadTime: "4 – 8 weeks",
    venues: ["Rotunda", "Plaza North"],
    inclusions: ["Facility-grade fibre I/O", "Dedicated control room", "Crew badging", "Audience seeding"],
    pastExamples: ["NBC Today plaza north remote", "Macy's Parade satellite", "GMA holiday spec"],
    image: i("events-hero.jpg"),
  },
  {
    id: "convention",
    label: "Convention / corporate",
    capacity: "Convention centre · 800 – 4,200",
    leadTime: "16 – 24 weeks",
    venues: ["JW Marriott + Radisson combined", "Convention floors"],
    inclusions: ["62,000 sq ft event space", "12,200 sq ft single ballroom", "Encore production on-site", "800 hotel keys"],
    pastExamples: ["Microsoft Inspire regional", "Target supplier summit", "3M leadership offsite"],
    image: i("events-hero.jpg"),
  },
];

// ---------------------------------------------------------------------------
//   VENUES — three deep-dive specs sheets
// ---------------------------------------------------------------------------
export const VENUES = [
  {
    id: "rotunda",
    label: "Huntington Bank Rotunda",
    kind: "Performance · Activation · Broadcast",
    image: i("events-hero.jpg"),
    capacity: { standing: "5,500", seated: "1,400", reception: "2,800" },
    specs: [
      ["Power", "3-phase, 1200A house"],
      ["Load-in", "Direct truck access · 2 bays"],
      ["Stage", "Built-in rigging · 60' clear span"],
      ["Sight-lines", "L1 + L2 + L3 balconies"],
      ["A/V", "House LED ribbons · projection mapping"],
      ["Production", "In-house team or BYO crew"],
    ],
    notable: ["Macy's Thanksgiving Parade · satellite", "NBC Today · plaza north", "Imagine Dragons · acoustic intimate", "Dua Lipa · in-store"],
    leadTime: "12 – 20 weeks for concerts · 6 – 10 weeks for activations",
  },
  {
    id: "theatres",
    label: "Theatres at MOA",
    kind: "Performing arts · Cinema · Speaker series",
    image: i("performing-arts.jpg"),
    capacity: { standing: "—", seated: "1,200", reception: "—" },
    specs: [
      ["Configuration", "Proscenium · 1,200 seats"],
      ["Stage", "60' × 35' · fly tower"],
      ["Acoustics", "Variable acoustic panels · concert-grade"],
      ["Booth", "Lighting + sound + projection"],
      ["Green room", "2 dressing · 1 star suite"],
      ["Catering", "JW Marriott BOH · onsite"],
    ],
    notable: ["Twin Cities Ballet seasonal", "Speaker series · TEDxMSP", "Saturday Night Live cast tour"],
    leadTime: "8 – 16 weeks",
  },
  {
    id: "convention",
    label: "Convention & Hospitality",
    kind: "Corporate · Conference · Multi-day",
    image: i("events-hero.jpg"),
    capacity: { standing: "—", seated: "4,200 plenary", reception: "5,500" },
    specs: [
      ["Total space", "62,000 sq ft (combined)"],
      ["Largest ballroom", "12,200 sq ft (JW Marriott)"],
      ["Breakouts", "14 rooms (8 – 80 capacity)"],
      ["Hotel block", "800 keys · JW + Radisson"],
      ["Production", "Encore on-site partner"],
      ["Catering", "Full F&B integration"],
    ],
    notable: ["Microsoft Inspire regional", "Target supplier summit", "3M leadership offsite", "Cargill global meeting"],
    leadTime: "16 – 24 weeks",
  },
];
