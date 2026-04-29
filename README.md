# Mall of America · The Partnership Deck

> **Round 2 submission.** A non-linear, video-first, browser-based **prospect simulator** for Mall of America. Built for retailers, sponsors, and event partners — a tool that rewrites itself around who's looking and lets the prospect literally watch their own brand appear inside the property.

---

## Live Demo

- **Live URL:** *(to be added on deploy)*
- **Source:** *(to be added on deploy)*
- **Write-up:** [`WRITEUP.md`](WRITEUP.md)

---

## What changed in Round 2

The first round was a polished but linear deck. The panel said: *"linear navigation, limited interactivity, modest AI use, missing the 'I need to be here' reaction."*

Round 2 is a **paradigm reset**:

| v1 | v2 |
|---|---|
| 9 sections, scroll top-to-bottom | **Map-hub** with 7 zone nodes — non-linear, click anywhere |
| One pitch for all viewers | **Mode switcher** — Tenant / Sponsor / Event Producer rewrites overlays + CTAs + recommended path live |
| Pretty AI imagery | **AI as a live engine** — Brand-In-Place composites the prospect's logo into 3 MOA flagship moments in real time, then generates a tailored 3-paragraph pitch and a printable proposal PDF |
| Static deck | **Cinematic Mode** — press `C` for a 90-second autoplay tour with VO + chapter HUD, screen-share-ready |
| No analytics | **Sales-rep dashboard** at `?rep=1` — heatmap of zones visited, dwell time, brand generated, peak engagement zone |

---

## The signature interaction — Brand-In-Place

The "I need to be here" moment.

1. Prospect types their brand name (or picks from a chip — Aritzia · Aesop · Tiffany · Erewhon…) and uploads their logo.
2. The deck **composites the logo onto three empty MOA signage panels** in real time:
   - Luxury Wing storefront sign
   - Rotunda activation backdrop
   - Sea Life Aquarium sponsor portal
3. A **3-paragraph "Why MOA fits [Brand]"** pitch types in below — voice-matched to the brand's tier (luxury = restrained, pop-up = energetic, premium = confident-factual).
4. A **deterministic pricing engine** returns a Year-1 ballpark range with monthly baseline.
5. Click **GENERATE PROPOSAL PDF** → a 5-page print-styled proposal opens with the prospect's logo on the cover, ready to save as PDF.

Every other deck shows the prospect *the property*. This one shows the prospect *themselves inside the property* — with numbers, adjacency, and a take-home document.

---

## Architecture at a glance

```
src/
  hooks/useDeck.jsx        — central state machine (role · mode · zone · brand · history · saved)
                             · localStorage-persisted · URL-syncing for shareable links
  data/
    zones.js               — 7 zones × content × mode-specific overlays × stories
    modes.js               — Tenant / Sponsor / Event Producer definitions
    submodules.js          — Leasing paths · Sponsorship tiers · Event formats · Venue specs
    liveOps.js             — simulated live-ops feed for the always-on ticker
  lib/
    brandPricing.js        — deterministic Year-1 pricing engine
    brandCopy.js           — Why-MOA generator (Claude API hook-point)
    brandComposite.js      — composite-position config per template
  components/
    onboarding/Splash.jsx          — cinematic open + role gate
    chrome/                        — TopChrome · ModeSwitcher
    map/                           — PropertyMap · LiveOpsTicker · MapSidebar
    zones/                         — ZoneOverlay · ZoneAtmosphere · ZoneStories
    brand/                         — BrandInPlace · BrandIntake · BrandComposite · BrandReveal · BrandProposal
    submodules/                    — LeasingPaths · SponsorshipTiers · EventsBooking · VenueSpecs
    cinematic/CinematicMode.jsx    — 90-second VO-driven autoplay
    rep/SalesRepDashboard.jsx      — session heatmap at ?rep=1
public/ai/
  video/   audio/   vo/   images/  — every AI asset, organised by purpose
  credits.json                     — per-asset prompt + tool + seed (when relevant)
```

