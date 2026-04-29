import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDeck } from "../../hooks/useDeck";

/**
 * The atmosphere bed for a zone overlay.
 *
 *   - Background video (looping) tinted by zone palette
 *   - Cinematic gradient wash for editorial readability
 *   - Audio bed (zone-specific sound) — fades in/out, not abrupt
 *   - Falls back to poster if reduced-motion is set
 *   - If a generative video URL fails, falls back to v1 footage automatically
 *   - 600ms cross-fade in via Framer (parent ZoneOverlay handles cross-fade out)
 */
export default function ZoneAtmosphere({ zone }) {
  const { reduced, muted, cinematic } = useDeck();
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(zone.media.video);
  const [videoReady, setVideoReady] = useState(false);

  // Gentle audio fade in/out on mute or zone change
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    let raf;
    const target = muted || reduced ? 0 : 0.32;
    const step = () => {
      const diff = target - a.volume;
      if (Math.abs(diff) < 0.01) {
        a.volume = target;
        if (target === 0) a.pause();
        return;
      }
      a.volume = Math.max(0, Math.min(1, a.volume + diff * 0.12));
      raf = requestAnimationFrame(step);
    };
    if (target > 0) {
      a.volume = 0;
      a.play().catch(() => {});
    }
    step();
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [muted, reduced, zone.id]);

  // reset video when zone changes
  useEffect(() => {
    setVideoSrc(zone.media.video);
    setVideoReady(false);
  }, [zone.id, zone.media.video]);

  return (
    <>
      {/* Video bed — fades in once first frame loads */}
      {reduced ? (
        <img
          src={zone.media.poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          {/* poster underlay so the screen is never black during load */}
          <img
            src={zone.media.poster}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.video
            ref={videoRef}
            key={videoSrc}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: videoReady ? 1 : 0, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={zone.media.poster}
            src={videoSrc}
            onCanPlay={() => setVideoReady(true)}
            onError={() => {
              // fallback chain: zone-specific generative → v1 fallback → poster
              if (videoSrc !== zone.media.fallbackVideo) {
                setVideoSrc(zone.media.fallbackVideo);
              }
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </>
      )}

      {/* Tint wash — per-zone palette */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-50 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at top right, ${zone.palette.glow}, transparent 60%), radial-gradient(ellipse at bottom left, ${zone.palette.glow}, transparent 65%)`,
        }}
      />

      {/* Editorial gradient — readability under the editorial card */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          cinematic ? "opacity-60" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/25" />
      </div>

      {/* Cinematic letterbox bars when cinematic mode active */}
      {cinematic && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 h-[12vh] bg-black z-30"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 h-[12vh] bg-black z-30"
          />
        </>
      )}

      {/* Audio bed — controlled by useDeck mute */}
      <audio ref={audioRef} src={zone.media.audio} loop preload="none" />
    </>
  );
}
