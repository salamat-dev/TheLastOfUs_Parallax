import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { PIN_END, addHold } from "../config/scroll";

export default function FirstVideo() {
  const videoRef = useRef(null);

  useGSAP(() => {
    gsap.set(".firstVideoWrapper", {
      opacity: 0,
      marginTop: "-150vh",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".firstVideoWrapper",
        start: "top top",
        end: PIN_END,
        pin: true,
        scrub: 2,
        onEnterBack: () => {
          if (!videoRef.current) return;
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        },
      },
    });

    tl.to(".hero-section", {
      opacity: 0,
      ease: "power1.inOut",
      onComplete: () => {
        videoRef.current?.play();
      },
    }).to(".firstVideoWrapper", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });

    addHold(tl);
  });

  return (
    <section className="firstVideoWrapper">
      <div className="firstVideo relative h-dvh">
        <video
          className="size-full object-cover"
          src="/videos/last-vid.mp4"
          playsInline
          muted
          preload="auto"
          ref={videoRef}
        />

        {/* تیره کردن لبه‌ها تا متن خوانا باشه */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/10 to-ink/50" />

        <div className="absolute bottom-10 left-5 max-w-lg md:bottom-16 md:left-10">
          <p className="mb-3 text-sm text-firefly">Prologue</p>
          <h2 className="font-long text-6xl leading-[0.88] text-bone md:text-8xl">
            Every story
            <br />
            has two sides
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone/70 md:text-base">
            Two women, one city, three days. Neither of them thinks she is the
            villain.
          </p>
        </div>
      </div>
    </section>
  );
}