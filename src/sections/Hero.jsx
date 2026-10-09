import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Hero2 from "./Hero2";
import { PIN_END, addHold } from "../config/scroll";

gsap.registerPlugin(ScrollTrigger);

// اندازه‌ی نهایی لوگوی ماسک متناسب با عرض صفحه
const maskEndSize = () => {
  const w = window.innerWidth;
  if (w < 640) return "24%";
  if (w < 1024) return "12%";
  return "7%";
};

// کلمه‌هایی که بعد از «Look for» عوض میشن
const WORDS = ["the light.", "a reason.", "your people.", "a way home."];
// هر کلمه چند ثانیه روی صفحه بمونه
const WORD_HOLD = 2.6;

const Hero = () => {
  useGSAP(() => {
    // ───────── تایم‌لاین اصلی (بدون تغییر) ─────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: PIN_END,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to(".mask-wrapper", {
      maskSize: maskEndSize,
      WebkitMaskSize: maskEndSize,
      ease: "power1.out",
    });

    tl.to(
      ".scale-out",
      {
        scale: 0.9,
        ease: "none",
      },
      ">"
    );

    tl.to(
      ".mask-wrapper",
      {
        y: -180,
      },
      ">-=80%"
    ).to(".mask-wrapper", {
      opacity: 0,
      ease: "none",
    });

    tl.to(
      ".overlay-figure",
      {
        opacity: 1,
        ease: "none",
      },
      "<"
    ).to(
      ".entrance-message",
      {
        maskImage:
          "radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)",
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      },
      "-=0.8"
    );

    addHold(tl);

    // ───────── متن سمت چپ (جدا از تایم‌لاین اصلی) ─────────
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const words = gsap.utils.toArray(".hero-word");
    const bars = gsap.utils.toArray(".hero-bar");
    const splits = words.map((w) => new SplitType(w, { types: "chars" }));

    gsap.set(words, { autoAlpha: 1 });
    splits.forEach((s) => gsap.set(s.chars, { yPercent: 110, opacity: 0 }));

    // چرخه‌ی کلمه‌ها: حروف با چرخش و محو شدن از پایین میان، نوار زیرش پر میشه، بعد حروف به بالا میرن
    const loop = gsap.timeline({ repeat: -1, paused: true });
    let t = 0;
    splits.forEach((s, i) => {
      loop
        .fromTo(
          s.chars,
          { yPercent: 110, rotateX: -80, opacity: 0, filter: "blur(8px)" },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.035,
            ease: "power3.out",
          },
          t
        )
        .fromTo(
          bars[i],
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: WORD_HOLD, ease: "none" },
          t
        )
        .to(
          s.chars,
          {
            yPercent: -110,
            rotateX: 60,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.5,
            stagger: 0.02,
            ease: "power2.in",
          },
          t + WORD_HOLD
        )
        .to(
          bars[i],
          {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.4,
            ease: "power2.in",
          },
          t + WORD_HOLD
        );
      t += WORD_HOLD + 0.35;
    });

    // ورود: جمله‌ی کوچیک، بعد «Look for»، بعد کلمه‌ها شروع به چرخیدن می‌کنن
    gsap
      .timeline({ delay: 0.4 })
      .from(".hero-kicker > span", {
        yPercent: 110,
        duration: 0.9,
        ease: "power3.out",
      })
      .from(
        ".hero-static > span",
        { yPercent: 110, duration: 1, ease: "power4.out" },
        "<0.12"
      )
      .from(
        ".hero-meta",
        { autoAlpha: 0, y: 14, duration: 0.8, ease: "power2.out" },
        "<0.5"
      )
      .add(() => {
        if (reduceMotion)
          gsap.set(splits[0].chars, { yPercent: 0, opacity: 1 });
        else loop.play();
      }, "<0.1");

    // ───────── راهنمای اسکرول (جدا از تایم‌لاین اصلی) ─────────
    // ورود: خط از بالا کشیده میشه و کلمه‌ها از پایین بالا میان
    gsap
      .timeline({ delay: 0.6 })
      .from(".hint-track", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.9,
        ease: "power2.out",
      })
      .from(
        ".hint-word",
        { yPercent: 110, duration: 0.9, ease: "power3.out", stagger: 0.12 },
        "<0.15"
      );

    // راهنمای اسکرول با اولین اسکرول آروم محو میشه
    gsap.to(".scroll-hint", {
      autoAlpha: 0,
      y: 24,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "+=180",
        scrub: true,
      },
    });

    // متن سمت چپ داخل ماسکه و همراه عکس اول ناپدید میشه؛
    // وقتی دیگه دیده نمیشه، چرخه‌ی کلمه‌ها متوقف میشه
    ScrollTrigger.create({
      trigger: ".hero-section",
      start: "top top",
      end: "+=100%",
      onLeave: () => loop.pause(),
      onEnterBack: () => !reduceMotion && loop.play(),
    });
    
    return () => splits.forEach((s) => s.revert());
  }, []);

    return (
    <section className="hero-section">
      {/* متن سمت چپ داخل همین figure هست تا با ماسک عکس اول کوچیک و ناپدید بشه */}
      <figure className="relative size-full mask-wrapper">
        <img src="/images/wp2243855-tlou-wallpapers.jpg" className="scale-out" alt="" />

        {/* سایه‌ی تیره پشت متن تا روی عکس خوانا باشه */}
        <div className="hero-shade pointer-events-none absolute inset-0 z-20 bg-linear-to-t from-ink/90 via-ink/40 to-transparent md:bg-linear-to-r md:from-ink/80 md:via-ink/30 md:to-transparent" />

        {/* متن سمت چپ — موبایل: پایین صفحه، از md به بالا: وسط سمت چپ */}
        <div className="absolute inset-x-5 bottom-44 z-30 md:inset-x-auto md:bottom-auto md:left-10 md:top-1/2 md:-translate-y-1/2 lg:left-16 xl:left-24">
          <div className="hero-copy">
            <p className="hero-kicker overflow-hidden">
              <span className="block text-sm text-bone/60 md:text-base">
                When you&apos;re lost in the darkness
              </span>
            </p>

            <h2 className="mt-3 font-long text-[15vw] leading-[0.9] text-bone md:mt-4 md:text-[min(6rem,11vh)] xl:text-[min(8rem,12vh)]">
              <span className="hero-static block overflow-hidden">
                <span className="block">Look for</span>
              </span>

              {/* کلمه‌های چرخان */}
              <span
                className="relative block h-[1.05em] overflow-hidden text-firefly drop-shadow-[0_0_24px_rgba(232,196,106,0.35)]"
                style={{ perspective: "600px" }}
                aria-live="off"
              >
                {WORDS.map((word) => (
                  <span
                    key={word}
                    className="hero-word invisible absolute left-0 top-0 whitespace-nowrap"
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h2>

            <div className="hero-meta mt-6 md:mt-8">
              {/* نوار پیشرفت هر کلمه */}
              <div className="flex gap-2" aria-hidden="true">
                {WORDS.map((word) => (
                  <span key={word} className="relative h-px w-8 overflow-hidden bg-bone/20 md:w-12">
                    <span
                      className="hero-bar absolute inset-0 bg-firefly"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                ))}
              </div>

              <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/60 md:max-w-sm md:text-base">
                Twenty years after the outbreak, the world belongs to whoever
                refuses to stop.
              </p>
            </div>
          </div>
        </div>
      </figure>

      <figure className="overlay-figure opacity-0 z-20 w-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[320px] inset-0">
        <img src="/images/white-us-logo.svg" className="h-72" alt="" />
      </figure>

      {/* راهنمای اسکرول — گوشه‌ی پایین سمت چپ */}
      <div
        className="scroll-hint pointer-events-none absolute bottom-8 left-5 z-30 flex items-end gap-4 md:bottom-12 md:left-10 md:gap-5"
        aria-hidden="true"
      >
        <div className="hint-track relative h-24 w-px overflow-hidden bg-bone/25 md:h-32">
          <span className="hint-dot absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-firefly shadow-[0_0_12px_3px_rgba(232,196,106,0.7)]" />
        </div>

        <div className="flex flex-col gap-2 pb-0.5">
          <span className="overflow-hidden">
            <span className="hint-word block font-long text-3xl leading-none text-bone md:text-4xl">
              Scroll
            </span>
          </span>
          <span className="overflow-hidden">
            <span className="hint-word block text-xs text-bone/60 md:text-sm">
              to step into the story
            </span>
          </span>
        </div>
      </div>

      <Hero2 />
    </section>
  );
};


export default Hero;
