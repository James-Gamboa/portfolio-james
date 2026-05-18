"use client";

import { ThemeProvider } from "next-themes";
import ClientMotionBoundary from "@/components/providers/ClientMotionBoundary";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ClientMotionBoundary>{children}</ClientMotionBoundary>
    </ThemeProvider>
  );
};

export default AppProviders;
