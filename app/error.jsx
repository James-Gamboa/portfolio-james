"use client";
import Link from "next/link";
import "./globals.css";
import { useEffect, useState } from "react";

const SimpleHeader = ({ lang }) => (
  <div className="flex items-center justify-between p-2 laptop:p-0 mt-5">
    <Link href={`/${lang}`}>
      <h1 className="font-medium p-2 laptop:p-0 link cursor-pointer">
        James Guevara.
      </h1>
    </Link>
  </div>
);

export default function Error({ error, reset }) {
  const [dict, setDict] = useState(null);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const pathLang = window.location.pathname.split("/")[1];
        const currentLang = ["en", "es"].includes(pathLang) ? pathLang : "en";
        setLang(currentLang);

        const dictionary = await import(
          `@/components/lib/dictionaries/${currentLang}.json`
        );
        setDict(dictionary.default);
      } catch (err) {
        const dictionary =
          await import("@/components/lib/dictionaries/en.json");
        setDict(dictionary.default);
        setLang("en");
      }
    };

    loadDictionary();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <SimpleHeader lang={lang} />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-white mb-6">
            {dict.error.title}
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-100 mb-6">
            {dict.error.subtitle}
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-10">
            {error.message || dict.error.message}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-block bg-gray-600 text-white px-8 py-4 text-lg md:text-xl rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              {dict.error.retry}
            </button>
            <Link
              href={`/${lang}`}
              className="inline-block bg-gray-600 text-white px-8 py-4 text-lg md:text-xl rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              {dict.error.goHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
