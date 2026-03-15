import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mello — Entrusted Job Management",
  description: "Property damage restoration job management by Entrusted",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mello",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f87b4d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-screen bg-[#f8f9fa] antialiased safe-top safe-bottom">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
