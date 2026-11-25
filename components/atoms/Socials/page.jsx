import Button from "@/components/atoms/Button/page.jsx";

const Socials = ({ className, lang = "en", data }) => {
  if (!data || !data.socials) {
    return <div className={className}>No socials available</div>;
  }

  return (
    <div
      className={`${className} flex flex-wrap mob:flex-nowrap link cursor-pointer`}
    >
      {data.socials.map((social, index) => (
        <Button key={index} href={social.link} external>
          {social.title}
        </Button>
      ))}
    </div>
  );
};

export default Socials;
