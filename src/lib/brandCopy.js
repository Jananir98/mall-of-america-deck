// Why-MOA copy generator.
//
// In a fully-resourced build this is an Anthropic Claude API call (system
// prompt locked, brand-name + tier in user message). For the free-tier demo
// we ship a curated template engine that picks paragraphs by tier + mode,
// splices the brand name, and varies cadence so the output never reads as
// boilerplate.
//
// Hook-point: `generateWhyMoa` is async so a Claude call can be swapped in
// later with no caller changes — see HOOK below.

const FACTS = {
  audience: "40 million annual visitors",
  catchment: "an 8-state Midwest catchment",
  tax: "a zero-percent apparel sales tax",
  scale: "5.6 million square feet",
  hotels: "two on-concourse hotels (JW Marriott · Radisson Blu)",
  airport: "MSP International across I-494",
  transit: "the Blue Line light rail direct to the property",
  rotunda: "a permanent rotunda stage with 32M built-in seats",
  nick: "a 7-acre indoor theme park heated by skylights alone",
  sealife: "the 300-foot Sea Life acrylic tunnel",
  coldroom: "the only −25°C arctic test room in retail",
};

const ADJACENCIES = {
  luxury: ["Tiffany & Co.", "Apple", "Coach", "Sephora"],
  premium: ["Apple", "UNIQLO", "Lululemon", "Sephora"],
  mainstream: ["UNIQLO", "H&M", "Sephora", "LEGO"],
  popup: ["Aritzia rotation", "Stüssy 6-week", "LEGO holiday installation"],
};

const TONE = {
  luxury: {
    open: (b) => `${b} should consider Mall of America for one reason that is rarely true of mass-market retail real estate: ${FACTS.audience} arrive here, and a measurable share of them have the appetite, the basket size, and the dwell time to sustain a flagship — not a satellite.`,
    middle: (b) => `The 2010-2015 unified concourse renovation rebuilt the property around exactly this expectation. Marble floors, brushed brass, daylight skylights, and adjacency to ${pick(ADJACENCIES.luxury, b).join(" · ")}. ${cap(b)} would not be the loudest brand on the wing — and that is precisely the calibration luxury requires.`,
    close: (b) => `MOA is the rare US retail address where ${FACTS.tax} stacks with a flagship-grade architecture and ${FACTS.hotels} attached to the concourse. The room exists. The traffic exists. ${cap(b)} would be choosing presence, not exposure.`,
  },
  premium: {
    open: (b) => `${b} fits Mall of America because the property delivers what most malls cannot: ${FACTS.audience} a year, ${FACTS.tax}, and a catchment of ${FACTS.catchment.replace("an ", "")} that no standalone urban location can match.`,
    middle: (b) => `Inside the property, ${b} would sit alongside ${pick(ADJACENCIES.premium, b).join(", ")} — the exact peer set that frames a premium brand correctly without flattening it into mass-market retail. Average dwell on this concourse is 2 hours 47 minutes; ${b} earns sustained attention, not a passing glance.`,
    close: (b) => `${cap(b)} also gets a partner property. Nickelodeon Universe drives families into the building seven days a week. Sea Life pulls a tourist mix. The Rotunda runs activation programming year-round. Foot traffic is not a hope — it is the baseline.`,
  },
  mainstream: {
    open: (b) => `For ${b}, Mall of America is one of the few US locations where scale is the headline. ${cap(FACTS.audience)} pass through every year, ${FACTS.tax} structurally cheapens every conversion, and the property runs ${FACTS.rotunda} for the kind of activation programming that turns a store into a destination.`,
    middle: (b) => `The retail floor mixes ${pick(ADJACENCIES.mainstream, b).join(" · ")}. ${cap(b)} would land inside a peer set that is broad without being diluted, and on a concourse engineered to keep visitors moving past every storefront across three full levels.`,
    close: (b) => `Beyond the storefront: ${FACTS.airport}, ${FACTS.transit}, and ${FACTS.hotels}. ${cap(b)} reaches not just Minneapolis — it reaches the Midwest, picked up at the gate and walked into the lobby.`,
  },
  popup: {
    open: (b) => `Pop-ups live or die on traffic and timing. Mall of America gives ${b} both: ${FACTS.audience}, ${FACTS.catchment} concentrated on one property, and a Rotunda calendar where the next activation slot is 6-10 weeks away — not 6-10 months.`,
    middle: (b) => `${cap(b)} can choose a footprint between 200 and 4,000 square feet, sit adjacent to Apple, Sephora, or Tiffany depending on availability, and tap into a concourse that already carries ${pick(ADJACENCIES.popup, b).join(" · ")} on rotation.`,
    close: (b) => `The property is built for short-form: branded floor decals are bookable by quarter, the LED ribbons are programmable per activation, and the JW Marriott absorbs hotel-night demand for press, talent, and team. ${cap(b)} doesn't need to build the audience — MOA already has it.`,
  },
};

function pick(arr, seed) {
  // light deterministic shuffle so the same brand always returns the same order
  const s = (seed || "").toLowerCase().split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = (s * (i + 1)) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 3);
}

function cap(s = "") {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Generate a 3-paragraph "Why Mall of America fits [Brand]" pitch.
 *
 *  HOOK — to switch to live Claude generation, replace the body of this
 *  function with a fetch to a /api/why-moa endpoint that calls the Anthropic
 *  SDK (system prompt: "You write 3-paragraph 'Why MOA' pitches for
 *  prospects in their brand voice. Cite real adjacencies and facts.").
 *  Cache the system message — same shape, different brand.
 */
export async function generateWhyMoa({ name, tier = "premium" }) {
  const t = TONE[tier] ?? TONE.premium;
  // Simulate API latency so the reveal animation has time to feel "live"
  await new Promise((r) => setTimeout(r, 350));
  return {
    p1: t.open(name),
    p2: t.middle(name),
    p3: t.close(name),
    voiceNote:
      tier === "luxury"
        ? "Restrained, declarative — luxury rarely needs to convince."
        : tier === "popup"
        ? "Energetic, fast-talking — pop-up calendar urgency."
        : "Confident, factual — premium-brand cadence.",
  };
}

export const TIER_LABELS = {
  luxury: "Luxury / Flagship",
  premium: "Premium / Lifestyle",
  mainstream: "Mainstream / Mass",
  popup: "Pop-up / Limited",
};
