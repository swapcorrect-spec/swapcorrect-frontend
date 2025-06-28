"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/shared/sidebar";
import Navbar from "@/components/shared/navbar";
import { PATHS } from "../_constants/paths";

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push(`/${PATHS.LOGIN}`);
    } else {
      setIsLoggedIn(true);
      setCheckedAuth(true);
    }
  }, [router]);

  if (!checkedAuth) return null;

  return (
    <section className={cn("flex w-full")}>
      {isLoggedIn && <Sidebar />}
      <section className="flex-1 h-screen overflow-y-auto">
        <Navbar />
        {children}
      </section>
    </section>
  );
}
