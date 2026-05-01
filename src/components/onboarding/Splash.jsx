import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useDeck } from "../../hooks/useDeck";

/**
 * The first thing every prospect sees.
 *
 * 0–4s   Cinematic open: hero video plays full-bleed, headline stats animate in.
 * 4s+    Three role tiles fade in: "I am a Tenant / Sponsor / Event Producer"
 *        Picking one boots the deck into map view, primed with their lens.
 *
 * The five-second cold open is the brief's "immediate emotional buy-in within
 * the first 10 seconds" beat. The role gate is what makes the rest of the
 * deck feel like a sales tool, not a slide deck — every metric, headline, and
 * CTA downstream rewrites around their pick.
 */
export default function Splash() {
  const { setRole, reduced } = useDeck();
  const [phase, setPhase] = useState(0); // 0 = open · 1 = stats · 2 = roles

  useEffect(() => {
    if (reduced) {
      setPhase(2);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  return (
    <div className="fixed inset-0 z-[1000] bg-ink-950 overflow-hidden">
      {/* Hero video — the cinematic open */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        // @ts-ignore — fetchpriority is valid HTML, not yet in React types
        fetchpriority="high"
        poster="/ai/images/onboarding/role-gate-bg.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        src="/ai/video/hero-open.mp4"
      />

      {/* Cinematic gradient + radial vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.65)_85%)]" />

      {/* Top corner marks */}
      <div className="absolute top-5 md:top-9 left-0 right-0 px-5 md:px-12 flex justify-between text-[9px] md:text-[10px] tracking-eyebrow text-ink-100/70 font-mono">
        <span>BLOOMINGTON · MINNESOTA</span>
        <span className="hidden sm:inline">EST. 1992 · TRIPLE FIVE GROUP</span>
      </div>

      {/* Centerpiece */}
      <div className="relative h-full w-full flex flex-col items-center justify-center px-5 sm:px-7 md:px-12">
        <AnimatePresence mode="wait">
          {phase < 2 ? (
            <motion.div
              key="headline"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center max-w-5xl"
            >
              <p className="kicker mb-5">The Partnership Deck · 2026</p>
              <h1 className="font-display font-light tracking-display text-[clamp(2rem,8vw,8rem)] leading-[0.95]">
                A city
                <br />
                <span className="italic text-gradient-gold">under one roof.</span>
              </h1>

              {/* Stat rail — appears at phase 1 */}
              <AnimatePresence>
                {phase >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                    className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 max-w-3xl mx-auto"
                  >
                    {[
                      ["32M+", "Annual Visitors"],
                      ["520+", "Stores & Anchors"],
                      ["50", "Restaurants"],
                      ["5.6M", "Sq Ft of Stage"],
                    ].map(([n, l]) => (
                      <div key={l} className="bg-ink-950/80 backdrop-blur px-3 sm:px-4 py-4 sm:py-5">
                        <div className="font-display text-xl sm:text-2xl md:text-3xl text-gradient-gold">
                          {n}
                        </div>
                        <div className="mt-1 text-[9px] sm:text-[10px] tracking-eyebrow text-ink-300">
                          {l}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <RoleGate onPick={setRole} />
          )}
        </AnimatePresence>
      </div>

      {/* Footer mark */}
      <div className="absolute bottom-4 md:bottom-6 left-0 right-0 px-5 md:px-12 flex justify-between items-center text-[9px] md:text-[10px] tracking-eyebrow text-ink-300 font-mono safe-bot safe-x">
        <span>© 2026 MOA</span>
        <span className="hidden sm:inline">PRESS ANY ROLE TO ENTER</span>
        <span className="hidden xs:inline">THE PARTNERSHIP DECK</span>
      </div>
    </div>
  );
}

function RoleGate({ onPick }) {
  const tiles = [
    {
      id: "tenant",
      title: "Tenant",
      sub: "Lease retail, dining, or pop-up footprint",
      hint: "I'm evaluating a presence.",
    },
    {
      id: "sponsor",
      title: "Sponsor",
      sub: "Activate, name, or integrate a brand",
      hint: "I want audience.",
    },
    {
      id: "event",
      title: "Event Producer",
      sub: "Stage launches, concerts, broadcasts",
      hint: "I need a venue.",
    },
  ];

  return (
    <motion.div
      key="rolegate"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-6xl text-center"
    >
      <p className="kicker">Choose your lens · the deck rewrites itself</p>
      <h2 className="mt-4 font-display font-light tracking-display text-[clamp(1.6rem,5vw,4rem)] leading-[1.05]">
        Why are you{" "}
        <span className="italic text-gradient-gold">considering Mall of America?</span>
      </h2>

      <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-white/10 border border-white/10">
        {tiles.map((t, i) => (
          <motion.button
            key={t.id}
            onClick={() => onPick(t.id)}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.08 }}
            whileHover={{ y: -3 }}
            className="group relative bg-ink-950/85 backdrop-blur px-5 sm:px-6 md:px-7 py-7 sm:py-9 md:py-10 text-left overflow-hidden border-0 min-h-[44px]"
          >
            <div className="text-[10px] tracking-eyebrow text-accent-gold/70 mb-3">
              0{i + 1}
            </div>
            <div className="font-display text-2xl sm:text-3xl md:text-4xl">{t.title}</div>
            <div className="mt-3 text-ink-100/70 text-[14px] md:text-[15px] leading-relaxed">{t.sub}</div>
            <div className="mt-6 md:mt-8 text-[11px] tracking-eyebrow text-ink-300 group-hover:text-accent-gold transition">
              {t.hint} <span className="ml-1">→</span>
            </div>
            {/* hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(217,178,111,0.10),transparent_60%)]" />
          </motion.button>
        ))}
      </div>

      <p className="mt-10 text-[11px] tracking-eyebrow text-ink-500 font-mono">
        ESC TO RESET · MODE IS SWITCHABLE LATER
      </p>
    </motion.div>
  );
}
