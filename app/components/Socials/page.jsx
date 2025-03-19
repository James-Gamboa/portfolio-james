// @ts-nocheck
"use client"
import React, { useEffect, useState } from "react";
import Button from "@/components/Button/page";
import { getData } from "@/api/portfolio/strapi";

const Socials = ({ className }) => {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const data = await getData();
        setSocials(data.attributes.socials);
      } catch (error) {
        console.error("Error fetching socials:", error);
      }
    };

    fetchSocials();
  }, []);

  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {socials.map((social, index) => (
        <Button key={index} onClick={() => window.open(social.link)}>
          {social.title}
        </Button>
      ))}
    </div>
  );
};

export default Socials;
