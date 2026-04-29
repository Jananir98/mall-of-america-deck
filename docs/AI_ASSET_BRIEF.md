# AI Asset Brief — Round-2 Build

**Queue everything in this file before/while code is being written.** Generative video and high-fidelity stills take hours to render. The deck is built around these assets — having them ready when components land is the difference between "ships Sunday" and "ships compromised."

Style locks for every prompt unless overridden:

> *Cinematic, anamorphic 2.39:1 framing, shot on ARRI Alexa 65, 35mm anamorphic lens, golden-hour or moody dusk lighting, subtle teal-and-amber color grade, fine film grain, ultra-shallow depth of field, premium luxury commercial aesthetic, no people in frame unless specified, no logos or text in frame, no recognisable copyrighted brands.*

Negative prompt (default for every still & clip):

> *blurry, low-res, watermark, text, logo, jpeg artifacts, cartoon, illustration, fisheye, bad anatomy, deformed, oversaturated, neon, instagram filter, stock photo aesthetic, generic mall imagery.*

Seed lock: pick one master seed (e.g. `7240928`) and reuse across the whole pack so renders feel like one shoot.

---

## 1 · Runway Gen-4 / Kling 2.1 Master — VIDEO

**Format:** 1920×1080, 24fps, 8s loops (10s for hero). H.264. No audio (sound bed is added separately).

### V1 — Hero cinematic open *(highest priority)*
> Slow aerial pull-back over a snow-dusted Minnesota landscape at golden hour, revealing a vast glass-roofed mega-mall complex glowing from within. Cinematic drone reveal, anamorphic lens, ARRI Alexa 65, dramatic backlit clouds, copper and gold tones. Camera rises and the building fills frame. 10 seconds, smooth motion, end on a wide static beauty shot. No text, no logos.

Render **3 takes**. Pick best. Backup: regenerate with prompt swap "evening blue hour" → "first-light dawn."

### V2 — Retail zone bed
> Slow dolly-in down a luxurious indoor concourse with polished marble floors, soft warm spotlights on flagship storefronts, glowing skylights overhead, anamorphic flares, ultra-shallow depth of field, no visible logos, no people. 8s loop, end position invites the next push-in.

### V3 — Luxury Wing zone bed
> Static low-angle pan across a vaulted concourse with daylight skylights, brushed brass detailing, marble columns, single shaft of golden afternoon light cutting across, dust motes catching the beam, almost reverent atmosphere, no people, no logos. 8s, end frame matches start (loop).

### V4 — Dining zone bed
> Slow upward tilt past a multi-level food court with warm hanging pendant lights, copper kitchen accents, soft motion blur on background diners (silhouettes only), rich amber and ruby tones, end on a glowing skylight overhead. 8s loop.

### V5 — Nickelodeon Universe zone bed
> Wide low-angle dolly through an indoor theme park atrium at twilight, neon-lit roller coaster track in soft focus background, glass roof above with a streaked sunset, kinetic energy, slight motion-blur on rides, candy-coloured but cinematic (not garish). 8s loop.

### V6 — Sea Life Aquarium zone bed
> Slow forward push through a glowing turquoise underwater acrylic tunnel, schools of fish drifting past in dreamy slow-motion, dappled caustic light playing on tunnel walls, deep cyan-to-navy gradient, hushed and atmospheric. 8s loop.

### V7 — Rotunda / Events zone bed
> Wide static shot of a vast circular rotunda with concentric balconies, dramatic stage lighting reds and golds spilling across the architecture, atmospheric haze, suggestion of an empty stage waiting to be activated, no crowd visible — just the vessel. 8s loop, gentle light shimmer.

### V8 — Hotel & Convention zone bed
> Slow dolly across a connecting glass skybridge between a luxury hotel tower and a mall concourse at blue hour, city lights glittering through windows, polished brass handrails, ultra-shallow depth of field, no people. 8s loop.

### V9 — Cinematic Mode end-card sting
> Slow zoom out from a single illuminated key dropping into a velvet-lined display box on dark stone, dramatic single key-light, lens flare on click, very short 4s, end-tag energy.

**Total video: 9 clips, ~80s total render. Budget queue time: 6-8 hours wall-clock.**

---

## 2 · Flux 1.1 Pro / Imagen — STILLS

**Format:** 2560×1440 master, downscale to 1920×1080 + 1280×720 webp for delivery.

### S1–S7 — Map illustration tiles
Stylised top-down isometric architectural rendering of one MOA zone, hand-drawn line-art over warm parchment tone, gold ink highlights on key features, no people, no text labels, no copyrighted brands. Each zone gets its own tile:

1. **Retail concourse** — long curving avenue with storefront facades (no logos), skylights overhead.
2. **Luxury Wing** — narrower elegant gallery with marble columns and brass.
3. **Food court / Dining** — central mezzanine with radiating dining bays.
4. **Nickelodeon Universe** — open atrium with rollercoaster track ribbon.
5. **Sea Life Aquarium** — entrance portal + curving tunnel underground.
6. **Huntington Bank Rotunda** — circular performance space with concentric balconies.
7. **Hotel + Convention skybridge** — two towers connected to the mall body.

