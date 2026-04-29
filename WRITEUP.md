# Mall of America · Round-2 Write-up

## The paradigm shift

Round 1 was a polished but linear deck. The panel said the right thing: *"linear navigation, limited interactivity, modest AI use, missing the 'I need to be here' reaction."*

Round 2 starts from a different premise — **don't build a deck, build a prospect simulator.** Three reframes do the work:

1. **Sections become zones.** Top-down scroll is replaced by a master map illustration with seven zone nodes positioned by coordinate. The viewer drives a non-linear journey, with a faint gold constellation tracing the recommended path for their active mode — guidance without coercion.
2. **One pitch becomes three.** A persistent mode switcher (Tenant · Sponsor · Event Producer) reskins every overlay, every metric, every CTA, and the recommended path. The same Retail zone shows foot-traffic and adjacency to a tenant, annual impressions and activation history to a sponsor, capacity and lead time to an event producer. This is the feature that makes the work read as a *sales tool*, not a slide deck.
3. **AI imagery becomes a live engine.** The Brand-In-Place flow is the centerpiece — described next.

---

## The "I need to be here" moment — Brand-In-Place

The brief asks for one interaction that earns *"I need to be here"*. This is it.

A prospect types or pastes their brand name (or picks from a chip — Aritzia, Aesop, Tiffany, Erewhon…) and uploads a logo. The deck:

- **Composites their logo onto three intentionally-empty MOA signage panels** in real time — a Luxury Wing storefront, a Rotunda activation backdrop, a Sea Life sponsor portal. CSS-driven, so the preview updates as they type. The empty panels are baked into the AI-generated templates on purpose; the composite is a *rendered render*, not a mockup.
- **Generates a 3-paragraph "Why MOA fits [Brand]"** pitch in a tone matched to the brand's tier — luxury gets restraint, premium gets confident-factual cadence, mainstream gets warmth, pop-up gets urgency. The function ships with a deterministic local generator that mirrors a Claude API contract; one fetch call swaps in live generation.
- **Returns a Year-1 ballpark** from a deterministic pricing engine — tier × footprint × placement × season + activation flat. Honest range, not a quote.
- **Outputs a 5-page proposal PDF** — cover with the prospect's logo, three composite stills, the Why-MOA copy, the pricing breakdown, three concrete next steps. `Cmd-P` → Save as PDF.

**Why a tenant, sponsor, or event partner reacts with "I need to be here":**

- A *luxury VP* watches their flagship appear next to Tiffany on the Luxury Wing concourse — with adjacency, dwell time, and HNW visitor share named on the same screen. They cannot un-see their store there.
- A *brand sponsor* watches their wordmark fill the Rotunda LED wall while the deck cites Macy's Parade and NBC Today as past partners — with their own activation tier priced.
- An *event producer* watches their tour name on the same backdrop, paired with the venue's 1200A house power and 2-bay direct truck access — a take-home spec sheet appears within seconds.

Every other deck shows the prospect *the property*. This one shows the prospect *themselves inside the property*, with numbers attached, in under a minute. The conversation that follows is no longer "should we?" — it's "what's the next step?"

---

## How the AI was used

100% of primary storytelling imagery is AI-generated. Stack:

- **Image:** Bing (DALL·E 3) · Leonardo.ai (Flux Dev) · Hailuo Image · ElevenLabs (Nano Banana). Twelve generated stills, three of which are deliberately empty for runtime compositing.
- **Video:** Hailuo AI · Luma · Kling. Eight zone atmosphere clips + one cinematic open. All free-tier.
- **Music:** Suno v4 — eight instrumentals (theme + seven zone beds), all in one day's free quota.
- **VO:** ElevenLabs v3, voice "Clara" — a 90-second narration scripted to match the cinematic-mode chapter timing.
- **Copy:** A Claude hook-point in [`src/lib/brandCopy.js`](src/lib/brandCopy.js) — same input/output contract as the local generator, so flipping to live generation is a one-function change.

Per-asset prompts and tools are catalogued in [`public/ai/credits.json`](public/ai/credits.json).

---

## What I'd do with another week

- **Live Claude generation** in Brand-In-Place. The hook-point is one fetch away — switching to live calls would let the pitch reference the prospect's actual brand voice from their public copy. (~1 day)
- **Voice notes per zone.** Browser MediaRecorder, blob in IndexedDB, surfaced on the rep dashboard. Ship-able in half a day. (~½ day)
- **Animated map zoom on zone enter.** Currently the atmosphere swap fades; a real camera dolly into the node would amplify the cinematic feel. Framer Motion supports it. (~1 day)
- **Heatmap email-on-close.** The rep dashboard exists; pipe the JSON to a serverless function that emails Partnerships when the prospect closes the tab. (~½ day)
- **A/B between Hailuo and Sora hero.** The hero is the second-most-judged frame after the role gate. Generating both and split-testing would refine the open. (~½ day)

The non-negotiables — non-linear navigation, mode-aware lensing, the Brand-In-Place reveal, the proposal PDF, cinematic mode, the rep dashboard — are all in the build. Everything above is amplification.
