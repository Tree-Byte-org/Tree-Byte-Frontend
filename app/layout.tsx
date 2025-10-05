import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Nunito_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { ErrorBoundary, GlobalErrorHandlers } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/query-provider";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TreeByte",
  description:
    "A regenerative Web3 platform that tokenizes reforestation in Costa Rica.",
  generator: "TreeByte",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`overflow-x-hidden ${nunitoSans.className}`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange={false}
          >
            <GlobalErrorHandlers />
            <ErrorBoundary>
              <LayoutWrapper>{children}</LayoutWrapper>
            </ErrorBoundary>
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
