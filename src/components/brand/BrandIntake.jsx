import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import BrandComposite from "./BrandComposite";
import { BRAND_TEMPLATES } from "../../lib/brandComposite";
import { inferTierFromName } from "../../lib/brandPricing";

const TIER_CHOICES = [
  { id: "luxury", label: "Luxury / Flagship" },
  { id: "premium", label: "Premium / Lifestyle" },
  { id: "mainstream", label: "Mainstream" },
  { id: "popup", label: "Pop-up / Limited" },
];

const FOOTPRINT_PRESETS = [
  { label: "Pop-up", value: 600 },
  { label: "Mid-tier", value: 2400 },
  { label: "Premium", value: 4800 },
  { label: "Flagship", value: 9200 },
];

const SEASONS = [
  { id: "Q1", label: "Q1" },
  { id: "Q2", label: "Q2" },
  { id: "Q3", label: "Q3" },
  { id: "Q4", label: "Q4 · Holiday" },
];

const SAMPLE_BRANDS = ["Aritzia", "Aesop", "On", "Glossier", "Patagonia", "Tiffany & Co.", "Erewhon"];

export default function BrandIntake({ onGenerate, onClose, initial }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [tier, setTier] = useState(initial?.tier ?? "premium");
  const [tierTouched, setTierTouched] = useState(!!initial?.tier);
  const [logoUrl, setLogoUrl] = useState(initial?.logoUrl ?? null);
  const [footprint, setFootprint] = useState(initial?.footprint ?? 4800);
  const [season, setSeason] = useState(initial?.season ?? "Q4");
  const [email, setEmail] = useState(initial?.email ?? "");
  const fileRef = useRef(null);

  // auto-classify tier from brand name unless user has manually picked
  useEffect(() => {
    if (!tierTouched && name) {
      setTier(inferTierFromName(name));
    }
  }, [name, tierTouched]);

  const previewTemplate = useMemo(() => {
    if (tier === "luxury") return BRAND_TEMPLATES[0];
    if (tier === "popup") return BRAND_TEMPLATES[1];
    return BRAND_TEMPLATES[0];
  }, [tier]);

  const ready = name.trim().length >= 2;

  function onLogoFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoUrl(reader.result);
    reader.readAsDataURL(file);
  }

  function submit(e) {
    e.preventDefault();
    if (!ready) return;
    onGenerate({
      name: name.trim(),
      logoUrl,
      tier,
      footprint,
      season,
      email: email.trim() || null,
    });
  }

  return (
    <div className="fixed inset-0 z-[80] bg-ink-950 overflow-y-auto zone-scroll">
      {/* Background — luxury wing template, very dimmed */}
      <img
        src="/ai/images/onboarding/role-gate-bg.png"
        alt=""
        className="fixed inset-0 w-full h-full object-cover opacity-15"
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/65 via-black/80 to-black" />

      <div className="relative min-h-screen px-4 sm:px-6 md:px-12 py-20 sm:py-24 md:py-28">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-14 items-start">
          {/* LEFT — form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7"
          >
            <p className="kicker">The "I need to be here" moment</p>
            <h2 className="mt-3 font-display font-light tracking-display text-[clamp(1.6rem,5vw,4.6rem)] leading-[1.02]">
              Imagine{" "}
              <span className="italic text-gradient-gold">
                {name.trim() || "your brand"}
              </span>
              <br />
              inside Mall of America.
            </h2>
            <p className="mt-4 sm:mt-5 max-w-2xl text-ink-100/75 text-[14px] sm:text-[15.5px] leading-relaxed">
              Tell us your brand. We'll render it in three of MOA's flagship
              moments — Luxury Wing storefront, Rotunda activation backdrop,
              Sea Life sponsor portal — with adjacency, footprint, and
              ballpark numbers attached. The proposal goes home as a PDF.
            </p>

            <div className="mt-12 space-y-7">
              {/* Brand name */}
              <Field label="Brand name" required>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aritzia"
                  autoFocus
                  className="w-full bg-transparent border-0 border-b border-white/20 focus:border-accent-gold outline-none py-3 font-display text-2xl text-ink-50 placeholder:text-ink-500 transition"
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {SAMPLE_BRANDS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setName(b)}
                      className="text-[10px] tracking-eyebrow px-2.5 py-1 border border-white/15 text-ink-300 hover:text-accent-gold hover:border-accent-gold/40 transition"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Logo upload */}
              <Field label="Logo (optional)" hint="PNG with transparency reads best">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="px-4 py-2.5 border border-white/20 text-[11px] tracking-eyebrow text-ink-100 hover:border-accent-gold hover:text-accent-gold transition"
                  >
                    {logoUrl ? "REPLACE LOGO" : "UPLOAD LOGO"}
                  </button>
                  {logoUrl && (
                    <>
                      <img
                        src={logoUrl}
                        alt="logo preview"
                        className="h-10 w-auto bg-white/10 rounded-sm px-3 py-1"
                      />
                      <button
                        type="button"
                        onClick={() => setLogoUrl(null)}
                        className="text-[10px] tracking-eyebrow text-ink-500 hover:text-accent-gold"
                      >
                        REMOVE
                      </button>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg,image/webp"
                    onChange={(e) => onLogoFile(e.target.files?.[0])}
                    className="hidden"
                  />
                </div>
              </Field>

              {/* Tier */}
              <Field label="Brand tier">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10">
                  {TIER_CHOICES.map((t) => {
                    const active = tier === t.id;
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => {
                          setTier(t.id);
                          setTierTouched(true);
                        }}
                        className={`px-2.5 sm:px-3 py-3 min-h-[44px] text-[9.5px] sm:text-[10.5px] tracking-eyebrow text-left transition ${
                          active
                            ? "bg-accent-gold text-ink-950"
                            : "bg-ink-950/85 text-ink-300 hover:text-accent-gold"
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
                {!tierTouched && (
                  <div className="mt-2 text-[10px] tracking-eyebrow text-ink-500">
                    AUTO-CLASSIFIED FROM BRAND NAME
                  </div>
                )}
              </Field>

              {/* Footprint */}
              <Field
                label="Footprint"
                hint={`${footprint.toLocaleString()} sq ft`}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 mb-3">
                  {FOOTPRINT_PRESETS.map((p) => {
                    const active = footprint === p.value;
                    return (
                      <button
                        type="button"
                        key={p.value}
                        onClick={() => setFootprint(p.value)}
                        className={`px-2.5 sm:px-3 py-2.5 min-h-[44px] text-[9.5px] sm:text-[10.5px] tracking-eyebrow transition ${
                          active
                            ? "bg-accent-gold text-ink-950"
                            : "bg-ink-950/85 text-ink-300 hover:text-accent-gold"
                        }`}
                      >
                        {p.label} · {p.value.toLocaleString()}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="range"
                  min="200"
                  max="18000"
                  step="100"
                  value={footprint}
                  onChange={(e) => setFootprint(parseInt(e.target.value, 10))}
                  className="w-full accent-[#d9b26f]"
                />
              </Field>

              {/* Season */}
              <Field label="Target season">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-white/10 border border-white/10">
                  {SEASONS.map((s) => {
                    const active = season === s.id;
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setSeason(s.id)}
                        className={`px-2.5 sm:px-3 py-2.5 min-h-[44px] text-[9.5px] sm:text-[10.5px] tracking-eyebrow transition ${
                          active
                            ? "bg-accent-gold text-ink-950"
                            : "bg-ink-950/85 text-ink-300 hover:text-accent-gold"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </Field>

              {/* Email — optional, drives "send proposal" */}
              <Field label="Email (optional)" hint="We'll send the proposal PDF + a heatmap of zones you visited">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="brand-partnerships@yourcompany.com"
                  className="w-full bg-transparent border-0 border-b border-white/20 focus:border-accent-gold outline-none py-2 text-ink-50 placeholder:text-ink-500 transition"
                />
              </Field>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={!ready}
                className={`px-6 sm:px-7 py-3.5 min-h-[44px] text-[11px] tracking-eyebrow font-medium transition ${
                  ready
                    ? "bg-accent-gold text-ink-950 hover:bg-[#f4d99a]"
                    : "bg-ink-700 text-ink-500 cursor-not-allowed"
                }`}
              >
                GENERATE BRAND-IN-PLACE →
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 sm:px-5 py-3 min-h-[44px] border border-white/15 text-[11px] tracking-eyebrow text-ink-300 hover:text-accent-gold hover:border-accent-gold/40 transition"
              >
                CLOSE
              </button>
              <span className="hidden sm:inline ml-auto text-[10px] tracking-eyebrow text-ink-500 font-mono">
                ESC TO CANCEL
              </span>
            </div>
          </motion.form>

          {/* RIGHT — live composite preview */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-5 md:sticky md:top-28 lg:top-32"
          >
            <div className="text-[10px] tracking-eyebrow text-accent-gold mb-4">
              LIVE PREVIEW · UPDATES AS YOU TYPE
            </div>
            <BrandComposite
              template={previewTemplate}
              brandName={name.trim() || "YOUR BRAND"}
              logoUrl={logoUrl}
              size="hero"
            />
            <p className="mt-4 text-[12px] text-ink-300 leading-relaxed">
              Three full composites + a personalised "Why Mall of America fits{" "}
              <span className="text-accent-gold">{name.trim() || "your brand"}</span>" pitch are generated when you submit. The proposal can be saved as a PDF.
            </p>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, required, children }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <label className="text-[10px] tracking-eyebrow text-accent-gold">
          {label.toUpperCase()}
          {required && <span className="text-accent-gold/80 ml-1">·</span>}
        </label>
        {hint && (
          <span className="text-[10px] tracking-eyebrow text-ink-500 font-mono">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
