"use client";

import { ThemeProvider } from "next-themes";
import CustomCursor from "@/components/atoms/CustomCursor/page.jsx";

const BaseTemplate = ({ children }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <CustomCursor />
      {children}
    </ThemeProvider>
  );
};

export default BaseTemplate;
