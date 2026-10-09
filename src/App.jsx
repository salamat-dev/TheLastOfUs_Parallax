import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NavBar from "./sections/NavBar";
import Hero from "./sections/Hero";
import FirstVideo from "./sections/FirstVideo";
import Ellie from "./sections/Ellie";
import Abby from "./sections/Abby";
import MaskSec from "./sections/MaskSec";
import EndSec from "./sections/EndSec";
import Footer from "./sections/Footer";
import useIsMobile from "./hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

// روی موبایل وقتی نوار آدرس باز و بسته میشه، صفحه نپره
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const isMobile = useIsMobile();

  // همیشه از اول صفحه شروع بشه
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // بعد از ساخته شدن دوباره‌ی انیمیشن‌ها، موقعیت‌ها از نو حساب بشن
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [isMobile]);

  return (
    <>
      {/* با عوض شدن breakpoint کل انیمیشن‌ها به ترتیب از نو ساخته میشن */}
      <main key={isMobile ? "mobile" : "desktop"}>
        <NavBar />
        <Hero />
        <FirstVideo />
        <Ellie />
        <Abby />
        <MaskSec />
        <EndSec />
        <Footer />
      </main>

      {/* دانه‌ی فیلم روی کل صفحه */}
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export default App;
