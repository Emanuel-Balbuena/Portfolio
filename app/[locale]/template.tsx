"use client";

import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="flex-1 flex flex-col animate-in fade-in duration-500"
    >
      {children}
    </div>
  );
}
