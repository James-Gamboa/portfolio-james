"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Popover } from "@headlessui/react";
import Image from "next/image";
import Button from "@/components/atoms/Button/page.jsx";
import HamburgerMenu from "@/components/atoms/HamburgerMenu/HamburgerMenu";
import LanguageSelector from "@/components/atoms/LanguageSelector/LanguageSelector";

const Header = ({
  handleWorkScroll,
  handleAboutScroll,
  isBlog = false,
  dict,
  data,
}) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const currentLang = pathname.split("/")[1] || "en";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!dict || !data) {
    return null;
  }

  const { name, showResume } = data;

  return (
    <>
      <div className="flex items-center justify-between p-2 laptop:p-0 laptop:hidden mt-5 gap-2">
        {isMounted && (
          <Link href={`/${currentLang}`}>
            <h1 className="font-medium p-2 laptop:p-0 link cursor-pointer">
              {dict.portfolio.title}
            </h1>
          </Link>
        )}
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <HamburgerMenu />
        </div>
      </div>

      <div className="mt-10 hidden flex-row items-center justify-between sticky dark:text-white top-0 z-10 laptop:flex">
        {isMounted && (
          <Link href={`/${currentLang}`}>
            <h1 className="font-medium cursor-pointer mob:p-2 laptop:p-0">
              {dict.portfolio.title}
            </h1>
          </Link>
        )}
        <div className="flex items-center gap-4">
          <div className="flex">
            <Link href={`/${currentLang}#${dict?.sections?.work || "work"}`}>
              <Button>{dict?.nav?.projects || "Projects"}</Button>
            </Link>
            <Link href={`/${currentLang}#${dict?.sections?.about || "about"}`}>
              <Button>{dict?.nav?.about || "About"}</Button>
            </Link>
            {showResume && isMounted && (
              <Link
                href={`/${currentLang}/${currentLang === "es" ? "curriculum-vitae" : "resume"}`}
              >
                <Button classes="first:ml-1">
                  {dict?.nav?.resume || "Resume"}
                </Button>
              </Link>
            )}
            <Link href="mailto:jjguevarag@gmail.com">
              <Button>{dict?.nav?.contact || "Contact"}</Button>
            </Link>
          </div>
          <LanguageSelector />
        </div>
      </div>
    </>
  );
};

export default Header;
