"use client";
import * as React from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "@/components/atoms/LanguageSelector/LanguageSelector";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dict, setDict] = React.useState(null);
  const pathname = usePathname();
  const [hash, setHash] = React.useState("");

  const currentLang = pathname.split("/")[1] || "en";

  React.useEffect(() => {
    import(`@/components/lib/dictionaries/${currentLang}.json`)
      .then((module) => setDict(module.default))
      .catch(() => {
        import("@/components/lib/dictionaries/en.json").then((module) =>
          setDict(module.default),
        );
      });
  }, [currentLang]);

  const navLinks = [
    { href: `/${currentLang}`, label: dict?.nav?.home || "Home" },
    { href: `/${currentLang}#about`, label: dict?.nav?.about || "About" },
    {
      href: `/${currentLang}#projects`,
      label: dict?.nav?.projects || "Projects",
    },
    {
      href: "mailto:jjguevarag@gmail.com",
      label: dict?.nav?.contact || "Contact",
      isMail: true,
    },
  ];

  React.useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    setHash(window.location.hash);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
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

  if (!dict) {
    return (
      <button
        aria-label="Open navigation menu"
        tabIndex={0}
        className="md:hidden focus:outline-none rounded-full p-2 bg-black/80 text-white"
        disabled
      >
        <Menu className="w-7 h-7" aria-hidden="true" />
      </button>
    );
  }

  return (
    <>
      <button
        aria-label="Open navigation menu"
        tabIndex={0}
        className="md:hidden focus:outline-none rounded-full p-2 bg-black/80 text-white"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-7 h-7" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 dark:bg-black/90 backdrop-blur-sm transition-opacity duration-200 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Close navigation menu"
            className="absolute top-4 right-4 p-2 rounded-full bg-transparent text-white focus:outline-none"
            onClick={() => setIsOpen(false)}
            tabIndex={0}
          >
            <X className="w-8 h-8" aria-hidden="true" />
          </button>
          <nav
            role="menu"
            aria-label="Mobile navigation"
            className="flex flex-col gap-8 items-center"
          >
            {navLinks.map((link, idx) => {
              const active = isActive(link.href);
              if (link.isMail) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-3xl font-extrabold transition-colors outline-none px-4 py-1 text-white`}
                    tabIndex={0}
                    role="menuitem"
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
                  className={`text-3xl font-extrabold transition-colors outline-none px-4 py-1 ${active ? "bg-white text-black dark:bg-white dark:text-black rounded shadow-lg" : "text-white"}`}
                  tabIndex={0}
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                  ref={idx === 0 ? firstLinkRef : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-10 flex justify-center">
            <LanguageSelector />
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease;
        }
      `}</style>
    </>
  );
};

export default HamburgerMenu;
