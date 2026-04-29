// Simulated live-ops feed for the always-on ticker.
// Pulls a deterministic-ish stream so screenshots feel real but values move.

const todayStart = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

// Visitors today — fake counter that climbs through the day with mild noise.
export function visitorsToday() {
  const elapsed = (Date.now() - todayStart()) / (1000 * 60 * 60 * 24);
  const expected = Math.round(95000 * Math.min(1, elapsed));
  const noise = Math.round(Math.sin(Date.now() / 60000) * 240);
  return Math.max(0, expected + noise);
}

// Right-now happenings (cycled). Salesperson sees a "live" state that moves
// across reloads even on a single demo session.
export const NOW_HAPPENINGS = [
  { zone: "rotunda", line: "Soundcheck · Imagine Dragons acoustic" },
  { zone: "nick", line: "School-day takeover · 1,200 students on-site" },
  { zone: "luxury", line: "Tiffany & Co. window install · L2 east" },
  { zone: "sealife", line: "Diver feed · main reef tank" },
  { zone: "retail", line: "Apple flagship demo bar · iPad Pro launch" },
  { zone: "dining", line: "JW Marriott chef pop-up · L3 food court" },
  { zone: "hotel", line: "Microsoft regional summit · 420 delegates" },
];

export function currentHappening() {
  const idx = Math.floor(Date.now() / 7000) % NOW_HAPPENINGS.length;
  return NOW_HAPPENINGS[idx];
}

export const TICKER_STATS = [
  { label: "VISITORS TODAY", get: () => visitorsToday().toLocaleString() },
  { label: "LEASES SIGNED · WTD", get: () => "3" },
  { label: "EVENTS LIVE", get: () => "2" },
  { label: "SOCIAL MENTIONS · 24H", get: () => "47.8K" },
];
