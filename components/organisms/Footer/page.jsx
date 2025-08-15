import Socials from "@/components/atoms/Socials/page.jsx";

const Footer = ({ lang = "en", dict, data }) => {
  if (!dict) {
    return (
      <div className="mt-10 laptop:mt-80 mob:mt-20">
        <h1 className="text-2xl text-bold laptop:text-3xl">
          Let's talk business
        </h1>
        <div className="mt-5">
          <Socials lang={lang} data={data} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 laptop:mt-80 mob:mt-20">
      <h1 className="text-2xl text-bold laptop:text-3xl">
        {dict?.footer?.contact || "Let's talk business"}
      </h1>
      <div className="mt-5">
        <Socials lang={lang} data={data} />
      </div>
    </div>
  );
};

export default Footer;
