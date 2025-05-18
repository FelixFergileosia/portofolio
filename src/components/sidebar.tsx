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
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <>
      {/* ---------- DESKTOP (md+) ---------- */}
      <div className="hidden md:block">
        {collapsed ? (
          /* Collapsed state */
          <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-100 bg-black/80 backdrop-blur-lg rounded-full flex flex-col justify-between py-6 px-3 w-14 h-96 text-white shadow-lg transition-all duration-300">
            <div className="flex-1 flex flex-col justify-around items-center">
              {items.map(({ id, label, icon, href, onClick }) => {
                const isActive = pathname === href;
                return (
                  <a
                    key={id}
                    href={href}
                    onClick={onClick}
                    title={label}
                    className={clsx(
                      "flex items-center justify-center p-2 transition-colors",
                      isActive
                        ? "text-emerald-400"
                        : "text-neutral-300 hover:text-white"
                    )}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      {icon}
                    </div>
                  </a>
                );
              })}

              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-neutral-800 transition"
              >
                <MenuIcon size={20} />
              </button>
            </div>
          </aside>
        ) : (
          /* Expanded state */
          <aside className="fixed top-0 left-0 z-100 h-screen w-80 bg-neutral-900 px-4 text-white flex flex-col items-center transition-all duration-300">
            <button
              onClick={toggleSidebar}
              className="self-start ml-4 mt-4 p-2 rounded hover:bg-neutral-800 transition"
            >
              <MenuIcon size={24} />
            </button>

            <button className="w-60 h-60 rounded-full overflow-hidden border-2 border-neutral-700 hover:border-emerald-400 transition mt-4">
              <Image
                src={avatarSrc}
                alt={avatarAlt}
                width={avatarSize}
                height={avatarSize}
                priority
              />
            </button>

            <nav className="mt-12 w-full px-4 flex flex-col gap-6 items-center">
              {items.map(({ id, label, icon, href, onClick }) => {
                const isActive = pathname === href;
                return (
                  <a
                    key={id}
                    href={href}
                    onClick={onClick}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2 w-full rounded-md transition-colors hover:bg-neutral-800",
                      isActive
                        ? "text-emerald-400"
                        : "text-neutral-300 hover:text-white"
                    )}
                  >
                    {icon}
                    <span className="truncate">{label}</span>
                  </a>
                );
              })}
            </nav>
          </aside>
        )}
      </div>

      {/* ---------- MOBILE (<md) ---------- */}
      <nav className="fixed bottom-0 left-0 w-full md:hidden z-100 bg-black/90 backdrop-blur-lg border-t border-neutral-800 flex items-center justify-around py-2">
        {items.map(({ id, label, icon, href, onClick }) => {
          const isActive = pathname === href;
          return (
            <a
              key={id}
              href={href}
              onClick={onClick}
              className={clsx(
                "flex flex-col items-center text-xs",
                isActive
                  ? "text-emerald-400"
                  : "text-neutral-300 hover:text-white"
              )}
            >
              {icon}
              <span className="text-[10px]">{label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
