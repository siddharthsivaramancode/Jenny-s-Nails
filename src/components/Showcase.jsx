// "Most popular nails": full-bleed 3-slide showcase (pills, arrows, arrow keys, swipe). Each slide floods
// the section with its color, swaps the giant background type and recolors the 3D bottle.
// Styles are generic placeholders (data.js POPULAR) to confirm with the owner.
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { POPULAR, SHOP } from "../data.js";
import { phoneClick } from "../ui/phone.js";
import { PhoneIcon } from "./Hero.jsx";

const PolishScene = lazy(() => import("../three/PolishScene.jsx"));

const Arrow = ({ dir }) => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir < 0 ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"} />
  </svg>
);

export default function Showcase() {
  const [i, setI] = useState(0);
  const sec = useRef(null);
  const swipe = useRef(null);
  const s = POPULAR[i];
  const go = (n) => setI((n + POPULAR.length) % POPULAR.length);

  // horizontal swipe on touch/pen; vertical scroll stays native (touch-action: pan-y)
  useEffect(() => {
    const el = sec.current;
    const down = (e) => { if (e.pointerType !== "mouse") swipe.current = { x: e.clientX, y: e.clientY }; };
    const up = (e) => {
      const st = swipe.current; swipe.current = null;
      if (!st) return;
      const dx = e.clientX - st.x, dy = e.clientY - st.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) setI((n) => (n + (dx < 0 ? 1 : -1) + POPULAR.length) % POPULAR.length);
    };
    const cancel = () => { swipe.current = null; };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", cancel);
    return () => { el.removeEventListener("pointerdown", down); el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", cancel); };
  }, []);

  const onKey = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
  };

  return (
    <section ref={sec} id="popular" aria-roledescription="carousel" aria-label="Most popular nails" onKeyDown={onKey}
      className="relative isolate flex min-h-[max(92svh,660px)] w-full items-center overflow-hidden border-y-[1.5px] border-[#231712]"
      style={{ touchAction: "pan-y", color: s.ink }}>
      {POPULAR.map((x, k) => (
        <div key={x.n} aria-hidden="true" className="sc-flood absolute inset-0 -z-10" style={{ opacity: k === i ? 1 : 0,
          background: `radial-gradient(120% 95% at 50% 50%, ${x.flood} 40%, ${x.glow} 130%)`, boxShadow: `inset 0 0 180px 30px ${x.glow}88` }} />
      ))}

      <div key={"big" + i} aria-hidden="true" className="sc-big pointer-events-none absolute inset-0 -z-[5] flex flex-col items-center justify-center text-center">
        {s.big.map((line) => <span key={line} className="block">{line}</span>)}
      </div>

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-6 px-[var(--pad)] py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="md:order-1">
          <p className="eyebrow">Most popular nails</p>
          <p className="display m-0 mt-5 text-[64px] font-bold leading-none tabular-nums">{s.n}<span className="text-[24px] font-medium opacity-60"> / 03</span></p>
          <span className="todo-tag mt-5">Sample styles · confirm with owner</span>
        </div>

        <div className="relative order-first h-[min(48svh,440px)] w-full min-w-0 md:order-2 md:h-[min(64svh,580px)]">
          <Suspense fallback={null}>
            <PolishScene className="absolute inset-0" color={s.bottle} zoom={1.08} />
          </Suspense>
        </div>

        <div className="md:order-3">
          <div aria-live="polite">
            <h2 key={"t" + i} className="sc-in display m-0 text-[clamp(34px,3.6vw,50px)] font-semibold leading-[1.02]">{s.title}</h2>
            <p key={"b" + i} className="sc-in m-0 mt-3 max-w-[34ch] text-[16.5px] leading-relaxed opacity-85">{s.blurb}</p>
          </div>
          <a href={`tel:${SHOP.tel}`} onClick={phoneClick} className="pill pill-cherry mt-6"><PhoneIcon s={16} /> Call to book this look</a>
          <div className="mt-8 flex items-center gap-2">
            <button type="button" onClick={() => go(i - 1)} aria-label="Previous style" className="sc-arrow"><Arrow dir={-1} /></button>
            <div role="tablist" aria-label="Choose a style" className="flex gap-2">
              {POPULAR.map((x, k) => (
                <button key={x.n} type="button" role="tab" aria-selected={k === i} aria-label={`${x.n}: ${x.title}`} onClick={() => go(k)}
                  className={`sc-pill ${k === i ? "is-on" : ""}`}>{x.n}</button>
              ))}
            </div>
            <button type="button" onClick={() => go(i + 1)} aria-label="Next style" className="sc-arrow"><Arrow dir={1} /></button>
          </div>
          <p className="m-0 mt-3 text-[13px] opacity-70">Swipe, use the arrow keys, or tap a number.</p>
        </div>
      </div>
    </section>
  );
}
