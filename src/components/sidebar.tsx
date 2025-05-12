// components/Sidebar.tsx
"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { Menu as MenuIcon } from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  icon: ReactNode;
  href: string;
  onClick?: () => void;
};

export type SidebarProps = {
  avatarSrc: string;
  avatarAlt?: string;
  avatarSize?: number;
  items: NavItem[];
};

export default function Sidebar({
  avatarSrc,
  avatarAlt = "Profile photo",
  avatarSize = 256,
  items,
}: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true); // Default to collapsed state
  console.log("🚀 ~ collapsed:", collapsed);

  // Handle toggle functionality
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Collapsed sidebar layout
  if (collapsed) {
    return (
      <aside className="fixed left-6 top-1/2 transform -translate-y-1/2 z-100 bg-black/80 backdrop-blur-lg rounded-full flex flex-col justify-between py-6 px-3 w-14 shadow-lg h-96 text-white transition-all duration-300 ease-in-out">
        <div className="flex-1 flex flex-col justify-around items-center">
          {/* Nav items */}
          {items.map(({ id, label, icon, href, onClick }, index) => {
            const isActive = pathname === href;
            return (
              <a
                key={id}
                href={href}
                onClick={onClick}
                className={clsx(
                  "flex items-center justify-center transition-colors p-2",
                  isActive
                    ? "text-emerald-400"
                    : "text-neutral-300 hover:text-white"
                )}
                title={label}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {icon}
                </div>
              </a>
            );
          })}

          {/* Toggle button included in the same container */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-neutral-800 transition"
          >
            <MenuIcon size={20} />
          </button>
        </div>
      </aside>
    );
  }

  // Expanded sidebar layout
  return (
    <aside className="fixed top-0 left-0 z-100 h-screen bg-neutral-900 w-100 gap-24 px-4 text-white flex flex-col items-center transition-all duration-300 ease-in-out">
      {/* Toggle button in expanded mode */}
      <button
        onClick={toggleSidebar}
        className="self-start ml-4 mt-4 p-2 rounded hover:bg-neutral-800 transition"
      >
        <MenuIcon size={24} />
      </button>

      {/* Avatar / logo */}
      <button className="w-60 h-60 rounded-full overflow-hidden border-2 border-neutral-700 hover:border-emerald-400 transition">
        <Image
          src={avatarSrc}
          alt={avatarAlt}
          width={avatarSize}
          height={avatarSize}
          priority
        />
      </button>

      {/* Nav items for expanded mode */}
      <nav className="mt-12 gap-6 w-full px-4 flex flex-col items-center">
        {items.map(({ id, label, icon, href, onClick }, index) => {
          const isActive = pathname === href;
          return (
            <a
              key={id}
              href={href}
              onClick={onClick}
              className={clsx(
                "flex items-center justify-center transition-colors",
                "gap-3 px-3 py-2 rounded-md hover:bg-neutral-800 w-full",
                isActive
                  ? "text-emerald-400"
                  : "text-neutral-300 hover:text-white"
              )}
            >
              {icon}
              <span className="ml-2 truncate">{label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
