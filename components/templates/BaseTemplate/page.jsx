"use client";

import { ThemeProvider } from "next-themes";

const BaseTemplate = ({ children }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default BaseTemplate;
