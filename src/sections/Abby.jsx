import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import RowScroll from "./RowScroll";
import { pinEnd, addHold } from "../config/scroll";
import { scrollToChapter } from "../config/chapters";

gsap.registerPlugin(ScrollTrigger);

export default function Abby() {
  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    const splitH3 = new SplitType(".abby-item", {
      types: "chars",
    });

    gsap.set(".abby-title-top", { x: isMobile ? 400 : 1100 });
    gsap.set(".abby-title-bottom", { x: isMobile ? -200 : -600 });

    gsap.set(splitH3.chars, { y: 80, opacity: 0 });
    gsap.set(".abby-parag", { opacity: 0, y: 30 });
    gsap.set(".btn", { opacity: 0, x: -100 });
    gsap.set(".img", { opacity: 0, x: 200 });
    gsap.set([".mask-one", ".mask-two", ".mask-three"], {
      scaleY: 1,
      transformOrigin: "bottom",
    });
    gsap.set(".rowScroll", { x: "100vw" });
    gsap.set(".row-img", { opacity: 0, scale: 0.6, filter: "blur(10px)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".abbySec",
        start: "top top",
        // انیمیشن Abby چند برابر بقیه‌ست، پس اسکرول بیشتری می‌گیره
        end: pinEnd(3),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(".abby-title-top", { x: 0, duration: 1.6, ease: "power3.out" });
    tl.to(
      ".abby-title-bottom",
      {
        x: isMobile ? 100 : 590,
        duration: 1.6,
        ease: "power3.out",
      },
      "<"
    );

    tl.to(splitH3.chars, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.035,
    });

    tl.to(".abby-parag", { opacity: 1, y: 0, duration: 0.5 })
      .to(".btn", { opacity: 1, x: 0, ease: "power1.inOut" })
      .to(".img", {
        delay: 0.7,
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.5,
      });

    tl.to(
      [".mask-one", ".mask-two", ".mask-three"],
      {
        delay: 0.3,
        scaleY: 0,
        duration: 0.8,
        ease: "power3.inOut",
      },
      ">"
    )
      .to(".img-scale", { scale: 1 }, ">")
      .to(".rowScroll", { x: 0, duration: 1.6, ease: "power1.in" })
      .to(".row-img", {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.2,
        scale: 0.95,
      })
      .to(".row-img", {
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 1.2,
        duration: 2,
        stagger: 0.2,
      })
      .to(".row-img", {
        delay: 1,
        top: isMobile ? "85%" : "80%",
        left: (i, el, targets) => {
          const total = targets.length;
          const imgWidth = el.offsetWidth;
          const screen = window.innerWidth;
          // اگه جا نشد، عکس‌ها یه کم روی هم میرن تا از صفحه بیرون نزنن
          const fitGap = (screen - total * imgWidth) / (total - 1);
          const gap = Math.min(isMobile ? 0 : 10, fitGap);
          const totalWidth = total * imgWidth + (total - 1) * gap;
          const start = (screen - totalWidth) / 2;
          return start + i * (imgWidth + gap);
        },
        xPercent: 0,
        yPercent: -50,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
      })
      .to(".row-intro", {
        y: -100,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      })
      .to(".row-intro", {
        y: -200,
        opacity: 0,
        duration: 1,
        ease: "power3.in",
      })
      .to(
        ".row-img",
        {
          top: "20%",
          duration: 1.8,
          ease: "power1.inOut",
        },
        "+=3"
      );

    addHold(tl);

    return () => splitH3.revert();
  });

  return (
    <section className="abbySec relative flex h-dvh w-dvw overflow-hidden bg-ink">
      {/* تیتر توخالی بالا */}
      <div className="abby-title-top absolute top-16 w-dvw md:top-6">
        <h1 className="text-outline whitespace-nowrap font-long text-4xl uppercase leading-none text-rust/60 md:text-7xl xl:text-9xl">
          The other side
        </h1>
      </div>

      {/* تیتر توخالی پایین */}
      <div className="abby-title-bottom absolute bottom-4 w-dvw md:bottom-6">
        <h2 className="text-outline whitespace-nowrap font-long text-4xl uppercase leading-none text-bone/30 md:text-7xl xl:text-9xl">
          Abby Anderson
        </h2>
      </div>

      {/* محتوای اصلی — موبایل و تبلت: یک ستون، لپ‌تاپ به بالا: دو ستون */}
      <div className="z-10 flex h-dvh w-full flex-col justify-center gap-6 px-5 md:gap-9 md:px-10 lg:w-1/2 lg:ps-16">
        <h3 className="abby-item overflow-hidden font-long text-6xl leading-[0.88] text-bone md:text-8xl xl:text-9xl">
          Same war.
          <br />
          Other side.
        </h3>

        <p className="abby-parag max-w-md text-base leading-relaxed text-bone/75 md:text-lg">
          Abby trained for years to become someone who could not be broken.
          A soldier of the Washington Liberation Front, she carries a grief as
          heavy as Ellie&apos;s, and she believes just as strongly that she is in
          the right.
        </p>

        <button
          type="button"
          onClick={() => scrollToChapter(".endSec")}
          className="btn group flex h-12 w-fit cursor-pointer items-center gap-3 rounded-full border border-rust px-6 text-sm text-bone transition-colors duration-300 hover:bg-rust md:text-base"
        >
          Jump to the ending
          <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
            ↓
          </span>
        </button>
      </div>

      {/* روی تبلت جا نمی‌شد و روی متن می‌افتاد، برای همین از lg نمایش داده میشه */}
      <div className="relative hidden h-dvh lg:block lg:w-1/2">
        <div className="img my-box absolute top-32 h-50 w-100 overflow-hidden rounded-sm md:right-15 xl:right-30 xl:h-80 xl:w-140">
          <img
            src="/images/abby1.jpg"
            className="img-scale h-full w-full scale-120 object-cover"
            alt="Abby"
          />
          <div className="mask-one absolute inset-0 bg-black/70" />
        </div>

        <div className="img my-box absolute top-68 -left-10 overflow-hidden rounded-sm md:top-66 md:-left-20 md:h-50 md:w-80 xl:h-60 xl:w-110">
          <img
            src="/images/abby2.jpg"
            className="img-scale h-full w-full scale-120 object-cover"
            alt="Abby"
          />
          <div className="mask-two absolute inset-0 bg-black/70" />
        </div>

        <div className="img my-box absolute top-90 overflow-hidden rounded-sm md:right-10 md:w-60 xl:right-40 xl:h-50 xl:w-80">
          <img
            src="/images/abby1.webp"
            className="img-scale h-full w-full scale-120 object-cover"
            alt="Abby"
          />
          <div className="mask-three absolute inset-0 bg-black/70" />
        </div>
      </div>

      <RowScroll />
    </section>
  );
}