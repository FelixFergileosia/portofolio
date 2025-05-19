// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Home, Folder, User, Hexagon } from "lucide-react";
import Sidebar, { type NavItem } from "@/components/sidebar";
import "./globals.css";

/* --------- fonts --------- */
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* --------- metadata --------- */
export const metadata: Metadata = {
  title: "Portofolio - Felix Fergileosia",
  description: "Achievements & Past Experiences",
};

/* --------- sidebar menu --------- */
const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <Home size={36} />, href: "/" },
  {
    id: "projects",
    label: "Projects",
    icon: <Folder size={36} />,
    href: "/projects",
  },
  {
    id: "skills",
    label: "skills",
    icon: <Hexagon size={36} />,
    href: "/skills",
  },
];

/* --------- layout --------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen`}
      >
        {/* Sidebar is a client component */}
        <Sidebar avatarSrc="/profile3.JPG" items={navItems} />

        {/* right-hand column */}
        <div className="flex flex-col flex-1">
          {/* Uncomment when you add a Navbar */}
          {/* <Navbar /> */}
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
