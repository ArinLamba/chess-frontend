import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner"

const font = Inter({
  subsets: ["latin"]
});


export const metadata: Metadata = {
  title: "Chess App",
  description: "Chess App",
  icons: "/logo.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} antialiased`}
      >
        {children}
        <Toaster />

      </body>
    </html>
  );
}
