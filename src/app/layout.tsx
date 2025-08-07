"use client";

import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "sonner";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 60 * 1000 } },
      })
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <NextTopLoader height={4} showSpinner={false} />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                toast: "border p-4 rounded-md",
                success: "!bg-green-100 !text-green-800",
                error: "!bg-red-100 !text-red-800",
              },
            }}
          />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
