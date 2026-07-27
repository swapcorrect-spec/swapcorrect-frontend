"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/shared/sidebar";
import Navbar from "@/components/shared/navbar";
import { PATHS } from "../_constants/paths";
import { useAuth } from "@/app/_context/auth-context";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace(`/${PATHS.LOGIN}`);
    }
  }, [isHydrated, isAuthenticated, router]);

  if (isHydrated && !isAuthenticated) {
    return null;
  }

  return (
    <>
      <section className={cn("flex w-full")}>
        {isAuthenticated && <Sidebar />}
        <section className="flex-1 h-screen overflow-y-auto">
          <Navbar />
          {children}
        </section>
      </section>
    </>
  );
}
