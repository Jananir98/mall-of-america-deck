import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDeck } from "../../hooks/useDeck";

/**
 * The 90-second screen-share-ready guided tour.
 *
 * Press C anywhere → cinematic mode toggles on. ZoneAtmosphere drops in
 * letterbox bars; this controller plays the Clara VO track and auto-advances
 * through the property:
 *
 *   0:00 – 0:12   hero (map)         "5.6M square feet · 40M visitors..."
 *   0:12 – 0:30   retail             "520 stores · zero apparel tax..."
 *   0:30 – 0:50   nick               "7-acre indoor theme park..."
 *   0:50 – 1:10   rotunda            "32M built-in seats..."
 *   1:10 – 1:30   hotel              "Eight states arrive here..."
 *
 * Press C again, Esc, or click STOP to exit. Audio fades out cleanly. Works
 * on mute too — animation runs without VO if mute is set.
 */
const SCRIPT = [
  { at: 0, zone: null, label: "OPENING" },
  { at: 12, zone: "retail", label: "RETAIL" },
  { at: 30, zone: "nick", label: "ENTERTAINMENT" },
  { at: 50, zone: "rotunda", label: "EVENTS" },
  { at: 70, zone: "hotel", label: "ARRIVAL" },
  { at: 90, zone: null, label: "END" },
];
const TOTAL = 90;

export default function CinematicMode() {
  const { cinematic, toggleCinematic, enterZone, exitZone, muted } = useDeck();
  const audioRef = useRef(null);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);

  // Start / stop the VO playback when cinematic toggles
  useEffect(() => {
    if (!cinematic) {
      setRunning(false);
      setT(0);
      const a = audioRef.current;
      if (a) {
        a.pause();
        a.currentTime = 0;
      }
      return;
    }

    setRunning(true);
    const a = audioRef.current;
    if (a && !muted) {
      a.currentTime = 0;
      a.volume = 0.85;
      a.play().catch(() => {});
    }
  }, [cinematic, muted]);

  // Track playhead — drives both the progress bar and the zone auto-advance
  useEffect(() => {
    if (!running) return;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      setT(elapsed);
      if (elapsed >= TOTAL) {
        // tour complete
        toggleCinematic();
      }
    }, 100);
    return () => clearInterval(id);
  }, [running, toggleCinematic]);

  // Auto-advance zones based on script
  useEffect(() => {
    if (!running) return;
    // Find current scene
    const current = [...SCRIPT].reverse().find((s) => t >= s.at);
    if (!current) return;
    if (current.zone) enterZone(current.zone);
    else if (t < SCRIPT[1].at || t > SCRIPT[SCRIPT.length - 2].at) exitZone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Math.floor(t)]); // intentionally re-runs every second

  if (!cinematic) {
    return <audio ref={audioRef} src="/ai/vo/cinematic-mode.mp3" preload="auto" />;
  }

  const progress = Math.min(1, t / TOTAL);
  const currentScene = [...SCRIPT].reverse().find((s) => t >= s.at) ?? SCRIPT[0];

  return (
    <>
      <audio ref={audioRef} src="/ai/vo/cinematic-mode.mp3" preload="auto" />

      {/* Progress + chapter HUD */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-[60] pointer-events-none"
        >
          <div className="px-4 sm:px-6 md:px-10 pb-4 sm:pb-5 md:pb-7">
            {/* Chapters — labels only on tablet+, just the active label on mobile */}
            <div className="hidden sm:flex justify-between mb-3 text-[9px] tracking-eyebrow font-mono">
              {SCRIPT.slice(0, -1).map((s) => {
                const active = currentScene.label === s.label;
                return (
                  <span
                    key={s.at}
                    className={active ? "text-accent-gold" : "text-ink-500"}
                  >
                    {String(s.at).padStart(2, "0")} · {s.label}
                  </span>
                );
              })}
            </div>
            <div className="flex sm:hidden justify-between mb-3 text-[9px] tracking-eyebrow font-mono">
              <span className="text-accent-gold">
                CHAPTER · {currentScene.label}
              </span>
              <span className="text-ink-500">
                {Math.floor(t)}s / {TOTAL}s
              </span>
            </div>
            {/* Progress bar */}
            <div className="relative h-[2px] bg-white/15">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent-gold"
                style={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
              {SCRIPT.slice(0, -1).map((s) => (
                <span
                  key={s.at}
                  className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-gold/60"
                  style={{ left: `${(s.at / TOTAL) * 100}%` }}
                />
              ))}
            </div>

            {/* Stop button */}
            <div className="mt-4 flex items-center justify-between text-[10px] tracking-eyebrow font-mono">
              <span className="text-ink-300">
                CINEMATIC MODE · {Math.floor(t)}s / {TOTAL}s
              </span>
              <button
                onClick={toggleCinematic}
                className="pointer-events-auto px-4 py-2 min-h-[36px] border border-accent-gold/50 text-accent-gold bg-black/40 backdrop-blur-sm hover:bg-accent-gold/10 transition"
              >
                ◼ STOP TOUR
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
