import { ScrollTrigger } from "gsap/ScrollTrigger";

// فصل‌های سایت — منو و فوتر از همین لیست استفاده می‌کنن
// at: کجای سکشن پین‌شده فرود بیاد (0 = اول، 0.5 = وسط انیمیشن)
export const CHAPTERS = [
  { label: "Start", note: "The title", target: "top" },
  { label: "Prologue", note: "Two sides", target: ".firstVideoWrapper", at: 0.45 },
  { label: "Ellie", note: "Chapter one", target: ".ellie" },
  { label: "Abby", note: "Chapter two", target: ".abbySec" },
  { label: "Epilogue", note: "The end", target: ".endSec" },
];

// اسکرول به یه فصل. برای سکشن‌های پین‌شده از start خود ScrollTrigger استفاده میشه
export function scrollToChapter(target, at = 0) {
  if (target === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.querySelector(target);
  if (!el) return;

  const st = ScrollTrigger.getAll().find((t) => t.trigger === el && t.pin);
  const top = st
    ? st.start + (st.end - st.start) * at
    : el.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({ top, behavior: "smooth" });
}