import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SubmoduleShell from "./SubmoduleShell";
import { SPONSORSHIP_TIERS } from "../../data/submodules";

export default function SponsorshipTiers() {
  const [active, setActive] = useState(SPONSORSHIP_TIERS[0].id);
  const tier = SPONSORSHIP_TIERS.find((t) => t.id === active);

  return (
    <SubmoduleShell
      kicker="Sponsorship · Tiered partnership"
      title={
        <>
          A ladder, not a price list.{" "}
          <span className="italic text-gradient-gold">Climb at your pace.</span>
        </>
      }
      intro="Four tiers — from week-long pop-ups to multi-year title naming. Each tier carries published renewal rates, real past partners, and a clear inclusion list. The investment band is honest; final terms come from a 30-minute conversation."
      backdrop="/ai/images/submodule/sponsorship-hero.jpg"
    >
      {/* Tier ladder header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10">
        {SPONSORSHIP_TIERS.map((t, i) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`text-left px-3 sm:px-5 py-4 sm:py-5 min-h-[44px] transition relative ${
                isActive
                  ? "bg-accent-gold text-ink-950"
                  : "bg-ink-950/85 text-ink-300 hover:text-accent-gold"
              }`}
            >
              <div className="text-[10px] tracking-eyebrow opacity-80">
                TIER 0{SPONSORSHIP_TIERS.length - i}
              </div>
              <div className="mt-1.5 sm:mt-2 font-display text-base sm:text-xl">{t.label}</div>
              <div className="mt-1 text-[9.5px] sm:text-[10.5px] tracking-eyebrow opacity-80">
                {t.investment}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active tier content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tier.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="mt-10 sm:mt-14 grid md:grid-cols-12 gap-8 md:gap-14"
        >
          {/* LEFT */}
          <div className="md:col-span-7">
            <div className="text-[10px] tracking-eyebrow text-accent-gold">
              {tier.label.toUpperCase()} TIER
            </div>
            <h3 className="mt-3 font-display text-[clamp(1.4rem,4vw,3.4rem)] leading-tight">
              {tier.description}
            </h3>

            {/* Investment + renewal band */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-[1px] bg-white/10 border border-white/10 max-w-2xl">
              <div className="bg-ink-950/85 p-4 sm:p-5">
                <div className="text-[10px] tracking-eyebrow text-ink-300">
                  INVESTMENT
                </div>
                <div className="mt-2 font-display text-xl sm:text-2xl text-gradient-gold">
                  {tier.investment}
                </div>
              </div>
              <div className="bg-ink-950/85 p-4 sm:p-5">
                <div className="text-[10px] tracking-eyebrow text-ink-300">
                  RENEWAL
                </div>
                <div className="mt-2 font-display text-sm sm:text-base text-ink-50 leading-snug">
                  {tier.renewal}
                </div>
              </div>
            </div>

            {/* Inclusions */}
            <div className="mt-8 sm:mt-12">
              <div className="text-[10px] tracking-eyebrow text-accent-gold mb-4 sm:mb-5">
                WHAT'S INCLUDED
              </div>
              <ul className="space-y-3 max-w-2xl">
                {tier.includes.map((line, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3 sm:gap-4 text-ink-100/85"
                  >
                    <span className="font-mono text-[10px] text-accent-gold w-5 shrink-0">
                      0{i + 1}
                    </span>
                    <span className="text-[14px] sm:text-[15px] leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Past examples */}
            <div className="mt-8 sm:mt-12">
              <div className="text-[10px] tracking-eyebrow text-accent-gold mb-3">
                PROOF · PAST PARTNERS
              </div>
              <div className="flex flex-wrap gap-2 max-w-2xl">
                {tier.examples.map((e) => (
                  <span
                    key={e}
                    className="px-3 py-2 text-[11px] tracking-wide border border-white/15 bg-black/40 text-ink-100/85"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — call-to-action card */}
          <div className="md:col-span-5">
            <div className="glass p-5 sm:p-7 md:sticky md:top-32">
              <div className="text-[10px] tracking-eyebrow text-accent-gold">
                NEXT STEP
              </div>
              <h4 className="mt-3 font-display text-xl sm:text-2xl leading-tight">
                {tier.cta}.
              </h4>
              <p className="mt-4 text-[13px] text-ink-100/75 leading-relaxed">
                Tell us your audience goal and we'll come back with a tier-fit recommendation, three sample integrations, and an investment range — within 5 business days.
              </p>
              <div className="mt-6 space-y-2">
                <a
                  href="mailto:partnerships@mallofamerica.com"
                  className="block w-full px-5 py-3 min-h-[44px] bg-accent-gold text-ink-950 text-[11px] tracking-eyebrow font-medium hover:bg-[#f4d99a] transition text-center"
                >
                  EMAIL PARTNERSHIPS →
                </a>
                <button className="w-full px-5 py-3 min-h-[44px] border border-accent-gold/50 text-accent-gold text-[11px] tracking-eyebrow hover:bg-accent-gold/10 transition">
                  REQUEST A CALL
                </button>
              </div>

              {/* Cross-sell to brand-in-place */}
              <div className="mt-7 pt-6 border-t border-white/10">
                <div className="text-[10px] tracking-eyebrow text-ink-300 mb-2">
                  PREFER TO SEE IT FIRST?
                </div>
                <div className="text-[12px] text-ink-100/70 leading-relaxed">
                  Drop your brand into the property. The Brand-In-Place tool renders three composites and a tailored proposal in under a minute.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </SubmoduleShell>
  );
}
