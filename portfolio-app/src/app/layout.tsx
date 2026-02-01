import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneSpace - One space. All your work. Proven.",
  description: "AI-powered portfolio system where professionals present real work, real outcomes, and real proof — customized by profession.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