### S8 — Master map composite
> Stylised top-down architectural illustration of a vast mega-mall complex, gold ink line-art on warm parchment, four floors implied through subtle shading, seven zones clearly delineated, decorative compass rose top-right, scale legend bottom-left, atmospheric vignette edges, no text labels (we add them in code), painterly luxury cartography aesthetic.

### S9–S20 — Brand-In-Place template renders (3 templates × 4 brand-tier looks)
Per template, render 4 variants (luxury / premium / mainstream / pop-up) so we have stylistic flexibility per brand.

**Template A — Luxury Wing storefront elevation:**
> Photorealistic eye-level view of an empty premium storefront on a luxurious indoor mall concourse, polished marble floors, brass trim, large arched glass facade, soft golden lighting, clean signage panel above the entrance left intentionally blank for compositing, end-cap position with sightline depth behind it, anamorphic lens, no people, no logos visible.

**Template B — Rotunda activation backdrop:**
> Photorealistic wide shot of a vast indoor rotunda dressed for a brand activation, large blank LED wall stage backdrop centre frame (intentionally empty for compositing), concentric balconies above filled with silhouetted onlookers, dramatic stage lighting in warm gold, atmospheric haze, kinetic energy.

**Template C — Sea Life sponsor portal:**
> Photorealistic frontal view of an aquarium attraction entry portal, glowing turquoise tunnel visible through the doorway, large blank header panel above the entrance left empty for sponsor logo compositing, side-lit signage flanks, families queueing in soft focus background.

### S21–S26 — Sub-module hero stills
- **Events sub-module:** Sweeping wide-angle of a packed concert in the Rotunda at peak energy, stage lights raking across faces in the crowd.
- **Sponsorship sub-module:** Macro detail shot of brushed-brass sponsor signage embedded into the architecture.
- **Leasing — Luxury path:** Editorial flatlay of a leasing portfolio — floor plan blueprint, swatches of marble & brass, gold pen, on a dark walnut desk.
- **Leasing — F&B path:** Warm overhead shot of a restaurant kitchen pass at service, copper pans, golden plate-up, atmospheric steam.
- **Leasing — Pop-up path:** Modern minimalist pop-up shop interior with raw plywood fixtures and a single statement light fixture.
- **Venue — Performing Arts:** Wide proscenium theatre interior with red velvet seats, gilt detailing, single spotlight on an empty stage.

### S27 — Onboarding hero (role gate background)
> Cinematic ultra-wide of MOA's main concourse at dusk, vast scale conveyed through long lines of pendant lighting receding to vanishing point, warm interior glow, motion-blurred silhouettes only, anamorphic lens, copper-and-amber palette.

**Total stills: 27 master images. Budget queue time: 2-3 hours.**

---

## 3 · Suno v4 — MUSIC & SOUND BEDS

**Format:** WAV → 256kbps OGG/MP3 + loop-edited.

### M1 — Signature theme (Cinematic Mode + Hero open)
> Modern cinematic orchestral score, slow build, deep cello drone foundation, layered hammered dulcimer, distant brass swell at 0:45, sparse percussion, hopeful but restrained, Hans Zimmer × Jóhann Jóhannsson energy, 90 seconds, ends on suspended cadence.

### M2-M8 — Zone ambient beds (one per zone, ~60s each, designed to loop)

- **Retail bed:** Restrained ambient cinematic, soft synth pad in C major, sparse piano motifs, sense of forward motion, almost gallery-like, 60s loop.
- **Luxury Wing bed:** Sparse string quartet over deep sub-bass drone, near-silence between phrases, reverent and prestigious, 60s loop.
- **Dining bed:** Warm mid-tempo organic — upright bass, brushed snare, vibraphone — a hushed late-night brasserie, 60s loop.
- **Nickelodeon bed:** Kinetic synth-pop-meets-orchestral, playful arpeggios, big driving drums, no vocals, slightly cinematic so it doesn't feel cheap, 60s loop.
- **Sea Life bed:** Underwater ambient — deep granular pads, sparse harp, hydrophone-style low frequencies, dreamy and immersive, 60s loop.
- **Rotunda / Events bed:** Stadium-energy build — pulsing kick, soaring synth lead, choir swell, "the show is about to start," 60s loop.
- **Hotel / Convention bed:** Late-night jazz-meets-electronic, Rhodes piano, brushed drums, soft saxophone in distance, sophisticated and grown-up, 60s loop.

### M9 — UI sting library (4 short cues)
> Short, polished UI cues — zone-enter swoosh (1s), brand-reveal chime (2s), CTA glow (1s), success confirmation (2s). Each: cinematic, refined, brass + glass + sub-bass character. No retro 8-bit, no generic notification sounds.

**Total audio: 9 tracks. Budget queue time: 1 hour.**

---

