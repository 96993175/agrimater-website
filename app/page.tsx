"use client"

import type React from "react"

import { useRef, useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion, useScroll, useTransform, useSpring, useInView } from "motion/react"
import Link from "next/link"
import Lottie from "lottie-react"
import rightAnimation from "@/public/Untitled file (1).json"
import deliveryAnimation from "@/public/Delivery Animation.json"
import leavesFallingAnimation from "@/public/leaves falling.json"

// Custom Icon Components
const LeafIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
)

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
)

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const BarChartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
)

const TruckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </svg>
)

const BrainIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M12 18v-5" />
  </svg>
)

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1" />
  </svg>
)

const SendIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)

const MailIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const MessageSquareIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

// Navbar Component
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass py-4" : "py-6"}`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-12 h-12 rounded-2xl overflow-hidden"
          >
            <img src="/logo.png" alt="Agrimater Logo" className="w-full h-full object-contain" />
          </motion.div>
          <span className="text-2xl font-bold text-gray-900 tracking-tight">Agrimater</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {["Vision", "Features", "Impact", "Team", "Partner"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00F28A] to-[#4BE96A] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Login
          </Link>
          <Link href="/farmer-onboarding">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-black font-semibold neon-glow-sm hover:neon-glow transition-shadow duration-300"
            >
              Get Started
            </motion.button>
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, scale: 0.95 }}
          animate={{ opacity: 1, height: "auto", scale: 1 }}
          exit={{ opacity: 0, height: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="md:hidden absolute top-full left-0 right-0 overflow-hidden origin-top"
        >
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-gradient-to-br from-white via-emerald-50/30 to-white backdrop-blur-xl border-t border-gray-100 shadow-2xl"
          >
            {/* Decorative gradient overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-[#00F28A]/5 via-transparent to-[#4BE96A]/5 pointer-events-none" 
            />
            
            {/* Animated background elements */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="absolute top-0 right-0 w-32 h-32 bg-[#00F28A]/10 rounded-full blur-3xl" 
            />
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-0 left-0 w-32 h-32 bg-[#4BE96A]/10 rounded-full blur-3xl" 
            />
            
            <div className="relative flex flex-col gap-2 p-6">
              {/* Logo section in mobile menu */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200/50"
              >
                <motion.div 
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-[#00F28A] to-[#4BE96A] p-0.5"
                >
                  <div className="w-full h-full bg-white rounded-[0.65rem] flex items-center justify-center">
                    <img src="/logo.png" alt="Agrimater" className="w-8 h-8 object-contain" />
                  </div>
                </motion.div>
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-lg font-bold bg-gradient-to-r from-[#00F28A] to-[#4BE96A] bg-clip-text text-transparent"
                >
                  Agrimater
                </motion.span>
              </motion.div>
              
              {/* Navigation items */}
              {["Vision", "Features", "Impact", "Team", "Partner"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.08, duration: 0.4, ease: "easeOut" }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-[#00F28A]/10 hover:to-[#4BE96A]/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 group-hover:text-gray-900 font-semibold transition-colors">
                      {item}
                    </span>
                    <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-[#00F28A] transform -rotate-90 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <motion.div 
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00F28A] to-[#4BE96A] origin-top rounded-r-full"
                  />
                </motion.a>
              ))}
              
              {/* Divider */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2 origin-center"
              />
              
              {/* Login link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                <Link 
                  href="/login" 
                  onClick={() => setMobileOpen(false)}
                  className="group block"
                >
                  <motion.div
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-[#00F28A]/10 hover:to-[#4BE96A]/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F28A]/20 to-[#4BE96A]/20 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-[#00F28A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </motion.div>
                      <span className="text-gray-700 group-hover:text-gray-900 font-semibold">Login</span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
              
              {/* Get Started button */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
                className="mt-4"
              >
                <Link href="/farmer-onboarding" onClick={() => setMobileOpen(false)}>
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full px-6 py-4 rounded-2xl overflow-hidden group"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-[#00F28A] to-[#4BE96A]"
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-[#00F28A] to-[#4BE96A] blur-xl"
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative flex items-center justify-center gap-2">
                      <span className="text-black font-bold text-lg">Get Started</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRightIcon className="w-5 h-5 text-black" />
                      </motion.div>
                    </div>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.header>
  )
}

// Hero Section
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20 md:pt-0">
      <div className="relative container mx-auto px-6 lg:px-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
              }
            }
          }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center min-h-[calc(100vh-6rem)] md:min-h-screen py-12 md:py-20"
        >
          {/* Left side - Text content */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="flex flex-col justify-center space-y-6 md:space-y-8 order-1 lg:order-1"
          >
            <motion.h1 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.445rem] font-bold text-gray-900 mb-4 md:mb-6 tracking-tight leading-[1.1] md:leading-[1.05] text-center md:text-left">
              <motion.span
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="block"
              >
                Reimagining
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="block"
              >
                Agriculture.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                className="block bg-gradient-to-r from-[#00F28A] to-[#4BE96A] bg-clip-text text-transparent"
              >
                Empowering
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
                className="block bg-gradient-to-r from-[#00F28A] to-[#4BE96A] bg-clip-text text-transparent"
              >
                Supply Chains.
              </motion.span>
            </motion.h1>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="flex flex-col sm:flex-row items-center sm:items-start justify-center md:justify-start gap-4 sm:gap-5 mt-4 md:mt-6 w-full"
            >
              <CTAButton
                label="Join as a Farmer"
                icon={<ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                href="/farmer-onboarding"
                variant="primary"
              />
              <CTAButton
                label="Explore Solutions"
                icon={<PlayIcon className="w-4 h-4" />}
                href="/retailer-solutions"
                variant="secondary"
                iconPlacement="left"
              />
            </motion.div>
          </motion.div>

          {/* Right side - Image with 3D glow */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 60 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } }
            }}
            className="relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
          >
            {/* Logo container with subtle parallax */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-2xl aspect-square z-10"
            >
              <img
                src="/ChatGPT Image Dec 3, 2025, 09_03_17 PM.png"
                alt="Agrimater Platform"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

type CTAButtonProps = {
  label: string
  icon?: React.ReactNode
  href: string
  variant: "primary" | "secondary"
  iconPlacement?: "left" | "right"
}

type AnimationState = "default" | "floating" | "anchored"

type RectLike = {
  top: number
  left: number
  width: number
  height: number
}

const DELIVERY_SLOT_IDS = {
  default: "delivery-animation-slot-default",
  anchored: "delivery-animation-slot-anchored",
} as const

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max)
const DELIVERY_PROGRESS_SPEEDUP = 0.8

const getDocumentTop = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  return rect.top + window.scrollY
}

const getSlotRect = (id: string): RectLike | null => {
  if (typeof document === "undefined") return null
  const el = document.getElementById(id)
  if (!el) return null
  const rect = el.getBoundingClientRect()
  return {
    top: getDocumentTop(el),
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  }
}

const DeliveryAnimationVisual = ({ className }: { className?: string }) => (
  <Lottie animationData={deliveryAnimation} loop className={className ?? "w-full h-auto"} />
)

function DeliveryAnimationOverlay({ animationProgress }: { animationProgress: number }) {
  const [slotRects, setSlotRects] = useState<Record<keyof typeof DELIVERY_SLOT_IDS, RectLike | null>>({
    default: null,
    anchored: null,
  })
  const frameRef = useRef<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const measure = () => {
      frameRef.current = null
      setSlotRects({
        default: getSlotRect(DELIVERY_SLOT_IDS.default),
        anchored: getSlotRect(DELIVERY_SLOT_IDS.anchored),
      })
    }

    const scheduleMeasure = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(measure)
    }

    scheduleMeasure()
    window.addEventListener("scroll", scheduleMeasure, { passive: true })
    window.addEventListener("resize", scheduleMeasure)

    return () => {
      window.removeEventListener("scroll", scheduleMeasure)
      window.removeEventListener("resize", scheduleMeasure)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [mounted])

  if (!mounted) return null

  const startRect = slotRects.default
  const endRect = slotRects.anchored
  let targetRect: RectLike | null = null

  if (!startRect && !endRect) {
    targetRect = null
  } else if (animationProgress <= 0 || !endRect) {
    targetRect = startRect ?? endRect
  } else if (animationProgress >= 1 && endRect) {
    targetRect = endRect
  } else if (startRect && endRect) {
    const progress = clamp(animationProgress)
    targetRect = {
      left: startRect.left + (endRect.left - startRect.left) * progress,
      top: startRect.top + (endRect.top - startRect.top) * progress,
      width: startRect.width + (endRect.width - startRect.width) * progress,
      height: startRect.height + (endRect.height - startRect.height) * progress,
    }
  }

  if (!targetRect) {
    return null
  }

  const overlayTransition = { type: "spring" as const, stiffness: 150, damping: 24, mass: 0.6 }
  const rotationAngle = animationProgress * 330

  return (
    <motion.div
      className="absolute left-0 top-0 z-10 pointer-events-none"
      initial={false}
      animate={{
        x: targetRect.left,
        y: targetRect.top,
        width: targetRect.width,
        height: targetRect.height,
        opacity: 1,
      }}
      transition={overlayTransition}
    >
      <motion.div
        className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
        animate={{ rotate: rotationAngle }}
        transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.5 }}
      >
        <DeliveryAnimationVisual className="w-full h-full" />
      </motion.div>
    </motion.div>
  )
}