**Adding a new zone** = append one entry to `src/data/zones.js`. The map auto-places it by `(x,y)` coords; ZoneOverlay renders it; the recommended-path constellation includes it. No new component required.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript entry (`main.tsx`, `App.tsx`) + JSX components |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 12 |
| Icons | Lucide React (where used; most icons are inline SVG for sharpness) |
| Hosting | Vercel |

No backend. Brand-In-Place runs client-side; the Claude integration ships as a **hook-point** in [`src/lib/brandCopy.js`](src/lib/brandCopy.js) — swap the function body for a fetch to a serverless function and live generation kicks in.

---

## Running Locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run lint       # eslint
```

---

## Things to try (live demo)

1. **Pick a role** at the splash → the deck rewrites itself.
2. **Hover/tap a zone node** on the map → mode-relevant headline appears.
3. **Click into Retail** → scroll past the hero card to read the rich stories (zero-tax callout, floorplate spec, etc.).
4. **Switch mode top-bar** mid-zone → overlays + CTAs swap live.
5. **Click SEE YOUR BRAND HERE** → type *Aritzia*, hit generate, watch the cinematic 6-phase reveal.
6. **GENERATE PROPOSAL PDF** → `Cmd-P` / `Ctrl-P` → Save as PDF.
7. **Press `C`** anywhere → 90-second cinematic tour with Clara's VO and chapter HUD.
8. **Save zones** with the ★ button → they show on the map sidebar with quick-jump links.
9. **`?rep=1`** in the URL → session heatmap dashboard.
10. **Share link** copies the URL with role + mode + zone + brand pre-loaded — open in another tab and the deck restores state.

---

## AI Tools Used

See [`public/ai/credits.json`](public/ai/credits.json) for per-asset attribution + prompts.

| Layer | Tool | Output |
|---|---|---|
| Image stills | Microsoft Bing (DALL·E 3) · Leonardo.ai (Flux Dev) · Hailuo Image · ElevenLabs (Nano Banana) | 14 stills (map, brand-in-place templates, sub-module heroes, onboarding) |
| Video | Hailuo AI · Luma Dream Machine · Vaulted Concourse | 8 zone clips + hero open |
| Music | Suno v4 (instrumentals) | 8 tracks — cinematic theme + 7 zone beds |
| UI stings | Freesound.org (CC0) | 5 cues |
| VO | ElevenLabs v3 — voice "Clara" | 90s cinematic-mode narration |
| Runtime copy | Anthropic Claude (hook-point) | Why-MOA generator (live-call ready) |

**100% of primary storytelling imagery is AI-generated.** Zero stock photography on the hero storytelling path.

---

## Performance & Accessibility

- Production bundle: **~457 KB JS · ~140 KB gzipped** (4 sub-modules + Brand-In-Place + Cinematic Mode + Sales-Rep dashboard)
- All background videos use a fade-in poster underlay so the screen is never black during load
- `prefers-reduced-motion` swaps every video for a poster image
- AA contrast across the dark palette
- Keyboard navigation throughout (Esc · C · M shortcuts)
- Focus-visible outlines (no outline on mouse focus)
- Touch-target sizing on every interactive element
- Mobile bottom-strip zone navigation when hover isn't available

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel login
vercel --prod
```

[`vercel.json`](vercel.json) ships with long-cache `immutable` headers on `/ai/images/*`, `/ai/video/*`, `/ai/audio/*`, `/ai/vo/*`, and `/assets/*`.

---

## Design Rationale

See [`WRITEUP.md`](WRITEUP.md) for the 1-page strategic case — paradigm shift, the "I need to be here" moment defended, what would come next with another week.

---

## License

© 2026 — Partnership deck *concept* for Mall of America. All assets AI-generated for this submission. No affiliation with Mall of America or Triple Five Group.
