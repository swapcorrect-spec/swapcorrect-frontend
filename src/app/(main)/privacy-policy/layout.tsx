import Herosection from "@/components/shared/herosection";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Swap Correct",
  description: "Read the Privacy Policy governing the use of the Swap Correct platform.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
