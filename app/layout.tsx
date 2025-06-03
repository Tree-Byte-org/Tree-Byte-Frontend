import "./globals.css"
import type { Metadata } from "next"
import { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNavigation } from "@/components/main-navigation"

export const metadata: Metadata = {
  title: "Tree Byte",
  description: "A regenerative Web3 platform that tokenizes reforestation in Costa Rica.",
  generator: "Tree Byte",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
          <MainNavigation />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
