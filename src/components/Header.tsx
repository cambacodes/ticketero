"use client";

import { AccountDropdown } from "@/features/account/components/AccountDropdown";
import { useAuth } from "@/lib/auth/useAuth";
import { homePath, signInPath, signUpPath } from "@/routes";
import { LucideKanban } from "lucide-react";
import Link from "next/link";

import { ThemeSwitcher } from "./theme/ThemeSwitcher";
import { buttonVariants } from "./ui/button";

export default function Header() {
  const { user, isPending } = useAuth();

  if (isPending) return null;

  return (
    <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between animate-header-from-top">
      <div className="flex justify-center gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className="text-lg font-semibold">Ticketero</h1>
        </Link>
      </div>
      <div className="flex justify-center gap-x-2">
        <ThemeSwitcher />
        {user ? (
          <AccountDropdown user={user} />
        ) : (
          <>
            <Link
              href={signUpPath()}
              className={buttonVariants({ variant: "outline" })}
            >
              Sign Up
            </Link>
            <Link
              href={signInPath()}
              className={buttonVariants({ variant: "outline" })}
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
