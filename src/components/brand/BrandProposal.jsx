import { useEffect, useState } from "react";
import BrandComposite from "./BrandComposite";
import { BRAND_TEMPLATES } from "../../lib/brandComposite";
import { generateWhyMoa, TIER_LABELS } from "../../lib/brandCopy";
import { calculatePricing, formatRange, formatUSD } from "../../lib/brandPricing";

/**
 * Print-styled proposal — opened in a new pane, designed to be saved as PDF
 * via the browser's print dialog (Cmd/Ctrl-P → "Save as PDF").
 *
 * Cover · Why-MOA · Composites · Pricing · Next Steps. The layout matches
 * the in-deck reveal so the prospect's takeaway is consistent with what
 * they saw on screen.
 */
export default function BrandProposal({ brand, onClose }) {
  const [copy, setCopy] = useState(null);
  const pricing = calculatePricing({
    tier: brand.tier,
    footprint: brand.footprint,
    season: brand.season,
    placement: "concourse",
  });

  useEffect(() => {
    generateWhyMoa({ name: brand.name, tier: brand.tier }).then(setCopy);
  }, [brand.name, brand.tier]);

  function print() {
    window.print();
  }

  return (
    <div className="fixed inset-0 z-[90] bg-[#f5f3ec] overflow-y-auto zone-scroll text-ink-950 proposal-doc">
      {/* No-print header */}
      <div className="sticky top-0 z-50 bg-ink-950 text-ink-50 px-6 md:px-10 py-3 flex items-center justify-between gap-4 no-print border-b border-white/10">
        <div className="text-[10px] tracking-eyebrow text-accent-gold">
          PROPOSAL · {brand.name.toUpperCase()} × MALL OF AMERICA
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={print}
            className="px-4 py-2 bg-accent-gold text-ink-950 text-[10px] tracking-eyebrow font-medium hover:bg-[#f4d99a] transition"
          >
            DOWNLOAD PDF (PRINT → SAVE AS PDF)
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/15 text-[10px] tracking-eyebrow text-ink-300 hover:text-accent-gold hover:border-accent-gold/40 transition"
          >
            CLOSE
          </button>
        </div>
      </div>

      {/* COVER */}
      <section className="proposal-page relative bg-ink-950 text-ink-50 p-12 md:p-20 min-h-screen flex flex-col">
        <header className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3 font-display text-[15px] tracking-tight">
            <span className="w-7 h-7 rounded-sm bg-accent-gold flex items-center justify-center text-ink-950 font-bold text-[12px]">
              M
            </span>
            <span>Mall of America</span>
            <span className="text-[10px] tracking-eyebrow text-ink-300 font-sans ml-2 pl-3 border-l border-white/15">
              PARTNERSHIP PROPOSAL
            </span>
          </div>
          <div className="text-[10px] tracking-eyebrow text-ink-300 font-mono text-right">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <br />
            BLOOMINGTON · MN
          </div>
        </header>

        <div className="flex-1 flex items-end pb-10">
          <div>
            <p className="kicker">For</p>
            <h1 className="mt-3 font-display font-light text-[clamp(3.4rem,9vw,8rem)] leading-[0.95] tracking-display">
              {brand.logoUrl ? (
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="max-h-32 mb-6 brightness-0 invert"
                />
              ) : null}
              <span className="italic text-gradient-gold">{brand.name}</span>
            </h1>
            <p className="mt-8 max-w-3xl text-ink-100/80 text-[18px] leading-relaxed">
              A non-binding partnership concept for {brand.name} at Mall of
              America — three flagship moments, footprint and season specs,
              and a Year 1 ballpark range. This document is a starting point
              for a conversation.
            </p>
          </div>
        </div>

        <footer className="text-[10px] tracking-eyebrow text-ink-300 font-mono flex justify-between">
          <span>© 2026 MALL OF AMERICA · TRIPLE FIVE GROUP</span>
          <span>PROPOSAL · CONFIDENTIAL</span>
        </footer>
      </section>

      {/* WHY MOA */}
      <section className="proposal-page bg-[#f5f3ec] p-12 md:p-20 min-h-screen">
        <p className="kicker text-accent-copper">Section 01 · Why this property</p>
        <h2 className="mt-4 font-display font-light text-5xl md:text-6xl leading-tight text-ink-950">
          Why Mall of America fits {brand.name}.
        </h2>
        <div className="mt-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="text-[11px] tracking-eyebrow text-accent-copper">
              TIER
            </div>
            <div className="mt-2 font-display text-2xl text-ink-950">
              {TIER_LABELS[brand.tier]}
            </div>
            {copy?.voiceNote && (
              <p className="mt-4 text-[12px] tracking-eyebrow text-ink-700 leading-relaxed">
                VOICE · {copy.voiceNote.toUpperCase()}
              </p>
            )}
          </div>
          <div className="md:col-span-8 space-y-5 text-ink-900 leading-relaxed text-[16.5px] md:text-[17.5px]">
            {copy ? (
              <>
                <p>{copy.p1}</p>
                <p>{copy.p2}</p>
                <p>{copy.p3}</p>
              </>
            ) : (
              <p className="text-ink-500">Generating…</p>
            )}
          </div>
        </div>
      </section>

      {/* COMPOSITES */}
      <section className="proposal-page bg-ink-950 text-ink-50 p-12 md:p-20 min-h-screen">
        <p className="kicker">Section 02 · Three flagship moments</p>
        <h2 className="mt-4 font-display font-light text-5xl md:text-6xl leading-tight">
          {brand.name},{" "}
          <span className="italic text-gradient-gold">in three rooms.</span>
        </h2>
        <p className="mt-6 max-w-3xl text-ink-100/75 text-[15.5px] leading-relaxed">
          Composited in-place using MOA's three signature placements. Final
          renders would be produced with the in-house creative team using
          your master brand assets.
        </p>
        <div className="mt-12 grid md:grid-cols-12 gap-6">
          {BRAND_TEMPLATES.map((tpl, i) => (
            <div
              key={tpl.id}
              className={
                i === 0 ? "md:col-span-12" : "md:col-span-6"
              }
            >
              <BrandComposite
                template={tpl}
                brandName={brand.name}
                logoUrl={brand.logoUrl}
                size="hero"
              />
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="proposal-page bg-[#f5f3ec] p-12 md:p-20 min-h-screen">
        <p className="kicker text-accent-copper">Section 03 · Year 1 ballpark</p>
        <h2 className="mt-4 font-display font-light text-5xl md:text-6xl leading-tight text-ink-950">
          The numbers.{" "}
          <span className="italic">Starting point, not a contract.</span>
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card title="Year 1 range" big={formatRange(pricing.range)} sub={`${formatUSD(pricing.monthly)} / mo baseline`} />
          <Card title="Footprint" big={`${brand.footprint.toLocaleString()} sq ft`} sub="Concourse placement" />
          <Card title="Target" big={brand.season} sub={brand.season === "Q4" ? "Holiday peak (+40% baseline)" : "Standard quarter"} />
        </div>

        <table className="mt-12 w-full border-collapse">
          <tbody>
            {[
              ["Tier baseline", `$${pricing.breakdown.tierRate}/sqft`],
              ["Annual base", formatUSD(pricing.breakdown.base)],
              ["Season adjustment", (pricing.breakdown.seasonAdjustment >= 0 ? "+" : "") + formatUSD(pricing.breakdown.seasonAdjustment)],
              ["Activation flat", formatUSD(pricing.breakdown.activation)],
              ["Suggested Year 1", formatUSD(pricing.annual)],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-ink-700/15">
                <td className="py-3 text-[12px] tracking-eyebrow text-ink-700 uppercase">
                  {k}
                </td>
                <td className="py-3 text-right font-display text-lg text-ink-950">
                  {v}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-8 max-w-2xl text-[11px] tracking-eyebrow text-ink-500 leading-relaxed">
          NOTE · NUMBERS ARE DIRECTIONAL ESTIMATES BASED ON PUBLISHED INDUSTRY RANGES. FINAL TERMS INCLUDE CO-TENANCY, BUILD-OUT CONTRIBUTION, MARKETING SUPPORT, AND ACTIVATION CALENDAR — DETERMINED AFTER THE FIRST CALL.
        </p>
      </section>

      {/* NEXT STEPS */}
      <section className="proposal-page bg-ink-950 text-ink-50 p-12 md:p-20 min-h-screen flex flex-col">
        <div>
          <p className="kicker">Section 04 · Next</p>
          <h2 className="mt-4 font-display font-light text-5xl md:text-6xl leading-tight">
            Three steps to{" "}
            <span className="italic text-gradient-gold">a signed letter of intent.</span>
          </h2>
        </div>

        <ol className="mt-14 grid md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10">
          {[
            ["01", "30-min discovery call", "Walk through this proposal with MOA Partnerships. Footprint, season, adjacency confirmed."],
            ["02", "On-site walkthrough", "Property tour with the leasing or sponsorship team. CAD floorplans + sightlines reviewed."],
            ["03", "Letter of intent", "Term sheet within 10 business days of walkthrough. Signing window: 14 days."],
          ].map(([n, t, b]) => (
            <li key={n} className="bg-ink-950/85 p-7">
              <div className="font-mono text-[10px] tracking-eyebrow text-accent-gold">
                STEP {n}
              </div>
              <div className="mt-2 font-display text-2xl">{t}</div>
              <p className="mt-3 text-ink-100/75 text-[13.5px] leading-relaxed">
                {b}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-auto pt-16 grid md:grid-cols-2 gap-10 items-end">
          <div>
            <div className="text-[10px] tracking-eyebrow text-accent-gold">
              CONTACT
            </div>
            <div className="mt-3 font-display text-2xl">
              partnerships@mallofamerica.com
            </div>
            <div className="mt-1 text-[12px] tracking-eyebrow text-ink-300">
              60 E BROADWAY · BLOOMINGTON, MN 55425
            </div>
            {brand.email && (
              <div className="mt-4 text-[11px] tracking-eyebrow text-ink-300">
                PROPOSAL ON FILE FOR · {brand.email.toUpperCase()}
              </div>
            )}
          </div>
          <div className="text-[10px] tracking-eyebrow text-ink-300 font-mono text-right">
            <div>© 2026 MALL OF AMERICA</div>
            <div>TRIPLE FIVE GROUP</div>
            <div>PROPOSAL · CONFIDENTIAL</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ title, big, sub }) {
  return (
    <div className="bg-ink-950 text-ink-50 p-7">
      <div className="text-[10px] tracking-eyebrow text-accent-gold">
        {title.toUpperCase()}
      </div>
      <div className="mt-2 font-display text-3xl text-gradient-gold">{big}</div>
      <div className="mt-2 text-[11px] tracking-eyebrow text-ink-300">
        {sub.toUpperCase()}
      </div>
    </div>
  );
}
