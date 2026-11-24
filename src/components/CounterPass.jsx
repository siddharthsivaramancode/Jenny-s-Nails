// "Show at counter": pick a service and a style, then open a full-screen pass to show staff.
// Nothing is sent anywhere. Color mood: Lilac → espresso pass.
import { useEffect, useRef, useState } from "react";
import { SERVICES, PASS_STYLES, SHOP } from "../data.js";
import { uiActions, useUI } from "../ui/store.js";
import { useDialog } from "../ui/useDialog.js";
import { lockScroll } from "../scroll.js";
import { phoneClick } from "../ui/phone.js";

function Chips({ label, items, value, onChange }) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="eyebrow mb-3">{label}</legend>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
        {items.map((it) => (
          <button key={it} type="button" role="radio" aria-checked={value === it} onClick={() => onChange(it)} className="chip">{it}</button>
        ))}
      </div>
    </fieldset>
  );
}

export default function CounterPass() {
  const [service, setService] = useState(SERVICES[0].name);
  const [style, setStyle] = useState(PASS_STYLES[0]);
  return (
    <section id="counter" className="relative overflow-hidden px-[var(--pad)] py-24 md:py-32" style={{ background: "linear-gradient(160deg,#EFE7FD 0%,#FBF6EE 60%,#FDE8EF 100%)" }}>
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="reveal">
          <p className="eyebrow">Show at counter</p>
          <h2 className="display m-0 mt-3 text-[clamp(40px,6vw,80px)] font-semibold leading-[.95]">Know what you want?<br /><em className="pearl-text font-medium">Just show us.</em></h2>
          <p className="m-0 mt-5 max-w-[42ch] text-[17px] text-[color:var(--ink-2)]">Pick a service and a style, then hold up your phone at the front desk. It's just a note for the staff: nothing gets booked or sent.</p>
        </div>
        <div className="reveal tactile grid min-w-0 gap-7 p-6 md:p-8">
          <Chips label="1 · Service" items={SERVICES.map((s) => s.name)} value={service} onChange={setService} />
          <Chips label="2 · Style" items={PASS_STYLES} value={style} onChange={setStyle} />
          <button type="button" className="pill pill-cherry pill-lg w-full sm:w-auto sm:justify-self-start" onClick={(e) => uiActions.openPass({ service, style, opener: e.currentTarget })}>
            Open my counter pass
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6M10 14L21 3M21 14v7H3V3h7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function PassDialog({ pass }) {
  const ref = useRef(null);
  const close = () => uiActions.closePass();
  useEffect(() => { lockScroll(true); return () => lockScroll(false); }, []);
  useDialog(ref, close, pass.opener);
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Counter pass" data-lenis-prevent
      className="fixed inset-0 z-[110] flex flex-col overflow-y-auto" style={{ background: "#231712", color: "#FFFDF9" }}>
      <div className="mx-auto flex w-full max-w-[640px] flex-1 flex-col justify-center px-5 py-10">
        <div className="sc-in rounded-[28px] border-[1.5px] border-[#FFFDF9] p-6 text-[#231712] md:p-9" style={{ background: "linear-gradient(150deg,#F7C6D3,#C9B6F2 60%,#FFD9B8)", boxShadow: "6px 6px 0 #E0284F" }}>
          <p className="eyebrow">Jenny's Nails · Counter pass</p>
          <p className="m-0 mt-6 text-[14px] font-semibold uppercase tracking-[.12em] opacity-70">Service</p>
          <p className="display m-0 text-[clamp(38px,10vw,64px)] font-semibold leading-none">{pass.service}</p>
          <p className="m-0 mt-6 text-[14px] font-semibold uppercase tracking-[.12em] opacity-70">Style</p>
          <p className="display m-0 text-[clamp(28px,7vw,44px)] font-medium leading-tight">{pass.style}</p>
          <div className="my-7 border-t-[1.5px] border-dashed border-[#231712]" />
          <p className="m-0 text-[16px] font-semibold">{SHOP.street}</p>
          <p className="m-0 text-[16px]">{SHOP.city}</p>
          <a href={`tel:${SHOP.tel}`} onClick={phoneClick} className="m-0 mt-1 inline-block text-[18px] font-bold text-[#231712]">{SHOP.phone}</a>
        </div>
        <p className="m-0 mt-5 text-center text-[14px] opacity-75">Show this screen to the staff. Price: ask in salon.</p>
        <button type="button" data-autofocus onClick={close} className="pill mt-5 self-center">Close pass</button>
      </div>
    </div>
  );
}

export function PassHost() {
  const { pass } = useUI();
  return pass ? <PassDialog pass={pass} /> : null;
}