function CTAButton({
  label,
  icon,
  href,
  variant,
  iconPlacement = "right",
}: CTAButtonProps) {
  const baseClasses =
    variant === "primary"
      ? "bg-gray-900 text-white hover:bg-gray-800"
      : "border border-gray-300 hover:border-gray-400 text-gray-900 bg-white"
  const iconFirst = iconPlacement === "left"

  return (
    <Link href={href} prefetch={true}>
      <motion.button
        type="button"
        initial={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative z-40 px-6 sm:px-[1.6rem] py-3 sm:py-[0.8rem] rounded-full font-bold text-sm sm:text-[0.9rem] flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 w-full sm:w-auto ${baseClasses}`}
      >
        {icon && (
          <span className={iconFirst ? "order-1" : "order-2"}>
            {icon}
          </span>
        )}
        <span className={iconFirst ? "order-2" : "order-1"}>
          {label}
        </span>
      </motion.button>
    </Link>
  )
}

// Vision Section
function VisionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const lottieRef1 = useRef<any>(null)
  const lottieRef2 = useRef<any>(null)
  
  useEffect(() => {
    // Synchronize animations
    if (lottieRef1.current && lottieRef2.current) {
      lottieRef1.current.setSpeed(1)
      lottieRef2.current.setSpeed(1)
      lottieRef1.current.goToAndPlay(0)
      lottieRef2.current.goToAndPlay(0)
    }
  }, [isInView])
  
  const visionItems = [
    { icon: LeafIcon, text: "Sustainable Practices" },
    { icon: ShieldCheckIcon, text: "Verified at Every Step" },
    { icon: BrainIcon, text: "AI-Powered Grading" },
    { icon: TruckIcon, text: "Smart Logistics" },
  ]

  return (
    <section id="vision" ref={ref} className="py-16 md:py-24 relative overflow-hidden bg-white mt-8 md:-mt-16">
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 242, 138, 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative flex items-center justify-center max-w-5xl mx-auto"
          >
            {/* Background text "FUTURE" */}
            <div className="absolute left-0 right-0 flex items-center justify-center -z-30 overflow-visible -translate-y-12">
              <h2 className="text-[25vw] font-black text-gray-200 select-none opacity-70 tracking-[-0.05em] whitespace-nowrap leading-none" style={{ width: '100vw' }}>
                FUTURE
              </h2>
            </div>
            
            {/* "The" text at left corner */}
            <div className="absolute left-0 top-0 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 sm:-translate-x-[12vw] md:-translate-x-[14vw] lg:-translate-x-[15vw] -translate-y-[15vw] sm:-translate-y-[6vw] md:-translate-y-[5.5vw]">
              <h3 className="text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-6xl font-bold text-gray-900">The</h3>
            </div>
            
            {/* "Begins" text at right corner */}
            <div className="absolute right-0 bottom-0 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:translate-x-[12vw] md:translate-x-[14vw] lg:translate-x-[14.5rem] translate-y-[8vw] sm:translate-y-[6vw] md:translate-y-[5vw] lg:translate-y-12">
              <h3 className="text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-6xl font-bold text-gray-900">Farming</h3>
            </div>
            
            {/* Right side animation */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 scale-80 translate-x-40 translate-y-8">
              <Lottie
                lottieRef={lottieRef1}
                animationData={rightAnimation}
                loop={true}
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))' }}
              />
            </div>
            
            {/* Left side animation (mirrored) */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 scale-80 -translate-x-40 -scale-x-100 translate-y-8">
              <Lottie
                lottieRef={lottieRef2}
                animationData={rightAnimation}
                loop={true}
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))' }}
              />
            </div>
            
            {/* Ground shadow for center image */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[35%] h-8 bg-black/20 blur-xl rounded-full -z-20" />
            
            {/* Center image */}
            <div className="relative w-[40%]">
              <img
                src="/ChatGPT Image Dec 4, 2025, 12_59_32 AM.png"
                alt="Agritech Innovation"
                className="w-full rounded-3xl relative z-10"
                style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection({
  animationState,
  onAnimationStateChange,
  onProgressChange,
}: {
  animationState: AnimationState
  onAnimationStateChange: (state: AnimationState) => void
  onProgressChange: (value: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Verified Produce",
      description: "Blockchain-backed traceability ensuring authenticity from farm to consumer.",
      gradient: "from-emerald-400 to-green-500",
      image: "/VERIFIEDPRODUCE.png",
    },
    {
      icon: BarChartIcon,
      title: "Grade-Level Precision",
      description: "AI-powered grading provides precise quality metrics across the supply chain.",
      gradient: "from-[#00F28A] to-[#4BE96A]",
      image: "/GRADELEVEL.png",
    },
    {
      icon: TruckIcon,
      title: "Smart Logistics",
      description: "Intelligent route optimization ensures freshness throughout delivery.",
      gradient: "from-teal-400 to-emerald-500",
      image: "/LOGISTIC.png",
    },
    {
      icon: BrainIcon,
      title: "Data-Driven Insights",
      description: "Advanced analytics for demand forecasting and market trends.",
      gradient: "from-green-400 to-[#4BE96A]",
      image: "/DATADRAWN.png",
    },
  ]

  const lastStateRef = useRef<AnimationState>(animationState)

  useEffect(() => {
    lastStateRef.current = animationState
  }, [animationState])

  useEffect(() => {
    const handleScroll = () => {
      const sourceEl = document.getElementById("features-animation-source")
      const impactAnchor = document.getElementById("impact-animation-anchor")
      if (!sourceEl || !impactAnchor) return

      const sourceRect = sourceEl.getBoundingClientRect()
      const impactRect = impactAnchor.getBoundingClientRect()
      let nextState: AnimationState = "default"

      if (impactRect.top <= window.innerHeight * 0.4) {
        nextState = "anchored"
      } else if (sourceRect.top <= window.innerHeight * 0.0) {
        nextState = "floating"
      }

      const viewportHeight = window.innerHeight
      const startOffset = getDocumentTop(sourceEl) - viewportHeight * 0.05
      const endOffset = getDocumentTop(impactAnchor) - viewportHeight * 0.4
      const range = endOffset - startOffset
      const rawProgress = range <= 0 ? 1 : (window.scrollY - startOffset) / range
      const acceleratedProgress = DELIVERY_PROGRESS_SPEEDUP <= 0 ? rawProgress : rawProgress / DELIVERY_PROGRESS_SPEEDUP
      onProgressChange(clamp(acceleratedProgress))

      if (nextState !== lastStateRef.current) {
        lastStateRef.current = nextState
        onAnimationStateChange(nextState)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [onAnimationStateChange, onProgressChange])

  return (
    <section id="features" ref={ref} className="py-0 md:py-8 relative bg-white mt-8 md:mt-0">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-0">
          {/* Left side - Single feature image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-3xl overflow-hidden inline-block"
            >
              <img
                src="/allinone.png"
                alt="Features Overview"
                className="w-auto h-auto max-w-full"
              />
            </motion.div>
          </motion.div>

          {/* Right side - Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-start order-1 lg:order-2 mt-16 md:mt-0"
            id="features-animation-source"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#00F28A]/10 text-[#00F28A] text-sm font-semibold mb-6 w-fit">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Powering the Agricultural
              <span className="gradient-text block">Revolution</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mb-8">
              Four pillars of innovation driving farm-to-retail excellence
            </p>
            <div
              id="delivery-animation-slot-default"
              className="w-full max-w-md min-h-[240px]"
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Impact Section
function ImpactSection({ animationState }: { animationState: AnimationState }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isAnchoredState = animationState === "anchored"
  const [mapError, setMapError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [])

  const handleMapLoad = () => {
    setMapError(false)
    setIsLoading(false)
  }

  const handleMapError = () => {
    setIsLoading(false)
    if (retryCount < 3) {
      // Auto-retry loading the map
      retryTimeoutRef.current = setTimeout(() => {
        setRetryCount(prev => prev + 1)
        setIsLoading(true)
        if (iframeRef.current) {
          const src = iframeRef.current.src
          iframeRef.current.src = ''
          setTimeout(() => {
            if (iframeRef.current) {
              iframeRef.current.src = src
            }
          }, 100)
        }
      }, 2000)
    } else {
      setMapError(true)
    }
  }

  const handleRetryClick = () => {
    setMapError(false)
    setRetryCount(0)
    setIsLoading(true)
    if (iframeRef.current) {
      const src = iframeRef.current.src
      iframeRef.current.src = ''
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = src
        }
      }, 100)
    }
  }

  return (
    <section id="impact" ref={ref} className="py-16 md:py-32 relative overflow-hidden bg-white mt-0 md:mt-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Half - Text and Stats Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="order-1 lg:order-1"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#00F28A]/10 text-[#00F28A] text-sm font-semibold mb-6">
              Impact
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Making an Impact
              <span className="gradient-text block">Across Bharat</span>
            </h2>
            <div
              id="impact-animation-anchor"
              className={`flex justify-center transition-all duration-300 ${isAnchoredState ? "mb-8" : "mb-0"}`}
            >
              <div
                id="delivery-animation-slot-anchored"
                className={`w-full max-w-md min-h-[240px] ${isAnchoredState ? "opacity-100" : "opacity-0"}`}
                aria-hidden
              />
            </div>
            <div className="glass-card rounded-3xl p-8 mb-10">
              <p className="text-lg text-gray-600 leading-relaxed">
                We're building the fastest, freshest <span className="text-[#00F28A] font-semibold">farm-to-retail</span> network in Bharat powered by intelligence and trust.
              </p>
            </div>
            
            {/* Impact Stats Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 relative"
            >
              {/* Soft Gradient Background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-100/60 via-white/40 to-white pointer-events-none" />
              
              <img
                src="/ChatGPT%20Image%20Dec%205,%202025,%2002_14_00%20AM.png"
                alt="Agrimater impact stats"
                className="w-full h-auto object-cover rounded-2xl relative z-10"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Right Half - Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-2 mt-16 lg:mt-16"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Outer glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00F28A]/20 via-[#4BE96A]/20 to-[#00F28A]/20 rounded-[2rem] blur-2xl opacity-70" />
              
              {/* Animated border */}
              <div className="absolute -inset-[2px] bg-gradient-to-r from-[#00F28A] via-[#4BE96A] to-[#00F28A] rounded-3xl animate-pulse opacity-60" />
              
              {/* Map container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-white p-1">
                <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden">
                  {mapError ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                        <MapPinIcon className="w-8 h-8 text-red-400" />
                      </div>
                      <p className="text-gray-800 font-bold text-lg mb-2">Map temporarily unavailable</p>
                      <p className="text-sm text-gray-500 mb-6">Hinjewadi Phase 1, Pune, Maharashtra</p>
                      <button
                        onClick={handleRetryClick}
                        className="px-6 py-3 bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-black rounded-full text-sm font-bold hover:shadow-lg hover:shadow-[#00F28A]/30 transition-all duration-300 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Retry Loading Map
                      </button>
                    </div>
                  ) : (
                    <>
                      {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white z-10">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 border-[#00F28A]/20 border-t-[#00F28A] rounded-full mb-4"
                          />
                          <p className="text-gray-600 font-semibold">Loading map...</p>
                          {retryCount > 0 && (
                            <p className="text-xs text-gray-400 mt-2">Retry attempt {retryCount}/3</p>
                          )}
                        </div>
                      )}
                      <iframe
                        ref={iframeRef}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.7891234567890!2d73.6868!3d18.5912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHinjewadi%20Phase%201%2C%20Pune!5e0!3m2!1sen!2sin!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                        onLoad={handleMapLoad}
                        onError={handleMapError}
                      />
                    </>
                  )}
                </div>
              </div>
              
              {/* Location badge */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10"
              >
                <div className="bg-white px-6 py-3 rounded-full shadow-xl border border-gray-100 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-[#00F28A]" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#00F28A] animate-ping opacity-75" />
                  </div>
                  <span className="text-sm font-bold text-gray-900">Agrimater Pune Unit</span>
                  <MapPinIcon className="w-4 h-4 text-[#00F28A]" />
                </div>
              </motion.div>
              
              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#00F28A] rounded-tl-lg" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#00F28A] rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#00F28A] rounded-bl-lg" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#00F28A] rounded-br-lg" />
            </div>

            {/* Text Content - Below Map */}
            <div className="glass-card rounded-3xl p-8 mt-30">
              <p className="text-lg text-gray-600 leading-relaxed">
                In a competitive landscape of{" "}
                <span className="text-[#00F28A] font-semibold">160+ agritech startups</span>, Agrimater has carved its
                niche, earning recognition on Tracxn with a{" "}
                <span className="text-[#00F28A] font-semibold">ranking of 101</span>. We're just getting started.
              </p>
              
              {/* Talk with AI Button */}
              <div className="mt-8 flex justify-center">
                <Link href="/investor-access">
                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(0, 242, 138, 0.25), 0 0 60px rgba(0, 242, 138, 0.15)",
                      y: -2
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-10 py-4 rounded-2xl bg-gradient-to-r from-[#00F28A] via-[#2EF47A] to-[#4BE96A] text-gray-900 text-base font-bold shadow-xl shadow-[#00f28a]/20 transition-all duration-500 flex items-center gap-3 overflow-hidden border border-[#00F28A]/20"
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#4BE96A] via-[#2EF47A] to-[#00F28A] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      animate={{
                        background: [
                          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)"
                        ],
                        x: ["-100%", "200%"]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <div className="relative z-10 flex items-center gap-3">
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <BrainIcon className="w-6 h-6" />
                      </motion.div>
                      <span className="tracking-wide">Talk with AI</span>
                      <motion.div
                        className="w-5 h-5"
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <SparklesIcon className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Team Section
function TeamSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="team" ref={ref} className="py-6 md:py-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/30 to-white" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00F28A]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4BE96A]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-left mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00F28A]/10 text-[#00F28A] text-sm font-semibold mb-6">
            Leadership
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-4">
            The Visionaries Behind
            <span className="text-[#00F28A] block">Agrimater</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Meet the innovators driving agricultural transformation across Bharat
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Dhairyashil Shinde Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="group relative h-full">
              {/* Outer glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00F28A] via-[#4BE96A] to-[#00F28A] rounded-[2.5rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              <div className="glass-card rounded-[2rem] p-8 md:p-10 relative overflow-hidden h-full transition-transform duration-300 group-hover:scale-[1.02]">
                {/* Animated background gradients */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-[#00F28A]/20 to-transparent rounded-full blur-3xl transition-all duration-500 group-hover:scale-150" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#4BE96A]/20 to-transparent rounded-full blur-3xl transition-all duration-500 group-hover:scale-150" />
                
                {/* Decorative corner accent */}
                <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#00F28A]/20 rounded-tr-2xl" />
                
                <div className="relative flex flex-col items-center text-center">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }} 
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative flex-shrink-0 mb-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00F28A] to-[#4BE96A] rounded-full blur-md opacity-50 animate-pulse" />
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#00F28A] to-[#4BE96A] p-[3px] relative">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span className="text-5xl font-bold gradient-text">DS</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dhairyashil Shinde</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#00F28A]" />
                    <p className="text-lg text-[#00F28A] font-semibold">Founder & CEO</p>
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#00F28A]" />
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-base">Visionary entrepreneur building AI for Bharat</p>
                  
                  {/* Social Icons */}
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <a href="https://www.linkedin.com/in/dhairyashil-shinde-6a50b4314/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#00F28A]/10 flex items-center justify-center transition-all duration-300 hover:scale-110">
                      <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="mailto:dhairyashilshinde6715@gmail.com" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#00F28A]/10 flex items-center justify-center transition-all duration-300 hover:scale-110">
                      <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </a>
                    <a href="https://github.com/Dhairyashil-ui" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#00F28A]/10 flex items-center justify-center transition-all duration-300 hover:scale-110">
                      <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 border border-[#00F28A]/10">
                    <QuoteIcon className="w-8 h-8 text-[#00F28A]/30 absolute -top-2 -left-2" />
                    <p className="text-base md:text-lg text-gray-800 italic leading-relaxed">
                      "Every farmer deserves access to fair markets, and every consumer deserves to know where their food comes from."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Aman Pokale Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="group relative h-full">
              {/* Outer glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00F28A] via-[#4BE96A] to-[#00F28A] rounded-[2.5rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              <div className="glass-card rounded-[2rem] p-8 md:p-10 relative overflow-hidden h-full transition-transform duration-300 group-hover:scale-[1.02]">
                {/* Animated background gradients */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-[#00F28A]/20 to-transparent rounded-full blur-3xl transition-all duration-500 group-hover:scale-150" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#4BE96A]/20 to-transparent rounded-full blur-3xl transition-all duration-500 group-hover:scale-150" />
                
                {/* Decorative corner accent */}
                <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#00F28A]/20 rounded-tl-2xl" />
                
                <div className="relative flex flex-col items-center text-center">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: -5 }} 
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative flex-shrink-0 mb-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4BE96A] to-[#00F28A] rounded-full blur-md opacity-50 animate-pulse" />
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#4BE96A] to-[#00F28A] p-[3px] relative">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span className="text-5xl font-bold gradient-text">AP</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Aman Pokale</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#00F28A]" />
                    <p className="text-lg text-[#00F28A] font-semibold">Founding Member</p>
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#00F28A]" />
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-base">Driving innovation in agricultural technology</p>
                  
                  {/* Social Icons */}
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <a href="https://www.linkedin.com/in/amanpokale/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#00F28A]/10 flex items-center justify-center transition-all duration-300 hover:scale-110">
                      <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="mailto:amanpokale2006@gmail.com" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#00F28A]/10 flex items-center justify-center transition-all duration-300 hover:scale-110">
                      <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </a>
                    <a href="https://github.com/aman-ui2006" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#00F28A]/10 flex items-center justify-center transition-all duration-300 hover:scale-110">
                      <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 border border-[#00F28A]/10">
                    <QuoteIcon className="w-8 h-8 text-[#00F28A]/30 absolute -top-2 -left-2" />
                    <p className="text-base md:text-lg text-gray-800 italic leading-relaxed">
                      "Together, we're transforming how agriculture works, making it smarter and more sustainable."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Partner Section with Contact Form
function PartnerSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({ name: "", email: "", category: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const partnerTypes = [
    { 
      icon: UsersIcon, 
      label: "For FPOs", 
      href: "/farmer-onboarding",
      description: "Empower farmer collectives with verified produce",
      gradient: "from-[#00f28a]/20 to-[#4be96a]/20"
    },
    { 
      icon: BarChartIcon, 
      label: "For Retailers", 
      href: "/retailer-solutions",
      description: "Access quality-graded agricultural products",
      gradient: "from-[#4be96a]/20 to-[#00f28a]/20"
    },
    { 
      icon: TruckIcon, 
      label: "For Logistics", 
      href: "/retailer-solutions",
      description: "Optimize delivery with smart route planning",
      gradient: "from-[#00f28a]/20 to-[#4be96a]/20"
    },
    { 
      icon: SparklesIcon, 
      label: "Investor Access", 
      href: "/investor-access",
      description: "Join the agritech revolution",
      gradient: "from-[#4be96a]/20 to-[#00f28a]/20"
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })
      if (res.ok) {
        setSubmitted(true)
        setFormState({ name: "", email: "", category: "", message: "" })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="partner" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Leaves Falling Animation */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <Lottie animationData={leavesFallingAnimation} loop className="w-full h-full" />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00f28a]/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4be96a]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced title with badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <SparklesIcon className="w-4 h-4 text-[#00f28a]" />
            <span className="text-sm font-medium bg-gradient-to-r from-[#00f28a] to-[#4be96a] bg-clip-text text-transparent">
              Partner With Us
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Join the{" "}
            <span className="bg-gradient-to-r from-[#00f28a] to-[#4be96a] bg-clip-text text-transparent">
              Revolution
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Whether you're a farmer, retailer, or investor — there's a place for you in our ecosystem.
          </motion.p>
        </motion.div>

        {/* Contact form with enhanced wrapper */}
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Highlighted text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="lg:pr-8"
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold">
                    <span className="text-foreground">Ready to</span>
                    <br />
                    <span className="bg-gradient-to-r from-[#00f28a] to-[#4be96a] bg-clip-text text-transparent">
                      Transform Together?
                    </span>
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Drop us a message and let's discuss how we can revolutionize agricultural supply chains together.
                  </p>
                </div>
                
                {/* Stats or benefits */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-[#00f28a]">24h</div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-[#00f28a]">100+</div>
                    <div className="text-sm text-muted-foreground">Active Partners</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right side - Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="relative"
            >
              {/* Form container */}
              <div className="relative glass-card rounded-3xl p-8 md:p-10 border border-gray-200 shadow-xl overflow-hidden">
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center mx-auto mb-6 neon-glow"
                    >
                      <SparklesIcon className="w-10 h-10 text-black" />
                    </motion.div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold text-gray-900 mb-3"
                    >
                      Thank You!
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-600"
                    >
                      We'll be in touch soon.
                    </motion.p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="relative group/input">
                        <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-[#00f28a]/10 flex items-center justify-center">
                            <UsersIcon className="w-3 h-3 text-[#00f28a]" />
                          </div>
                          Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border-2 border-gray-200 focus:border-[#00F28A] focus:ring-4 focus:ring-[#00F28A]/10 outline-none transition-all text-gray-900 placeholder-gray-400 group-hover/input:border-[#00f28a]/50"
                            placeholder="Your name"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00f28a]/0 via-[#00f28a]/5 to-[#00f28a]/0 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                      </div>
                      <div className="relative group/input">
                        <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-[#00f28a]/10 flex items-center justify-center">
                            <MailIcon className="w-3 h-3 text-[#00f28a]" />
                          </div>
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border-2 border-gray-200 focus:border-[#00F28A] focus:ring-4 focus:ring-[#00F28A]/10 outline-none transition-all text-gray-900 placeholder-gray-400 group-hover/input:border-[#00f28a]/50"
                            placeholder="you@example.com"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00f28a]/0 via-[#00f28a]/5 to-[#00f28a]/0 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <div className="relative group/input">
                      <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-[#00f28a]/10 flex items-center justify-center">
                          <BarChartIcon className="w-3 h-3 text-[#00f28a]" />
                        </div>
                        Category
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={formState.category}
                          onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                          className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border-2 border-gray-200 focus:border-[#00F28A] focus:ring-4 focus:ring-[#00F28A]/10 outline-none transition-all text-gray-900 group-hover/input:border-[#00f28a]/50 appearance-none cursor-pointer"
                        >
                          <option value="">Select category</option>
                          <option value="farmer">Farmer / FPO</option>
                          <option value="retailer">Retailer</option>
                          <option value="logistics">Logistics Partner</option>
                          <option value="investor">Investor</option>
                          <option value="other">Other</option>
                        </select>
                        <ChevronDownIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00f28a]/0 via-[#00f28a]/5 to-[#00f28a]/0 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </div>
                    <div className="relative group/input">
                      <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-[#00f28a]/10 flex items-center justify-center">
                          <MessageSquareIcon className="w-3 h-3 text-[#00f28a]" />
                        </div>
                        Message
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          rows={4}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border-2 border-gray-200 focus:border-[#00F28A] focus:ring-4 focus:ring-[#00F28A]/10 outline-none transition-all resize-none text-gray-900 placeholder-gray-400 group-hover/input:border-[#00f28a]/50"
                          placeholder="Tell us about yourself..."
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00f28a]/0 via-[#00f28a]/5 to-[#00f28a]/0 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </div>
                    
                    {/* Enhanced submit button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full py-4 rounded-xl overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00F28A] via-[#4BE96A] to-[#00F28A] bg-[length:200%_100%] animate-gradient-shift" />
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-[#00f28a] blur-xl opacity-50 animate-pulse-glow" />
                      </div>
                      <div className="relative z-10 flex items-center justify-center gap-3 text-black font-bold text-lg">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full"
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <SendIcon className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                          </>
                        )}
                      </div>
                      {/* Button edge glow */}
                      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
                      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
                    </motion.button>
                  </form>
                )}
                
                {/* Decorative particles */}
                <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-[#00f28a] opacity-40 blur-sm animate-pulse-slow pointer-events-none" />
                <div className="absolute bottom-20 left-10 w-1.5 h-1.5 rounded-full bg-[#4be96a] opacity-30 blur-sm animate-pulse-slow pointer-events-none" style={{ animationDelay: "1s" }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const [year, setYear] = useState(2025)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="py-16 border-t border-gray-200 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl overflow-hidden">
                <img src="/logo.png" alt="Agrimater Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Agrimater</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm">
              AI-powered farm-to-retail transparency for Bharat. Building the future of agricultural supply chains.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#00F28A]/20 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#00F28A]/20 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
            <div className="space-y-3">
              {["Farmer Onboarding", "Retailer Solutions", "Login", "Register"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase().replace(" ", "-")}`}
                  className="block text-gray-600 hover:text-[#00F28A] transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-start gap-2">
                <MapPinIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#00F28A]" />
                Hinjewadi Phase 1, Pune
              </p>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© {year} Agrimater. All rights reserved.</p>
          <p className="text-sm text-gray-500">Built with care for Bharat's farmers</p>
        </div>
      </div>
    </footer>
  )
}

// Main Page
export default function HomePage() {
  const [animationState, setAnimationState] = useState<AnimationState>("default")
  const [animationProgress, setAnimationProgress] = useState(0)
  const handleAnimationStateChange = useCallback((state: AnimationState) => {
    setAnimationState((prev) => (prev === state ? prev : state))
  }, [])

  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <VisionSection />
      <FeaturesSection
        animationState={animationState}
        onAnimationStateChange={handleAnimationStateChange}
        onProgressChange={setAnimationProgress}
      />
      <ImpactSection animationState={animationState} />
      <TeamSection />
      <PartnerSection />
      <Footer />
      <DeliveryAnimationOverlay animationProgress={animationProgress} />
    </main>
  )
}
