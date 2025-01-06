import React from "react";
import { cn } from "../lib/cn";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={cn("min-h-screen bg-white text-black antialiased")}>
      <main className="w-full">{children}</main>
    </div>
  );
}
