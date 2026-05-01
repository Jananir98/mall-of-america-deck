import { DeckProvider, useDeck } from "./hooks/useDeck";
import Splash from "./components/onboarding/Splash";
import HeroArc from "./components/onboarding/HeroArc";
import TopChrome from "./components/chrome/TopChrome";
import PropertyMap from "./components/map/PropertyMap";
import ZoneOverlay from "./components/zones/ZoneOverlay";
import BrandInPlace from "./components/brand/BrandInPlace";
import SubmoduleRouter from "./components/submodules/SubmoduleRouter";
import CinematicMode from "./components/cinematic/CinematicMode";
import SalesRepDashboard from "./components/rep/SalesRepDashboard";

/**
 * View orchestration.
 *
 *   splash    → Splash (cinematic open + role gate)
 *   map       → PropertyMap hub (the persistent backdrop once role is set)
 *   zone      → ZoneOverlay (atmosphere bed + editorial card, mode-driven)
 *   submodule → SubmoduleRouter (Leasing · Sponsorship · Events · Venue)
 *   brand     → BrandInPlace (intake → reveal → proposal PDF)
 *   rep       → SalesRepDashboard (?rep=1 — session heatmap)
 *
 * Map renders permanently in the background once role is set, so when a
 * zone overlay closes the prospect lands back on the map with no flicker.
 */
export default function App() {
  return (
    <DeckProvider>
      <Stage />
    </DeckProvider>
  );
}

function Stage() {
  const { view, role, heroArcSeen } = useDeck();

  return (
    <div className="bg-ink-950 text-ink-50 grain min-h-screen overflow-hidden">
      <TopChrome />

      {/* Persistent map under everything once role is set */}
      {role && view !== "splash" && <PropertyMap />}

      {/* Splash — top of stack until role chosen */}
      {(view === "splash" || !role) && <Splash />}

      {/* 15-sec emotional arc — auto-plays once when prospect first lands on
          the map. Guarded to view==="map" so deep-links into a zone never
          surface the arc on top of the zone overlay. */}
      {role && view === "map" && !heroArcSeen && <HeroArc />}

      {/* Zone overlay — slides over the map */}
      {view === "zone" && <ZoneOverlay />}

      {/* Brand-In-Place — the "I need to be here" moment */}
      {view === "brand" && <BrandInPlace />}

      {/* Sub-modules — Leasing / Sponsorship / Events / Venue */}
      {view === "submodule" && <SubmoduleRouter />}

      {/* Sales-rep heatmap — opened via ?rep=1 */}
      {view === "rep" && <SalesRepDashboard />}

      {/* Cinematic Mode — autoplay tour with VO + chapters */}
      <CinematicMode />
    </div>
  );
}
