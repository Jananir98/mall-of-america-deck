import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TICKER_STATS, currentHappening } from "../../data/liveOps";
import { getZone } from "../../data/zones";

/**
 * Always-on operations strip. Reads as if the property is live.
 * Energy is content — even simulated motion separates this deck from a slide.
 */
export default function LiveOpsTicker() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const happening = currentHappening();
  const zone = getZone(happening.zone);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
      <div className="px-6 md:px-10 py-3 flex items-center gap-6 text-[10px] tracking-eyebrow font-mono border-t border-white/10 bg-black/55 backdrop-blur-sm">
        {/* Live indicator */}
        <div className="flex items-center gap-2 text-accent-gold shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse-soft" />
          LIVE · MOA OPS
        </div>

        {/* Right-now happening */}
        <AnimatePresence mode="wait">
          <motion.div
            key={happening.line + tick}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="text-ink-100/80 truncate flex items-center gap-2 min-w-0"
          >
            <span
              className="px-1.5 py-0.5 text-[9px] rounded-sm shrink-0"
              style={{
                background: `${zone?.palette.tint}22`,
                color: zone?.palette.tint,
              }}
            >
              {zone?.label.toUpperCase()}
            </span>
            <span className="truncate">{happening.line}</span>
          </motion.div>
        </AnimatePresence>

        {/* Right-aligned stats */}
        <div className="ml-auto hidden md:flex items-center gap-6 shrink-0">
          {TICKER_STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-ink-500">{s.label}</span>
              <span className="text-accent-gold">{s.get()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
