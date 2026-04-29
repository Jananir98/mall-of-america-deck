// Deterministic pricing engine for the Brand-In-Place proposal.
//
// Inputs: tier (luxury|premium|mainstream|popup), footprint (sq ft), season
// (Q1|Q2|Q3|Q4), placement (concourse|rotunda|sealife).
//
// Output is intentionally a *range* with a baseline figure — the panel needs
// to see a number, but the proposal must read as a starting point, not a
// signed contract.

const TIER_RATES = {
  // base $/sqft/year — public industry ranges adapted for MOA caliber.
  luxury: 380,
  premium: 240,
  mainstream: 165,
  popup: 95,
};

const PLACEMENT_MULTIPLIERS = {
  concourse: 1.0,
  rotunda: 1.35, // visibility premium
  sealife: 0.85, // sub-grade adjacent
  luxury_wing: 1.55, // flagship rate
};

const SEASON_MULTIPLIERS = {
  Q1: 0.85,
  Q2: 0.95,
  Q3: 1.05,
  Q4: 1.4, // holiday peak
};

const ACTIVATION_FLAT = {
  // event-style activations on top of footprint cost
  retail: 0,
  rotunda: 145000, // base 7-day Rotunda activation fee
  sealife: 38000,
  full_brand: 240000, // multi-zone takeover
};

export function inferTierFromName(name = "") {
  const n = name.toLowerCase();
  const lux = ["chanel", "hermès", "hermes", "tiffany", "louis", "vuitton", "dior", "gucci", "prada", "rolex", "cartier", "ysl", "saint laurent", "bottega", "balenciaga"];
  const premium = ["aritzia", "aesop", "lululemon", "apple", "tesla", "nike", "ralph lauren", "coach", "canada goose", "on", "patagonia", "north face"];
  const popup = ["pop", "drop", "limited", "x ", "× "];
  if (lux.some((k) => n.includes(k))) return "luxury";
  if (premium.some((k) => n.includes(k))) return "premium";
  if (popup.some((k) => n.includes(k))) return "popup";
  return "mainstream";
}

export function calculatePricing({
  tier = "premium",
  footprint = 4500,
  season = "Q4",
  placement = "concourse",
  activation = "retail",
}) {
  const baseRate = TIER_RATES[tier] ?? TIER_RATES.premium;
  const placementMult = PLACEMENT_MULTIPLIERS[placement] ?? 1.0;
  const seasonMult = SEASON_MULTIPLIERS[season] ?? 1.0;
  const activationFlat = ACTIVATION_FLAT[activation] ?? 0;

  const annualBase = baseRate * footprint * placementMult;
  const seasonAdjusted = annualBase * seasonMult;
  const total = seasonAdjusted + activationFlat;

  return {
    annual: Math.round(total),
    monthly: Math.round(total / 12),
    range: {
      low: Math.round(total * 0.82),
      high: Math.round(total * 1.18),
    },
    breakdown: {
      base: Math.round(annualBase),
      seasonAdjustment: Math.round(seasonAdjusted - annualBase),
      activation: activationFlat,
      tier,
      tierRate: baseRate,
      footprint,
      season,
      placement,
    },
  };
}

export function formatUSD(n) {
  if (n >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  }
  if (n >= 1000) {
    return `$${Math.round(n / 1000)}K`;
  }
  return `$${n.toLocaleString()}`;
}

export function formatRange(r) {
  return `${formatUSD(r.low)} – ${formatUSD(r.high)}`;
}