## 4 · ElevenLabs v3 — VOICE-OVER (Cinematic Mode only)

**Voice:** Pick a warm authoritative female narrator (e.g. "Charlotte" or similar), studio-quality, slight reverb tail. Pace: deliberate, ~120 wpm.

### VO1 — Cinematic Mode 90-second narration
> *(0-12s, over Hero)* "Five-point-six million square feet. Forty million visitors a year. A city under one roof — the largest in the Western Hemisphere."
>
> *(12-30s, Retail zone)* "Five hundred and twenty stores. Four anchors. A retail floor where Apple and Tiffany share the same concourse. Sales tax on apparel? Zero."
>
> *(30-50s, Attractions)* "The only mall in America with a seven-acre indoor theme park. With ten thousand sea creatures walking distance from the food court. With an Arctic-temperature room where you can stress-test a parka before you buy it."
>
> *(50-70s, Events)* "Thirty-two million built-in seats. A rotunda built for product launches, concerts, brand takeovers, broadcast moments. A permanent stage in the geographic center of the country."
>
> *(70-90s, CTA)* "Eight states arrive here. Three connected hotels. One conversation away. Mall of America. Bring your brand to the room where it happens."

**Total VO: 1 master track. Budget render: 15 minutes.**

---

## 5 · Anthropic Claude (Sonnet 4.6) — RUNTIME COPY

Not pre-rendered — these run at request-time inside the Brand-In-Place flow. Spec'd here so the prompts ship with the codebase.

### Brand-In-Place Why-MOA copy generator
**System:** "You write 3-paragraph 'Why Mall of America' pitches for prospective brand partners. Voice matches the brand's own marketing tone — luxury brands get measured restraint, mainstream brands get warmth, pop-ups get energy. Every paragraph cites at least one real MOA fact (40M visitors, 520+ stores, 8-state catchment, sales tax 0% on apparel, JW Marriott + Radisson connected, Nickelodeon Universe, Sea Life, Rotunda for events). Cite real adjacent tenants when known. Do NOT use bullet points or marketing clichés ('elevate,' 'unleash,' 'next-level,' 'unlock'). Each paragraph is 50-70 words. Output JSON: `{p1, p2, p3, voiceNote}` where voiceNote is one sentence on how you matched their tone."
**Cache:** prompt-cache the system message — 90% of API calls share it.

### Brand-In-Place pricing copy generator
**System:** "Given a brand tier (luxury/premium/mainstream/pop-up), a footprint in sqft, and a season (Q1/Q2/Q3/Q4), output a 2-sentence pricing rationale. Reference comparable MOA tenancies if known publicly. Never quote a final number — that comes from the deterministic engine. Return: `{rationale}`."

---

## 6 · Asset filing convention

```
public/ai/
  video/
    hero-open.mp4        (V1, 10s)
    zone-retail.mp4      (V2)
    zone-luxury.mp4      (V3)
    zone-dining.mp4      (V4)
    zone-nick.mp4        (V5)
    zone-sealife.mp4     (V6)
    zone-rotunda.mp4     (V7)
    zone-hotel.mp4       (V8)
    sting-end.mp4        (V9)
  images/
    map/
      master.webp        (S8)
      tile-retail.webp   (S1) ... etc
    brand-in-place/
      luxury-wing-A.webp ... template-tier composites
    submodule/
      events-hero.webp ... etc
    onboarding/
      role-gate-bg.webp  (S27)
  audio/
    theme.ogg            (M1)
    bed-retail.ogg       (M2) ... etc
    sting-zone.ogg       (M9-1)
    sting-reveal.ogg     (M9-2)
    sting-cta.ogg        (M9-3)
    sting-success.ogg    (M9-4)
  vo/
    cinematic-mode.mp3   (VO1)
  credits.json           (per-asset attribution + prompt + seed)
```

`credits.json` schema per entry:
```json
{
  "id": "V1",
  "type": "video",
  "file": "video/hero-open.mp4",
  "tool": "Runway Gen-4",
  "prompt": "...",
  "negativePrompt": "...",
  "seed": 7240928,
  "renderedAt": "2026-04-28T...",
  "license": "Generated content — no source attribution required"
}
```

---

## 7 · Queue order (do this NOW)

1. **Runway/Kling V1 (hero)** — start first, longest single render.
2. **Suno M1 (theme)** — start second, runs in parallel and is fast.
3. **Flux S8 (master map)** — kick off third — needed for Wed map shell to look real.
4. **Runway V2-V8 (zone beds)** — batch all 7 in queue.
5. **Flux S1-S7 (map tiles)** — batch.
6. **Flux S9-S20 (Brand-in-Place templates)** — batch.
7. **Suno M2-M8 (zone beds)** — batch.
8. **Flux S21-S27 (sub-module hero + onboarding bg)** — batch.
9. **ElevenLabs VO1** — last, fast.

If anything fails or comes back weak, reroll with seed +1 and prompt suffix tweak. Don't burn time perfecting — pick "good enough at scale" over "perfect once."
