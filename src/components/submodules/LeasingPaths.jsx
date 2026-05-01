import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SubmoduleShell from "./SubmoduleShell";
import { LEASING_PATHS } from "../../data/submodules";

export default function LeasingPaths() {
  const [active, setActive] = useState(LEASING_PATHS[0].id);
  const path = LEASING_PATHS.find((p) => p.id === active);

  return (
    <SubmoduleShell
      kicker="Leasing Paths · Segmented routes"
      title={
        <>
          Four routes,{" "}
          <span className="italic text-gradient-gold">
            tailored to your category.
          </span>
        </>
      }
      intro="Choose the path that matches your brand. Each track shows the rate band, footprint range, current co-tenants, build-out support, and a 4-stage timeline to a signed lease."
      backdrop={path.image}
    >
      {/* Path tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10">
        {LEASING_PATHS.map((p) => {
          const isActive = p.id === active;
          return (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`text-left px-3 sm:px-5 py-4 sm:py-5 min-h-[44px] transition relative ${
                isActive
                  ? "bg-accent-gold text-ink-950"
                  : "bg-ink-950/85 text-ink-300 hover:text-accent-gold"
              }`}
            >
              <div className="text-[10px] tracking-eyebrow opacity-80">
                PATH 0{LEASING_PATHS.indexOf(p) + 1}
              </div>
              <div className="mt-1.5 sm:mt-2 font-display text-base sm:text-xl">{p.label}</div>
              <div className="mt-1 text-[10px] sm:text-[11px] tracking-eyebrow opacity-80">
                {p.rate.split("·")[0].trim()}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active path detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={path.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="mt-10 sm:mt-14 grid md:grid-cols-12 gap-8 md:gap-14 items-start"
        >
          {/* LEFT */}
          <div className="md:col-span-7">
            <div className="text-[10px] tracking-eyebrow text-accent-gold">
              {path.label.toUpperCase()} · THE PITCH
            </div>
            <p className="mt-4 text-ink-100/85 leading-relaxed text-[14px] sm:text-[16px] md:text-[17px] max-w-2xl">
              {path.pitch}
            </p>

            {/* Specs grid */}
            <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 gap-[1px] bg-white/10 border border-white/10 max-w-3xl">
              <Spec label="Rate band" value={path.rate} />
              <Spec label="Footprint" value={path.footprint} />
              <Spec label="Build-out" value={path.buildOut} />
              <Spec label="Lead time" value={path.leadTime} />
            </div>

            {/* Audience */}
            <div className="mt-8 max-w-2xl text-[13px] text-ink-100/70 leading-relaxed">
              <span className="text-accent-gold text-[10px] tracking-eyebrow mr-3">
                AUDIENCE
              </span>
              {path.audience}
            </div>

            {/* Timeline */}
            <div className="mt-8 sm:mt-12">
              <div className="text-[10px] tracking-eyebrow text-accent-gold mb-5">
                TIMELINE TO SIGNATURE
              </div>
              <ol className="relative space-y-5 pl-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/15 max-w-2xl">
                {path.timeline.map(([when, what], i) => (
                  <li key={i} className="relative">
                    <span
                      className={`absolute -left-7 top-1.5 w-3 h-3 rounded-full border-2 border-accent-gold ${
                        i === path.timeline.length - 1
                          ? "bg-accent-gold"
                          : "bg-transparent"
                      }`}
                    />
                    <div className="font-mono text-[10px] tracking-eyebrow text-accent-gold">
                      {when}
                    </div>
                    <div className="mt-1 text-ink-100 text-base leading-snug">
                      {what}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] hairline overflow-hidden">
              <img
                src={path.image}
                alt={path.label}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[10px] tracking-eyebrow text-accent-gold">
                  CURRENTLY ON THE CONCOURSE
                </div>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-ink-50">
                  {path.coTenants.map((b) => (
                    <span key={b} className="font-display text-base">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="glass p-5">
              <div className="text-[10px] tracking-eyebrow text-accent-gold">
                NEXT STEP
              </div>
              <div className="mt-2 font-display text-xl leading-tight">
                {path.cta}.
              </div>
              <div className="mt-3 text-[12px] text-ink-300 leading-relaxed">
                MOA Partnerships will reach out within 1 business day to schedule a 30-minute discovery call.
              </div>
              <div className="mt-5 flex gap-2">
                <a
                  href="mailto:partnerships@mallofamerica.com"
                  className="flex-1 px-4 py-3 min-h-[44px] bg-accent-gold text-ink-950 text-[10px] tracking-eyebrow font-medium hover:bg-[#f4d99a] transition text-center flex items-center justify-center"
                >
                  TALK TO LEASING →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </SubmoduleShell>
  );
}

function Spec({ label, value }) {
  return (
    <div className="bg-ink-950/85 backdrop-blur p-3 sm:p-4 md:p-5">
      <div className="text-[10px] tracking-eyebrow text-ink-300">
        {label.toUpperCase()}
      </div>
      <div className="mt-2 font-display text-sm sm:text-base md:text-lg text-ink-50 leading-tight">
        {value}
      </div>
    </div>
  );
}
