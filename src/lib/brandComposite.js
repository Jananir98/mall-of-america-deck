// Composite-position config for the three Brand-In-Place templates.
//
// Each template was generated with an *intentionally empty* signage panel
// where the prospect's logo gets composited in-browser via CSS positioning
// + blend mode. Numbers are % of the image canvas — adjust if a regenerated
// template shifts the panel.
//
// Real-world equivalent: this is what a Photoshop overlay layer would do.
// We do it in CSS so it stays performant and updates live as the prospect
// types/uploads.

export const BRAND_TEMPLATES = [
  {
    id: "luxury-wing",
    label: "Luxury Wing storefront",
    zone: "luxury",
    image: "/ai/images/brand-in-place/luxury-wing-empty.jpg",
    fallback: "/ai/images/brand-in-place/luxury-wing-empty-alt.webp",
    // signage box position (% of image)
    box: { left: 36, top: 22, width: 28, height: 9 },
    blend: "screen",
    tagline: "Your flagship, between Tiffany and Apple.",
    caption: "LUXURY WING · LEVEL 2",
  },
  {
    id: "rotunda-stage",
    label: "Rotunda activation backdrop",
    zone: "rotunda",
    image: "/ai/images/brand-in-place/rotunda-stage-empty.jpg",
    fallback: "/ai/images/brand-in-place/rotunda-stage-empty-alt.webp",
    box: { left: 32, top: 28, width: 36, height: 18 },
    blend: "screen",
    tagline: "Q4 activation · 32M annual reach in one stage.",
    caption: "HUNTINGTON BANK ROTUNDA · LIVE",
  },
  {
    id: "sealife-portal",
    label: "Sea Life sponsor portal",
    zone: "sealife",
    image: "/ai/images/brand-in-place/sealife-portal-empty.jpg",
    fallback: "/ai/images/brand-in-place/sealife-portal-empty-alt.webp",
    box: { left: 30, top: 14, width: 40, height: 10 },
    blend: "screen",
    tagline: "Conservation-aligned brand integration.",
    caption: "SEA LIFE AQUARIUM · NORTH PORTAL",
  },
];

export function templateForZone(zoneId) {
  return BRAND_TEMPLATES.find((t) => t.zone === zoneId);
}
