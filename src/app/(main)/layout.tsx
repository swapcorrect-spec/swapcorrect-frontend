import { Metadata } from "next";
import MainPage from "@/app/(main)/page";

export const metadata: Metadata = {
  title: "Swap Shop",
  description: "swap shop",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainPage>{children}</MainPage>
    </>
  );
}
