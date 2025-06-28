"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/shared/sidebar";
import Navbar from "@/components/shared/navbar";
import { PATHS } from "../_constants/paths";
import { useEffect, useState } from "react";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

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
    <>
      <section className={cn("flex w-full")}>
        {isLoggedIn && <Sidebar />}
        <section className="flex-1 h-screen overflow-y-auto">
          <Navbar />
          {children}
        </section>
      </section>
    </>
  );
}
