import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SubmoduleShell from "./SubmoduleShell";
import { VENUES } from "../../data/submodules";

export default function VenueSpecs() {
  const [active, setActive] = useState(VENUES[0].id);
  const v = VENUES.find((x) => x.id === active);

  return (
    <SubmoduleShell
      kicker="Venue Specs · Three rooms"
      title={
        <>
          Pick the room.{" "}
          <span className="italic text-gradient-gold">We'll match the format.</span>
        </>
      }
      intro="Three venues with full technical specs — capacity by configuration, power, load-in, A/V, catering, lead time. The pages below are what your production lead would normally request as a PDF; we publish them upfront."
      backdrop={v.image}
    >
      {/* Venue tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10">
        {VENUES.map((venue) => {
          const isActive = venue.id === active;
          return (
            <button
              key={venue.id}
              onClick={() => setActive(venue.id)}
              className={`text-left px-4 sm:px-5 py-4 sm:py-5 min-h-[44px] transition ${
                isActive
                  ? "bg-accent-gold text-ink-950"
                  : "bg-ink-950/85 text-ink-300 hover:text-accent-gold"
              }`}
            >
              <div className="text-[10px] tracking-eyebrow opacity-80">
                VENUE 0{VENUES.indexOf(venue) + 1}
              </div>
              <div className="mt-1.5 sm:mt-2 font-display text-base sm:text-xl">{venue.label}</div>
              <div className="mt-1 text-[10px] sm:text-[10.5px] tracking-eyebrow opacity-80">
                {venue.kind}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active venue */}
      <AnimatePresence mode="wait">
        <motion.div
          key={v.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-12 grid md:grid-cols-12 gap-8 md:gap-14"
        >
          {/* LEFT — image + capacity headline */}
          <div className="md:col-span-7">
            <div className="relative aspect-[16/10] hairline overflow-hidden">
              <img
                src={v.image}
                alt={v.label}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <div className="text-[10px] tracking-eyebrow text-accent-gold">
                  {v.label.toUpperCase()}
                </div>
                <div className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl leading-tight">
                  {v.kind}
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-[1px] bg-white/10 border border-white/10">
              {Object.entries(v.capacity).map(([k, val]) => (
                <div key={k} className="bg-ink-950/85 backdrop-blur p-3 sm:p-5">
                  <div className="text-[9px] sm:text-[10px] tracking-eyebrow text-ink-300">
                    {k.toUpperCase()}
                  </div>
                  <div className="mt-2 font-display text-lg sm:text-2xl md:text-3xl text-gradient-gold">
                    {val}
                  </div>
                </div>
              ))}
            </div>

            {/* Specs */}
            <div className="mt-10">
              <div className="text-[10px] tracking-eyebrow text-accent-gold mb-4">
                TECHNICAL SPECIFICATION
              </div>
              <table className="w-full border-collapse">
                <tbody>
                  {v.specs.map(([k, val]) => (
                    <tr key={k} className="border-b border-white/8">
                      <td className="py-3 pr-3 text-[10px] sm:text-[12px] tracking-eyebrow text-ink-300 uppercase w-28 sm:w-40 align-top">
                        {k}
                      </td>
                      <td className="py-3 font-display text-[13px] sm:text-[16px] text-ink-50">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT — notable + booking */}
          <div className="md:col-span-5 space-y-6">
            <div className="glass p-6">
              <div className="text-[10px] tracking-eyebrow text-accent-gold">
                NOTABLE EVENTS
              </div>
              <ul className="mt-4 space-y-3">
                {v.notable.map((n, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3 text-[14px] text-ink-100/85"
                  >
                    <span className="font-mono text-[10px] text-accent-gold/80 w-5">
                      0{i + 1}
                    </span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass p-6">
              <div className="text-[10px] tracking-eyebrow text-accent-gold">
                LEAD TIME
              </div>
              <div className="mt-2 font-display text-lg leading-snug">
                {v.leadTime}
              </div>
            </div>

            <div className="glass p-5 sm:p-6 md:sticky md:top-32">
              <div className="text-[10px] tracking-eyebrow text-accent-gold">
                NEXT STEP
              </div>
              <h4 className="mt-2 font-display text-xl leading-tight">
                Tour the room.
              </h4>
              <p className="mt-3 text-[12.5px] text-ink-100/75 leading-relaxed">
                30-minute walkthrough with an MOA Events lead. Bring your production team — we'll have CAD floorplans, sightline studies, and a sample run sheet ready.
              </p>
              <div className="mt-5 space-y-2">
                <a
                  href="mailto:events@mallofamerica.com"
                  className="block w-full px-5 py-3 min-h-[44px] bg-accent-gold text-ink-950 text-[11px] tracking-eyebrow font-medium hover:bg-[#f4d99a] transition text-center"
                >
                  REQUEST WALKTHROUGH →
                </a>
                <button className="w-full px-5 py-3 min-h-[44px] border border-accent-gold/50 text-accent-gold text-[11px] tracking-eyebrow hover:bg-accent-gold/10 transition">
                  DOWNLOAD CAD PACK
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </SubmoduleShell>
  );
}
