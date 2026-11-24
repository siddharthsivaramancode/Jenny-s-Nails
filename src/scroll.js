// Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger stays in sync.
// Off under prefers-reduced-motion (native scroll). scrollToTarget(el) for in-page jumps.
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
let lenis = null;

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initSmoothScroll() {
  if (reducedMotion() || lenis) return () => {};
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  return () => { gsap.ticker.remove(raf); lenis.destroy(); lenis = null; };
}

export const lockScroll = (on) => { if (lenis) on ? lenis.stop() : lenis.start(); };

export function scrollToTarget(el, offset = -72) {
  if (lenis) { lenis.scrollTo(el, { offset, duration: 1.3 }); return; }
  const y = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: y, behavior: reducedMotion() ? "auto" : "smooth" });
}
