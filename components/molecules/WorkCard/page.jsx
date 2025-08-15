"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const WorkCard = ({ img, name, description, url }) => {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <div className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link cursor-pointer">
        <div
          className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-auto"
          style={{ height: "600px" }}
        >
          <Image
            alt={name}
            className="h-full w-full object-cover hover:scale-110 transition-all ease-out duration-300"
            src={img}
            width={1000}
            height={800}
          ></Image>
        </div>
        <h1 className="mt-5 text-3xl font-medium">
          {name ? name : "Project Name"}
        </h1>
        <h2 className="text-xl opacity-50">
          {description ? description : "Description"}
        </h2>
      </div>
    </Link>
  );
};

export default WorkCard;
