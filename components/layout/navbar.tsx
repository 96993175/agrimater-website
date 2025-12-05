"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#vision", label: "Vision" },
  { href: "#features", label: "Features" },
  { href: "#impact", label: "Impact" },
  { href: "#team", label: "Team" },
  { href: "#partner", label: "Partner" },
]

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled 
            ? "bg-white/90 backdrop-blur-2xl border-b border-[#00f28a]/10 py-3 shadow-xl shadow-black/5" 
            : "bg-white/70 backdrop-blur-md py-5"
        )}
      >
        <nav className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center shadow-lg group-hover:shadow-[#00f28a]/50 transition-shadow duration-300"
            >
              <Leaf className="w-5 h-5 text-gray-900" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Agrimater</span>
          </Link>

          {/* Desktop Navigation */}
          {isHomePage && (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm font-semibold group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00F28A] to-[#4BE96A] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 text-gray-700 hover:text-gray-900 transition-all text-sm font-semibold rounded-lg hover:bg-gray-100/80"
              >
                Login
              </motion.button>
            </Link>
            <Link href="/farmer-onboarding">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 242, 138, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-gray-900 text-sm font-bold shadow-lg shadow-[#00f28a]/30 hover:shadow-xl hover:shadow-[#00f28a]/40 transition-all duration-300"
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-full left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 p-6 shadow-lg"
            style={{ top: isScrolled ? "64px" : "80px" }}
          >
            <div className="flex flex-col gap-4">
              {isHomePage && navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className={cn("flex flex-col gap-3", isHomePage && "pt-4 border-t border-gray-200")}>
                <Link href="/login" className="w-full">
                  <button className="w-full px-5 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                    Login
                  </button>
                </Link>
                <Link href="/farmer-onboarding" className="w-full">
                  <button className="w-full px-5 py-3 rounded-full bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-gray-900 font-medium">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
