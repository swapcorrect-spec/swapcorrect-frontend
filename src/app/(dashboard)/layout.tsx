import { Metadata } from "next";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/shared/sidebar";
import Navbar from "@/components/shared/navbar";

export const metadata: Metadata = {
  title: "ID-Certify",
  description: "Users page",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className={cn("flex w-full")}>
        <Sidebar />
        <section className="flex-1 h-screen overflow-y-auto">
          <Navbar />
          {children}
        </section>
      </section>
    </>
  );
}
