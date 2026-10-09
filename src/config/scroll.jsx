// تنظیمات مرکزی اسکرول — برای کم و زیاد کردن فاصله‌ها
// طول اسکرول هر سکشن پین‌شده 
export const SECTION_SCROLL = 500;

export const HOLD_RATIO = 0.2;

export const PIN_END = `+=${SECTION_SCROLL}%`;

// طول اسکرول یه سکشن، با ضریب نسبت به بقیه (برای سکشن‌هایی که انیمیشن طولانی‌تری دارن)
export const pinEnd = (multiplier = 1) => `+=${SECTION_SCROLL * multiplier}%`;

// یه مکث خالی آخر تایم‌لاین اضافه می‌کنه (انیمیشن‌ها دست نمی‌خورن)
export function addHold(tl, ratio = HOLD_RATIO) {
  const d = tl.duration();
  tl.to({}, { duration: (d * ratio) / (1 - ratio) });
  return tl;
}