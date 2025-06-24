"use client";

import React from "react";

import useAuth from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";

import { navItems } from "../constants";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const { user, isPending } = useAuth();

  const [isTransition, setTransition] = React.useState(false);
  const [isOpen, setOpen] = React.useState(false);

  const handleToogle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => {
      setTransition(false);
    }, 200);
  };

  return (
    <div className="bg-secondary/20">
      <div
        className={cn(
          "relative transition-all duration-200",
          isPending ? "-translate-x-full pointer-events-none" : "translate-x-0"
        )}
      >
        <nav
          className={cn(
            "h-screen border-r pt-24",
            isTransition && "duration-200",
            isOpen ? "md:w-60 w-[78px]" : "w-[78px]"
          )}
          onMouseEnter={() => handleToogle(true)}
          onMouseLeave={() => handleToogle(false)}
        >
          <div className="px-3 py-2">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <SidebarItem key={item.href} navItem={item} isOpen={isOpen} />
              ))}
            </nav>
          </div>
        </nav>
      </div>
    </div>
  );
}
