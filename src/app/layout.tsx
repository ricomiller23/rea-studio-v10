import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REA Studio — Reverse Engineer Anything: Replicate, Improve & Create",
  description: "Interactive reverse engineering, modernization, and code synthesis laboratory powered by REA (Reverse Engineer Anything v6.5.0 MCP)."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/v10-responsive.css" />
      </head>
      <body>{children}  <script src="/v10-suite.js" defer></script>
      </body>
    </html>
  );
}
