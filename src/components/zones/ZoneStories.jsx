import { motion } from "framer-motion";

/**
 * Renders the zone.stories[] array — secondary editorial blocks shown
 * below the main hero card inside a zone overlay. Four block kinds:
 *
 *   callout     — stat-led editorial card (zero apparel tax, cold room…)
 *   spec-grid   — k/v table (programming, parking, floorplate)
 *   timeline    — date/event pairs (Luxury renovation arc)
 *   broadcast   — bullet list of past events
 *   origin      — the Met Stadium plaque story
 *
 * Block kinds are open — add another by appending one case to the switch.
 */
export default function ZoneStories({ stories, palette }) {
  if (!stories?.length) return null;
  return (
    <div className="mt-12 sm:mt-20 md:mt-28 space-y-10 sm:space-y-14 md:space-y-20">
      <div className="flex items-center gap-3">
        <span className="block w-8 h-[1px] bg-accent-gold/70" />
        <span className="text-[10px] tracking-eyebrow text-ink-300">
          DEEPER · KEEP SCROLLING
        </span>
      </div>

      {stories.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderStory(s, palette)}
        </motion.div>
      ))}
    </div>
  );
}

function renderStory(s, palette) {
  switch (s.kind) {
    case "callout":
      return <CalloutStory s={s} palette={palette} />;
    case "spec-grid":
      return <SpecGridStory s={s} />;
    case "timeline":
      return <TimelineStory s={s} palette={palette} />;
    case "broadcast":
      return <BroadcastStory s={s} />;
    case "origin":
      return <OriginStory s={s} />;
    default:
      return null;
  }
}

