import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FounderDemo - 60s Demo Scripts",
  description: "Generate demo scripts from product URLs",
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
