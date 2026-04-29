import { useDeck } from "../../hooks/useDeck";
import LeasingPaths from "./LeasingPaths";
import SponsorshipTiers from "./SponsorshipTiers";
import EventsBooking from "./EventsBooking";
import VenueSpecs from "./VenueSpecs";

/**
 * Resolves the active submodule id from useDeck and renders the matching
 * deep-dive component. Each zone CTA fires `openSubmodule(id)` with one
 * of: "leasing" · "sponsorship" · "events" · "venue".
 *
 * Zones declare their preferred sub-module in `zone.submodule` (zones.js):
 *   retail / luxury / dining   → "leasing"
 *   nick / sealife / hotel     → "venue"
 *   rotunda                    → "events"
 * "sponsorship" is reachable via the mode switcher Sponsor lens.
 */
export default function SubmoduleRouter() {
  const { submodule } = useDeck();
  switch (submodule) {
    case "leasing":
      return <LeasingPaths />;
    case "sponsorship":
      return <SponsorshipTiers />;
    case "events":
      return <EventsBooking />;
    case "venue":
      return <VenueSpecs />;
    default:
      return null;
  }
}
