import { useState } from "react";
import { useDeck } from "../../hooks/useDeck";
import BrandIntake from "./BrandIntake";
import BrandReveal from "./BrandReveal";
import BrandProposal from "./BrandProposal";

/**
 * Container for the Brand-In-Place flow. Three internal phases:
 *   intake   → form (name, logo, tier, footprint, season, email)
 *   reveal   → cinematic 3-composite reveal + Why-MOA + pricing
 *   proposal → printable PDF-ready proposal view
 *
 * The flow is gated behind a single dispatch: useDeck.openBrand(). When
 * a brand has been generated and the prospect dismisses the screen, the
 * brand persists in deck state — so opening Brand-In-Place again jumps
 * straight to reveal (with an EDIT INPUTS button to revise).
 */
export default function BrandInPlace() {
  const { brand, setBrand, closeBrand } = useDeck();
  const [phase, setPhase] = useState(brand?.name ? "reveal" : "intake");

  function handleGenerate(b) {
    setBrand(b);
    setPhase("reveal");
  }

  function handleEdit() {
    setPhase("intake");
  }

  function handleProposal() {
    setPhase("proposal");
  }

  if (phase === "intake") {
    return (
      <BrandIntake
        onGenerate={handleGenerate}
        onClose={closeBrand}
        initial={brand}
      />
    );
  }

  if (phase === "reveal" && brand) {
    return (
      <BrandReveal
        brand={brand}
        onClose={closeBrand}
        onProposal={handleProposal}
        onEdit={handleEdit}
      />
    );
  }

  if (phase === "proposal" && brand) {
    return (
      <BrandProposal
        brand={brand}
        onClose={() => setPhase("reveal")}
      />
    );
  }

  return null;
}
