// The seven zones of the Property Explorer.
//
// Each zone carries every piece of content the v1 deck had, recomposed:
//   - hero copy, stats, image/video refs
//   - mode-specific overlays (tenant / sponsor / event) — same zone, three lenses
//   - map placement (x/y on the master map composite)
//   - palette tint, atmosphere bed, video bed
//
// Adding a new zone = append an entry. The map auto-places by the (x,y) coords.

const v = (name) => `/ai/video/${name}`;
const i = (name) => `/ai/images/${name}`;
const a = (name) => `/ai/audio/${name}`;

// Asset fallbacks: round-2 generative assets land in /ai/* over the next 48h.
// Until then we fall back to v1 assets so the deck is always renderable.
const fallback = {
  hero: { video: v("hero-loop.mp4"), poster: i("hero-wide.jpg") },
  retail: { video: v("retail-loop.mp4"), poster: i("retail-banner.jpg") },
  events: { video: v("events-loop.mp4"), poster: i("events-banner.jpg") },
  attractions: { video: v("attractions-loop.mp4"), poster: i("attractions-banner.jpg") },
};

export const ZONES = [
  {
    id: "retail",
    label: "Retail Concourse",
    kicker: "520+ stores · zero apparel tax",
    order: 1,
    // Map placement on the master illustration (% of canvas)
    map: { x: 28, y: 58 },
    palette: { tint: "#d9b26f", bg: "#0a0a09", glow: "rgba(217,178,111,0.08)" },
    media: {
      video: v("zone-retail.mp4"),
      poster: i("retail-banner.jpg"),
      fallbackVideo: fallback.retail.video,
      audio: a("bed-retail.ogg"),
    },
    headline: "500+ stores. Zero sales tax on apparel.",
    headlineAccent: "Zero sales tax on apparel.",
    blurb: "Minnesota exempts clothing and shoes from sales tax — a measurable lift on every conversion. Retail runs across three concourse levels and a fourth tier, with 2.87M sq ft of leasable space anchored at each corner.",
    stats: [
      { n: "520+", l: "Retail tenants" },
      { n: "2.87M", l: "Sq ft of retail" },
      { n: "4", l: "Floors of shopping" },
      { n: "0%", l: "Sales tax · apparel" },
    ],
    anchors: ["Nordstrom", "Macy's", "Bloomingdale's", "Sears (legacy)"],
    brandSamples: [
      "Apple", "Ralph Lauren", "Tiffany & Co.", "Coach", "Sephora",
      "Lululemon", "UNIQLO", "Microsoft", "H&M", "Canada Goose",
      "Build-A-Bear", "LEGO", "Zara", "American Girl",
    ],
    overlays: {
      tenant: {
        title: "Lease specs at a glance",
        rows: [
          ["Available footprints", "650 – 18,000 sq ft"],
          ["Concourse levels", "L1 (anchor flow) · L2 · L3 · L4 (south/east)"],
          ["Avg dwell time", "2h 47m"],
          ["Trade area population", "3.6M (60-mile)"],
        ],
        proof: "Adjacent co-tenants currently leasing: Apple · UNIQLO · Sephora · Nike",
        cta: "See Leasing Paths →",
      },
      sponsor: {
        title: "Annual reach inside Retail",
        rows: [
          ["Concourse-passers / yr", "31.4M"],
          ["L1 anchor adjacency impressions", "9.2M"],
          ["Bag-drop & seating moments", "4.8M"],
          ["Branded floor decals available", "Yes — by quarter"],
        ],
        proof: "Past: Microsoft demo bays, Samsung pop-up theatres, Amex member lounges.",
        cta: "Build a Sponsorship Package →",
      },
      event: {
        title: "Retail-zone activations",
        rows: [
          ["Best-suited formats", "Pop-ups · seasonal merch · sampling"],
          ["Lead time", "6–10 weeks"],
          ["Permitted footprint range", "200 – 4,000 sq ft"],
          ["Branded transit assets", "Wayfinding takeover · digital screens"],
        ],
        proof: "Hosted: Stüssy 6-week pop-up · Aritzia tour · LEGO holiday installation.",
        cta: "Reserve a Pop-up Slot →",
      },
    },
    stories: [
      {
        kind: "callout",
        kicker: "MINNESOTA APPAREL TAX",
        title: "Zero on every conversion.",
        body: "Minnesota exempts clothing and shoes from sales tax. Every transaction on this concourse is structurally cheaper than its sibling in Chicago, Dallas, or LA — and the prospect's pricing model gets a tailwind they don't get anywhere else.",
        stat: "0%",
      },
      {
        kind: "spec-grid",
        kicker: "FLOORPLATE",
        title: "Three concourses · one fourth tier.",
        body: "Retail runs continuously across L1–L3 with a south-and-east L4 above the Hotel and Convention bridge. Anchors hold each corner; flagship traffic radiates from the centre.",
        rows: [
          ["L1 — Anchor flow", "1.07M sq ft"],
          ["L2 — Premium ring", "0.84M sq ft"],
          ["L3 — Dining + entertainment", "0.62M sq ft"],
          ["L4 — South / East spec", "0.34M sq ft"],
        ],
      },
    ],
    submodule: "leasing",
  },

  {
    id: "luxury",
    label: "Luxury Wing",
    kicker: "the 2010–2015 unified concourse",
    order: 2,
    map: { x: 72, y: 36 },
    palette: { tint: "#f4d99a", bg: "#000000", glow: "rgba(244,217,154,0.10)" },
    media: {
      video: v("zone-luxury.mp4"),
      poster: i("luxury-banner.jpg"),
      fallbackVideo: fallback.retail.video,
      audio: a("bed-luxury.ogg"),
    },
    headline: "A concourse rebuilt for prestige.",
    headlineAccent: "rebuilt for prestige.",
    blurb: "A series of renovations from 2010 to 2015 replaced four zone-specific décors with a single, more luxurious design language — timed with the property's first major expansion. The result: a concourse engineered to carry flagship energy end-to-end.",
    stats: [
      { n: "$2B", l: "Phase II expansion" },
      { n: "$1B", l: "Ghermezian buy-out (2006)" },
      { n: "200k", l: "Sq ft of new retail" },
      { n: "14", l: "Story JW Marriott on site" },
    ],
    overlays: {
      tenant: {
        title: "Flagship terms",
        rows: [
          ["End-cap availability", "3 prime · 2 corner"],
          ["Ceiling heights", "16 – 22 ft"],
          ["Entrance type", "Double-arched, brass-trim"],
          ["Adjacency profile", "Tiffany · Coach · Apple · Sephora"],
        ],
        proof: "AUM of average Luxury-Wing visitor: $1.4M (FICO-modelled).",
        cta: "Tour Available Footprints →",
      },
      sponsor: {
        title: "Luxury-segment audience",
        rows: [
          ["HNW visitor share", "11.6%"],
          ["Avg basket size", "$340"],
          ["Branded gallery wall available", "Yes (12-month rotation)"],
          ["Co-marketing partners possible", "Hotels · Airlines · Card issuers"],
        ],
        proof: "Past: Amex Centurion lounge integration · Aston Martin showcase.",
        cta: "Curated Sponsorship →",
      },
      event: {
        title: "Private events in the Wing",
        rows: [
          ["Suitable formats", "Private trunk shows · runway"],
          ["After-hours buyout", "Available Sun nights"],
          ["Capacity (cocktail)", "320"],
          ["Kitchen / catering on-site", "Yes — JW Marriott BOH"],
        ],
        proof: "Hosted: Vogue × MOA fashion night · Tiffany Blue Box launch.",
        cta: "Book a Private Activation →",
      },
    },
    stories: [
      {
        kind: "timeline",
        kicker: "THE 2010–2015 RENOVATION",
        title: "Four décors became one.",
        body: "Phase II swept zone-specific décor for a single luxury design language — timed with the property's first major expansion. The result is a concourse that holds flagship energy from the first storefront to the last.",
        items: [
          ["2006", "Triple Five buys out the Ghermezian family — $1B"],
          ["2010", "Unified concourse renovation begins"],
          ["2015", "Phase II completes — 200,000 sq ft of new retail"],
          ["2016", "JW Marriott opens — connected lobby"],
        ],
      },
      {
        kind: "callout",
        kicker: "ONLY ON THIS WING",
        title: "Daylight skylights · brushed brass · marble.",
        body: "The architecture is the brief. Vaulted ceilings hold the natural light past noon; the concourse stays a daylight space year-round. Flagship facades read against neutral hairline detail — the wing is engineered to make every brand the loudest object in the frame.",
      },
    ],
    submodule: "leasing",
  },

  {
    id: "dining",
    label: "Dining & Lifestyle",
    kicker: "50 restaurants · L3 food court",
    order: 3,
    map: { x: 50, y: 72 },
    palette: { tint: "#c08457", bg: "#0a0a09", glow: "rgba(192,132,87,0.10)" },
    media: {
      video: v("zone-dining.mp4"),
      poster: i("dining-banner.jpg"),
      fallbackVideo: fallback.attractions.video,
      audio: a("bed-dining.ogg"),
    },
    headline: "50 restaurants. One food court on level three.",
    headlineAccent: "One food court on level three.",
    blurb: "Fine-dining concepts, fast-casual innovators, and a central food court converge on the third floor. Long-dwell, multi-generational — flanked by the JW Marriott and Radisson Blu, both connected directly to the concourse.",
    stats: [
      { n: "50", l: "Restaurants" },
      { n: "3", l: "Hotels connected" },
      { n: "L3", l: "Food court level" },
      { n: "2hr", l: "Avg dining dwell" },
    ],
    cuisines: [
      "American Steakhouse",
      "Japanese Omakase",
      "Modern Italian",
      "Mexican",
      "Korean BBQ",
      "Cajun & Seafood",
      "Mediterranean",
      "Vegan & Plant-forward",
    ],
    overlays: {
      tenant: {
        title: "F&B leasing",
        rows: [
          ["Available concepts", "QSR · fast-casual · full-service · cocktail"],
          ["Kitchen build-out support", "Yes — landlord contribution"],
          ["Liquor license", "On-site, full"],
          ["Avg covers / day", "8,400"],
        ],
        proof: "F&B sales / sq ft index: 1.4× US mall median.",
        cta: "F&B Leasing Path →",
      },
      sponsor: {
        title: "Dining-zone integrations",
        rows: [
          ["Branded tray-liner program", "Available"],
          ["Beverage exclusivity", "Currently available"],
          ["Loyalty-app cross-promo", "Yes — 1.1M opt-ins"],
          ["Holiday menu sponsorship", "Q4 + Valentine's open"],
        ],
        proof: "Past: Coca-Cola exclusive · Starbucks holiday lounge.",
        cta: "Beverage / Snack Partnership →",
      },
      event: {
        title: "Hosted dinners & buyouts",
        rows: [
          ["After-hours buyout", "Yes — full L3 food court"],
          ["Capacity (seated)", "1,800"],
          ["A/V infra", "House LED rigging · 8-cam livestream"],
          ["Hotel block availability", "JW + Radisson combined: 800 keys"],
        ],
        proof: "Hosted: Super Bowl LII broadcast lounge.",
        cta: "Reserve a Dining Buyout →",
      },
    },
    stories: [
      {
        kind: "callout",
        kicker: "L3 FOOD COURT",
        title: "The social spine of MOA.",
        body: "L3 is where the property exhales — fine-dining concepts, fast-casual innovators, and a central food court converge in one daylit gallery. It's long-dwell, multi-generational, and the only floor visited by every visitor on every trip.",
        stat: "8,400",
        statLabel: "AVG COVERS / DAY",
      },
      {
        kind: "callout",
        kicker: "HOTELS ON THE SAME FLOOR",
        title: "JW Marriott · Radisson Blu.",
        body: "The 14-story JW Marriott and the Radisson Blu connect directly into L3 — the only mall in America with hotels physically attached on both sides. F&B becomes a closed-loop experience for business travellers, families, and long-weekend shoppers.",
      },
    ],
    submodule: "leasing",
  },

  {
    id: "nick",
    label: "Nickelodeon Universe",
    kicker: "7-acre indoor theme park",
    order: 4,
    map: { x: 50, y: 50 },
    palette: { tint: "#c0392b", bg: "#0a0a09", glow: "rgba(192,57,43,0.10)" },
    media: {
      video: v("zone-nick.mp4"),
      poster: i("attractions-banner.jpg"),
      fallbackVideo: fallback.attractions.video,
      audio: a("bed-nick.ogg"),
    },
    headline: "27 rides. Under one glass roof.",
    headlineAccent: "Under one glass roof.",
    blurb: "The largest indoor theme park in North America sits at MOA's geometric center — heated through a Minnesota winter by skylights, light fixtures, and body heat alone. Three roller coasters, 27 rides, year-round.",
    stats: [
      { n: "27", l: "Rides & coasters" },
      { n: "7", l: "Acres" },
      { n: "0", l: "Mechanical heating" },
      { n: "1992", l: "Opened with the mall" },
    ],
    overlays: {
      tenant: {
        title: "Adjacent retail opportunity",
        rows: [
          ["L1 atrium-edge units", "4 available"],
          ["Foot traffic premium", "+38% over avg L1"],
          ["Family-segment skew", "73% with children"],
          ["Park hours overlap", "10am – 9pm daily"],
        ],
        proof: "Build-A-Bear, LEGO, American Girl all within 80 paces.",
        cta: "See Family-Retail Footprints →",
      },
      sponsor: {
        title: "Naming & integration",
        rows: [
          ["Ride naming rights available", "2 coasters · 4 flat rides"],
          ["Branded passport program", "Yes — kid-led collection"],
          ["Atrium LED ribbon", "Available · 360° wrap"],
          ["Family-event programming", "Bookable by quarter"],
        ],
        proof: "Past: Paramount cross-promo · Mattel Hot Wheels takeover.",
        cta: "Sponsor a Ride →",
      },
      event: {
        title: "Park-as-venue",
        rows: [
          ["After-park buyout", "Available — 9pm to 1am"],
          ["Capacity (full park)", "8,500"],
          ["Branded ride wraps", "Yes — 6-week production lead"],
          ["Live-action stage", "Built-in (atrium center)"],
        ],
        proof: "Hosted: Disney+ Star Wars premiere · Marvel Day.",
        cta: "Book After-Hours Park →",
      },
    },
    sublocations: [
      { name: "Big Wave Bay", note: "Spinning chair-swing" },
      { name: "SpongeBob Rock Bottom Plunge", note: "Inverted coaster" },
      { name: "Pepsi Orange Streak", note: "Family coaster" },
    ],
    stories: [
      {
        kind: "origin",
        kicker: "WHERE A PLAQUE MARKS HOME PLATE",
        title: "MOA was built on Met Stadium.",
        body: "Inside Nickelodeon Universe, a single stadium seat sits exactly where it did when Harmon Killebrew hit a 520-foot home run on June 3, 1967. The site's memory is baked into the architecture — the entire property opened August 11, 1992 on the former Twins / Vikings stadium grounds.",
        meta: "AUG 11, 1992 · 129 ACRES · 12TH LARGEST MALL ON EARTH",
      },
      {
        kind: "callout",
        kicker: "ARCHITECTURAL FEAT",
        title: "Heated by skylights, lights, and body heat alone.",
        body: "Through Minnesota winter, the central atrium holds at room temperature with zero mechanical heating — a thermal design that lets the glass roof flood the park with daylight while the building's own activity keeps it warm.",
        stat: "0",
        statLabel: "MECHANICAL HEATING",
      },
    ],
    submodule: "venue",
  },

  {
    id: "sealife",
    label: "Sea Life Aquarium",
    kicker: "10,000 creatures · walk-through tunnel",
    order: 5,
    map: { x: 78, y: 64 },
    palette: { tint: "#0f766e", bg: "#000000", glow: "rgba(15,118,110,0.16)" },
    media: {
      video: v("zone-sealife.mp4"),
      poster: i("sealife-tunnel.jpg"),
      fallbackVideo: fallback.attractions.video,
      audio: a("bed-sealife.ogg"),
    },
    headline: "Walk beneath 10,000 creatures.",
    headlineAccent: "10,000 creatures.",
    blurb: "A walk-through acrylic tunnel runs underneath the mall's east side — a cinematic transition between retail, food, and wonder. Sharks, stingrays, sea turtles, and a rescued sea-horse nursery, programmed year-round.",
    stats: [
      { n: "10k+", l: "Sea creatures" },
      { n: "300ft", l: "Acrylic tunnel" },
      { n: "Daily", l: "Feed talks" },
      { n: "Below", l: "Grade level" },
    ],
    overlays: {
      tenant: {
        title: "Adjacent retail",
        rows: [
          ["East-side L1 units", "3 available"],
          ["Family + tourist mix", "84% / 16%"],
          ["Avg dwell pre-aquarium", "32 min"],
          ["Conversion to entry ticket", "+22% from adjacent retail"],
        ],
        proof: "National Geographic store tested 9-month residency here.",
        cta: "East-Side Lease Path →",
      },
      sponsor: {
        title: "Conservation-aligned partnership",
        rows: [
          ["Tank naming rights", "4 available"],
          ["Animal-adoption program", "Co-brandable"],
          ["School-program partnership", "12,400 students/yr"],
          ["Sustainability story", "Built-in halo"],
        ],
        proof: "Past: Patagonia conservation campaign · National Geographic.",
        cta: "Conservation Sponsorship →",
      },
      event: {
        title: "Aquarium activations",
        rows: [
          ["After-hours private", "Available"],
          ["Capacity (reception)", "420"],
          ["Tunnel projection mapping", "Yes (rigged)"],
          ["Catering by JW Marriott", "Onsite"],
        ],
        proof: "Hosted: Disney's Finding Dory press launch.",
        cta: "Book the Aquarium →",
      },
    },
    stories: [
      {
        kind: "callout",
        kicker: "ONLY AT MOA · CANADA GOOSE COLD ROOM",
        title: "−25°C arctic conditions · on demand.",
        body: "A dedicated walk-in freezer chilled to Arctic temperatures lets shoppers stress-test a parka before they buy. Brand integration that no competing mall — anywhere — can replicate. The room *is* the storefront.",
        stat: "−25°C",
        statLabel: "ARCTIC ON DEMAND",
        accent: "#0f766e",
      },
      {
        kind: "spec-grid",
        kicker: "PROGRAMMING",
        title: "What runs daily.",
        rows: [
          ["Diver feeds", "11am · 2pm · 4pm"],
          ["Shark encounter", "Daily · 1pm"],
          ["School groups", "12,400 students / yr"],
          ["Conservation talks", "Wkly partnership rotation"],
        ],
      },
    ],
    submodule: "venue",
  },

  {
    id: "rotunda",
    label: "Huntington Bank Rotunda",
    kicker: "the permanent stage",
    order: 6,
    map: { x: 50, y: 30 },
    palette: { tint: "#c0392b", bg: "#0a0a09", glow: "rgba(192,57,43,0.14)" },
    media: {
      video: v("zone-rotunda.mp4"),
      poster: i("events-banner.jpg"),
      fallbackVideo: fallback.events.video,
      audio: a("bed-rotunda.ogg"),
    },
    headline: "A permanent stage with 32M built-in seats.",
    headlineAccent: "32M built-in seats.",
    blurb: "Three concourse levels of sight-lines, atmospheric haze, and stage-grade rigging — built into the architecture. Holiday programming, brand takeovers, broadcast moments. The Rotunda turns retail traffic into stage audience without a second thought.",
    stats: [
      { n: "32M", l: "Annual reach" },
      { n: "8", l: "State catchment" },
      { n: "3", l: "Levels of sight-line" },
      { n: "Built-in", l: "Stage rigging" },
    ],
    formats: [
      { t: "Product launches", d: "Drops and unveils that command regional press coverage and queue lines around the rotunda." },
      { t: "Concerts & performances", d: "Atrium-scale stages with sight-lines from all three retail levels." },
      { t: "Brand activations", d: "Pop-ups, installations, experiential takeovers — dedicated footprint, guaranteed traffic." },
      { t: "Broadcast moments", d: "A venue designed for national media, from morning shows to holiday specials." },
    ],
    overlays: {
      tenant: {
        title: "Rotunda-adjacent flagship",
        rows: [
          ["Atrium-facing units", "2 available · 6,800 sq ft"],
          ["Visibility from L2/L3", "Direct"],
          ["Event-day footfall lift", "+212%"],
          ["Brand-appearance days / yr", "Avg 84"],
        ],
        proof: "Apple's MOA flagship sits one level above the rotunda.",
        cta: "Atrium Lease Path →",
      },
      sponsor: {
        title: "Title-tier sponsorship",
        rows: [
          ["Naming rights (current)", "Huntington Bank — 2024 onward"],
          ["Activation series available", "Q1, Q3, Q4 holidays"],
          ["LED ribbon (180°)", "Yes"],
          ["Broadcast partnership", "Yes — facility-grade I/O"],
        ],
        proof: "Past: Macy's Thanksgiving Parade satellite · Today Show.",
        cta: "Title Sponsorship Inquiry →",
      },
      event: {
        title: "Venue specs",
        rows: [
          ["Capacity (standing, atrium + L1)", "5,500"],
          ["Capacity (seated)", "1,400"],
          ["Power", "3-phase, 1200A house"],
          ["Load-in dock", "Direct truck access · 2 bays"],
        ],
        proof: "Hosted: Imagine Dragons acoustic · NBC Today plaza north.",
        cta: "Hold a Date →",
      },
    },
    stories: [
      {
        kind: "callout",
        kicker: "AUDIENCE OF 32 MILLION",
        title: "Eight states arrive here.",
        body: "Minnesota, Wisconsin, Iowa, Nebraska, the Dakotas, Illinois, and Ohio — 80% of MOA's traffic comes from inside this catchment. A Rotunda activation reaches the full Midwest in one moment, in one place.",
        stat: "8",
        statLabel: "STATE CATCHMENT",
      },
      {
        kind: "broadcast",
        kicker: "BROADCAST READY",
        title: "Built for the show after the show.",
        body: "Stage rigging, 3-phase 1200A house power, fibre to the loading dock, sight-lines from three balconies, and direct truck access through 2 dedicated bays. Then the show goes out: morning shows, holiday specials, parade satellites, regional news cut-ins.",
        items: [
          ["Macy's Thanksgiving Parade · satellite"],
          ["NBC Today · plaza north remote"],
          ["Imagine Dragons · acoustic intimate"],
          ["Disney+ Star Wars · premiere takeover"],
        ],
      },
    ],
    submodule: "events",
  },

  {
    id: "hotel",
    label: "Hotel & Convention",
    kicker: "JW Marriott · Radisson Blu · skybridge",
    order: 7,
    map: { x: 22, y: 22 },
    palette: { tint: "#a8a89f", bg: "#000000", glow: "rgba(168,168,159,0.10)" },
    media: {
      video: v("zone-hotel.mp4"),
      poster: i("visit-map.jpg"),
      fallbackVideo: fallback.retail.video,
      audio: a("bed-hotel.ogg"),
    },
    headline: "The only mall in America with hotels physically attached on both sides.",
    headlineAccent: "physically attached on both sides.",
    blurb: "The 14-story JW Marriott and the Radisson Blu connect directly into the concourse. A closed-loop experience for business travellers, families, and long-weekend shoppers — and a venue partner for any multi-day event format.",
    stats: [
      { n: "800", l: "Combined hotel keys" },
      { n: "2", l: "Hotels on-concourse" },
      { n: "MSP", l: "Airport across I-494" },
      { n: "Blue Line", l: "Light rail direct" },
    ],
    overlays: {
      tenant: {
        title: "Hotel-adjacent retail",
        rows: [
          ["Lobby-link units", "1 available · 4,200 sq ft"],
          ["Business-traveller share", "29%"],
          ["Avg room ADR", "$284"],
          ["Loyalty-tier crossover", "JW + Radisson + Marriott Bonvoy"],
        ],
        proof: "Brooks Brothers operated 7-year residency in this exact unit.",
        cta: "Hospitality-Retail Path →",
      },
      sponsor: {
        title: "Hospitality co-marketing",
        rows: [
          ["Room-key cross-promo", "Yes (800 keys)"],
          ["Welcome-bag inclusion", "Available"],
          ["Branded suite (long-form)", "JW Penthouse available"],
          ["Concierge channel", "Bookable by quarter"],
        ],
        proof: "Past: Cadillac sponsor suite · Rolex hotel-lobby gallery.",
        cta: "Hospitality Partnership →",
      },
      event: {
        title: "Convention-grade venue",
        rows: [
          ["Total event space", "62,000 sq ft (combined)"],
          ["Largest single ballroom", "12,200 sq ft (JW Marriott)"],
          ["Production support", "Encore on-site"],
          ["Hotel block guarantee", "800 keys"],
        ],
        proof: "Hosted: Microsoft Inspire regional · Target supplier summit.",
        cta: "Book Convention Space →",
      },
    },
    stories: [
      {
        kind: "callout",
        kicker: "ARRIVAL",
        title: "Across the interstate from MSP Airport.",
        body: "MOA sits southeast of I-494 and MN-77 — a straight shot from downtown Minneapolis on the Metro Transit Blue Line, and immediately across the highway from Minneapolis–Saint Paul International. Closed-loop arrival from gate to lobby in under twenty minutes.",
        stat: "60 E BROADWAY",
        statLabel: "BLOOMINGTON, MN",
      },
      {
        kind: "spec-grid",
        kicker: "PARKING & TRANSIT",
        title: "Capacity is not the constraint.",
        rows: [
          ["East + West ramps", "12,287 spaces"],
          ["Overflow north", "1,500 spaces"],
          ["IKEA shared", "1,407 spaces"],
          ["Light rail", "Blue Line · direct platform"],
        ],
      },
      {
        kind: "broadcast",
        kicker: "WHY HOSPITALITY MATTERS",
        title: "Multi-day formats unlock here.",
        body: "An event that lives only on the Rotunda is one day. An event that lives in the Rotunda + Convention + Hotel is a destination. The room block is the difference between a brand activation and a brand pilgrimage.",
        items: [
          ["JW Marriott · 14-story · 342 keys"],
          ["Radisson Blu · concourse-attached · 458 keys"],
          ["Total combined event space · 62,000 sq ft"],
          ["Production support · Encore on-site"],
        ],
      },
    ],
    submodule: "venue",
  },
];

// Helpers
export const ZONES_BY_ID = Object.fromEntries(ZONES.map((z) => [z.id, z]));

export function getZone(id) {
  return ZONES_BY_ID[id];
}

export function nextZone(currentId, modeId) {
  // Walk the recommended path for the active mode
  return null; // resolved at call-site since it depends on MODES, kept for symmetry
}
