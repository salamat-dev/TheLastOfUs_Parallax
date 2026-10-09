import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// اندازه‌ی عکس نهایی نسبت به white-us-logo (1 = دقیقاً هم‌اندازه)
const FIT = 1;

// اندازه‌ی واقعیِ لوگویی که روی صفحه کشیده میشه
// (SVG داخل img به صورت contain کشیده میشه و بعد scale-x-130 روش اعمال میشه)
function drawnLogoSize(img) {
  const boxW = img.offsetWidth;
  const boxH = img.offsetHeight;
  const ratio = img.naturalWidth && img.naturalHeight
    ? img.naturalHeight / img.naturalWidth
    : boxH / boxW;

  let w = boxW;
  let h = boxW * ratio;
  if (h > boxH) {
    h = boxH;
    w = boxH / ratio;
  }

  // Tailwind v4 کلاس scale-x-130 رو با پراپرتی scale میسازه، نه transform
  const cs = getComputedStyle(img);
  let scaleX = 1;
  if (cs.scale && cs.scale !== "none") {
    scaleX = parseFloat(cs.scale.split(" ")[0]) || 1;
  } else if (cs.transform && cs.transform !== "none") {
    scaleX = new DOMMatrixReadOnly(cs.transform).a || 1;
  }
  return { w: w * scaleX, h, ratio };
}

