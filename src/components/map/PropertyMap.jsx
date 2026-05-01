import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useDeck } from "../../hooks/useDeck";
import LiveOpsTicker from "./LiveOpsTicker";
import MapSidebar from "./MapSidebar";

/**
 * The map-hub. Replaces the v1 linear scroll.
 *
 * On the master map illustration, seven zone nodes are positioned by % coords.
 * Hover surfaces a label + the mode-relevant headline metric. Click flies the
 * camera into that zone.
 *
 * Constellation: faint gold dotted polyline traces the recommended path for
 * the active mode — the prospect always sees a guided sequence even though
 * any node is one click away.
 *
 * Visited zones get a filled gold dot. The recommended-next pulses. Saved
 * zones get a star badge. The whole map breathes with subtle parallax.
 */
export default function PropertyMap() {
  const {
    zones,
    enterZone,
    activeMode,
    recommendedNext,
    savedZones,
    history,
  } = useDeck();
  const [hovered, setHovered] = useState(null);

  // visited zones from history
  const visited = useMemo(
    () => new Set(history.filter((h) => h.type === "enterZone").map((h) => h.payload)),
    [history]
  );

  // recommended path coords for the constellation polyline
  const pathCoords = useMemo(() => {
    return activeMode.recommendedPath
      .map((id) => zones.find((z) => z.id === id))
      .filter(Boolean);
  }, [activeMode.recommendedPath, zones]);

  return (
    <div className="fixed inset-0 z-10 overflow-hidden bg-ink-950">
      {/* Map illustration with subtle parallax breath */}
      <motion.img
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        src="/ai/images/map/master.png"
        alt="Mall of America — property map"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = "/ai/images/why-property-aerial.jpg";
        }}
      />

      {/* Vignette + cartography grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.85)_95%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(217,178,111,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(217,178,111,0.04)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      {/* Constellation — recommended path polyline */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.polyline
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 2.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          points={pathCoords.map((z) => `${z.map.x},${z.map.y}`).join(" ")}
          fill="none"
          stroke="#d9b26f"
          strokeWidth="0.18"
          strokeDasharray="0.6 0.6"
          vectorEffect="non-scaling-stroke"
          style={{ strokeWidth: "1.2px" }}
        />
      </svg>

      {/* Compass + scale — bottom-left, doesn't fight the sidebar */}
      <div className="absolute bottom-32 left-8 md:left-12 hidden md:flex flex-col items-start gap-3 text-[10px] tracking-eyebrow text-ink-300 font-mono pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="block w-[1px] h-6 bg-accent-gold/40" />
          <span className="text-accent-gold">N</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="block w-12 h-[1px] bg-ink-300/60" />
          <span>1,000 FT</span>
        </div>
        <div className="mt-1 text-ink-500 text-[9px]">
          {activeMode.recommendedPath.length} ZONES · {activeMode.label.toUpperCase()} PATH
        </div>
      </div>

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-24 sm:top-28 md:top-32 left-4 sm:left-8 md:left-12 right-4 sm:right-auto max-w-md pointer-events-none"
      >
        <p className="kicker">The Property · 129 acres · 4 floors</p>
        <h2 className="mt-3 font-display font-light tracking-display text-[clamp(1.5rem,4vw,3.4rem)] leading-[1.05]">
          Choose your zone.<br />
          <span className="italic text-gradient-gold">Drive your own journey.</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-ink-100/70 text-[13px] sm:text-sm leading-relaxed max-w-sm">
          Seven zones. One destination. Click any node — the deck atmosphere
          and metrics rewrite around your viewing lens (
          <span className="text-accent-gold">{activeMode.label.toUpperCase()}</span>
          ).
        </p>
        {visited.size > 0 && (
          <div className="mt-5 flex items-center gap-2 text-[10px] tracking-eyebrow text-ink-300">
            <span className="text-accent-gold">●</span>
            {visited.size} OF {zones.length} ZONES VISITED
          </div>
        )}
      </motion.div>

      {/* Zone nodes */}
      <div className="absolute inset-0">
        {zones.map((z, i) => {
          const recommended = z.id === recommendedNext;
          const saved = savedZones.includes(z.id);
          const wasVisited = visited.has(z.id);
          return (
            <motion.button
              key={z.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.7 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => enterZone(z.id)}
              onMouseEnter={() => setHovered(z.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ left: `${z.map.x}%`, top: `${z.map.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
              aria-label={`Enter ${z.label}`}
            >
              {/* Recommended pulse — outer */}
              {recommended && (
                <span className="absolute -inset-3 rounded-full bg-accent-gold/25 animate-ping pointer-events-none" />
              )}

              {/* Visited halo — soft ring */}
              {wasVisited && !recommended && (
                <span className="absolute -inset-2 rounded-full border border-accent-gold/30 pointer-events-none" />
              )}

              {/* Etched ring on hover */}
              <span className="absolute -inset-2.5 rounded-full border border-transparent group-hover:border-accent-gold/50 transition-all pointer-events-none" />

              {/* Node */}
              <span
                className={`relative block w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  recommended
                    ? "border-accent-gold bg-accent-gold shadow-[0_0_22px_rgba(217,178,111,0.85)]"
                    : wasVisited
                    ? "border-accent-gold/70 bg-accent-gold/40 shadow-[0_0_10px_rgba(217,178,111,0.4)]"
                    : "border-accent-gold/70 bg-ink-950 group-hover:bg-accent-gold group-hover:scale-125 group-hover:shadow-[0_0_18px_rgba(217,178,111,0.7)]"
                }`}
                style={{ background: recommended ? z.palette.tint : undefined }}
              />

              {/* Saved star */}
              {saved && (
                <span className="absolute -top-1.5 -right-1.5 z-10 w-3 h-3 rounded-full bg-accent-gold shadow-[0_0_10px_rgba(217,178,111,0.85)] flex items-center justify-center">
                  <span className="text-[7px] text-ink-950">★</span>
                </span>
              )}

              {/* Always-visible micro-label — desktop only, hidden on mobile to avoid overlap */}
              <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap pointer-events-none">
                <span className="font-mono text-[9px] tracking-eyebrow text-ink-100/70 group-hover:text-accent-gold transition">
                  {z.label.toUpperCase()}
                </span>
              </div>

              {/* Hover tooltip */}
              <AnimatePresence>
                {hovered === z.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, x: 6 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none z-20"
                  >
                    <div className="glass px-4 py-3 min-w-[220px] sm:min-w-[260px] max-w-[min(320px,calc(100vw-32px))]">
                      <div
                        className="text-[9px] tracking-eyebrow"
                        style={{ color: z.palette.tint }}
                      >
                        ZONE 0{z.order} · {z.kicker.toUpperCase()}
                      </div>
                      <div className="mt-1 font-display text-lg leading-tight whitespace-normal">
                        {z.label}
                      </div>
                      <div className="mt-2 text-[11px] text-ink-100/70 whitespace-normal leading-snug">
                        {z.headline}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5 text-[9px] tracking-eyebrow">
                        {recommended && (
                          <span className="text-accent-gold">★ RECOMMENDED</span>
                        )}
                        {wasVisited && !recommended && (
                          <span className="text-ink-300">VISITED</span>
                        )}
                        {saved && (
                          <span className="text-accent-gold">SAVED</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom hint — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="hidden md:flex absolute bottom-20 left-0 right-0 justify-center pointer-events-none"
      >
        <div className="text-[10px] tracking-eyebrow text-ink-300 font-mono flex items-center gap-3">
          <span>HOVER · CLICK · ESC</span>
          <span className="w-6 h-[1px] bg-accent-gold/50" />
          <span>FOLLOW THE GOLD PATH</span>
          <span className="w-6 h-[1px] bg-accent-gold/50" />
          <span>OR CHOOSE YOUR OWN</span>
        </div>
      </motion.div>

      {/* Mobile-only zone chip strip — taps replace hover-tooltips on phones */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.4 }}
        className="md:hidden absolute bottom-14 left-0 right-0 px-4 overflow-x-auto zone-scroll pointer-events-auto"
      >
        <div className="flex gap-2 pb-2 min-w-max">
          {zones.map((z) => {
            const recommended = z.id === recommendedNext;
            const wasVisited = visited.has(z.id);
            return (
              <button
                key={z.id}
                onClick={() => enterZone(z.id)}
                className={`shrink-0 px-4 py-2.5 text-[10px] tracking-eyebrow border whitespace-nowrap transition ${
                  recommended
                    ? "border-accent-gold bg-accent-gold/15 text-accent-gold"
                    : wasVisited
                    ? "border-accent-gold/30 bg-black/55 text-ink-100"
                    : "border-white/15 bg-black/55 text-ink-300"
                }`}
              >
                {recommended && <span className="mr-1.5">★</span>}
                {wasVisited && !recommended && <span className="mr-1.5 text-accent-gold/60">●</span>}
                {z.label.toUpperCase()}
              </button>
            );
          })}
        </div>
      </motion.div>

      <MapSidebar />
      <LiveOpsTicker />
    </div>
  );
}
