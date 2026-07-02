import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { ConvexClientProvider } from "@/ConvexClientProvider"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
export const metadata: Metadata = {
  title: "Link Party",
  description: "Stop Searching. Start Syncing.",
  openGraph: {
    title: "Link Party",
    description: "The Ultimate Networking Tool.",
    images: [
      {
        url: "https://res.cloudinary.com/dzrkcnt5h/image/upload/v1782999988/linkparty.ng-Link_Party-cvscreenshot_bdcjcd.jpg",
        width: 1200,
        height: 630,
        alt: "Link Party Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Link Party",
    description: "Stop Searching. Start Syncing.",
    images: [
      "https://res.cloudinary.com/dzrkcnt5h/image/upload/v1782999988/linkparty.ng-Link_Party-cvscreenshot_bdcjcd.jpg",
    ],
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable
      )}
    >
      <body>
        <ClerkProvider>
          <Analytics />
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Toaster position="top-center" />
        </ClerkProvider>
      </body>
    </html>
  )
}
