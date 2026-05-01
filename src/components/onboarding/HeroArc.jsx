import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDeck } from "../../hooks/useDeck";

/**
 * The 15-second emotional arc.
 *
 * Auto-plays once after the role gate dismisses. The brief asked for
 * "an emotional arc that pulls the prospect through scale, energy, and
 * opportunity." Cinematic Mode is 90s and optional — most prospects will
 * miss it. The Hero Arc is unmissable: 15 seconds, three scenes, then
 * lands the viewer on the map with the sales hook already planted.
 *
 *   0–5s   SCALE       hero open · "5.6 million square feet · 40 million visitors"
 *   5–10s  ENERGY      Rotunda concert · "32 million seats · built for the show"
 *   10–15s OPPORTUNITY luxury wing storefront with "your brand" composited
 *                      "Now imagine your brand here." (the Brand-In-Place hook)
 *
 * Skippable any time via SKIP button or click. Marks heroArcSeen=true so
 * subsequent visits go straight to the map. Music plays since role-gate
 * click counts as user interaction (autoplay policy is satisfied).
 */
const SCENES = [
  {
    label: "SCALE",
    eyebrow: "5.6 MILLION SQUARE FEET",
    title: "A city",
    accent: "under one roof.",
    sub: "40 million visitors a year. The largest in the Western Hemisphere.",
    video: "/ai/video/hero-open.mp4",
    fallback: "/ai/video/hero-loop.mp4",
    poster: "/ai/images/onboarding/role-gate-bg.png",
    duration: 5000,
  },
  {
    label: "ENERGY",
    eyebrow: "32 MILLION BUILT-IN SEATS",
    title: "Where",
    accent: "the show happens.",
    sub: "Concerts. Activations. Broadcasts. A permanent stage in the geographic centre of the country.",
    video: "/ai/video/zone-rotunda.mp4",
    fallback: "/ai/video/events-loop.mp4",
    poster: "/ai/images/submodule/events-hero.jpg",
    duration: 5000,
  },
  {
    label: "OPPORTUNITY",
    eyebrow: "FROM THE PROPERTY · TO THE PROSPECT",
    title: "Now imagine",
    accent: "your brand here.",
    sub: "One conversation away from a flagship, an activation, or a venue booking.",
    video: null, // still — luxury wing template
    poster: "/ai/images/brand-in-place/luxury-wing-empty.jpg",
    duration: 5000,
    showBrandHint: true,
  },
];

const TOTAL = SCENES.reduce((a, s) => a + s.duration, 0);

