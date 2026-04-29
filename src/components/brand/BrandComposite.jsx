import { useState } from "react";

/**
 * Real-time composite of a brand logo onto an empty MOA signage template.
 *
 * The Brand-In-Place templates are generated with intentionally blank
 * signage panels — this component overlays the prospect's logo or wordmark
 * onto that panel using CSS positioning + blend mode for a believable
 * in-situ render that updates live as they type or upload.
 *
 * If logoUrl is provided, it shows as an image. Otherwise the brand name
 * renders as a Fraunces wordmark — which often reads more luxurious anyway.
 */
export default function BrandComposite({
  template,
  brandName,
  logoUrl,
  size = "default", // "default" | "thumb" | "hero"
  caption = true,
}) {
  const [imgSrc, setImgSrc] = useState(template.image);

  const sizing =
    size === "thumb"
      ? "aspect-[16/10] max-w-md"
      : size === "hero"
      ? "aspect-[16/9] w-full"
      : "aspect-[16/10] w-full";

  return (
    <figure className={`relative overflow-hidden hairline ${sizing}`}>
      <img
        src={imgSrc}
        alt={template.label}
        className="absolute inset-0 w-full h-full object-cover"
        onError={() => {
          if (imgSrc !== template.fallback) setImgSrc(template.fallback);
        }}
      />

      {/* The logo / wordmark composited onto the empty signage panel */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: `${template.box.left}%`,
          top: `${template.box.top}%`,
          width: `${template.box.width}%`,
          height: `${template.box.height}%`,
          mixBlendMode: template.blend,
        }}
      >
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={brandName}
            className="max-w-full max-h-full object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
          />
        ) : (
          <div
            className="font-display tracking-display text-center text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
            style={{
              fontSize: "clamp(0.85rem, 2.4vw, 1.8rem)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            {brandName || "YOUR BRAND"}
          </div>
        )}
      </div>

      {/* Caption strip */}
      {caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/85 to-transparent flex items-end justify-between gap-3 text-[10px] tracking-eyebrow font-mono">
          <span className="text-accent-gold">{template.caption}</span>
          <span className="text-ink-300">{template.tagline}</span>
        </figcaption>
      )}
    </figure>
  );
}
