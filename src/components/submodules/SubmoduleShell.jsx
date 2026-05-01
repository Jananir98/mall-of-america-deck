import { motion } from "framer-motion";
import { useDeck } from "../../hooks/useDeck";

/**
 * Shared shell for the four sub-modules. Atmosphere backdrop, top kicker,
 * close button, and a child slot for the module's own content. Keeps every
 * sub-module visually consistent without duplicating chrome.
 */
export default function SubmoduleShell({
  kicker,
  title,
  intro,
  backdrop = "/ai/images/submodule/events-hero.jpg",
  children,
}) {
  const { closeSubmodule, openBrand } = useDeck();

  return (
    <div className="fixed inset-0 z-[70] bg-ink-950 overflow-y-auto zone-scroll">
      {/* Backdrop atmosphere */}
      <img
        src={backdrop}
        alt=""
        loading="lazy"
        decoding="async"
        className="fixed inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/85 via-black/85 to-black" />

      <div className="relative px-4 sm:px-6 md:px-12 py-20 sm:py-24 md:py-28 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-end justify-between gap-4 sm:gap-6"
          >
            <div className="max-w-3xl">
              <p className="kicker">{kicker}</p>
              <h2 className="mt-3 font-display font-light tracking-display text-[clamp(1.7rem,5.5vw,5rem)] leading-[1.02]">
                {title}
              </h2>
              {intro && (
                <p className="mt-4 sm:mt-5 max-w-2xl text-ink-100/80 text-[14px] sm:text-[15.5px] md:text-[16.5px] leading-relaxed">
                  {intro}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={openBrand}
                className="px-3 sm:px-4 py-2.5 min-h-[40px] border border-accent-gold/50 text-accent-gold text-[10px] tracking-eyebrow hover:bg-accent-gold/10 transition"
              >
                SEE YOUR BRAND HERE ↗
              </button>
              <button
                onClick={closeSubmodule}
                className="px-3 sm:px-4 py-2.5 min-h-[40px] border border-white/15 text-[10px] tracking-eyebrow text-ink-300 hover:text-accent-gold hover:border-accent-gold/40 transition"
              >
                ← BACK TO ZONE
              </button>
            </div>
          </motion.header>

          {/* Child content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-10 sm:mt-14 md:mt-20"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
