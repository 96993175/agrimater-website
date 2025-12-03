"use client"

import type React from "react"

import { Navbar } from "./navbar"
import { Footer } from "./footer"

interface PageWrapperProps {
  children: React.ReactNode
  showFooter?: boolean
}

export function PageWrapper({ children, showFooter = true }: PageWrapperProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">{children}</main>
      {showFooter && <Footer />}
    </>
  )
}