export default function HeroArc() {
  const { markHeroArcSeen, reduced, muted } = useDeck();
  const [t, setT] = useState(0);
  const [done, setDone] = useState(false);
  const audioRef = useRef(null);
  const startedAt = useRef(Date.now());

  // Reduced-motion skip
  useEffect(() => {
    if (reduced) {
      finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Music — try to play (role-gate click counts as user gesture)
  useEffect(() => {
    const a = audioRef.current;
    if (!a || muted || reduced) return;
    a.volume = 0;
    a.play().catch(() => {});
    // ramp volume in
    const ramp = setInterval(() => {
      if (!a) return;
      a.volume = Math.min(0.7, a.volume + 0.05);
      if (a.volume >= 0.7) clearInterval(ramp);
    }, 80);
    return () => {
      clearInterval(ramp);
      // ramp out before unmount
      const fade = setInterval(() => {
        if (!a) {
          clearInterval(fade);
          return;
        }
        a.volume = Math.max(0, a.volume - 0.07);
        if (a.volume <= 0) {
          a.pause();
          clearInterval(fade);
        }
      }, 60);
    };
  }, [muted, reduced]);

  // Tick
  useEffect(() => {
    startedAt.current = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - startedAt.current;
      setT(elapsed);
      if (elapsed >= TOTAL) {
        finish();
        clearInterval(id);
      }
    }, 80);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    if (done) return;
    setDone(true);
    setTimeout(() => markHeroArcSeen(), 200);
  }

  // Determine current scene
  let acc = 0;
  let sceneIdx = 0;
  let sceneT = t;
  for (let i = 0; i < SCENES.length; i++) {
    if (t < acc + SCENES[i].duration) {
      sceneIdx = i;
      sceneT = t - acc;
      break;
    }
    acc += SCENES[i].duration;
    sceneIdx = i;
    sceneT = SCENES[i].duration;
  }
  const scene = SCENES[sceneIdx];
  const sceneProgress = Math.min(1, sceneT / scene.duration);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[2000] bg-ink-950 overflow-hidden"
          onClick={(e) => {
            // click-anywhere skip, but ignore the SKIP button itself (handled via stopPropagation)
            finish();
          }}
        >
          <audio ref={audioRef} src="/ai/audio/theme.mp3" preload="auto" />

          {/* Crossfading scene media */}
          <AnimatePresence mode="wait">
            <motion.div
              key={sceneIdx}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {scene.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={scene.poster}
                  src={scene.video}
                  onError={(e) => {
                    if (scene.fallback) e.currentTarget.src = scene.fallback;
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={scene.poster}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              {/* For Scene 3 (opportunity), composite the prospect's "brand" — generic wordmark */}
              {scene.showBrandHint && (
                <BrandStencil progress={sceneProgress} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Cinematic letterbox bars */}
          <div className="absolute top-0 left-0 right-0 h-[5vh] md:h-[8vh] bg-black z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-[5vh] md:h-[8vh] bg-black z-20" />

          {/* Atmospheric wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/85 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_85%)] pointer-events-none" />

          {/* Headline — centered, fades per scene */}
          <div className="relative z-10 h-full flex items-center justify-center px-5 sm:px-7 md:px-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${sceneIdx}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-5xl"
              >
                <p
                  className="text-[10px] md:text-[11px] tracking-eyebrow font-mono mb-6"
                  style={{ color: "#d9b26f" }}
                >
                  {String(sceneIdx + 1).padStart(2, "0")} · {scene.label} —{" "}
                  {scene.eyebrow}
                </p>
                <h1 className="font-display font-light tracking-display text-[clamp(1.8rem,9vw,9rem)] leading-[0.95]">
                  {scene.title}
                  <br />
                  <span className="italic text-gradient-gold">{scene.accent}</span>
                </h1>
                <p className="mt-5 md:mt-7 max-w-xl mx-auto text-ink-100/80 text-[13px] sm:text-[15px] md:text-[17px] leading-relaxed">
                  {scene.sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Top-right SKIP + scene chips */}
          <div className="absolute top-8 sm:top-12 right-4 sm:right-7 md:right-12 z-30 flex items-center gap-3 pointer-events-auto">
            <div className="hidden sm:flex items-center gap-2 text-[9px] tracking-eyebrow font-mono">
              {SCENES.map((s, i) => (
                <span
                  key={s.label}
                  className={
                    i === sceneIdx
                      ? "text-accent-gold"
                      : i < sceneIdx
                      ? "text-ink-300"
                      : "text-ink-500"
                  }
                >
                  {s.label}
                </span>
              )).reduce((acc, el, i) => {
                if (i === 0) return [el];
                return [...acc, <span key={`sep-${i}`} className="text-ink-700">·</span>, el];
              }, [])}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                finish();
              }}
              className="px-4 py-2.5 min-h-[40px] border border-white/20 bg-black/55 backdrop-blur-sm text-[10px] tracking-eyebrow text-ink-100 hover:text-accent-gold hover:border-accent-gold/40 transition"
            >
              SKIP →
            </button>
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-8 sm:bottom-12 left-4 sm:left-7 md:left-12 right-4 sm:right-7 md:right-12 z-30">
            <div className="relative h-[2px] bg-white/15">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent-gold"
                style={{ width: `${(t / TOTAL) * 100}%` }}
              />
              {SCENES.slice(0, -1).map((_, i) => (
                <span
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent-gold/60"
                  style={{
                    left: `${
                      (SCENES.slice(0, i + 1).reduce((a, s) => a + s.duration, 0) /
                        TOTAL) *
                      100
                    }%`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Decorative wordmark composited onto the empty signage panel of the
 * Luxury Wing template — the visual hook for Brand-In-Place. We don't
 * know the prospect's brand yet (they haven't generated), so we use
 * "YOUR BRAND" as a teaser that rewards a curious click on the CTA.
 */
function BrandStencil({ progress }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: progress > 0.2 ? 1 : 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute z-[5] flex items-center justify-center"
      style={{
        // matches BRAND_TEMPLATES[0] luxury-wing box
        left: "36%",
        top: "22%",
        width: "28%",
        height: "9%",
        mixBlendMode: "screen",
      }}
    >
      <div
        className="font-display tracking-display text-center text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] whitespace-nowrap"
        style={{
          fontSize: "clamp(0.85rem, 2.4vw, 1.8rem)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        YOUR BRAND
      </div>
    </motion.div>
  );
}
