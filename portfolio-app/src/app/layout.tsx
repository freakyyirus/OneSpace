import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

export const metadata: Metadata = {
  title: "OneSpace - One space. All your work. Proven.",
  description: "Proof-first portfolio system where professionals present real work, real outcomes, and real proof — customized by profession.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
