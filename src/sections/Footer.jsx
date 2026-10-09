import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { CHAPTERS, scrollToChapter } from "../config/chapters";

gsap.registerPlugin(ScrollTrigger);

const stack = ["React", "GSAP & ScrollTrigger", "Tailwind CSS", "Vite"];

const socials = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Email", href: "mailto:you@example.com" },
];

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".footer-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative z-60 -mt-200 w-dvw overflow-hidden text-bone">

      <div className="h-40 bg-linear-to-b from-transparent to-ink md:h-56" />

      <div className="relative bg-ink">
        <div className="pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-7xl px-5 pb-8 sm:px-8">
          <div className="footer-reveal flex flex-col justify-evenly items-center gap-8 border-b border-bone/15 pb-10 md:flex-row md:items-center md:justify-between md:pb-14">
            <h2 className="font-long text-6xl text-center leading-[0.88] sm:text-7xl lg:text-9xl">
              AMIRMAHDI
              <br />
              SALAMAT
            </h2>

            <figure className="w-50 rounded-2xl">
              <img src="/images/IMG_0747.JPG" className="rounded-2xl"/>
            </figure>

            <button
              type="button"
              onClick={() => scrollToChapter("top")}
              className="group flex cursor-pointer items-center gap-3 self-start rounded-full border border-bone/50 px-6 py-3 text-sm transition-colors duration-300 hover:border-firefly hover:bg-firefly hover:text-ink md:self-auto"
            >
              Back to the beginning
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </button>

          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 md:py-14 lg:grid-cols-4">
            <div className="footer-reveal col-span-2 lg:col-span-1">
              <img src="/images/fireflies.svg" alt="" className="mb-5 w-12" />
              <p className="max-w-xs text-sm leading-relaxed text-ash md:text-base">
                A scroll-driven tribute to The Last of Us Part II, built as a
                motion and parallax study.
              </p>
            </div>

            {/* nav نیست چون index.css به همه‌ی nav ها position: fixed میده */}
            <div className="footer-reveal">
              <h3 className="mb-4 font-long text-2xl">Chapters</h3>
              <ul className="space-y-2.5 text-sm md:text-base">
                {CHAPTERS.map((c) => (
                  <li key={c.label}>
                    <button
                      type="button"
                      onClick={() => scrollToChapter(c.target, c.at)}
                      className="cursor-pointer text-bone/70 transition-colors duration-200 hover:text-firefly"
                    >
                      {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-reveal">
              <h3 className="mb-4 font-long text-2xl">Built with</h3>
              <ul className="space-y-2.5 text-sm text-bone/70 md:text-base">
                {stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="footer-reveal col-span-2 sm:col-span-1">
              <h3 className="mb-4 font-long text-2xl">Get in touch</h3>
              <ul className="flex flex-wrap gap-3 lg:flex-col lg:gap-2.5">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="inline-block rounded-full border border-bone/25 px-4 py-1.5 text-sm text-bone/80 transition-colors duration-200 hover:border-firefly hover:text-firefly md:text-base lg:rounded-none lg:border-0 lg:p-0"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-reveal flex flex-col gap-3 border-t border-bone/15 pt-6 text-xs text-bone/50 md:flex-row md:items-center md:justify-between md:text-sm">
            <p>© {new Date().getFullYear()} AmirMahdi. Fan-made, non-commercial project.</p>
            <p>
              The Last of Us is a trademark of Sony Interactive Entertainment. Game
              art belongs to Naughty Dog.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}