import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import {Metadata} from "next";
import { Analytics } from "@vercel/analytics/react"
import PlaceSelector from "@/components/PlaceSelector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Navacerrada tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <nav>
      <PlaceSelector/>
    </nav>
    <main className="min-h-screen p-4 bg-gradient-to-b from-gray-800 to-gray-900">
      {children}
    </main>
    <Analytics />
    </body>
    </html>
  );
}
