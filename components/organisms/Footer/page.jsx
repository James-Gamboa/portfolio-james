// @ts-nocheck
"use client";
import React from "react";
import Socials from "@/components/atoms/Socials/page.jsx";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-10 laptop:mt-80 mob:mt-20">
      <h1 className="text-2xl text-bold laptop:text-3xl">
        Let's talk business
      </h1>
      <div className="mt-5">
        <Socials />
      </div>
    </div>
  );
};

export default Footer;
