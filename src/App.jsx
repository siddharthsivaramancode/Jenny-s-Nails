import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SHOP } from "./data.js";
import { initSmoothScroll, scrollToTarget, reducedMotion } from "./scroll.js";
import { phoneClick } from "./ui/phone.js";
import Hero, { PhoneIcon } from "./components/Hero.jsx";
import Showcase from "./components/Showcase.jsx";
import Services from "./components/Services.jsx";
import About from "./components/About.jsx";
import Gallery from "./components/Gallery.jsx";
import CounterPass, { PassHost } from "./components/CounterPass.jsx";
import Visit from "./components/Visit.jsx";
import Toast from "./components/Toast.jsx";
import OpenPill from "./components/OpenPill.jsx";

const LINKS = [["#popular", "Popular"], ["#services", "Services"], ["#gallery", "Gallery"], ["#visit", "Visit"]];

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stop = initSmoothScroll();
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // in-page anchors glide via Lenis
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (!el) return;
      e.preventDefault();
      scrollToTarget(el);
    };
    document.addEventListener("click", onClick);

    // section reveals
    let ctx;
    if (!reducedMotion()) {
      ctx = gsap.context(() => {
        gsap.utils.toArray(".reveal").forEach((el) => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });
      });
      const t = setTimeout(() => ScrollTrigger.refresh(), 800);
      return () => { clearTimeout(t); stop(); ctx.revert(); window.removeEventListener("scroll", onScroll); document.removeEventListener("click", onClick); };
    }
    return () => { stop(); window.removeEventListener("scroll", onScroll); document.removeEventListener("click", onClick); };
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-[#FFFDF9] focus:px-4 focus:py-2">Skip to content</a>
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#top" className="display whitespace-nowrap text-[22px] font-semibold text-[#231712] no-underline">
          Jenny's <em className="font-normal text-[color:var(--cherry)]">Nails</em>
        </a>
        <nav aria-label="Sections" className="nav-links ml-auto hidden gap-6 md:flex">
          {LINKS.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <a href={`tel:${SHOP.tel}`} onClick={phoneClick} className="pill pill-cherry ml-auto !min-h-[40px] !px-4 text-[14px] md:ml-0" aria-label={`Call ${SHOP.phone}`}>
          <PhoneIcon s={15} /><span className="hidden sm:inline">Call</span>
        </a>
      </header>

      <main id="main">
        <Hero />
        <Showcase />
        <Services />
        <About />
        <Gallery />
        <CounterPass />
        <Visit />
      </main>

      <footer className="border-t-[1.5px] border-[#231712] bg-[#231712] px-[var(--pad)] py-12 text-[#FFFDF9]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="display m-0 text-[clamp(40px,7vw,88px)] font-semibold leading-none">Jenny's <em className="font-normal text-[color:var(--ballet)]">Nails</em></p>
            <p className="m-0 mt-3 opacity-80">{SHOP.address}</p>
            <a href={`tel:${SHOP.tel}`} onClick={phoneClick} className="font-semibold text-[#FFFDF9]">{SHOP.phone}</a>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <OpenPill className="text-[#231712]" />
            <p className="m-0 max-w-[44ch] text-[13px] opacity-60 md:text-right">Demo preview, not the salon's official website. Hours, styles, services and photos are placeholders until confirmed by the owner.</p>
          </div>
        </div>
      </footer>

      <PassHost />
      <Toast />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
