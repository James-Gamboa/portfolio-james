"use client";
import React from "react";
import data from "@/utils/data/portfolio.json";

const Button = ({ children, type, onClick, classes = "" }) => {
  const baseClasses =
    "text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg transition-all duration-300 ease-out first:ml-0 hover:scale-105 active:scale-100 link";

  const isCursorNone = data.showCursor ? "cursor-none" : "";

  if (type === "primary") {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`${baseClasses} bg-white text-black ${isCursorNone} ${classes}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${baseClasses} flex items-center hover:bg-slate-600 text-white ${isCursorNone} ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button;
