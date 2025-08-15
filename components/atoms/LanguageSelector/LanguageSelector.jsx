"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";

const SpainFlag = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" className="rounded-sm">
    <rect width="20" height="15" fill="#AA151B" />
    <rect width="20" height="9" y="3" fill="#F1BF00" />
    <rect width="20" height="3" y="12" fill="#AA151B" />
    <rect width="20" height="3" y="12" fill="#AA151B" />
  </svg>
);

const USFlag = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" className="rounded-sm">
    <rect width="20" height="15" fill="#B22234" />
    <rect width="20" height="1.15" y="1.15" fill="white" />
    <rect width="20" height="1.15" y="3.46" fill="white" />
    <rect width="20" height="1.15" y="5.77" fill="white" />
    <rect width="20" height="1.15" y="8.08" fill="white" />
    <rect width="20" height="1.15" y="10.38" fill="white" />
    <rect width="20" height="1.15" y="12.69" fill="white" />
    <rect width="8" height="8.08" fill="#3C3B6E" />
  </svg>
);

const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dict, setDict] = useState(null);

  const currentLangCode = pathname.split("/")[1] || "en";

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dictModule = await import(
          `../../lib/dictionaries/${currentLangCode}.json`
        );
        setDict(dictModule.default);
      } catch (err) {
        const fallbackModule = await import("../../lib/dictionaries/en.json");
        setDict(fallbackModule.default);
      }
    };

    loadDictionary();
  }, [currentLangCode]);

  const languages = [
    {
      code: "en",
      name: "EN",
      flag: <USFlag />,
    },
    {
      code: "es",
      name: "ES",
      flag: <SpainFlag />,
    },
  ];

  const currentLanguage = languages.find(
    (lang) => lang.code === currentLangCode,
  );

  const handleLanguageChange = (langCode) => {
    if (!dict) return;

    const segments = pathname.split("/");
    let newPath;

    const currentHash = window.location.hash;

    if (segments[2] === "curriculum-vitae" && langCode === "en") {
      newPath = `/en/resume`;
    } else if (segments[2] === "resume" && langCode === "es") {
      newPath = `/es/curriculum-vitae`;
    } else {
      if (segments[1] === "en" || segments[1] === "es") {
        segments[1] = langCode;
      } else {
        segments.splice(1, 0, langCode);
      }
      newPath = segments.join("/");
    }

    if (currentHash) {
      const sectionId = currentHash.substring(1);
      const targetDict =
        langCode === "en"
          ? { trabajo: "work", "sobre-mi": "about" }
          : { work: "trabajo", about: "sobre-mi" };

      const mappedSectionId = targetDict[sectionId] || sectionId;
      newPath += `#${mappedSectionId}`;
    }

    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`w-20 justify-between border-none focus:outline-none focus:ring-0 focus:border-none shadow-none transition-colors duration-200 ${isOpen ? "bg-slate-700 text-white" : "bg-[color:var(--color-background-surface)] text-[color:var(--color-text-primary)] hover:bg-slate-600 hover:text-white dark:hover:bg-slate-600"}`}
        >
          <div className="flex items-center gap-2">
            {currentLanguage.flag}
            <span className="font-medium">{currentLanguage.name}</span>
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 opacity-50" />
          ) : (
            <ChevronDown className="h-4 w-4 opacity-50" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-20 bg-slate-800 text-white shadow-none border-none focus:outline-none focus:ring-0 focus:border-none hover:bg-slate-700 hover:text-white">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center gap-2 cursor-pointer border-none focus:outline-none focus:ring-0 focus:border-none shadow-none hover:bg-slate-700 hover:text-white"
          >
            {lang.flag}
            <span className="font-medium">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
