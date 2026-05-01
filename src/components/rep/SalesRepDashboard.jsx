import { useMemo } from "react";
import { motion } from "framer-motion";
import { useDeck } from "../../hooks/useDeck";
import { getZone } from "../../data/zones";
import { TIER_LABELS } from "../../lib/brandCopy";

/**
 * The proof-point that this is a sales TOOL — not a deck.
 *
 * Reachable via ?rep=1 in the URL or by clicking the rep button. Reads the
 * full event history out of useDeck and reconstructs a heatmap of the
 * prospect's session: zones visited, dwell time per zone, mode switches,
 * brand generated, saved zones.
 *
 * In production this would be the page the salesperson opens after a call:
 * "Maria from Aritzia spent 2:14 on the Rotunda overlay, starred Sea Life
 * + Nickelodeon, and generated a proposal at $1.4M Q4 ballpark. Open with
 * the Rotunda Q4 calendar."
 */
export default function SalesRepDashboard() {
  const { history, brand, savedZones, role, mode, zones, modes, openRep, reset } = useDeck();
  // close behaviour — clear ?rep param + return to map
  function close() {
    const params = new URLSearchParams(window.location.search);
    params.delete("rep");
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    // soft-reload by toggling rep view back to map
    window.location.reload();
  }

  // Compute dwell time per zone from enterZone / exitZone events
  const dwell = useMemo(() => {
    const out = {};
    let openZone = null;
    let openAt = null;
    for (const h of history) {
      if (h.type === "enterZone") {
        if (openZone) {
          out[openZone] = (out[openZone] || 0) + (h.at - openAt);
        }
        openZone = h.payload;
        openAt = h.at;
      }
      if (h.type === "exitZone" && openZone) {
        out[openZone] = (out[openZone] || 0) + (h.at - openAt);
        openZone = null;
        openAt = null;
      }
    }
    if (openZone) out[openZone] = (out[openZone] || 0) + (Date.now() - openAt);
    return out;
  }, [history]);

  const totalDwell = Object.values(dwell).reduce((a, b) => a + b, 0);
  const visited = Object.keys(dwell).length;
  const enters = history.filter((h) => h.type === "enterZone").length;
  const modeSwitches = history.filter((h) => h.type === "mode").length;
  const sessionStart = history[0]?.at;
  const sessionDuration = sessionStart ? Date.now() - sessionStart : 0;
  const peakZoneId = Object.entries(dwell).sort((a, b) => b[1] - a[1])[0]?.[0];
  const peakZone = peakZoneId ? getZone(peakZoneId) : null;

  return (
    <div className="fixed inset-0 z-[95] bg-ink-950 text-ink-50 overflow-y-auto zone-scroll">
      {/* No-print top bar */}
      <div className="sticky top-0 z-50 bg-ink-950 border-b border-white/10 px-4 sm:px-6 md:px-10 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent-crimson animate-pulse-soft" />
          <span className="text-[10px] tracking-eyebrow text-accent-gold">
            <span className="hidden sm:inline">SALES-REP DASHBOARD · INTERNAL</span>
            <span className="sm:hidden">REP DASHBOARD</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            className="px-3 sm:px-4 py-2.5 min-h-[40px] border border-white/15 text-[10px] tracking-eyebrow text-ink-300 hover:text-accent-gold hover:border-accent-gold/40 transition"
          >
            <span className="hidden sm:inline">COPY SHARE LINK</span>
            <span className="sm:hidden">COPY LINK</span>
          </button>
          <button
            onClick={close}
            className="px-3 sm:px-4 py-2.5 min-h-[40px] bg-accent-gold text-ink-950 text-[10px] tracking-eyebrow font-medium hover:bg-[#f4d99a] transition"
          >
            CLOSE
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16 max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="kicker">Session report</p>
          <h2 className="mt-3 font-display font-light tracking-display text-[clamp(1.6rem,5.5vw,5rem)] leading-[1.02]">
            {brand?.name ? (
              <>
                {brand.name}'s session at{" "}
                <span className="italic text-gradient-gold">Mall of America.</span>
              </>
            ) : (
              <>
                Anonymous prospect ·{" "}
                <span className="italic text-gradient-gold">in-deck heatmap.</span>
              </>
            )}
          </h2>
          <p className="mt-4 sm:mt-5 max-w-2xl text-ink-100/75 text-[14px] sm:text-[15.5px] leading-relaxed">
            What the prospect actually engaged with in this session. In a
            production build this same data would email to the assigned MOA
            Partnerships rep the moment the prospect closes the tab.
          </p>
        </motion.header>

        {/* Top stats */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10"
        >
          <Stat label="Session length" value={fmtDuration(sessionDuration)} />
          <Stat label="Zones visited" value={`${visited} / ${zones.length}`} />
          <Stat label="Total interactions" value={history.length.toString()} />
          <Stat label="Mode switches" value={modeSwitches.toString()} />
        </motion.section>

        {/* Profile + brand */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 sm:mt-12 grid md:grid-cols-12 gap-6 md:gap-10"
        >
          <div className="md:col-span-7">
            <div className="text-[10px] tracking-eyebrow text-accent-gold mb-4">
              ZONE HEATMAP · DWELL TIME
            </div>
            <ul className="space-y-1">
              {zones.map((z) => {
                const ms = dwell[z.id] || 0;
                const pct = totalDwell ? (ms / totalDwell) * 100 : 0;
                const peak = z.id === peakZoneId;
                return (
                  <li key={z.id} className="grid grid-cols-12 gap-2 sm:gap-3 items-center">
                    <span className="col-span-4 sm:col-span-3 text-[11px] sm:text-[12px] tracking-wide text-ink-100/85 truncate">
                      {z.label}
                    </span>
                    <div className="col-span-6 sm:col-span-7 h-4 sm:h-5 bg-white/5 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-y-0 left-0"
                        style={{
                          background: peak
                            ? "linear-gradient(90deg, #f4d99a, #d9b26f)"
                            : `${z.palette.tint}88`,
                        }}
                      />
                    </div>
                    <span className="col-span-2 text-[9.5px] sm:text-[10.5px] tracking-eyebrow text-ink-300 font-mono text-right">
                      {fmtDuration(ms)}
                    </span>
                  </li>
                );
              })}
            </ul>
            {peakZone && (
              <p className="mt-6 text-[12px] text-ink-100/70 leading-relaxed">
                <span className="text-accent-gold mr-2">★</span>
                Peak engagement on{" "}
                <span className="text-accent-gold font-display">
                  {peakZone.label}
                </span>{" "}
                — open the next call by walking through it first.
              </p>
            )}
          </div>

          {/* RIGHT — profile + saved + brand */}
          <div className="md:col-span-5 space-y-6">
            <Card title="PROSPECT PROFILE">
              <Row k="Role" v={role ?? "—"} />
              <Row k="Active mode" v={modes.find((m) => m.id === mode)?.longLabel ?? "—"} />
              <Row k="Sessions" v="1 (this device)" />
            </Card>

            <Card title="BRAND-IN-PLACE">
              {brand?.name ? (
                <>
                  <Row k="Brand" v={brand.name} />
                  <Row k="Tier" v={TIER_LABELS[brand.tier] ?? brand.tier} />
                  <Row k="Footprint" v={brand.footprint ? `${brand.footprint.toLocaleString()} sqft` : "—"} />
                  <Row k="Season" v={brand.season ?? "—"} />
                  {brand.email && <Row k="Email captured" v={brand.email} accent />}
                </>
              ) : (
                <p className="text-[13px] text-ink-300 leading-relaxed">
                  No brand generated this session — the "I need to be here" lever wasn't pulled. Lead the next call by inviting them to drop their brand in.
                </p>
              )}
            </Card>

            <Card title="SAVED ZONES">
              {savedZones.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {savedZones.map((id) => {
                    const z = getZone(id);
                    return (
                      <span
                        key={id}
                        className="px-2.5 py-1 text-[10.5px] tracking-eyebrow border border-accent-gold/40 text-accent-gold"
                      >
                        ★ {z?.label.toUpperCase()}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[13px] text-ink-300">No zones starred.</p>
              )}
            </Card>
          </div>
        </motion.section>

        {/* Event log */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14"
        >
          <div className="text-[10px] tracking-eyebrow text-accent-gold mb-4">
            EVENT LOG · CHRONOLOGICAL
          </div>
          <div className="border border-white/10 max-h-[420px] overflow-auto zone-scroll">
            <table className="w-full min-w-[480px]">
              <tbody>
                {history.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-5 text-[12px] text-ink-500">
                      No events recorded.
                    </td>
                  </tr>
                )}
                {history
                  .slice()
                  .reverse()
                  .map((h, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/3"
                    >
                      <td className="px-3 sm:px-4 py-2.5 text-[10px] sm:text-[10.5px] tracking-eyebrow text-ink-500 font-mono w-24 sm:w-32 whitespace-nowrap">
                        {new Date(h.at).toLocaleTimeString()}
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 text-[10px] sm:text-[10.5px] tracking-eyebrow text-accent-gold w-28 sm:w-32 whitespace-nowrap">
                        {h.type.replace(/([A-Z])/g, " $1").toUpperCase()}
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 text-[11.5px] sm:text-[12.5px] text-ink-100">
                        {h.payload ?? "—"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Reset */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              if (confirm("Reset this session? Clears history, brand, and saved zones.")) {
                reset();
                close();
              }
            }}
            className="px-5 py-3 border border-accent-crimson/50 text-accent-crimson text-[10px] tracking-eyebrow hover:bg-accent-crimson/10 transition"
          >
            RESET SESSION DATA
          </button>
          <span className="ml-auto text-[10px] tracking-eyebrow text-ink-500 font-mono">
            DATA SOURCE · LOCAL STORAGE · {history.length} EVENTS
          </span>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-ink-950/85 backdrop-blur p-4 sm:p-5 md:p-6">
      <div className="text-[9px] sm:text-[10px] tracking-eyebrow text-ink-300">
        {label.toUpperCase()}
      </div>
      <div className="mt-2 font-display text-xl sm:text-2xl md:text-3xl text-gradient-gold">
        {value}
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="glass p-5">
      <div className="text-[10px] tracking-eyebrow text-accent-gold mb-3">
        {title}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Row({ k, v, accent }) {
  return (
    <div className="flex justify-between gap-4 text-[12.5px]">
      <span className="text-ink-300 tracking-wide">{k}</span>
      <span className={accent ? "text-accent-gold" : "text-ink-100"}>{v}</span>
    </div>
  );
}

function fmtDuration(ms) {
  if (!ms) return "—";
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rs = s % 60;
  return `${m}:${String(rs).padStart(2, "0")}`;
}
