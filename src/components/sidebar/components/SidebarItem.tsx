import { cloneElement } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { closedClassName } from "../constants";
import type { NavItem } from "../types";

type SidebarItemProps = {
  isOpen: boolean;
  navItem: NavItem;
};

export default function SidebarItem({ isOpen, navItem }: SidebarItemProps) {
  const path = usePathname();
  const isActive = path === navItem.href;

  return (
    <Link
      href={navItem.href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "group relative flex h-12 items-center justify-start transition-all duration-300",
        isActive && "bg-muted font-bold hover:bg-muted"
      )}
    >
      <span className={cn("flex-shrink-0 transition-all translate-x-[2px]")}>
        {cloneElement(navItem.icon, { className: "size-5" } as LucideProps)}
      </span>

      <span
        className={cn(
          "ml-3 text-base transition-opacity duration-200 md:block hidden",
          !isOpen && closedClassName
        )}
      >
        {navItem.title}
      </span>
    </Link>
  );
}
