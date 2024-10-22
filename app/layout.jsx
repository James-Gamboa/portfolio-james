"use client"; 

import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import CustomCursor from "@/components/CustomCursor/page"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider enableSystem={true} attribute="class">
          <CustomCursor /> 
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}