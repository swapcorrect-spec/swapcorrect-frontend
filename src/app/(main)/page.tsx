"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/shared/sidebar";
import Navbar from "@/components/shared/navbar";
import { PATHS } from "../_constants/paths";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isLoggedIn = localStorage.getItem("user");
  if (!isLoggedIn) {
    router.push(`/${PATHS.LOGIN}`);
  }
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
