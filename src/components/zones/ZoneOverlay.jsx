import { motion, AnimatePresence } from "framer-motion";
import { useDeck } from "../../hooks/useDeck";
import ZoneAtmosphere from "./ZoneAtmosphere";
import ZoneStories from "./ZoneStories";

/**
 * One component renders all 7 zones — content comes from zones.js, mode-
 * specific overlays come from zone.overlays[mode]. Adding a zone = appending
 * to ZONES, with no new component.
 *
 * Layout — full-bleed atmosphere bed (video + tint + grain) under a dark
 * editorial card carrying:
 *   · kicker + headline + blurb
 *   · stats grid
 *   · mode-specific overlay (the same zone, three lenses)
 *   · brand-list / cuisine-list / formats / sublocations (whichever the zone has)
 *   · CTAs — Brand-In-Place + relevant sub-module + Save
 *
 * Esc / breadcrumb closes back to map (handled by useDeck keyboard).
 */
export default function ZoneOverlay() {
  const {
    activeZone,
    activeMode,
    exitZone,
    openSubmodule,
    openBrand,
    toggleSave,
    savedZones,
    recommendedNext,
    enterZone,
    zones,
  } = useDeck();

  if (!activeZone) return null;

  const z = activeZone;
  const overlay = z.overlays?.[activeMode.id] ?? z.overlays?.tenant;
  const saved = savedZones.includes(z.id);
  const next = zones.find((x) => x.id === recommendedNext) ?? null;

  // Route the zone's primary CTA to the sub-module that matches the active
  // sales-tool lens. Sponsor lens always opens sponsorship tiers; Event lens
  // opens events booking (or venue specs for venue-grade zones); Tenant lens
  // falls back to the zone's own declared submodule (leasing or venue).
  const submoduleForMode =
    activeMode.id === "sponsor"
      ? "sponsorship"
      : activeMode.id === "event"
      ? z.submodule === "venue"
        ? "venue"
        : "events"
      : z.submodule;

  return (
    <AnimatePresence>
      <motion.div
        key={z.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-20 overflow-hidden"
      >
        <ZoneAtmosphere zone={z} />

        {/* Editorial overlay — scrolls within itself */}
        <div className="absolute inset-0 overflow-y-auto zone-scroll">
          {/* Hero block */}
          <div className="min-h-screen flex items-end md:items-center pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-20 px-4 sm:px-6 md:px-14">
            <div className="w-full max-w-7xl mx-auto grid md:grid-cols-12 gap-6 md:gap-10">
              {/* LEFT — story */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="md:col-span-7"
              >
                <p
                  className="kicker"
                  style={{ color: z.palette.tint }}
                >
                  ZONE 0{z.order} · {z.kicker.toUpperCase()}
                </p>
                <h2 className="mt-3 sm:mt-4 font-display font-light tracking-display text-[clamp(1.6rem,5.2vw,5rem)] leading-[1.02]">
                  {renderHeadline(z)}
                </h2>
                <p className="mt-4 sm:mt-6 max-w-2xl text-ink-100/80 leading-relaxed text-[14px] sm:text-[16px] md:text-[17px]">
                  {z.blurb}
                </p>

                {/* Stats grid */}
                <div className="mt-7 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 max-w-3xl">
                  {z.stats.map((s) => (
                    <div key={s.l} className="bg-ink-950/85 backdrop-blur p-3 sm:p-4 md:p-5">
                      <div className="font-display text-xl sm:text-2xl md:text-3xl text-gradient-gold">
                        {s.n}
                      </div>
                      <div className="mt-1 text-[9px] sm:text-[10px] tracking-eyebrow text-ink-300 leading-snug">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Zone-specific texture: brands, cuisines, formats, sublocations */}
                <ZoneTexture zone={z} />
              </motion.div>

              {/* RIGHT — mode overlay + actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="md:col-span-5"
              >
                <div className="glass p-5 sm:p-6 md:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[10px] tracking-eyebrow text-accent-gold">
                      VIEWING AS · {activeMode.longLabel.toUpperCase()}
                    </div>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-sm"
                      style={{
                        background: `${z.palette.tint}20`,
                        color: z.palette.tint,
                      }}
                    >
                      {activeMode.icon}
                    </span>
                  </div>
                  <div className="mt-3 font-display text-[22px] md:text-[26px] leading-tight">
                    {overlay.title}
                  </div>

                  <ul className="mt-5 divide-y divide-white/8">
                    {overlay.rows.map(([k, v]) => (
                      <li key={k} className="py-2.5 flex justify-between gap-6 text-[13.5px]">
                        <span className="text-ink-300 tracking-wide">{k}</span>
                        <span className="text-ink-100 text-right">{v}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-5 border-t border-white/10">
                    <div className="text-[10px] tracking-eyebrow text-accent-gold mb-1.5">
                      PROOF
                    </div>
                    <p className="text-[13px] text-ink-100/85 leading-relaxed">
                      {overlay.proof}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {submoduleForMode && (
                      <button
                        onClick={() => openSubmodule(submoduleForMode)}
                        className="flex-1 min-w-[160px] px-4 py-3 bg-accent-gold text-ink-950 text-[11px] tracking-eyebrow font-medium hover:bg-[#f4d99a] transition flex items-center justify-between gap-2"
                      >
                        {overlay.cta}
                      </button>
                    )}
                    <button
                      onClick={openBrand}
                      className="flex-1 min-w-[160px] px-4 py-3 border border-accent-gold/50 text-accent-gold text-[11px] tracking-eyebrow hover:bg-accent-gold/10 transition flex items-center justify-between gap-2"
                    >
                      SEE YOUR BRAND HERE ↗
                    </button>
                  </div>
                </div>

                {/* Quick utility row */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => toggleSave(z.id)}
                    aria-pressed={saved}
                    className={`flex items-center gap-2 px-3 py-2.5 min-h-[40px] text-[10px] tracking-eyebrow border transition ${
                      saved
                        ? "border-accent-gold text-accent-gold bg-accent-gold/10"
                        : "border-white/15 text-ink-300 hover:text-accent-gold hover:border-accent-gold/40"
                    }`}
                  >
                    <span>{saved ? "★" : "☆"}</span>
                    {saved ? "SAVED" : "SAVE ZONE"}
                  </button>
                  <button
                    onClick={exitZone}
                    className="flex items-center gap-2 px-3 py-2.5 min-h-[40px] text-[10px] tracking-eyebrow border border-white/15 text-ink-300 hover:text-accent-gold hover:border-accent-gold/40 transition"
                  >
                    ← BACK TO MAP
                  </button>
                  {next && next.id !== z.id && (
                    <button
                      onClick={() => enterZone(next.id)}
                      className="sm:ml-auto flex items-center gap-2 px-3 py-2.5 min-h-[40px] text-[10px] tracking-eyebrow border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 transition"
                    >
                      NEXT · {next.label.toUpperCase()} →
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Stories block — secondary editorial spreads */}
          {z.stories?.length > 0 && (
            <div className="px-4 sm:px-6 md:px-14 pb-20 sm:pb-32">
              <div className="w-full max-w-7xl mx-auto">
                <ZoneStories stories={z.stories} palette={z.palette} />
              </div>
            </div>
          )}

          {/* Closing CTA — final beat of the zone */}
          <ZoneCloser
            zone={z}
            mode={activeMode}
            submoduleId={submoduleForMode}
            onSubmodule={openSubmodule}
            onBrand={openBrand}
            onExit={exitZone}
            onNext={next ? () => enterZone(next.id) : null}
            next={next}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ZoneCloser({ zone, mode, submoduleId, onSubmodule, onBrand, onExit, onNext, next }) {
  return (
    <div className="px-4 sm:px-6 md:px-14 pb-16 sm:pb-24">
      <div className="w-full max-w-7xl mx-auto pt-10 sm:pt-16 border-t border-white/10">
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-end">
          <div className="md:col-span-7">
            <div
              className="text-[10px] tracking-eyebrow"
              style={{ color: zone.palette.tint }}
            >
              YOUR NEXT MOVE · {mode.longLabel.toUpperCase()}
            </div>
            <h3 className="mt-3 font-display text-[clamp(1.3rem,3.2vw,2.6rem)] leading-tight max-w-2xl">
              {zone.label} is one decision away.{" "}
              <span className="italic text-gradient-gold">Make it concrete.</span>
            </h3>
          </div>
          <div className="md:col-span-5 flex flex-wrap gap-2 justify-start md:justify-end">
            {submoduleId && (
              <button
                onClick={() => onSubmodule(submoduleId)}
                className="px-4 sm:px-5 py-3 min-h-[44px] bg-accent-gold text-ink-950 text-[10px] tracking-eyebrow hover:bg-[#f4d99a] transition"
              >
                {mode.primaryCta.toUpperCase()} →
              </button>
            )}
            <button
              onClick={onBrand}
              className="px-4 sm:px-5 py-3 min-h-[44px] border border-accent-gold/50 text-accent-gold text-[10px] tracking-eyebrow hover:bg-accent-gold/10 transition"
            >
              SEE YOUR BRAND HERE ↗
            </button>
            {next && (
              <button
                onClick={onNext}
                className="px-4 sm:px-5 py-3 min-h-[44px] border border-white/15 text-ink-300 text-[10px] tracking-eyebrow hover:text-accent-gold hover:border-accent-gold/40 transition"
              >
                NEXT · {next.label.toUpperCase()} →
              </button>
            )}
            <button
              onClick={onExit}
              className="px-4 sm:px-5 py-3 min-h-[44px] border border-white/15 text-ink-300 text-[10px] tracking-eyebrow hover:text-accent-gold hover:border-accent-gold/40 transition"
            >
              ← MAP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Headlines often have an italic gold-accent fragment. The data model carries
 * the full string + the accent fragment to splice in. If the accent isn't
 * found, render the headline plain.
 */
function renderHeadline(z) {
  if (!z.headlineAccent || !z.headline.includes(z.headlineAccent)) {
    return z.headline;
  }
  const [before, after] = z.headline.split(z.headlineAccent);
  return (
    <>
      {before}
      <span className="italic text-gradient-gold">{z.headlineAccent}</span>
      {after}
    </>
  );
}

/**
 * Per-zone "texture" block — brands marquee for retail, cuisine list for
 * dining, formats for rotunda, sublocations for nick. Renders nothing if the
 * zone has none.
 */
function ZoneTexture({ zone }) {
  if (zone.brandSamples?.length) {
    return (
      <div className="mt-10 overflow-hidden border-y border-white/10 py-4 max-w-3xl">
        <div className="flex gap-10 animate-marquee whitespace-nowrap text-ink-100/70 font-display text-base">
          {[...zone.brandSamples, ...zone.brandSamples].map((b, i) => (
            <span key={i} className="flex items-center gap-10 shrink-0">
              {b}
              <span className="text-accent-gold/40">✦</span>
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (zone.cuisines?.length) {
    return (
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 max-w-2xl">
        {zone.cuisines.map((c) => (
          <div key={c} className="flex items-center gap-2 text-[13px] text-ink-100/85">
            <span className="w-2 h-[1px] bg-accent-gold" />
            {c}
          </div>
        ))}
      </div>
    );
  }
  if (zone.formats?.length) {
    return (
      <ul className="mt-8 space-y-3 max-w-2xl">
        {zone.formats.map((f) => (
          <li key={f.t} className="flex gap-4">
            <span className="text-accent-gold mt-2">·</span>
            <div>
              <div className="font-display text-lg leading-snug">{f.t}</div>
              <div className="text-[13.5px] text-ink-100/70">{f.d}</div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  if (zone.sublocations?.length) {
    return (
      <div className="mt-8 flex flex-wrap gap-2 max-w-2xl">
        {zone.sublocations.map((s) => (
          <span
            key={s.name}
            className="px-3 py-1.5 text-[11px] tracking-wide border border-white/15 bg-black/40 text-ink-100/85"
          >
            <span className="text-accent-gold">{s.name}</span>
            <span className="text-ink-500 mx-2">·</span>
            <span>{s.note}</span>
          </span>
        ))}
      </div>
    );
  }
  if (zone.anchors?.length) {
    return (
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 max-w-2xl">
        <span className="text-[10px] tracking-eyebrow text-accent-gold w-full">
          ANCHORS
        </span>
        {zone.anchors.map((a) => (
          <span key={a} className="font-display text-xl">
            {a}
          </span>
        ))}
      </div>
    );
  }
  return null;
}
