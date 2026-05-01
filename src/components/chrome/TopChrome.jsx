import { useDeck } from "../../hooks/useDeck";
import ModeSwitcher from "./ModeSwitcher";

/**
 * Always-on top bar. Three jobs:
 *   1. brand mark (click to return to map)
 *   2. mode switcher (Tenant / Sponsor / Event Producer) — the feature that
 *      proves this is a sales tool, not a deck
 *   3. utility cluster (mute, cinematic mode, brand-in-place CTA)
 *
 * Hidden during the splash so the cinematic open is unobstructed.
 */
export default function TopChrome() {
  const {
    view,
    role,
    activeZone,
    activeMode,
    exitZone,
    openBrand,
    toggleMute,
    toggleCinematic,
    muted,
    cinematic,
    reset,
  } = useDeck();

  if (view === "splash") return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] pointer-events-none transition-opacity duration-500 safe-top safe-x ${
        cinematic ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-start justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-5 gap-3">
        {/* Brand mark */}
        <button
          onClick={() => exitZone()}
          className="pointer-events-auto flex items-center gap-2 sm:gap-3 font-display text-[13px] sm:text-[15px] tracking-tight text-ink-50 hover:opacity-80 transition group min-w-0"
          aria-label="Return to property map"
        >
          <span className="shrink-0 w-7 h-7 rounded-sm bg-accent-gold flex items-center justify-center text-ink-950 font-bold text-[12px] shadow-[0_0_18px_rgba(217,178,111,0.35)] group-hover:shadow-[0_0_28px_rgba(217,178,111,0.55)] transition">
            M
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span>Mall of America</span>
            <span className="text-[9px] tracking-eyebrow text-ink-300 font-sans">
              PARTNERSHIP DECK
            </span>
          </span>
          {activeZone && (
            <span className="hidden md:flex items-center gap-3 ml-3 pl-3 border-l border-white/15">
              <span className="text-ink-300 text-[10px] tracking-eyebrow">
                / {activeZone.label.toUpperCase()}
              </span>
            </span>
          )}
        </button>

        {/* Mode switcher — desktop inline */}
        {role && (
          <div className="pointer-events-auto hidden sm:block">
            <ModeSwitcher />
          </div>
        )}

        {/* Utility cluster */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 shrink-0">
          {role && (
            <button
              onClick={openBrand}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 min-h-[40px] border border-accent-gold/50 bg-accent-gold/10 backdrop-blur-sm text-[10px] tracking-eyebrow text-accent-gold hover:bg-accent-gold hover:text-ink-950 transition"
              aria-label="Open Brand-In-Place"
            >
              <span>SEE YOUR BRAND HERE</span>
              <span>↗</span>
            </button>
          )}
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute deck audio" : "Mute deck audio"}
            className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center border border-white/15 bg-black/40 backdrop-blur-sm text-ink-300 hover:text-accent-gold hover:border-accent-gold/40 transition"
          >
            {muted ? <IconMuted /> : <IconUnmuted />}
          </button>
          <button
            onClick={toggleCinematic}
            aria-label="Toggle cinematic mode (C)"
            className={`hidden md:flex w-9 h-9 items-center justify-center border backdrop-blur-sm transition ${
              cinematic
                ? "border-accent-gold text-accent-gold bg-accent-gold/15"
                : "border-white/15 bg-black/40 text-ink-300 hover:text-accent-gold hover:border-accent-gold/40"
            }`}
            title="Cinematic mode (press C)"
          >
            <IconCinema />
          </button>
        </div>
      </div>

      {/* Mode kicker — small text under top bar; on mobile this row hosts the mode switcher */}
      {role && view !== "splash" && (
        <div className="px-4 sm:px-6 md:px-10 -mt-1 flex items-center gap-3 text-[10px] tracking-eyebrow text-ink-300 flex-wrap">
          <span className="hidden sm:block w-6 h-[1px] bg-accent-gold/70" />
          <span className="hidden sm:block text-ink-100/70">
            VIEWING AS · <span className="text-accent-gold">{activeMode.longLabel.toUpperCase()}</span>
          </span>
          {/* mobile-only mode switcher row */}
          <div className="pointer-events-auto sm:hidden">
            <ModeSwitcher />
          </div>
          <button
            onClick={reset}
            className="ml-auto text-[9px] tracking-eyebrow text-ink-500 hover:text-accent-gold transition pointer-events-auto"
          >
            START OVER
          </button>
        </div>
      )}
    </div>
  );
}

function IconMuted() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function IconUnmuted() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function IconCinema() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="1" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <line x1="2" y1="15" x2="22" y2="15" />
    </svg>
  );
}
