import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PIN_END, addHold } from "../config/scroll";

gsap.registerPlugin(ScrollTrigger);

export default function MaskSec() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".endSec",
        start: "top top",
        end: PIN_END, // قبلاً "+=250%"
        pin: true,
        scrub: 1,
      },
    });

    const myOrder = [2, 1, 3, 0, 4];

    tl.fromTo(
      ".mask-wrapper2",
      {
        y: "30vh",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        stagger: (index) => myOrder.indexOf(index) * 0.4,
        ease: "power2.out",
      }
    );

    tl.to(
      ".hero-img",
      {
        y: "-100%",
        duration: 2,
        stagger: (index) => myOrder.indexOf(index) * 0.3,
        ease: "power2.inOut",
      },
      "+=0.5"
    );

    tl.fromTo(
      ".eliBet1",
      {
        y: "100%",
        padding: "0 20px",
      },
      {
        y: "5%",
        duration: 2,
        ease: "power2.inOut",
      },
      "<"
    );

    tl.fromTo(
      ".old-img",
      {
        y: "100%",
      },
      {
        y: 0,
        duration: 2,
        stagger: (index) => myOrder.indexOf(index) * 0.3,
        ease: "power2.inOut",
      },
      "<"
    );

    tl.fromTo(
      ".eliBet2",
      {
        y: "100%",
        padding: "0 20px",
      },
      {
        y: "5%",
        duration: 2,
        ease: "power2.inOut",
        delay: 0.2,
      },
      "<"
    );

    tl.to(
      [".mask-wrapper2:nth-child(2)", ".mask-wrapper2:nth-child(4)"],
      {
        y: "-100%",
        duration: 2,
        ease: "power2.inOut",
      },
      "<"
    );

    addHold(tl);
  }, []);

  const items = [
    { src: "/images/ellie2.jpg", ml: "lg:ml-[-41px]" },
    { src: "", ml: "-ml-px lg:ml-[calc(-20vw_-_25px)]" },
    {
      src: "/images/wp6259121-4k-iphone-the-last-of-us-part-2-wallpapers.jpg",
      ml: "ml-[calc(-100vw/3_-_1px)] lg:ml-[calc(-40vw_-_9px)]",
    },
    { src: "/", ml: "ml-[calc(-200vw/3_-_1px)] lg:ml-[calc(-60vw_+_7px)]" },
    { src: "/images/ellie3.jpg", ml: "lg:ml-[calc(-80vw_+_23px)]" },
  ];

  return (
    <section className="endSec flex items-center w-dvw h-dvh justify-center lg:px-10 bg-[#090909] relative z-50">
      {items.map((item, index) => (
        <figure
          key={index}
          className={`relative w-1/3 lg:w-[20%] h-full mask-wrapper2 overflow-hidden mx-px ${
            index === 0 || index === items.length - 1 ? "hidden lg:block" : ""
          }`}
        >
          <img
            className={`hero-img absolute top-0 left-0 w-screen h-full object-cover object-center z-20 max-w-none ${item.ml}`}
            src="/images/The-Last-of-Us-Part-II-Wallpaper-4K-4.jpg"
            alt=""
          />
          <img
            className="old-img absolute inset-0 w-full h-full object-cover z-10"
            src={item.src}
            alt=""
          />
        </figure>
      ))}

      <figure className="eliBet1 absolute w-[33%] lg:w-[20%] h-105 sm:h-full abs-center z-50 ml-[calc(-100vw/3)] lg:ml-[calc(-20vw+16px)]">
        <img
          className="w-full h-[90%] object-cover rounded-lg"
          src="/images/5.jpg"
          alt=""
        />
      </figure>

      <figure className="eliBet2 absolute w-[33%] lg:w-[20%] h-105 sm:h-full abs-center z-50 ml-[calc(100vw/3)] lg:ml-[calc(20vw_-_16px)]">
        <img
          className="w-full h-[90%] object-cover rounded-lg"
          src="/images/6.jpg"
          alt=""
        />
      </figure>
    </section>
  );
}
