// @ts-nocheck
"use client"
import React from "react";
import Button from "@/components/Button/page";

const Socials = ({ className, socials = [] }) => {
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
