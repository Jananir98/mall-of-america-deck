import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useDeck } from "../../hooks/useDeck";
import { getZone } from "../../data/zones";

/**
 * Floating panel on the map. Three jobs:
 *   1. Show saved zones at a glance (with quick-jump)
 *   2. Copy a shareable link (URL is already state-syncing — this just
 *      surfaces it as a one-click action)
 *   3. Open the sales-rep dashboard (?rep=1)
 *
 * Collapses to a small toggle when not needed; expands on click.
 */
export default function MapSidebar() {
  const { savedZones, enterZone, brand, role, mode } = useDeck();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // auto-open the first time something gets saved
  useEffect(() => {
    if (savedZones.length === 1) setOpen(true);
  }, [savedZones.length]);

  function copyShare() {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function openRep() {
    const params = new URLSearchParams(window.location.search);
    params.set("rep", "1");
    window.location.search = params.toString();
  }

  return (
    <div className="fixed top-32 right-6 md:right-10 z-40 max-w-[280px]">
      {!open ? (
        <motion.button
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() => setOpen(true)}
          aria-label="Open session panel"
          className="ml-auto flex items-center gap-2 px-3 py-2 border border-white/15 bg-black/55 backdrop-blur-sm text-[10px] tracking-eyebrow text-ink-100 hover:text-accent-gold hover:border-accent-gold/40 transition"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse-soft" />
          SESSION
          {savedZones.length > 0 && (
            <span className="ml-1 text-accent-gold">★ {savedZones.length}</span>
          )}
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass p-5 w-[280px]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] tracking-eyebrow text-accent-gold">
                SESSION
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close session panel"
                className="text-ink-500 hover:text-accent-gold transition text-[12px]"
              >
                ✕
              </button>
            </div>

            {/* Identity */}
            <div className="text-[11px] tracking-eyebrow text-ink-300 mb-4 leading-relaxed">
              VIEWING AS · {role?.toUpperCase() ?? "—"}
              <br />
              MODE · {mode?.toUpperCase()}
              {brand?.name && (
                <>
                  <br />
                  BRAND · <span className="text-accent-gold">{brand.name.toUpperCase()}</span>
                </>
              )}
            </div>

            {/* Saved zones */}
            <div>
              <div className="text-[10px] tracking-eyebrow text-ink-300 mb-2">
                SAVED ZONES
              </div>
              {savedZones.length === 0 ? (
                <div className="text-[11px] text-ink-500 leading-relaxed">
                  Press ★ inside a zone to save it. Saved zones come with you on the share link.
                </div>
              ) : (
                <ul className="space-y-1">
                  {savedZones.map((id) => {
                    const z = getZone(id);
                    if (!z) return null;
                    return (
                      <li key={id}>
                        <button
                          onClick={() => enterZone(id)}
                          className="w-full text-left flex items-center gap-2 px-2 py-1.5 text-[11.5px] text-ink-100 hover:text-accent-gold hover:bg-accent-gold/5 transition"
                        >
                          <span className="text-accent-gold">★</span>
                          <span>{z.label}</span>
                          <span className="ml-auto text-[10px] tracking-eyebrow text-ink-500">
                            ↗
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Actions */}
            <div className="mt-5 pt-5 border-t border-white/10 space-y-2">
              <button
                onClick={copyShare}
                className="w-full px-3 py-2 border border-accent-gold/40 text-accent-gold text-[10px] tracking-eyebrow hover:bg-accent-gold/10 transition"
              >
                {copied ? "✓ COPIED" : "COPY SHARE LINK"}
              </button>
              <button
                onClick={openRep}
                className="w-full px-3 py-2 border border-white/15 text-ink-300 text-[10px] tracking-eyebrow hover:text-accent-gold hover:border-accent-gold/40 transition"
              >
                OPEN REP DASHBOARD
              </button>
            </div>

            <div className="mt-4 text-[9px] tracking-eyebrow text-ink-500 font-mono leading-relaxed">
              SHARE LINK PRELOADS YOUR ROLE, MODE, ZONE, AND BRAND. THE PROSPECT CAN HAND IT BACK TO ANYONE ON YOUR TEAM.
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
