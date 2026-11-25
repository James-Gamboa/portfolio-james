import Socials from "@/components/atoms/Socials/page.jsx";

// Build-time timestamp (see next.config.js), formatted per locale. Fixed to
// UTC so server and client render the same text.
const formatBuildDate = (lang) => {
  const iso = process.env.NEXT_PUBLIC_BUILD_DATE;
  if (!iso) return null;
  const date = new Date(iso);
  return {
    iso: iso.slice(0, 10),
    label: new Intl.DateTimeFormat(lang === "es" ? "es-CR" : "en-US", {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(date),
  };
};

const Footer = ({ lang = "en", dict, data }) => {
  const updated = formatBuildDate(lang);

  if (!dict) {
    return (
      <div className="mt-10 laptop:mt-80 mob:mt-20">
        <h2 className="text-2xl text-bold laptop:text-3xl">
          Let's talk business
        </h2>
        <div className="mt-5">
          <Socials lang={lang} data={data} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 laptop:mt-80 mob:mt-20">
      <h2 className="text-2xl text-bold laptop:text-3xl">
        {dict?.footer?.contact || "Let's talk business"}
      </h2>
      <div className="mt-5">
        <Socials lang={lang} data={data} />
      </div>
      {updated && (
        <p className="mt-10 text-sm text-white/70">
          {dict?.footer?.lastUpdated ?? "Last updated"}:{" "}
          <time dateTime={updated.iso}>{updated.label}</time>
        </p>
      )}
    </div>
  );
};

export default Footer;
