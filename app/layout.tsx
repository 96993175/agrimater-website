import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Agrimater | AI-Powered Farm-to-Retail Transparency",
  description:
    "Reimagining agriculture with AI-powered verification, grading, and logistics for Bharat. From farm to retail with complete transparency.",
  keywords: ["agritech", "agriculture", "AI", "farm-to-retail", "supply chain", "India", "Bharat"],
  authors: [{ name: "Dhairyashil Shinde" }],
  creator: "Agrimater",
  openGraph: {
    title: "Agrimater | AI-Powered Farm-to-Retail Transparency",
    description: "Reimagining agriculture with AI-powered verification, grading, and logistics for Bharat.",
    type: "website",
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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
