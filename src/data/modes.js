// Three sales-tool modes. Switching mode reskins data overlays, recommended
// path, and CTA wording across every zone — without changing the zone content.

export const MODES = [
  {
    id: "tenant",
    label: "Tenant",
    longLabel: "Prospective Tenant",
    blurb: "You're considering a lease — flagship, mid-tier, F&B, or pop-up.",
    primaryCta: "Start a Lease Conversation",
    cta: "Lease",
    accent: "#d9b26f", // gold
    icon: "🏬",
    recommendedPath: ["retail", "luxury", "dining", "hotel", "rotunda"],
    metricLanguage: {
      audience: "Foot traffic",
      conversion: "Conversion",
      proof: "Co-tenants",
    },
  },
  {
    id: "sponsor",
    label: "Sponsor",
    longLabel: "Brand Sponsor / Partner",
    blurb: "You want presence — naming, integrations, audience activation.",
    primaryCta: "Build a Sponsorship Package",
    cta: "Sponsor",
    accent: "#c08457", // copper
    icon: "✦",
    recommendedPath: ["rotunda", "nick", "sealife", "retail", "luxury"],
    metricLanguage: {
      audience: "Annual impressions",
      conversion: "Engagement rate",
      proof: "Past activations",
    },
  },
  {
    id: "event",
    label: "Event Producer",
    longLabel: "Event / Venue Booking",
    blurb: "You're staging a launch, concert, broadcast, or convention.",
    primaryCta: "Hold a Date",
    cta: "Book Venue",
    accent: "#0f766e", // teal
    icon: "◉",
    recommendedPath: ["rotunda", "hotel", "nick", "sealife", "dining"],
    metricLanguage: {
      audience: "Capacity",
      conversion: "Sell-through",
      proof: "Hosted",
    },
  },
];

export const DEFAULT_MODE = "tenant";

export function getMode(id) {
  return MODES.find((m) => m.id === id) ?? MODES[0];
}
