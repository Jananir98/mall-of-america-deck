import { motion } from "framer-motion";
import { useDeck } from "../../hooks/useDeck";

/**
 * Tenant ▾  Sponsor  Event Producer
 *
 * Switching mode reskins overlays, recommended path, and CTAs across every
 * zone — without changing any zone content. The "is this a sales tool?"
 * proof point lives here.
 */
export default function ModeSwitcher() {
  const { modes, mode, setMode } = useDeck();

  return (
    <div
      role="radiogroup"
      aria-label="Switch viewing mode"
      className="flex items-center gap-[1px] border border-white/15 bg-black/45 backdrop-blur-sm p-[1px] rounded-sm"
    >
      {modes.map((m) => {
        const active = mode === m.id;
        return (
          <button
            key={m.id}
            role="radio"
            aria-checked={active}
            onClick={() => setMode(m.id)}
            className={`relative px-3 md:px-4 py-2.5 md:py-2 min-h-[36px] text-[9px] sm:text-[10px] tracking-eyebrow transition ${
              active
                ? "text-ink-950"
                : "text-ink-100/70 hover:text-accent-gold"
            }`}
          >
            {active && (
              <motion.span
                layoutId="mode-pill"
                className="absolute inset-0 bg-accent-gold rounded-[2px]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <span aria-hidden>{m.icon}</span>
              {m.label.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
