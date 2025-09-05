"use client";

import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/shared/sidebar";
import Navbar from "@/components/shared/navbar";
import { PATHS } from "../_constants/paths";
import { useGetUserInfo } from "../_hooks/queries/auth/auth";
import { Auth } from "../_config/auth";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { isFetching } = useGetUserInfo({ enabler: true });

  const isAuthenticated = Auth.isAuthenticated();

  if (isFetching) {
    return (
      <div>
        <p>Fetching</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect(`/${PATHS.LOGIN}`);
  }

  return (
    <section className={cn("flex w-full")}>
      {isAuthenticated && <Sidebar />}
      <section className="flex-1 h-screen overflow-y-auto">
        <Navbar />
        {children}
      </section>
    </section>
  );
}
