"use client";

import "./globals.css";
import BaseTemplate from "@/components/templates/BaseTemplate/page.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>James Portfolio</title>
        <meta
          name="description"
          content="Welcome to my portfolio! Explore the projects and work I've done as a web developer. Discover my experience, skills, and passion for programming."
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <BaseTemplate>{children}</BaseTemplate>
      </body>
    </html>
  );
}
