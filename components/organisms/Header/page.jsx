"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/atoms/Button/page.jsx";
import HamburgerMenu from "@/components/atoms/HamburgerMenu/HamburgerMenu";
import LanguageSelector from "@/components/atoms/LanguageSelector/LanguageSelector";

const Header = ({ dict, data }) => {
  const pathname = usePathname();

  const currentLang = pathname.split("/")[1] || "en";

  if (!dict || !data) {
    return null;
  }

  const { showResume } = data;

  return (
    <>
      <header className="flex items-center justify-between p-2 laptop:p-0 laptop:hidden mt-5 gap-2">
        <Link
          href={`/${currentLang}`}
          className="font-medium p-2 laptop:p-0 link cursor-pointer"
        >
          {dict.portfolio.title}
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <HamburgerMenu />
        </div>
      </header>

      <header className="mt-10 hidden flex-row items-center justify-between sticky dark:text-white top-0 z-10 laptop:flex">
        <Link
          href={`/${currentLang}`}
          className="font-medium cursor-pointer mob:p-2 laptop:p-0"
        >
          {dict.portfolio.title}
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex">
            <Button href={`/${currentLang}#${dict?.sections?.work || "work"}`}>
              {dict?.nav?.projects || "Projects"}
            </Button>
            <Button
              href={`/${currentLang}#${dict?.sections?.about || "about"}`}
            >
              {dict?.nav?.about || "About"}
            </Button>
            {showResume && (
              <Button
                href={`/${currentLang}/${currentLang === "es" ? "curriculum-vitae" : "resume"}`}
                classes="!ml-1"
              >
                {dict?.nav?.resume || "Resume"}
              </Button>
            )}
            <Button href="mailto:jjguevarag@gmail.com" trackEvent="contact_click">
              {dict?.nav?.contact || "Contact"}
            </Button>
          </nav>
          <LanguageSelector />
        </div>
      </header>
    </>
  );
};

export default Header;
