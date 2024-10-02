// @ts-nocheck
import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button";
// Local Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showResume } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <h1
                onClick={() => router.push("/")}
                className="font-medium p-2 laptop:p-0 link"
              >
                {name}.
              </h1>

              <div className="flex items-center">
                {data.darkMode && (
                  <Button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    <Image
                      className="h-6"
                      src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                      alt={theme === "dark" ? "Moon icon" : "Sun icon"}
                      width={24}
                      height={24}
                    />
                  </Button>
                )}

                <Popover.Button>
                  <Image
                    className="h-5"
                    src={`/images/${
                      !open
                        ? theme === "dark"
                          ? "menu-white.svg"
                          : "menu.svg"
                        : theme === "light"
                        ? "cancel.svg"
                        : "cancel-white.svg"
                    }`}
                    alt="Menu or cancel icon"
                    width={20}
                    height={20}
                  />
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              } shadow-md rounded-md`}
            >
              <div className="grid grid-cols-1">
                <Button onClick={handleWorkScroll}>Work</Button>
                <Button onClick={handleAboutScroll}>About</Button>
                {showResume && (
                  <Button onClick={() => window.open("mailto:jjguevarag@gmail.com")}>
                    Resume
                  </Button>
                )}
                <Button onClick={() => window.open("mailto:jjguevarag@gmail.com")}>
                  Contact
                </Button>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>

      <div
        className={`mt-10 hidden flex-row items-center justify-between sticky ${
          theme === "light" && "bg-white"
        } dark:text-white top-0 z-10 tablet:flex`}
      >
        <h1
          onClick={() => router.push("/")}
          className="font-medium cursor-pointer mob:p-2 laptop:p-0"
        >
          {name}.
        </h1>
        <div className="flex">
          <Button onClick={handleWorkScroll}>Work</Button>
          <Button onClick={handleAboutScroll}>About</Button>
          {showResume && (
            <Button onClick={() => router.push("/resume")} classes="first:ml-1">
              Resume
            </Button>
          )}
          <Button onClick={() => window.open("mailto:jjguevarag@gmail.com")}>
            Contact
          </Button>
          {mounted && theme && data.darkMode && (
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Image
                className="h-6"
                src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                alt={theme === "dark" ? "Moon icon" : "Sun icon"}
                width={24}
                height={24}
              />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;