import { useEffect } from "react";
import Effects from "@/components/breach/Effects";
import Hud from "@/components/breach/Hud";
import Hero from "@/components/breach/Hero";
import Recon from "@/components/breach/Recon";
import Contain from "@/components/breach/Contain";
import Patch from "@/components/breach/Patch";
import Neutralize from "@/components/breach/Neutralize";
import Secured from "@/components/breach/Secured";
import ThreatMap from "@/components/breach/ThreatMap";
import Dossier from "@/components/breach/Dossier";
import Contact from "@/components/breach/Contact";
import Terminal from "@/components/breach/Terminal";
import { initCore } from "@/breach/core";

// BREACH → DEFEND: the page loads "under attack"; scrolling is the defense.
// Light behaviour (scroll meter, typing, terminal, tick) starts at once; the Three.js globes
// arrive as a separate lazy chunk after first paint so the hero is interactive immediately.
const Index = () => {
  useEffect(() => {
    const stopCore = initCore();
    let stopGlobes: (() => void) | undefined;
    let cancelled = false;
    const load = () =>
      import("@/breach/globes")
        .then((m) => { if (!cancelled) stopGlobes = m.startGlobes(); })
        .catch((e) => console.error("3D failed to load", e));
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) ric(load, { timeout: 700 }); else setTimeout(load, 60);
    return () => { cancelled = true; stopCore(); stopGlobes?.(); };
  }, []);

  return (
    <>
      <Effects />
      <Hud />
      <main id="top">
        <Hero />
        <Recon />
        <Contain />
        <Patch />
        <Neutralize />
        <Secured />
        <ThreatMap />
        <Dossier />
        <Contact />
      </main>
      <Terminal />
    </>
  );
};

export default Index;
