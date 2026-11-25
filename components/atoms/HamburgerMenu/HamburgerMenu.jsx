"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "@/components/atoms/LanguageSelector/LanguageSelector";
import { buildMobileNavLinks } from "@/lib/nav";

const DESKTOP_MIN_WIDTH_PX = 1024;
// Must match the .menu-overlay exit animation duration in globals.css.
const CLOSE_ANIMATION_MS = 220;

const HamburgerMenu = ({ dict, lang, email }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const closeTimerRef = React.useRef(null);

  // Play the exit animation, then unmount. Reduced motion closes immediately.
  const closeMenu = React.useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setIsOpen(false);
      return;
    }
    setIsClosing(true);
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, CLOSE_ANIMATION_MS);
  }, []);

  React.useEffect(() => () => clearTimeout(closeTimerRef.current), []);
  const pathname = usePathname();
  const [hash, setHash] = React.useState("");

  const currentLang = lang;
  const navLinks = buildMobileNavLinks({ lang: currentLang, dict, email });

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(min-width: ${DESKTOP_MIN_WIDTH_PX}px)`,
    );

    const handleViewportChange = (event) => {
      if (event.matches) setIsOpen(false);
    };

    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  React.useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    setHash(window.location.hash);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  React.useEffect(() => {
    if (!isOpen) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    html.dataset.menuOpen = "true";
    html.classList.add("overflow-hidden");
    body.classList.add("overflow-hidden");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const handleScrollLock = (event) => {
      if (event.target.closest("[data-menu-panel]")) return;
      event.preventDefault();
    };

    document.addEventListener("touchmove", handleScrollLock, {
      passive: false,
    });
    document.addEventListener("wheel", handleScrollLock, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleScrollLock);
      document.removeEventListener("wheel", handleScrollLock);
      delete html.dataset.menuOpen;
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const firstLinkRef = React.useRef(null);
  React.useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isOpen]);

  const isActive = (href) => {
    if (href === `/${currentLang}`)
      return pathname === `/${currentLang}` && !hash;
    if (href.includes("#"))
      return hash === href.split("#")[1] ? `#${href.split("#")[1]}` : "";
    return pathname === href;
  };

  return (
    <>
      <button
        aria-label="Open navigation menu"
        tabIndex={0}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink-raised text-white laptop:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {isOpen &&
        isMounted &&
        createPortal(
          <div
            className="menu-overlay fixed inset-0 z-[110] overscroll-none"
            data-state={isClosing ? "closed" : "open"}
            role="dialog"
            aria-modal="true"
            onClick={() => closeMenu()}
            onKeyDown={(event) => {
              if (event.key === "Escape") closeMenu();
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-ink bg-[radial-gradient(ellipse_at_top,rgb(var(--sky)/0.1),transparent_55%)]"
            />
            <div
              data-menu-panel=""
              className="relative z-10 flex h-full w-full flex-col items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                aria-label="Close navigation menu"
                className="absolute top-4 right-4 p-2 rounded-full bg-ink-raised text-white backdrop-blur-md focus:outline-none"
                onClick={() => closeMenu()}
                tabIndex={0}
              >
                <X className="w-8 h-8" aria-hidden="true" />
              </button>
              <nav
                role="menu"
                aria-label="Mobile navigation"
                className="flex flex-col items-center gap-6"
              >
                {navLinks.map((link, idx) => {
                  const active = isActive(link.href);
                  if (link.isMail) {
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        className="menu-item font-semibold text-3xl tablet:text-4xl transition-colors outline-none px-4 py-1 text-white"
                        tabIndex={0}
                        role="menuitem"
                        style={{ "--i": idx }}
                        ref={idx === 0 ? firstLinkRef : undefined}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`menu-item font-semibold text-3xl tablet:text-4xl transition-colors outline-none px-4 py-1 ${active ? "text-sky" : "text-white"}`}
                      tabIndex={0}
                      role="menuitem"
                      style={{ "--i": idx }}
                      aria-current={active ? "page" : undefined}
                      ref={idx === 0 ? firstLinkRef : undefined}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div
                className="menu-item mt-10 flex justify-center"
                style={{ "--i": navLinks.length }}
              >
                <LanguageSelector />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default HamburgerMenu;
