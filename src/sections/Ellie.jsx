import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Ellie() {
  useGSAP(() => {
    gsap.set(".ellie", { marginTop: "-70vh" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".ellie",
          start: "top 90%",
          end: "10% 55%",
          scrub: 1,
        },
      })
      .to(".firstVideo", { opacity: 0, duration: 1, ease: "power1.inOut" });

    gsap.to(".ellie .img-box", {
      scrollTrigger: {
        trigger: ".ellie",
        start: "top center",
        end: "50% center",
        scrub: 1,
      },
      y: -150,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="ellie relative flex w-dvw flex-col justify-between gap-5 overflow-hidden px-5 pb-24 md:flex-row md:gap-10 md:ps-24 md:pe-0 lg:ps-40 -mt-[40vh]">
      {/* ستون چپ — متن و اولین عکس */}
      <div className="flex max-w-full flex-col justify-center md:max-w-md lg:max-w-lg">
        <p className="mt-24 text-sm text-moss md:mt-48">Chapter one</p>

        <h1 className="mb-8 mt-2 font-long text-[34vw] leading-[0.8] text-bone md:mb-14 md:text-[10rem] lg:text-[13rem]">
          Ellie
        </h1>

        <h2 className="mb-6 font-long text-3xl leading-[0.95] text-moss md:mb-8 md:text-5xl">
          She learned early that nobody is coming to save you.
        </h2>

        <p className="max-w-[52ch] text-base leading-relaxed text-bone/75 md:text-lg">
          Immune, restless and fiercely loyal, Ellie grew up inside the walls of
          a dying world. In Jackson she finally found something close to a home.
          Then one night took it away, and she followed the people responsible
          all the way to Seattle.
        </p>

        <figure className="mt-12 md:mt-20">
          <div className="h-[50vh] w-full overflow-hidden md:h-[90vh]">
            <img src="/images/ellie2.jpg" className="size-full object-cover" alt="Ellie" />
          </div>
          <figcaption className="mt-3 text-xs text-ash md:text-sm">Jackson, Wyoming</figcaption>
        </figure>
      </div>

      {/* ستون راست — عکس‌هایی که با اسکرول بالا میان */}
      <div className="img-box mt-10 w-full space-y-6 md:mt-169 md:w-auto">
        <figure>
          <div className="h-[50vh] w-full overflow-hidden md:h-[90vh] md:w-auto">
            <img className="size-full object-cover" src="/images/ellie1.jpg" alt="Ellie" />
          </div>
          <figcaption className="mt-3 text-xs text-ash md:text-sm">Seattle, day one</figcaption>
        </figure>

        <figure className="w-full md:w-[60%]">
          <div className="h-[35vh] overflow-hidden md:h-[50vh]">
            <img className="size-full object-cover" src="/images/ellie3.jpg" alt="Ellie" />
          </div>
          <figcaption className="mt-3 text-xs text-ash md:text-sm">Seattle, day two</figcaption>
        </figure>
      </div>
    </section>
  );
}