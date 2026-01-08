import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const sfPro = Inter({
  variable: "--font-sf-pro",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Event Manager - iOS Style",
  description: "Modern event management portal with iOS design",
};

import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sfPro.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main className="container mx-auto py-8 px-4">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

