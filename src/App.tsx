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
 * View orchestration — the new App.
 *
 *   splash    → Splash (cinematic open + role gate)
 *   map       → PropertyMap hub
 *   zone      → ZoneOverlay (atmosphere bed + editorial card, mode-driven)
 *   submodule → coming Day 3
 *   brand     → coming Day 3
 *   rep       → coming Day 4
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

      {/* 15-sec emotional arc — auto-plays once after role gate dismisses */}
      {role && view !== "splash" && !heroArcSeen && <HeroArc />}

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
