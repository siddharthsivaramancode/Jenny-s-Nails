// Services: generic names only, every price "Ask in salon" (data.js SERVICES, to confirm with owner).
// Color mood: Ballet Pink.
import { SERVICES, SERVICES_CONFIRMED, priceLabel, SHOP } from "../data.js";
import { phoneClick } from "../ui/phone.js";

const ICONS = {
  manicure: "M9 21V11a3 3 0 0 1 6 0v10M9 11c0-4 1-8 3-8s3 4 3 8",
  pedicure: "M6 20c-1-5 0-11 4-14 3-2 7 0 7 4 0 5-3 7-4 10M8 20h6",
  gel: "M8 3h8v5l2 3v10H6V11l2-3z M6 14h12",
  acrylic: "M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z",
  fill: "M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4",
  art: "M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-2a2 2 0 0 0-1 3.7A1.5 1.5 0 0 1 12 21zM7.5 11h.01M11 7.5h.01M15.5 8h.01",
};

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden px-[var(--pad)] py-24 md:py-32" style={{ background: "linear-gradient(180deg,#FDEFF3 0%,#F9D9E3 100%)" }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="reveal grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="display m-0 mt-3 text-[clamp(40px,6vw,84px)] font-semibold leading-[.95]">The menu,<br /><em className="font-medium text-[color:var(--cherry-ink)]">kept simple.</em></h2>
          </div>
          <div className="md:justify-self-end md:text-right">
            {!SERVICES_CONFIRMED && <span className="todo-tag">Service list · confirm with owner</span>}
            <p className="m-0 mt-3 max-w-[38ch] text-[16.5px] text-[color:var(--ink-2)]">
              Prices depend on length, shape and design. Ask in salon or call <a href={`tel:${SHOP.tel}`} onClick={phoneClick} className="font-semibold text-[color:var(--ink)] underline decoration-[color:var(--cherry)] decoration-2 underline-offset-4">{SHOP.phone}</a>.
            </p>
          </div>
        </div>

        <ul className="reveal m-0 mt-12 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, k) => (
            <li key={s.id} className="tactile group relative flex items-start gap-4 p-5 transition-transform duration-300 hover:-translate-y-1 md:p-6">
              <span className="grid h-12 w-12 flex-none place-items-center rounded-full border-[1.5px] border-[#231712]" style={{ background: ["#F7C6D3", "#C9B6F2", "#FFD9B8"][k % 3] }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#231712" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[s.id]} /></svg>
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="display m-0 text-[24px] font-semibold leading-tight">{s.name}</h3>
                <p className="m-0 mt-1 text-[15px] text-[color:var(--ink-2)]">{s.note}</p>
                <p className="m-0 mt-3 inline-block rounded-full border-[1.5px] border-dashed border-[#231712] px-3 py-0.5 text-[13px] font-semibold">{priceLabel(s.price)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
