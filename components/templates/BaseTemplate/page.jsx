"use client";

import { ThemeProvider } from "next-themes";
import MotionProvider from "@/components/providers/MotionProvider";

const BaseTemplate = ({ children }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <MotionProvider>{children}</MotionProvider>
    </ThemeProvider>
  );
};

export default BaseTemplate;
