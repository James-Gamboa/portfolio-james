// @ts-nocheck
import { Popover } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll }) => {
  const router = useRouter();
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
                <Popover.Button>
                  <Image
                    className="h-5"
                    src={`/images/${!open ? "menu-white.svg" : "cancel-white.svg"}`}
                    alt="Menu or cancel icon"
                    width={20}
                    height={20}
                  />
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className="absolute right-0 z-10 w-11/12 p-4 bg-slate-800 shadow-md rounded-md"
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

      <div className="mt-10 hidden flex-row items-center justify-between sticky dark:text-white top-0 z-10 tablet:flex">
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
        </div>
      </div>
    </>
  );
};

export default Header;