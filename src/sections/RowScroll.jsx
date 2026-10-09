import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// جای عکس‌ها نسبت به صفحه (درصدی) تا روی هر عرضی داخل صفحه بمونن
const rowImages = [
  { src: "/images/1.jpg", pos: "top-16 left-[5%] md:top-[11%] md:left-[14%]" },
  { src: "/images/2.jpg", pos: "top-56 left-[2%] md:top-[49%] md:left-[5.5%]" },
  { src: "/images/3.png", pos: "top-36 left-[28%] md:top-[31%] md:left-[33%]" },
  { src: "/images/4.jpg", pos: "top-10 left-[52%] md:top-[15%] md:left-[62.5%]" },
  { src: "/images/5.jpg", pos: "top-52 left-[50%] md:top-[44%] md:left-[55.5%]" },
  { src: "/images/6.jpg", pos: "top-72 left-[72%] md:top-[53%] md:left-[80.5%]" },
  { src: "/images/7.jpg", pos: "top-12 right-[2%] md:top-[9%] md:right-[5.5%]" },
];

// جاها و روزهای داستان، به جای اسم و تکنولوژی‌ها
const lines = [
  { text: "Jackson / Seattle / Santa Barbara /", reverse: false },
  { text: "Day one / Day two / Day three /", reverse: true },
  { text: "Two sides of the same story /", reverse: false },
  { text: "Day one / Day two / Day three /", reverse: true },
  { text: "Jackson / Seattle / Santa Barbara /", reverse: false },
];

export default function RowScroll() {
  useGSAP(() => {
    const normalTracks = gsap.utils.toArray(".marquee-track:not(.reverse)");
    const reverseTracks = gsap.utils.toArray(".marquee-track.reverse");

    // برای کاربرهایی که حرکت کم خواستن، مارکی ثابت می‌مونه
    // if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    normalTracks.forEach((track) => {
      gsap.fromTo(
        track,
        { xPercent: 0 },
        { xPercent: -50, duration: 30, repeat: -1, ease: "linear" }
      );
    });

    reverseTracks.forEach((track) => {
      gsap.fromTo(
        track,
        { xPercent: -50 },
        { xPercent: 0, duration: 30, repeat: -1, ease: "linear" }
      );
    });
  }, []);

  return (
    <section className="rowScroll absolute inset-0 z-40 h-dvh w-dvw overflow-hidden bg-ink">
      {/* متن‌های مارکی */}
      <div className="row-loop-texts pointer-events-none absolute left-0 top-0 z-30 flex h-screen w-full flex-col justify-between overflow-hidden py-10">
        {lines.map((line, i) => (
          <div className="marquee" key={i}>
            <div className={`marquee-track ${line.reverse ? "reverse" : ""}`}>
              <span>{line.text}</span>
              <span>{line.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* نور گرم پشت متن */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,72,47,0.16),transparent_65%)]" />

      {/* متن میان‌پرده */}
      <div className="row-intro pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-5 text-center opacity-0">
        <p className="text-sm text-firefly">Interlude</p>
        <h3 className="mt-2 font-long text-7xl leading-[0.85] text-bone md:text-9xl lg:text-[11rem]">
          Seattle
        </h3>
        <p className="mx-auto mt-5 max-w-xs text-base leading-relaxed text-bone/70 md:mt-6 md:max-w-md md:text-lg">
          A flooded city split between factions. Both of them walk into it
          sure of who the monster is.
        </p>
      </div>

      {/* عکس‌های شناور */}
      <div className="relative flex size-full justify-center">
        {rowImages.map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt=""
            className={`row-img absolute z-50 h-32 w-[30%] rounded-sm object-cover md:h-[22vh] md:w-[14%] ${img.pos}`}
          />
        ))}
      </div>
    </section>
  );
}