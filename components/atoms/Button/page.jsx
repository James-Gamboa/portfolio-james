"use client";
import React from "react";
import Link from "next/link";

const baseClasses =
  "text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg transition-all duration-300 ease-out first:ml-0 hover:scale-105 active:scale-100 link";

/**
 * Button styled control. With `href` it renders a single link element (no
 * nested interactive <button> inside an <a>), so the link itself is the
 * touch target and keyboard stop.
 */
const Button = ({
  children,
  type,
  onClick,
  classes = "",
  href,
  external = false,
}) => {
  const isPrimary = type === "primary";
  const tone = isPrimary
    ? "bg-white text-black"
    : "flex items-center hover:bg-slate-600 text-white";

  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Link
        href={href}
        className={`${baseClasses} ${tone} ${classes || "!ml-0"}`}
        {...externalProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${baseClasses} ${tone} ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button;
