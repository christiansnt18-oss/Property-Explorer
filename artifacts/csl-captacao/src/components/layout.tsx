import React from "react";
import { Link } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-4 border-b bg-card px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 outline-none group">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-primary text-primary-foreground text-xs font-bold">
            CSL
          </div>
          <span className="font-semibold text-sm tracking-tight text-foreground">Radar</span>
        </Link>
        <div className="flex-1" />
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
          JD
        </div>
      </header>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
