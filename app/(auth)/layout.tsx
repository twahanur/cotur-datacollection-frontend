import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import AuthEllipsSVG from "@/components/svgIcon/AuthEllipsSVG";

// Load custom fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for Next.js
export const metadata: Metadata = {
  title: "Chotur Data Collection",
  description: "This is a data collection for chotur",
};

// Root layout component
const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen bg-[#030115] overflow-hidden`}
    >
      <AuthEllipsSVG />
      {children}
    </div>
  );
};

export default AuthLayout;
