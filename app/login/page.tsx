"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { GradientButton } from "@/components/ui/gradient-button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, ArrowRight, Eye, EyeOff, ArrowLeft, Shield, Sparkles } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("agrimater_token")
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token and redirect
        localStorage.setItem("agrimater_token", data.token)
        router.push("/dashboard")
      } else {
        setError(data.error || "Login failed")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Back Button */}
      <div className="absolute top-0 left-0 right-0 z-50 px-4 md:px-6 py-6">
        <div className="container mx-auto max-w-7xl">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-[#00f28a]/50 text-gray-700 hover:text-gray-900 transition-all shadow-lg hover:shadow-[0_8px_30px_rgba(0,242,138,0.15)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold text-sm">Back</span>
          </motion.button>
        </div>
      </div>

      {/* Premium Neon-Green Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main center glow - soft neon green */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,242,138,0.15) 0%, rgba(75,233,106,0.08) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        
        {/* Top left accent glow */}
        <motion.div 
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,242,138,0.12) 0%, rgba(34,197,94,0.06) 50%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        
        {/* Bottom right accent glow */}
        <motion.div 
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(75,233,106,0.12) 0%, rgba(0,242,138,0.06) 50%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 13 + 7) % 100}%`,
              top: `${(i * 19 + 11) % 100}%`,
              width: i % 3 === 0 ? '3px' : i % 2 === 0 ? '2px' : '1.5px',
              height: i % 3 === 0 ? '3px' : i % 2 === 0 ? '2px' : '1.5px',
              background: `radial-gradient(circle, rgba(0,242,138,${0.6 + (i % 3) * 0.1}) 0%, rgba(75,233,106,${0.3 + (i % 3) * 0.1}) 100%)`,
              boxShadow: `0 0 ${4 + (i % 3) * 2}px rgba(0,242,138,0.4)`,
            }}
            animate={{
              y: [0, -50 - (i % 5) * 10, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Number.POSITIVE_INFINITY,
              delay: (i * 0.2) % 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-0">
          <motion.div 
            whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/logo.png"
              alt="Agrimater Logo"
              width={200}
              height={70}
              className="object-contain drop-shadow-xl"
              priority
            />
          </motion.div>
        </Link>

        {/* Glass-morphism Form Card */}
        <div className="relative group">
          {/* Premium Neon Glow Behind Form */}
          <motion.div 
            className="absolute -inset-6 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle at center, rgba(0,242,138,0.25) 0%, rgba(75,233,106,0.15) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          
          {/* Subtle gradient border glow */}
          <div 
            className="absolute -inset-[1px] rounded-[1.75rem] opacity-60"
            style={{
              background: 'linear-gradient(135deg, rgba(0,242,138,0.3), rgba(75,233,106,0.2), rgba(0,242,138,0.3))',
              filter: 'blur(1px)',
            }}
          />
          
          <form 
            onSubmit={handleSubmit} 
            className="relative px-10 py-12 rounded-[1.75rem] backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_80px_rgba(0,242,138,0.1)]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.90) 100%)',
            }}
          >
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl font-black mb-3 tracking-tight">
                  <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                    Welcome Back
                  </span>
                </h1>
                <p className="text-gray-500 text-base font-medium">Sign in to continue your journey</p>
              </motion.div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-red-50/80 backdrop-blur-sm border border-red-200/60 text-red-600 text-sm text-center font-semibold shadow-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-5">
              {/* Email Input */}
              <motion.div 
                className="group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-bold text-gray-800 mb-2.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#00f28a] drop-shadow-sm" strokeWidth={2.5} />
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-white/70 border-2 border-gray-200/80 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/20 rounded-xl px-4 py-3.5 transition-all duration-300 text-gray-900 placeholder:text-gray-400 font-medium shadow-sm hover:shadow-md hover:border-gray-300 group-hover:bg-white/90"
                    style={{
                      backdropFilter: 'blur(10px)',
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      boxShadow: '0 0 20px rgba(0,242,138,0.1)',
                    }}
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div 
                className="group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-bold text-gray-800 mb-2.5 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00f28a] drop-shadow-sm" strokeWidth={2.5} />
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full bg-white/70 border-2 border-gray-200/80 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/20 rounded-xl px-4 py-3.5 pr-12 transition-all duration-300 text-gray-900 placeholder:text-gray-400 font-medium shadow-sm hover:shadow-md hover:border-gray-300 group-hover:bg-white/90"
                    style={{
                      backdropFilter: 'blur(10px)',
                    }}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00f28a] transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" strokeWidth={2} /> : <Eye className="w-5 h-5" strokeWidth={2} />}
                  </motion.button>
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      boxShadow: '0 0 20px rgba(0,242,138,0.1)',
                    }}
                  />
                </div>
              </motion.div>

              {/* Premium Sign In Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full mt-6 px-8 py-4 rounded-xl font-bold text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                style={{
                  background: 'linear-gradient(135deg, #00F28A 0%, #4BE96A 100%)',
                  boxShadow: '0 10px 40px rgba(0,242,138,0.25), 0 0 60px rgba(0,242,138,0.15)',
                }}
              >
                {/* Button glow effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  }}
                />
                
                <span className="relative z-10 flex items-center justify-center gap-2.5 text-gray-900">
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full"
                      />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In 
                      <motion.div
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                      </motion.div>
                    </>
                  )}
                </span>
                
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    repeatDelay: 2,
                  }}
                />
              </motion.button>
            </div>

            {/* Sign Up Link */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-600 font-medium">
                Don't have an account?{" "}
                <Link 
                  href="/register" 
                  className="text-[#00f28a] hover:text-[#4be96a] font-bold transition-all duration-200 hover:underline underline-offset-4"
                >
                  Sign Up
                </Link>
              </p>
            </motion.div>
          </form>
        </div>

        {/* Premium Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="relative group/badge"
          >
            {/* Badge glow */}
            <div 
              className="absolute -inset-2 rounded-2xl opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle, rgba(0,242,138,0.2) 0%, transparent 70%)',
                filter: 'blur(15px)',
              }}
            />
            
            <div 
              className="relative flex items-center gap-3 px-6 py-3.5 rounded-2xl backdrop-blur-xl border border-white/40 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <Shield className="w-6 h-6 text-[#00f28a]" strokeWidth={2.5} fill="rgba(0,242,138,0.2)" />
                
                {/* Pulsing glow on shield */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Shield className="w-6 h-6 text-[#00f28a] opacity-30 blur-sm" strokeWidth={2.5} />
                </motion.div>
              </motion.div>
              
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">Secure Login</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#00f28a]" />
                </div>
                <span className="text-xs text-gray-500 font-medium">256-bit Encryption</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

