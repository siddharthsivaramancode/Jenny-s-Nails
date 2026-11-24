// About: a short, warm paragraph with no specific claims (data.js ABOUT, to confirm with owner).
// Color mood: Milky cream + pearl.
import { ABOUT } from "../data.js";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-[var(--pad)] py-24 md:py-36">
      <div aria-hidden="true" className="pearl pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full border-[1.5px] border-[#231712] opacity-80 md:h-[420px] md:w-[420px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-16 bottom-8 h-40 w-40 rounded-full border-[1.5px] border-[#231712] bg-[color:var(--ballet)] md:h-56 md:w-56" />
      <div className="reveal relative mx-auto max-w-[920px] text-center">
        <p className="eyebrow">About</p>
        <h2 className="display m-0 mt-4 text-[clamp(38px,6vw,80px)] font-semibold leading-[.98]">{ABOUT.heading}</h2>
        <p className="mx-auto m-0 mt-6 max-w-[56ch] text-[clamp(18px,1.6vw,21px)] leading-relaxed text-[color:var(--ink-2)]">{ABOUT.body}</p>
        {!ABOUT.confirmed && <span className="todo-tag mt-6">Placeholder copy · confirm with owner</span>}
      </div>
    </section>
  );
}
