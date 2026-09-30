import Footer from "@/components/shared/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risk Assessment | Swap Correct",
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
