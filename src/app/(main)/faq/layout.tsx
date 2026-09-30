import Footer from "@/components/shared/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Swap Correct",
  description: "FAQ.",
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
