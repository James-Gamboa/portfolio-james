"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Popover } from "@headlessui/react";
import Image from "next/image";
import Button from "@/components/atoms/Button/page.jsx";
import data from "@/utils/data/portfolio.json";
import HamburgerMenu from "@/components/atoms/HamburgerMenu/HamburgerMenu";
import LanguageSelector from "@/components/atoms/LanguageSelector/LanguageSelector";

const Header = ({ handleWorkScroll, handleAboutScroll }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { name, showResume } = data;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-2 laptop:p-0 tablet:hidden mt-5 gap-2">
        {isMounted && (
          <h1
            onClick={() => router.push("/")}
            className="font-medium p-2 laptop:p-0 link"
          >
            {name}.
          </h1>
        )}
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <HamburgerMenu />
        </div>
      </div>

      {/* Desktop Header */}
      <div className="mt-10 hidden flex-row items-center justify-between sticky dark:text-white top-0 z-10 tablet:flex">
        {isMounted && (
          <h1
            onClick={() => router.push("/")}
            className="font-medium cursor-pointer mob:p-2 laptop:p-0"
          >
            {name}.
          </h1>
        )}
        <div className="flex items-center gap-4">
          <div className="flex">
            <Link href="/#work">
              <Button>Work</Button>
            </Link>
            <Link href="/#about">
              <Button>About</Button>
            </Link>
            {showResume && isMounted && (
              <Button
                onClick={() => router.push("/Resume")}
                classes="first:ml-1"
              >
                Resume
              </Button>
            )}
            <Button onClick={() => window.open("mailto:jjguevarag@gmail.com")}>
              Contact
            </Button>
          </div>
          <LanguageSelector />
        </div>
      </div>
    </>
  );
};

export default Header;
