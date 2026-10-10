import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: "CivicLens — AI-Powered Civic Intelligence",
  description: "Transforming citizen reports into grounded, actionable civic intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-text-primary min-h-screen">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