function CalloutStory({ s, palette }) {
  const accent = s.accent ?? palette?.tint ?? "#d9b26f";
  return (
    <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-start">
      <div className="md:col-span-5">
        <div
          className="text-[10px] tracking-eyebrow"
          style={{ color: accent }}
        >
          {s.kicker}
        </div>
        <h3 className="mt-3 font-display text-[clamp(1.4rem,3.5vw,3rem)] leading-[1.05]">
          {s.title}
        </h3>
      </div>
      <div className="md:col-span-7">
        <p className="text-ink-100/80 leading-relaxed text-[14px] sm:text-[15.5px] md:text-[16px] max-w-2xl">
          {s.body}
        </p>
        {s.stat && (
          <div className="mt-7 flex items-baseline gap-5">
            <div
              className="font-display text-[clamp(3.2rem,6vw,5.6rem)] leading-none"
              style={{ color: accent }}
            >
              {s.stat}
            </div>
            {s.statLabel && (
              <div className="text-[10px] tracking-eyebrow text-ink-300 max-w-[10rem]">
                {s.statLabel}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SpecGridStory({ s }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-6 max-w-3xl">
        <div>
          <div className="text-[10px] tracking-eyebrow text-accent-gold">
            {s.kicker}
          </div>
          <h3 className="mt-2 font-display text-[clamp(1.3rem,3vw,2.5rem)] leading-tight">
            {s.title}
          </h3>
          {s.body && (
            <p className="mt-3 text-ink-100/75 text-[13px] sm:text-sm max-w-xl">{s.body}</p>
          )}
        </div>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-[1px] bg-white/8 border border-white/8 max-w-3xl">
        {s.rows.map(([k, v]) => (
          <div
            key={k}
            className="bg-ink-950/85 backdrop-blur p-3 sm:p-4 md:p-5 flex items-baseline justify-between gap-4"
          >
            <span className="text-[10px] tracking-eyebrow text-ink-300 uppercase">
              {k}
            </span>
            <span className="font-display text-base md:text-lg text-ink-50 text-right">
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineStory({ s, palette }) {
  const accent = palette?.tint ?? "#d9b26f";
  return (
    <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-start">
      <div className="md:col-span-4">
        <div
          className="text-[10px] tracking-eyebrow"
          style={{ color: accent }}
        >
          {s.kicker}
        </div>
        <h3 className="mt-3 font-display text-[clamp(1.3rem,3vw,2.5rem)] leading-tight">
          {s.title}
        </h3>
        {s.body && (
          <p className="mt-4 text-ink-100/75 text-sm">{s.body}</p>
        )}
      </div>
      <ol className="md:col-span-8 relative space-y-5 pl-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/15">
        {s.items.map(([year, event], i) => (
          <li key={i} className="relative">
            <span
              className="absolute -left-7 top-1.5 w-3 h-3 rounded-full border-2"
              style={{
                borderColor: accent,
                background: i === s.items.length - 1 ? accent : "transparent",
              }}
            />
            <div className="font-mono text-[11px] tracking-eyebrow" style={{ color: accent }}>
              {year}
            </div>
            <div className="mt-1 text-ink-100 text-base md:text-lg leading-snug">
              {event}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function BroadcastStory({ s }) {
  return (
    <div>
      <div className="text-[10px] tracking-eyebrow text-accent-gold">
        {s.kicker}
      </div>
      <h3 className="mt-3 font-display text-[clamp(1.4rem,3.5vw,3rem)] leading-[1.05] max-w-3xl">
        {s.title}
      </h3>
      {s.body && (
        <p className="mt-4 sm:mt-5 text-ink-100/80 leading-relaxed text-[14px] sm:text-[15.5px] max-w-2xl">
          {s.body}
        </p>
      )}
      <ul className="mt-6 sm:mt-8 grid md:grid-cols-2 gap-[1px] bg-white/8 border border-white/8 max-w-4xl">
        {s.items.map(([item], i) => (
          <li
            key={i}
            className="bg-ink-950/85 backdrop-blur p-3 sm:p-4 md:p-5 flex items-center gap-4"
          >
            <span className="font-mono text-[10px] text-accent-gold/80 w-6">
              0{i + 1}
            </span>
            <span className="text-[14.5px] text-ink-100">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OriginStory({ s }) {
  return (
    <div className="relative">
      <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-center">
        {/* Decorative plaque */}
        <div className="md:col-span-5 relative">
          <div className="aspect-[4/5] hairline relative bg-gradient-to-br from-[#241a0e] via-[#0c0c08] to-black overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,178,111,0.12),transparent_70%)]" />
            <div className="relative h-full flex flex-col justify-between p-7 md:p-9">
              <div>
                <div className="text-[9px] tracking-eyebrow text-accent-gold/70 font-mono">
                  COMMEMORATIVE PLAQUE
                </div>
                <div className="mt-3 font-display text-2xl md:text-3xl text-ink-50 leading-tight">
                  HOME PLATE
                </div>
                <div className="mt-1 text-[11px] tracking-eyebrow text-ink-300">
                  METROPOLITAN STADIUM · MINNEAPOLIS
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-[10px] tracking-eyebrow text-accent-gold">
                  JUNE 3, 1967
                </div>
                <div className="text-ink-100 text-sm leading-snug">
                  Harmon Killebrew · 520 ft home run · this seat marks the landing.
                </div>
              </div>
              <div className="absolute bottom-6 right-6 w-[1px] h-12 bg-accent-gold/40" />
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="md:col-span-7">
          <div className="text-[10px] tracking-eyebrow text-accent-gold">
            {s.kicker}
          </div>
          <h3 className="mt-3 font-display text-[clamp(1.5rem,4vw,3.4rem)] leading-[1.04]">
            {s.title}
          </h3>
          <p className="mt-4 sm:mt-6 text-ink-100/85 leading-relaxed text-[14px] sm:text-[15.5px] md:text-[16.5px] max-w-2xl">
            {s.body}
          </p>
          {s.meta && (
            <div className="mt-8 pt-6 border-t border-white/12 text-[10px] tracking-eyebrow text-ink-300 font-mono">
              {s.meta}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
