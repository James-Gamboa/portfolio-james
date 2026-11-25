"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";
import CtaLink from "@/components/atoms/CtaLink/page.jsx";
import HamburgerMenu from "@/components/atoms/HamburgerMenu/HamburgerMenu";
import LanguageSelector from "@/components/atoms/LanguageSelector/LanguageSelector";
import { EVENTS, trackEvent } from "@/lib/analytics";
import { cvPath } from "@/lib/cv";
import { buildDesktopNavLinks } from "@/lib/nav";

const navLinkClass =
  "rounded-full px-3 py-2 text-sm font-medium text-content-muted transition-colors hover:bg-sky/10 hover:text-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky";

/**
 * Sticky floating header: JG monogram + name, section links (desktop), a
 * persistent CV button and the mobile menu. One landmark for every viewport.
 */
const Header = ({ dict, data }) => {
  const pathname = usePathname();

  const currentLang = pathname.split("/")[1] === "es" ? "es" : "en";

  if (!dict || !data) {
    return null;
  }

  const { showResume } = data;
  const email =
    data.socials?.find((social) => social.title === "Email")?.link ??
    "mailto:jjguevarag@gmail.com";
  const links = buildDesktopNavLinks({
    lang: currentLang,
    dict,
    email,
    showResume,
  });
  const name = data.resume?.name || "James Guevara Gamboa";

  return (
    <header className="sticky top-3 z-40 mt-3 flex items-center justify-between gap-2 rounded-full border border-line bg-ink/75 py-1.5 pl-2 pr-1.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl tablet:pl-3 laptop:mt-5 laptop:pr-2">
      <Link
        href={`/${currentLang}`}
        className="group flex min-w-0 items-center gap-2.5 rounded-full pr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky"
      >
        <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-sky opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-40"
          />
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink">
            <Image
              src="/jg-logo.png"
              alt=""
              width={26}
              height={26}
              className="h-[26px] w-[26px]"
            />
          </span>
        </span>
        <span className="truncate text-sm font-medium tracking-tight text-content tablet:text-base">
          {name}
        </span>
      </Link>

      <nav
        aria-label={dict.portfolio?.title || "Primary"}
        className="hidden items-center gap-1 laptop:flex"
      >
        {links.map((link) =>
          link.isMail ? (
            <a
              key={link.href}
              href={link.href}
              className={navLinkClass}
              onClick={() => trackEvent(EVENTS.contact)}
            >
              {link.label}
            </a>
          ) : (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ),
        )}
      </nav>

      <div className="flex shrink-0 items-center gap-1.5 tablet:gap-2">
        <div className="hidden tablet:block">
          <LanguageSelector />
        </div>
        <CtaLink
          href={cvPath(currentLang)}
          variant="brand"
          download
          event={EVENTS.cvDownload}
          eventProps={{ locale: currentLang, placement: "header" }}
          className="min-h-10 px-4 py-2 text-sm tablet:text-sm"
        >
          <Download className="hidden h-4 w-4 tablet:block" aria-hidden />
          <span className="tablet:hidden">{dict.nav?.cv || "CV"}</span>
          <span className="hidden tablet:inline">
            {dict.home?.hero?.downloadCv || "Download CV"}
          </span>
        </CtaLink>
        <HamburgerMenu dict={dict} lang={currentLang} email={email} />
      </div>
    </header>
  );
};

export default Header;
