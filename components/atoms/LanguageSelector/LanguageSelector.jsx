"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";

const SpainFlag = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" className="rounded-sm">
    <rect width="20" height="15" fill="#AA151B" />
    <rect width="20" height="9" y="3" fill="#F1BF00" />
    <rect width="20" height="3" fill="#AA151B" />
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

const languages = [
  {
    code: "es",
    name: "ES",
    flag: <SpainFlag />,
  },
  {
    code: "en",
    name: "EN",
    flag: <USFlag />,
  },
];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    console.log(`Idioma cambiado a: ${language.name} (${language.code})`);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`w-20 justify-between border-none focus:outline-none focus:ring-0 focus:border-none shadow-none transition-colors duration-200 ${open ? "bg-slate-700 text-white" : "bg-[color:var(--color-background-surface)] text-[color:var(--color-text-primary)] hover:bg-slate-600 hover:text-white dark:hover:bg-slate-600"}`}
        >
          <div className="flex items-center gap-2">
            {selectedLanguage.flag}
            <span className="font-medium">{selectedLanguage.name}</span>
          </div>
          {open ? (
            <ChevronUp className="h-4 w-4 opacity-50" />
          ) : (
            <ChevronDown className="h-4 w-4 opacity-50" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20 bg-slate-800 text-white shadow-none border-none focus:outline-none focus:ring-0 focus:border-none">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className="flex items-center gap-2 cursor-pointer border-none focus:outline-none focus:ring-0 focus:border-none shadow-none hover:bg-slate-700 hover:text-white"
          >
            {language.flag}
            <span className="font-medium">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
