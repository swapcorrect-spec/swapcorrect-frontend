"use client";

import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/shared/sidebar";
import Navbar from "@/components/shared/navbar";
import { PATHS } from "../_constants/paths";
import { useGetUserInfo } from "../_hooks/queries/auth/auth";
import { Auth } from "../_config/auth";
import { CircularProgress } from "@/components/shared/circular-progress";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { isFetching, data } = useGetUserInfo({ enabler: true });

  const isAuthenticated = Auth.isAuthenticated();

  if (isFetching) {
    return (
      <div className="text-center mt-4 flex flex-col items-center justify-center">
        <CircularProgress color="#007AFF" size={40} />
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
        <Navbar data={data} />
        {children}
      </section>
    </section>
  );
}
