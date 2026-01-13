import type React from "react"
import type { Metadata, Viewport } from "next"
import { ScrollToTop } from "@/components/scroll-to-top"
import "./globals.css"

export const metadata: Metadata = {
  title: "Agrimater | AI-Powered Farm-to-Retail Transparency",
  description:
    "Reimagining agriculture with AI-powered verification, grading, and logistics for Bharat. From farm to retail with complete transparency.",
  keywords: ["agritech", "agriculture", "AI", "farm-to-retail", "supply chain", "India", "Bharat"],
  authors: [{ name: "Dhairyashil Shinde" }],
  creator: "Agrimater",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Agrimater | AI-Powered Farm-to-Retail Transparency",
    description: "Reimagining agriculture with AI-powered verification, grading, and logistics for Bharat.",
    type: "website",
    images: ["/logo.png"],
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#00F28A",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Rubik+Doodle+Shadow&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}
