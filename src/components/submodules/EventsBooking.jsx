import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import SubmoduleShell from "./SubmoduleShell";
import { EVENT_FORMATS } from "../../data/submodules";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Simulated availability — Q4 holidays read as fully booked, summer as light.
function buildCalendar() {
  const out = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const monthIdx = d.getMonth();
    const yr = d.getFullYear();
    // Q4 = busy; Q2 = light; everything else = some availability
    const status =
      monthIdx >= 9 ? "tight" : monthIdx >= 3 && monthIdx <= 5 ? "open" : "available";
    out.push({ key: `${yr}-${monthIdx}`, label: `${MONTHS[monthIdx]} ${String(yr).slice(2)}`, status, monthIdx, yr });
  }
  return out;
}

export default function EventsBooking() {
  const [format, setFormat] = useState(EVENT_FORMATS[1].id); // default = concert
  const [date, setDate] = useState(null);
  const calendar = useMemo(buildCalendar, []);
  const fmt = EVENT_FORMATS.find((f) => f.id === format);

  return (
    <SubmoduleShell
      kicker="Events · Hold a date"
      title={
        <>
          Five formats. One stage.{" "}
          <span className="italic text-gradient-gold">Twelve months out.</span>
        </>
      }
      intro="Pick the format. Pick the date. The MOA Events team holds it for 5 business days while terms get finalised. Most activations turn around in 6 – 10 weeks; concerts and conventions in 12 – 24."
      backdrop="/ai/images/submodule/events-hero.jpg"
    >
      {/* Format chips */}
      <div className="flex flex-wrap gap-2">
        {EVENT_FORMATS.map((f) => {
          const isActive = f.id === format;
          return (
            <button
              key={f.id}
              onClick={() => setFormat(f.id)}
              className={`px-4 py-2.5 text-[10.5px] tracking-eyebrow transition ${
                isActive
                  ? "bg-accent-gold text-ink-950"
                  : "border border-white/15 text-ink-300 hover:text-accent-gold hover:border-accent-gold/40"
              }`}
            >
              {f.label.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Format detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={fmt.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="mt-12 grid md:grid-cols-12 gap-10 md:gap-14"
        >
          {/* LEFT — format detail + calendar */}
          <div className="md:col-span-7">
            <div className="grid sm:grid-cols-2 gap-[1px] bg-white/10 border border-white/10 max-w-3xl">
              <Cell label="Capacity" value={fmt.capacity} />
              <Cell label="Lead time" value={fmt.leadTime} />
              <Cell label="Venues" value={fmt.venues.join(" · ")} />
              <Cell label="Inclusions" value={fmt.inclusions.slice(0, 2).join(" · ")} />
            </div>

            {/* Inclusions full */}
            <div className="mt-10">
              <div className="text-[10px] tracking-eyebrow text-accent-gold mb-4">
                FULL INCLUSIONS
              </div>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 max-w-2xl">
                {fmt.inclusions.map((inc) => (
                  <div
                    key={inc}
                    className="flex items-center gap-3 text-[14px] text-ink-100/85"
                  >
                    <span className="w-2 h-[1px] bg-accent-gold" />
                    {inc}
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] tracking-eyebrow text-accent-gold">
                  AVAILABILITY · NEXT 12 MONTHS
                </div>
                <div className="hidden md:flex items-center gap-3 text-[9px] tracking-eyebrow font-mono text-ink-300">
                  <Legend color="#0f766e" label="OPEN" />
                  <Legend color="#d9b26f" label="AVAILABLE" />
                  <Legend color="#c0392b" label="TIGHT" />
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-[1px] bg-white/10 border border-white/10">
                {calendar.map((m) => {
                  const sel = date === m.key;
                  const tone =
                    m.status === "tight"
                      ? "bg-accent-crimson/15 text-accent-crimson"
                      : m.status === "open"
                      ? "bg-accent-teal/15 text-accent-teal"
                      : "bg-accent-gold/12 text-accent-gold";
                  return (
                    <button
                      key={m.key}
                      onClick={() => setDate(m.key)}
                      className={`relative px-3 py-3 text-[10.5px] tracking-eyebrow transition ${
                        sel
                          ? "bg-accent-gold text-ink-950"
                          : `${tone} hover:bg-ink-950/85`
                      }`}
                    >
                      <div className="font-mono">{m.label}</div>
                      <div className="mt-1 text-[9px] tracking-wider opacity-80">
                        {m.status.toUpperCase()}
                      </div>
                    </button>
                  );
                })}
              </div>
              {date && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-[12.5px] text-ink-100"
                >
                  <span className="text-accent-gold mr-2">●</span>
                  Holding{" "}
                  <span className="text-accent-gold font-display">
                    {calendar.find((c) => c.key === date)?.label}
                  </span>{" "}
                  for 5 business days while we finalise.
                </motion.div>
              )}
            </div>

            {/* Past highlights */}
            <div className="mt-14">
              <div className="text-[10px] tracking-eyebrow text-accent-gold mb-4">
                PAST · {fmt.label.toUpperCase()}
              </div>
              <div className="flex flex-wrap gap-2 max-w-3xl">
                {fmt.pastExamples.map((e) => (
                  <span
                    key={e}
                    className="px-3 py-2 text-[11px] tracking-wide border border-white/15 bg-black/40 text-ink-100/85"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — booking card */}
          <div className="md:col-span-5">
            <div className="glass p-7 sticky top-32">
              <div className="text-[10px] tracking-eyebrow text-accent-gold">
                BOOKING REQUEST
              </div>
              <h4 className="mt-3 font-display text-2xl leading-tight">
                Hold {date ? calendar.find((c) => c.key === date)?.label : "a date"}.
              </h4>
              <ul className="mt-5 space-y-2 text-[13px] text-ink-100/85">
                <li>
                  <span className="text-ink-500 mr-2">FORMAT</span> {fmt.label}
                </li>
                <li>
                  <span className="text-ink-500 mr-2">CAPACITY</span> {fmt.capacity}
                </li>
                <li>
                  <span className="text-ink-500 mr-2">VENUE</span> {fmt.venues[0]}
                </li>
                <li>
                  <span className="text-ink-500 mr-2">LEAD TIME</span> {fmt.leadTime}
                </li>
              </ul>
              <div className="mt-6 space-y-2">
                <button
                  disabled={!date}
                  className={`block w-full px-5 py-3 text-[11px] tracking-eyebrow font-medium transition text-center ${
                    date
                      ? "bg-accent-gold text-ink-950 hover:bg-[#f4d99a]"
                      : "bg-ink-700 text-ink-500 cursor-not-allowed"
                  }`}
                >
                  REQUEST HOLD →
                </button>
                <a
                  href="mailto:events@mallofamerica.com"
                  className="block w-full px-5 py-3 border border-accent-gold/50 text-accent-gold text-[11px] tracking-eyebrow hover:bg-accent-gold/10 transition text-center"
                >
                  EMAIL EVENTS DESK
                </a>
              </div>
              <div className="mt-7 pt-6 border-t border-white/10 text-[12px] text-ink-100/70 leading-relaxed">
                <span className="text-accent-gold text-[10px] tracking-eyebrow mr-2">
                  IN-HOUSE TEAM
                </span>
                Production, rigging, signage, hospitality block, broadcast support — every line item handled by Encore + the MOA Events team.
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </SubmoduleShell>
  );
}

function Cell({ label, value }) {
  return (
    <div className="bg-ink-950/85 backdrop-blur p-4 md:p-5">
      <div className="text-[10px] tracking-eyebrow text-ink-300">
        {label.toUpperCase()}
      </div>
      <div className="mt-2 font-display text-base md:text-lg text-ink-50 leading-tight">
        {value}
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
