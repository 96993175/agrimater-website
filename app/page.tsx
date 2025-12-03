"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react"
import Link from "next/link"

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
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center neon-glow-sm"
          >
            <LeafIcon className="w-6 h-6 text-black" />
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 p-6"
        >
          <div className="flex flex-col gap-4">
            {["Vision", "Features", "Impact", "Team", "Partner"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="text-gray-600 hover:text-gray-900 font-medium py-2"
              >
                {item}
              </a>
            ))}
            <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium py-2">
              Login
            </Link>
            <Link href="/farmer-onboarding">
              <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-black font-semibold">
                Get Started
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

// Hero Section
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), { stiffness: 100, damping: 30 })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00F28A]/10 via-white to-white z-10" />
        <img
          src="/cinematic-aerial-view-of-lush-green-smart-farm-at-.jpg"
          alt="Smart farm"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white z-10" />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#00F28A]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#4BE96A]/15 to-transparent blur-3xl"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#00F28A]"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div style={{ opacity, scale }} className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8 neon-glow-sm"
        >
          <SparklesIcon className="w-4 h-4 text-[#00F28A]" />
          <span className="text-sm font-semibold tracking-wide text-gray-900">AI-Powered Agritech Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 tracking-tight text-balance leading-[1.1]"
        >
          Reimagining Agriculture.
          <br />
          <span className="gradient-text neon-text">Empowering Supply Chains.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 text-pretty leading-relaxed"
        >
          AI-powered farm-to-retail transparency for Bharat. Verification, grading, and intelligent logistics — all in
          one platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link href="/farmer-onboarding">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(0, 242, 138, 0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-black font-bold text-lg flex items-center gap-3 neon-glow transition-all duration-300"
            >
              Join as a Farmer
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          <Link href="/retailer-solutions">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group px-8 py-4 rounded-full glass border-2 border-[#00F28A]/30 hover:border-[#00F28A]/60 text-gray-900 font-bold text-lg flex items-center gap-3 transition-all duration-300"
            >
              <PlayIcon className="w-5 h-5" />
              Explore Solutions
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
            <ChevronDownIcon className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Vision Section
function VisionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const visionItems = [
    { icon: LeafIcon, text: "Sustainable Practices" },
    { icon: ShieldCheckIcon, text: "Verified at Every Step" },
    { icon: BrainIcon, text: "AI-Powered Grading" },
    { icon: TruckIcon, text: "Smart Logistics" },
  ]

  return (
    <section id="vision" ref={ref} className="py-32 md:py-40 relative overflow-hidden bg-white">
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
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-[#00F28A]/10 text-[#00F28A] text-sm font-semibold mb-6"
            >
              Our Vision
            </motion.span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight text-balance">
              The Future of Fresh
              <span className="gradient-text block">Begins Here</span>
            </h2>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed text-pretty">
              We're bridging the gap between farms and retail with cutting-edge AI technology. Our platform ensures
              complete transparency, from soil to shelf — empowering farmers, retailers, and consumers with verified,
              grade-level data and intelligent logistics.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {visionItems.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card group hover:neon-glow-sm transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-black" />
                  </div>
                  <span className="font-semibold text-gray-900">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden neon-glow">
                <img
                  src="/futuristic-holographic-farm-interface-with-glowing.jpg"
                  alt="Futuristic farm technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00F28A]/20 via-transparent to-[#4BE96A]/20" />
                <div className="absolute inset-0 scan-lines" />
              </div>
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-5 shadow-2xl"
              >
                <div className="text-3xl font-bold gradient-text">99.2%</div>
                <div className="text-sm text-gray-500 font-medium">Accuracy Rate</div>
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
                className="absolute -top-6 -right-6 glass-card rounded-2xl p-5 shadow-2xl"
              >
                <div className="text-3xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-gray-500 font-medium">Live Monitoring</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Verified Produce",
      description: "Blockchain-backed traceability ensuring authenticity from farm to consumer.",
      gradient: "from-emerald-400 to-green-500",
    },
    {
      icon: BarChartIcon,
      title: "Grade-Level Precision",
      description: "AI-powered grading provides precise quality metrics across the supply chain.",
      gradient: "from-[#00F28A] to-[#4BE96A]",
    },
    {
      icon: TruckIcon,
      title: "Smart Logistics",
      description: "Intelligent route optimization ensures freshness throughout delivery.",
      gradient: "from-teal-400 to-emerald-500",
    },
    {
      icon: BrainIcon,
      title: "Data-Driven Insights",
      description: "Advanced analytics for demand forecasting and market trends.",
      gradient: "from-green-400 to-[#4BE96A]",
    },
  ]

  return (
    <section id="features" ref={ref} className="py-32 md:py-40 relative bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00F28A]/10 text-[#00F28A] text-sm font-semibold mb-6">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Powering the Agricultural
            <span className="gradient-text block">Revolution</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four pillars of innovation driving farm-to-retail excellence
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="h-full p-8 rounded-3xl glass-card hover:neon-glow-sm transition-all duration-500 group"
              >
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:animate-pulse-glow transition-all`}
                >
                  <feature.icon className="w-8 h-8 text-black" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Impact Section
function ImpactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const stats = [
    { icon: UsersIcon, value: "500+", label: "Farmers Onboarded" },
    { icon: TrophyIcon, value: "#113", label: "Tracxn Ranking" },
    { icon: MapPinIcon, value: "2", label: "Active Zones" },
  ]

  return (
    <section id="impact" ref={ref} className="py-32 md:py-40 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 242, 138, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 138, 0.1) 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>
              <img
                src="/minimal-outline-map-of-india-dark-gray-on-white-ba.jpg"
                alt="India map"
                className="w-full h-full object-contain opacity-30"
              />
              {[
                { name: "Pune", x: 35, y: 55 },
                { name: "Hinjewadi", x: 33, y: 53 },
              ].map((zone, i) => (
                <motion.div
                  key={zone.name}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
                  className="absolute"
                  style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                >
                  <motion.div
                    animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute w-8 h-8 rounded-full bg-[#00F28A]/40 -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="w-4 h-4 rounded-full bg-[#00F28A] neon-glow-sm -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute left-4 top-0 whitespace-nowrap glass px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                    {zone.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#00F28A]/10 text-[#00F28A] text-sm font-semibold mb-6">
              Impact
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Making an Impact
              <span className="gradient-text block">Across Bharat</span>
            </h2>
            <div className="glass-card rounded-3xl p-8 mb-10">
              <p className="text-lg text-gray-600 leading-relaxed">
                In a competitive landscape of{" "}
                <span className="text-[#00F28A] font-semibold">160+ agritech startups</span>, Agrimater has carved its
                niche, earning recognition on Tracxn with a{" "}
                <span className="text-[#00F28A] font-semibold">ranking of #113</span>. We're just getting started.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <stat.icon className="w-8 h-8 text-[#00F28A] mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
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
    <section id="team" ref={ref} className="py-32 md:py-40 relative bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00F28A]/10 text-[#00F28A] text-sm font-semibold mb-6">
            Leadership
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            The Visionary Behind
            <span className="gradient-text block">Agrimater</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-[2rem] p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00F28A]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#4BE96A]/10 to-transparent rounded-full blur-3xl" />
            <div className="relative flex flex-col md:flex-row items-center gap-10">
              <motion.div whileHover={{ scale: 1.05 }} className="relative flex-shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#00F28A] to-[#4BE96A] p-1 neon-glow">
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-6xl font-bold gradient-text">DS</span>
                  </div>
                </div>
              </motion.div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dhairyashil Shinde</h3>
                <p className="text-lg text-[#00F28A] font-semibold mb-6">Founder & CEO</p>
                <p className="text-gray-600 mb-8">Visionary entrepreneur building AI for Bharat</p>
                <div className="relative">
                  <QuoteIcon className="w-10 h-10 text-[#00F28A]/20 absolute -top-4 -left-2" />
                  <p className="text-xl md:text-2xl text-gray-900 italic leading-relaxed pl-8">
                    "We started small but dared to dream big. Every farmer deserves access to fair markets, and every
                    consumer deserves to know where their food comes from."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
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
    { icon: UsersIcon, label: "For FPOs", href: "/farmer-onboarding" },
    { icon: BarChartIcon, label: "For Retailers", href: "/retailer-solutions" },
    { icon: TruckIcon, label: "For Logistics", href: "/retailer-solutions" },
    { icon: SparklesIcon, label: "Investor Access", href: "/investor-access" },
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
    <section id="partner" ref={ref} className="py-32 md:py-40 relative overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#00F28A]/5 to-white" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00F28A]/10 text-[#00F28A] text-sm font-semibold mb-6">
            Partner With Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Join the<span className="gradient-text"> Revolution</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're a farmer, retailer, or investor — there's a place for you in our ecosystem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          {partnerTypes.map((partner, i) => (
            <Link key={partner.label} href={partner.href}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-4 rounded-full glass-card hover:neon-glow-sm transition-all duration-300 cursor-pointer"
              >
                <partner.icon className="w-5 h-5 text-[#00F28A]" />
                <span className="font-semibold text-gray-900">{partner.label}</span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center mx-auto mb-6 neon-glow">
                  <SparklesIcon className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
                <p className="text-gray-600">We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#00F28A] focus:ring-2 focus:ring-[#00F28A]/20 outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#00F28A] focus:ring-2 focus:ring-[#00F28A]/20 outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                  <select
                    required
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#00F28A] focus:ring-2 focus:ring-[#00F28A]/20 outline-none transition-all text-gray-900"
                  >
                    <option value="">Select category</option>
                    <option value="farmer">Farmer / FPO</option>
                    <option value="retailer">Retailer</option>
                    <option value="logistics">Logistics Partner</option>
                    <option value="investor">Investor</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#00F28A] focus:ring-2 focus:ring-[#00F28A]/20 outline-none transition-all resize-none text-gray-900 placeholder-gray-400"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-black font-bold text-lg flex items-center justify-center gap-3 neon-glow hover:shadow-[0_0_40px_rgba(0,242,138,0.5)] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <SendIcon className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-16 border-t border-gray-200 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center">
                <LeafIcon className="w-6 h-6 text-black" />
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
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Agrimater. All rights reserved.</p>
          <p className="text-sm text-gray-500">Built with care for Bharat's farmers</p>
        </div>
      </div>
    </footer>
  )
}

// Main Page
export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <VisionSection />
      <FeaturesSection />
      <ImpactSection />
      <TeamSection />
      <PartnerSection />
      <Footer />
    </main>
  )
}
