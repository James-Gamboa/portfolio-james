export const LOCALE_SCROLL_STORAGE_KEY = "preserve-scroll-y";

let scrollPositionGetter = null;

export const registerScrollPositionGetter = (getter) => {
  scrollPositionGetter = getter;
};

export const getCurrentScrollY = () => {
  if (scrollPositionGetter) {
    return scrollPositionGetter();
  }

  return window.scrollY ?? document.documentElement.scrollTop ?? 0;
};

export const saveScrollPositionForLocaleSwitch = () => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    LOCALE_SCROLL_STORAGE_KEY,
    String(getCurrentScrollY()),
  );
};

export const peekSavedScrollPosition = () => {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(LOCALE_SCROLL_STORAGE_KEY);
  if (raw === null) return null;

  const scrollY = Number(raw);
  return Number.isNaN(scrollY) ? null : scrollY;
};

export const consumeSavedScrollPosition = () => {
  const scrollY = peekSavedScrollPosition();
  if (scrollY === null) return null;

  sessionStorage.removeItem(LOCALE_SCROLL_STORAGE_KEY);
  return scrollY;
};

export const hasPendingScrollRestore = () => peekSavedScrollPosition() !== null;
