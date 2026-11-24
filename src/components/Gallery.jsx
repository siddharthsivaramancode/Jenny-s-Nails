import { useEffect, useRef } from "react";
import { PHOTO_CREDITS } from "../photoCredits.js";

const MAX = 8;

export default function Gallery() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const cards = Array.from(grid.querySelectorAll("[data-tilt]"));
    const cleanups = cards.map((el) => {
      const shine = el.querySelector(".tilt-shine");
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const ry = (px - 0.5) * 2 * MAX;
        const rx = -(py - 0.5) * 2 * MAX;
        el.style.transition = "transform .08s linear, box-shadow .5s";
        el.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.02)`;
        if (shine) {
          shine.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
          shine.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
        }
      };
      const leave = () => {
        el.style.transition = "";
        el.style.transform = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => cleanups.forEach((f) => f());
  }, []);

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 px-[var(--pad)]"
      style={{ background: "linear-gradient(180deg,#F1EAFD,#E8DEFB), #FBF6EE", color: "#231712" }}
    >
      <div className="mx-auto w-full max-w-[1280px] min-w-0">
        <div className="reveal min-w-0 max-w-[720px]">
          <p className="eyebrow">Gallery</p>
          <h2 className="display mt-3 text-[clamp(40px,8vw,88px)] font-semibold leading-[.98]">
            A little inspiration
          </h2>
          <div className="mt-5">
            <span className="todo-tag">Stand-in photos · swap for the salon's own</span>
          </div>
          <p className="mt-4 max-w-[56ch] text-[16px]" style={{ color: "rgba(35,23,18,.74)" }}>
            These are placeholder photos from Wikimedia Commons, not work from Jenny's Nails.
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal mt-12 grid min-w-0 max-w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-7"
          style={{ perspective: "1200px" }}
        >
          {PHOTO_CREDITS.slice(0, 6).map((p) => (
            <figure
              key={p.file}
              data-tilt
              className="tilt relative m-0 flex min-w-0 flex-col overflow-hidden rounded-[22px]"
              style={{ border: "1.5px solid #231712", boxShadow: "5px 5px 0 #231712", background: "#FFFDF9" }}
            >
              <img
                src={`./photos/${p.file}`}
                alt={p.alt}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="tilt-shine pointer-events-none absolute inset-0" />
              <figcaption
                className="px-4 py-3 text-[14px] font-semibold"
                style={{ background: "#FFFDF9", borderTop: "1.5px solid #231712" }}
              >
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 max-w-full text-[12px] opacity-70">
          Photos: Wikimedia Commons ·{" "}
          {PHOTO_CREDITS.slice(0, 6).map((p, i) => (
            <span key={p.file}>
              {i > 0 && " · "}
              <a href={p.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                {p.artist}, {p.license}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