export default function EndSec() {
  const sectionRef = useRef();

  useGSAP(() => {

    const getTarget = () => {
      const pic = sectionRef.current.querySelector(".picSec");
      const logo = pic.children[0]; // figure لوگو (سمت چپ)
      const imgs = pic.children[1]; // ستون عکس‌ها
      const fig = document.querySelector(".mask-wrapper2:nth-of-type(3)");
      const W = fig.offsetWidth;
      const H = fig.offsetHeight; // ارتفاع MaskSec

      // فاصله‌ی لوگو تا عکس‌ها؛ همین فاصله سمت راست هم رعایت میشه
      const gap = imgs.offsetLeft - (logo.offsetLeft + logo.offsetWidth);

      // وسط جای هدف نسبت به EndSec
      const cx =
        pic.offsetLeft + imgs.offsetLeft + imgs.offsetWidth + gap + logo.offsetWidth / 2;
      const cy = pic.offsetTop + logo.offsetTop + logo.offsetHeight / 2;

      // اندازه‌ی لوگوی سفید روی صفحه
      const logoSize = drawnLogoSize(logo.querySelector("img"));

      // اندازه‌ی لوگوی ماسک داخل mask-wrapper2 (از mask-size توی CSS، الان 95%)
      const maskSize = parseFloat(getComputedStyle(fig).maskSize) / 100 || 0.95;
      const maskW = W * maskSize;
      const maskH = maskW * logoSize.ratio;

      return {
        x: cx - (fig.offsetLeft + W / 2),
        // MaskSec بعد از تموم شدن pin درست بالای EndSec قرار می‌گیره
        top: (cy / H) * 100 + 50,
        // لوگوی ماسک دقیقاً هم‌عرض و هم‌ارتفاع لوگوی سفید میشه
        scaleX: (logoSize.w / maskW) * FIT,
        scaleY: (logoSize.h / maskH) * FIT,
      };
    };

    // SVG که لود شد، اندازه‌ها دوباره حساب بشن
    const logoImg = sectionRef.current.querySelector(".picSec img");
    const onLogoLoad = () => ScrollTrigger.refresh();
    if (!logoImg.complete) logoImg.addEventListener("load", onLogoLoad);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center 10%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    // const tl2 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: sectionRef.current,
    //     start: "40% 40%",
    //     end: "+=40%",
    //     scrub: 1,
    //   },
    // });

    tl.to(".mask-wrapper2", {
      top: "100%",
      ease: "power2.inOut",
      stagger: 0.05,
    });

    tl.to(".mask-wrapper2:nth-of-type(3)", {
      top: () => `${getTarget().top - 70}%`, // قبلاً "195%"
      ease: "power2.inOut",
    });

    tl.to(".centerDiv", {
      opacity: 1,
      ease: "power1.out",
    });
    tl.to(
      ".mask-wrapper2:nth-of-type(3)",
      {
        x: () => getTarget().x * 0.8, // قبلاً 360
        ease: "power1.out",
        scaleY: 0.8,
        scaleX: 1,
      },
      "<"
    );

    tl.to(".mask-wrapper2:nth-of-type(3)", {
      top: () => `${getTarget().top}%`, // قبلاً "265%"
      x: () => getTarget().x, // قبلاً 450
      rotate: "360deg",
      ease: "power1.out",
      scaleY: () => getTarget().scaleY, // قبلاً 0.75
      scaleX: () => getTarget().scaleX, // قبلاً 1
    });

    tl.to(
      ".centerDiv",
      {
        // فاصله‌ی راست همیشه 1.25 برابرِ left می‌مونه (روی 1440 دقیقاً میشه 80%)
        width: (i, el) => {
          const parentWidth = el.offsetParent.clientWidth;
          const left = el.offsetLeft;
          return parentWidth - left - left * 1.25;
        },
        ease: "power1.out",
        delay: 0.05,
      },
      "-=0.5"
    );

    tl.fromTo(
      ".firstImg",
      { x: -220, opacity: 0 },
      { x: 0, opacity: 1, ease: "power2.out" },
      "-=0.2"
    );

    tl.fromTo(
      ".secondImg",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, ease: "power2.out" },
      "-=0.25"
    );

    tl.fromTo(
      ".thirdImg",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, ease: "power2.out" },
      "-=0.27"
    );

    return () => logoImg.removeEventListener("load", onLogoLoad);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="newSection relative z-60 flex h-[400dvh] w-dvw bg-linear-to-b from-ink via-[#15160f] to-[#2a2a22] md:z-0 md:justify-between lg:justify-evenly"
    >
      {/* ستون چپ */}
      <div className="flex h-dvh w-1/2 flex-wrap items-center justify-center gap-4 px-3 py-7 md:w-[30%] md:gap-5 md:px-6 lg:w-[20%]">
        <div className="flex h-[40%] w-full flex-col justify-end rounded-sm bg-rust p-4 md:p-6">
          <p className="mb-2 text-xs text-bone/70 md:text-sm">Epilogue</p>
          <p className="font-long text-2xl leading-[0.95] text-bone md:text-3xl xl:text-4xl">
            Every act of revenge sends someone else after you.
          </p>
        </div>

        <div className="flex h-[57%] w-full items-end border-b border-l border-bone/20 p-4 md:p-6">
          <p className="text-sm leading-relaxed text-bone/75 md:text-base xl:text-lg">
            By the end, both of them have lost almost everything they set out
            to protect. What is left is a choice: keep going, or let it go.
          </p>
        </div>
      </div>

      {/* ستون راست */}
      <div className="flex h-dvh w-1/2 items-center justify-center px-3 py-7 md:w-[30%] md:-translate-x-5 md:px-6 lg:w-[20%]">
        <div className="flex size-full flex-col justify-between border border-bone/20 p-4 md:p-6">
          <img src="/images/fireflies.svg" alt="" className="w-8 opacity-80 md:w-10" />
          <div>
            <p className="font-long text-3xl leading-[0.92] text-bone md:text-4xl xl:text-5xl">
              The hardest thing in this story is not surviving. It is
              stopping.
            </p>
            <p className="mt-4 text-xs text-ash md:text-sm">Santa Barbara, the last day</p>
          </div>
        </div>
      </div>

      <div className="centerDiv pointer-events-none absolute left-5 top-[135dvh] flex h-80 w-[70%] flex-col items-center justify-center gap-4 border border-bone/25 bg-ink/40 px-6 text-center opacity-0 backdrop-blur-sm md:w-155 lg:left-32 lg:top-[128dvh]">
        <p className="text-sm text-firefly">The end</p>
        <h3 className="font-long text-5xl leading-[0.85] text-bone md:text-7xl lg:text-8xl">
          Two sides.
          <br />
          One story.
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-bone/70 md:text-base">
          A fan-made scroll story inspired by The Last of Us Part II.
        </p>
      </div>

      {/* ترتیب بچه‌ها مهمه: اول لوگو، بعد ستون عکس‌ها (برای حساب جای فرود mask-wrapper) */}
      <div className="picSec absolute left-0 top-[calc(135dvh+20rem+6dvh)] flex h-120 w-full gap-5 px-5 lg:left-33 lg:top-[calc(128dvh+20rem+6dvh)] lg:w-[61%]">
        <figure className="h-full w-[20%] lg:w-[30%]">
          <img className="size-full scale-x-130" src="/images/white-us-logo.svg" alt="" />
        </figure>

        <div className="flex h-full w-[50%] flex-col items-center justify-center gap-3 lg:w-[70%]">
          <figure className="h-[40%] w-full overflow-hidden rounded-sm">
            <img className="firstImg size-full object-cover" src="/images/ellie1.jpg" alt="Ellie" />
          </figure>

          <div className="flex h-[60%] w-full gap-3">
            <figure className="h-full w-[55%] overflow-hidden rounded-sm lg:w-[65%]">
              <img className="secondImg size-full object-cover" src="/images/abby2.jpg" alt="Abby" />
            </figure>

            <figure className="h-full w-[45%] overflow-hidden rounded-sm lg:w-[35%]">
              <img className="thirdImg size-full object-cover" src="/images/7.jpg" alt="" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}