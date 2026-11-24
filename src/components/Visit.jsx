import { SHOP } from "../data.js";
import { phoneClick } from "../ui/phone.js";

export default function Visit() {
  return (
    <section
      id="visit"
      className="relative py-24 md:py-32 px-[var(--pad)]"
      style={{ background: "radial-gradient(90% 80% at 20% 10%, #FFD9B8 0%, #FBF6EE 80%), #FBF6EE", color: "#231712" }}
    >
      <div className="mx-auto grid w-full max-w-[1280px] min-w-0 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-14">
        <div className="reveal min-w-0 max-w-full">
          <p className="eyebrow">Visit</p>
          <h2 className="display mt-3 text-[clamp(40px,8vw,88px)] font-semibold leading-[.98]">Come see us</h2>
          <address className="mt-6 not-italic text-[19px] leading-snug">
            <span className="block">{SHOP.street}</span>
            <span className="block">{SHOP.city}</span>
          </address>
          <p className="mt-2 text-[17px]" style={{ color: "rgba(35,23,18,.74)" }}>{SHOP.phone}</p>

          <a
            href={`tel:${SHOP.tel}`}
            onClick={phoneClick}
            className="pill pill-cherry pill-lg mt-8 w-full max-w-full sm:w-auto"
            style={{ minHeight: 68, fontSize: 19 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call {SHOP.phone}
          </a>
          <p className="mt-3 text-[13px]" style={{ color: "rgba(35,23,18,.74)" }}>
            Tap to dial on your phone · click to copy on desktop
          </p>

          <a className="pill mt-6" href={SHOP.mapsUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="reveal min-w-0 max-w-full">
          <div className="map-frame tactile relative aspect-[4/3] overflow-hidden md:aspect-[16/11]">
            <iframe
              src={SHOP.mapsEmbed}
              title="Map to Jenny's Nails"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
            <div
              className="pointer-events-none absolute right-3 top-3 max-w-[calc(100%-24px)] rounded-full px-3 py-1.5 text-[13px] font-semibold"
              style={{ background: "#FFFDF9", border: "1.5px solid #231712" }}
            >
              Jenny's Nails · Suite 104
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
