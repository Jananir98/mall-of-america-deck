import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import BrandComposite from "./BrandComposite";
import { BRAND_TEMPLATES } from "../../lib/brandComposite";
import { generateWhyMoa, TIER_LABELS } from "../../lib/brandCopy";
import { calculatePricing, formatRange, formatUSD } from "../../lib/brandPricing";

/**
 * The "I need to be here" moment.
 *
 * Sequence:
 *   0.0s  Backdrop dims, headline types in
 *   0.6s  Composite 1 (Luxury Wing storefront) fades up
 *   1.4s  Composite 2 (Rotunda activation) fades up
 *   2.2s  Composite 3 (Sea Life portal) fades up
 *   2.8s  Why-MOA copy types/fades in (3 paragraphs, staggered)
 *   3.8s  Pricing strip animates up
 *   4.4s  CTAs become available
 *
 * The viewer literally watches their own brand appear inside MOA. The
 * conversation that follows is no longer "should we do this" but "what's
 * the next step." That is the panel's "I need to be here" reaction.
 */
export default function BrandReveal({ brand, onClose, onProposal, onEdit }) {
  const [copy, setCopy] = useState(null);
  const [phase, setPhase] = useState(0);

  const pricing = calculatePricing({
    tier: brand.tier,
    footprint: brand.footprint,
    season: brand.season,
    placement: "concourse",
    activation: "retail",
  });

  // run the why-moa generator (returns immediately for free-tier)
  useEffect(() => {
    let alive = true;
    generateWhyMoa({ name: brand.name, tier: brand.tier }).then((c) => {
      if (alive) setCopy(c);
    });
    return () => {
      alive = false;
    };
  }, [brand.name, brand.tier]);

  // sequence the reveal phases
  useEffect(() => {
    const phases = [600, 800, 800, 600, 1000, 600];
    let total = 0;
    const timers = phases.map((delay, i) => {
      total += delay;
      return setTimeout(() => setPhase(i + 1), total);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[80] bg-ink-950 overflow-y-auto zone-scroll">
      {/* Atmosphere background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/ai/images/onboarding/role-gate-bg.png"
        className="fixed inset-0 w-full h-full object-cover opacity-25"
        src="/ai/video/zone-luxury.mp4"
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/85 via-black/85 to-black" />

      <div className="relative min-h-screen px-6 md:px-12 py-24 md:py-28">
        <div className="max-w-7xl mx-auto">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="kicker">Brand-In-Place · Composited Live</p>
            <h2 className="mt-3 font-display font-light tracking-display text-[clamp(2.4rem,6vw,5.4rem)] leading-[1.02]">
              <span className="italic text-gradient-gold">{brand.name}</span>
              <br />
              inside Mall of America.
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-ink-100/75 text-[14.5px] leading-relaxed">
              Three flagship moments — Luxury Wing · Rotunda · Sea Life. Mode
              context, footprint, season, adjacency. Walk back to your team
              with all of it.
            </p>
          </motion.div>

          {/* Three composites */}
          <div className="mt-14 md:mt-20 grid md:grid-cols-12 gap-6 items-stretch">
            {BRAND_TEMPLATES.map((tpl, i) => (
              <AnimatePresence key={tpl.id}>
                {phase > i && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`${
                      i === 0
                        ? "md:col-span-7"
                        : "md:col-span-5"
                    } ${i === 1 ? "md:col-start-1" : ""}`}
                  >
                    <BrandComposite
                      template={tpl}
                      brandName={brand.name}
                      logoUrl={brand.logoUrl}
                      size="hero"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Why-MOA copy */}
          <AnimatePresence>
            {phase >= 4 && copy && (
              <motion.section
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="mt-16 md:mt-24 grid md:grid-cols-12 gap-10"
              >
                <div className="md:col-span-4">
                  <p className="kicker">Why Mall of America fits</p>
                  <h3 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-tight">
                    {brand.name}
                  </h3>
                  <p className="mt-4 text-[11px] tracking-eyebrow text-ink-300">
                    {TIER_LABELS[brand.tier] || "Premium"}
                  </p>
                  <p className="mt-2 text-[11px] tracking-eyebrow text-ink-500">
                    {copy.voiceNote}
                  </p>
                </div>
                <div className="md:col-span-8 space-y-5 text-ink-100/85 leading-relaxed text-[15.5px] md:text-[16.5px]">
                  {[copy.p1, copy.p2, copy.p3].map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.15 * i }}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Pricing strip */}
          <AnimatePresence>
            {phase >= 5 && (
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-16 grid md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10"
              >
                <div className="bg-ink-950/85 backdrop-blur p-6 md:p-7">
                  <div className="text-[10px] tracking-eyebrow text-accent-gold">
                    YEAR 1 BALLPARK
                  </div>
                  <div className="mt-2 font-display text-3xl md:text-4xl text-gradient-gold">
                    {formatRange(pricing.range)}
                  </div>
                  <div className="mt-2 text-[11px] tracking-eyebrow text-ink-300">
                    {formatUSD(pricing.monthly)} / MO BASELINE
                  </div>
                </div>
                <Stat label="Footprint" value={`${brand.footprint.toLocaleString()} sq ft`} />
                <Stat label="Tier" value={TIER_LABELS[brand.tier]} />
                <Stat label="Target season" value={brand.season} />
              </motion.section>
            )}
          </AnimatePresence>

          {/* CTAs */}
          <AnimatePresence>
            {phase >= 6 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mt-12 flex flex-wrap items-center gap-3"
              >
                <button
                  onClick={onProposal}
                  className="px-6 py-3.5 bg-accent-gold text-ink-950 text-[11px] tracking-eyebrow font-medium hover:bg-[#f4d99a] transition flex items-center gap-2"
                >
                  GENERATE PROPOSAL PDF →
                </button>
                <button
                  onClick={onEdit}
                  className="px-5 py-3 border border-accent-gold/50 text-accent-gold text-[11px] tracking-eyebrow hover:bg-accent-gold/10 transition"
                >
                  EDIT INPUTS
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-3 border border-white/15 text-[11px] tracking-eyebrow text-ink-300 hover:text-accent-gold hover:border-accent-gold/40 transition"
                >
                  ← BACK TO MAP
                </button>
                <div className="ml-auto text-[10px] tracking-eyebrow text-ink-500 font-mono hidden md:block">
                  PROPOSAL EMAILED · HEATMAP ATTACHED
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-ink-950/85 backdrop-blur p-6 md:p-7">
      <div className="text-[10px] tracking-eyebrow text-ink-300">{label.toUpperCase()}</div>
      <div className="mt-2 font-display text-xl md:text-2xl text-ink-50 leading-tight">
        {value}
      </div>
    </div>
  );
}
