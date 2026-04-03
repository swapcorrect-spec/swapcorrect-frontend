"use client";

import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/shared/sidebar";
import Navbar from "@/components/shared/navbar";
import { PATHS } from "../_constants/paths";
import { Auth } from "../_config/auth";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = Auth.isAuthenticated();

  if (!isAuthenticated) {
    redirect(`/${PATHS.LOGIN}`);
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
