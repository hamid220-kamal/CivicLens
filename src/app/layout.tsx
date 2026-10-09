import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased bg-slate-950 text-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
