import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Supabase Starter",
  description: "Production-ready Next.js 16 + Supabase starter kit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
