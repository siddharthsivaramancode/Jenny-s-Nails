// Hero: drifting pink/lilac/peach mesh gradient, the rotating 3D polish bottle with orbiting nail tips,
// headline, "Call to book" and the live open/closed pill (America/Chicago, hours unconfirmed).
import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { SHOP } from "../data.js";
import { phoneClick } from "../ui/phone.js";
import { reducedMotion } from "../scroll.js";
import OpenPill from "./OpenPill.jsx";

const PolishScene = lazy(() => import("../three/PolishScene.jsx"));

export const PhoneIcon = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export default function Hero() {
  const root = useRef(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".h-line > span", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.1 });
      gsap.from(".h-fade", { y: 18, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.5 });
      gsap.from(".h-stage", { scale: 0.9, opacity: 0, duration: 1.6, ease: "expo.out", delay: 0.2 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="mesh relative isolate overflow-hidden pt-24 md:pt-28">
      <div className="mx-auto grid min-h-[calc(100svh-6rem)] w-full max-w-[1280px] items-center gap-4 px-[var(--pad)] pb-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
        <div className="relative z-10 order-2 md:order-1">
          <div className="h-fade mb-5 flex flex-wrap items-center gap-2">
            <OpenPill />
            <span className="open-pill" style={{ background: "#FFFDF9" }}>Collierville, TN</span>
          </div>
          <h1 className="display m-0 text-[clamp(46px,8.4vw,112px)] font-semibold leading-[.92]">
            <span className="h-line block overflow-hidden pb-[.08em]"><span className="block">Nails you’ll</span></span>
            <span className="h-line block overflow-hidden pb-[.08em]"><span className="block"><em className="pearl-text font-medium">love</em> to look</span></span>
            <span className="h-line block overflow-hidden pb-[.08em]"><span className="block">down at.</span></span>
          </h1>
          <p className="h-fade m-0 mt-5 max-w-[40ch] text-[18px] leading-relaxed text-[color:var(--ink-2)]">
            Manicures, pedicures, gel, acrylics and nail art on South Houston Levee Road. Give us a call to book your spot.
          </p>
          <div className="h-fade mt-7 flex flex-wrap items-center gap-3">
            <a href={`tel:${SHOP.tel}`} onClick={phoneClick} className="pill pill-cherry pill-lg">
              <PhoneIcon /> Call to book
            </a>
            <a href="#popular" className="pill">See popular styles</a>
          </div>
          <p className="h-fade m-0 mt-4 text-[14px] text-[color:var(--ink-2)]">{SHOP.phone} · {SHOP.street}</p>
        </div>

        <div className="h-stage relative order-1 h-[min(52svh,460px)] w-full min-w-0 md:order-2 md:h-[min(78svh,680px)]">
          <div aria-hidden="true" className="pearl absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-2xl" />
          <Suspense fallback={null}>
            <PolishScene className="absolute inset-0" color="#E0284F" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
