"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { GradientButton } from "@/components/ui/gradient-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Leaf, MapPin, Phone, User, FileText, CheckCircle, ArrowRight, Sprout, Shield, TrendingUp, ChevronRight, Sparkles, ArrowLeft } from "lucide-react"

const cropTypes = ["Vegetables", "Fruits", "Grains", "Pulses", "Spices", "Dairy", "Other"]

const farmSizes = ["Less than 1 acre", "1-5 acres", "5-10 acres", "10-25 acres", "More than 25 acres"]

const steps = [
  { number: 1, title: "Personal Info", subtitle: "Your details" },
  { number: 2, title: "Farm Details", subtitle: "About your farm" },
]

export default function FarmerOnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    state: "",
    farmSize: "",
    cropTypes: "",
    experience: "",
    fpoMember: "",
    additionalInfo: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("Submitting form data:", formData)
      const response = await fetch("/api/farmers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log("Response:", { status: response.status, data })

      if (response.ok && data.success) {
        // Only show success if MongoDB save was successful
        setIsSuccess(true)
      } else {
        // Show error message
        const errorMsg = data.error || 'Registration failed. Please try again.'
        alert(`❌ Registration Failed\n\n${errorMsg}`)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert("❌ Network Error\n\nCould not connect to the server. Please check your internet connection and try again.")
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50/30">
          {/* Back Button */}
          <div className="absolute top-0 left-0 right-0 z-50 px-4 md:px-6 py-6">
            <div className="container mx-auto max-w-7xl">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/")}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-[#00f28a] text-gray-700 hover:text-gray-900 transition-all shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back</span>
              </motion.button>
            </div>
          </div>

          {/* Enhanced animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#00f28a]/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4be96a]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f28a]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
            
            {/* Confetti particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, opacity: 0 }}
                animate={{ 
                  y: [0, 1000],
                  x: [0, (Math.random() - 0.5) * 200],
                  opacity: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: 0.5 + Math.random() * 2,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2 rounded-sm"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  backgroundColor: i % 2 === 0 ? '#00f28a' : '#4be96a',
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="max-w-3xl w-full mx-auto text-center relative z-10"
          >
            {/* Success icon with pulse animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
              className="relative w-40 h-40 mx-auto mb-10"
            >
              {/* Outer glow ring */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#00F28A] to-[#4BE96A] rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ opacity: 0.2 }}
              />
              
              <div className="absolute inset-2 bg-gradient-to-br from-[#00F28A] to-[#4BE96A] rounded-full shadow-2xl shadow-[#00f28a]/50 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <CheckCircle className="w-20 h-20 text-black" strokeWidth={2.5} />
                </motion.div>
              </div>
              
              {/* Sparkle effects around circle */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.5, 0], 
                    opacity: [0, 1, 0],
                  }}
                  transition={{ 
                    delay: 0.5 + i * 0.08, 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatDelay: 3 
                  }}
                  className="absolute w-3 h-3 bg-[#00f28a] rounded-full"
                  style={{
                    top: `${50 + 60 * Math.cos((i * Math.PI * 2) / 12)}%`,
                    left: `${50 + 60 * Math.sin((i * Math.PI * 2) / 12)}%`,
                  }}
                />
              ))}
            </motion.div>

            {/* Success message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#00f28a] via-[#00f28a] to-[#4be96a] bg-clip-text text-transparent">
                  Registration Successful!
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-gray-600 font-medium"
              >
                Welcome to the Agrimater family, <span className="text-[#00f28a] font-bold">{formData.name}</span>!
              </motion.p>
            </motion.div>

            {/* Information box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-10 p-8 rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-[#00f28a]/20 shadow-xl"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Your registration has been <span className="font-bold text-[#00f28a]">successfully submitted</span>. 
                Our team will review your application and contact you within <span className="font-bold">24-48 hours</span>.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-[#00f28a]" />
                <span>We'll reach you at <span className="font-semibold">{formData.phone}</span></span>
              </div>
            </motion.div>

            {/* Feature cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid sm:grid-cols-3 gap-4 mb-10"
            >
              {[
                { icon: Shield, title: "Verified Profile", desc: "Get blockchain credentials", color: "from-emerald-400 to-green-500" },
                { icon: TrendingUp, title: "Better Prices", desc: "Direct market access", color: "from-green-400 to-emerald-500" },
                { icon: Sprout, title: "AI Tools", desc: "Free quality grading", color: "from-lime-400 to-green-500" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                  <div className="relative p-6 rounded-2xl bg-white border border-gray-200 group-hover:border-[#00f28a]/30 transition-all">
                    <item.icon className={`w-8 h-8 mx-auto mb-3 bg-gradient-to-br ${item.color} text-transparent bg-clip-text`} strokeWidth={2} />
                    <p className="font-bold text-foreground mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={() => (window.location.href = "/")}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 242, 138, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-black font-bold shadow-xl shadow-[#00f28a]/30 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Return to Home
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border-2 border-[#00f28a]/50 text-gray-700 font-bold hover:bg-[#00f28a]/10 transition-all duration-300"
              >
                Register Another Farmer
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="min-h-screen py-12 px-4 relative overflow-hidden">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/")}
          className="fixed top-24 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-[#00f28a] text-gray-700 hover:text-gray-900 transition-all shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </motion.button>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#00f28a]/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4be96a]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
          
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#00f28a]/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-6 border border-[#00f28a]/20"
            >
              <Leaf className="w-4 h-4 text-[#00f28a]" />
              <span className="text-sm font-semibold bg-gradient-to-r from-[#00f28a] to-[#4be96a] bg-clip-text text-transparent">
                Farmer Onboarding
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Join the{" "}
              <span className="bg-gradient-to-r from-[#00F28A] to-[#4BE96A] bg-clip-text text-transparent">
                Agricultural Revolution
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Connect directly with retailers, get fair prices for your produce, and access AI-powered tools to grow your farming business.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Benefits sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="sticky top-24 space-y-6">
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#00f28a]" />
                  Why Join Us?
                </h3>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Image
                    src="/ChatGPT Image Dec 5, 2025, 07_27_12 AM.png"
                    alt="Farmer Benefits"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Registration form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="relative group">
                {/* Outer glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00f28a]/20 via-[#4be96a]/20 to-[#00f28a]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <form onSubmit={handleSubmit} className="relative p-8 md:p-10 rounded-3xl glass-card border border-[#00f28a]/20 shadow-2xl">
                  {/* Glowing progress indicator */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                      {steps.map((s, index) => (
                        <div key={s.number} className="flex items-center flex-1">
                          <div className="flex flex-col items-center flex-1">
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: step >= s.number ? 1 : 0.8 }}
                              className="relative mb-3"
                            >
                              <div
                                className={`relative w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                                  step >= s.number
                                    ? "bg-gradient-to-br from-[#00F28A] to-[#4BE96A] text-black shadow-xl"
                                    : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                                }`}
                              >
                                {step > s.number ? (
                                  <CheckCircle className="w-7 h-7" strokeWidth={2.5} />
                                ) : (
                                  s.number
                                )}
                              </div>
                            </motion.div>
                            <div className="text-center">
                              <p className={`text-xs font-bold ${step >= s.number ? "text-[#00f28a]" : "text-gray-400"}`}>
                                {s.title}
                              </p>
                              <p className="text-xs text-muted-foreground">{s.subtitle}</p>
                            </div>
                          </div>
                          
                          {index < steps.length - 1 && (
                            <div className="relative flex-1 mx-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: step > s.number ? "100%" : "0%" }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00f28a] to-[#4be96a]"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f28a]/20 to-[#4be96a]/20 flex items-center justify-center">
                            <User className="w-5 h-5 text-[#00f28a]" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground">Personal Information</h3>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-foreground mb-2.5 flex items-center gap-2">
                              <User className="w-4 h-4 text-[#00f28a]" />
                              Full Name
                            </label>
                            <div className="relative">
                              <Input
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="bg-white/50 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all shadow-inner group-hover/input:border-[#00f28a]/50"
                              />
                            </div>
                          </div>

                          <div className="group/input">
                            <label className="block text-sm font-semibold text-foreground mb-2.5 flex items-center gap-2">
                              <Phone className="w-4 h-4 text-[#00f28a]" />
                              Phone Number
                            </label>
                            <div className="relative">
                              <Input
                                type="tel"
                                name="phone"
                                placeholder="+91 XXXXX XXXXX"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                className="bg-white/50 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all shadow-inner group-hover/input:border-[#00f28a]/50"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="group/input">
                          <label className="block text-sm font-semibold text-foreground mb-2.5 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#00f28a]" />
                            Village/Town
                          </label>
                          <Input
                            type="text"
                            placeholder="Your village or town"
                            value={formData.village}
                            onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                            required
                            className="bg-white/50 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all shadow-inner group-hover/input:border-[#00f28a]/50"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-foreground mb-2.5">District</label>
                            <Input
                              type="text"
                              placeholder="District name"
                              value={formData.district}
                              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                              required
                              className="bg-white/50 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all shadow-inner group-hover/input:border-[#00f28a]/50"
                            />
                          </div>

                          <div className="group/input">
                            <label className="block text-sm font-semibold text-foreground mb-2.5">State</label>
                            <Input
                              type="text"
                              placeholder="State"
                              value={formData.state}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                              required
                              className="bg-white/50 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all shadow-inner group-hover/input:border-[#00f28a]/50"
                            />
                          </div>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full"
                        >
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="w-full py-4 px-6 rounded-xl text-base font-bold bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-black hover:shadow-[0_0_30px_rgba(0,242,138,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
                          >
                            Continue to Farm Details
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </motion.div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f28a]/20 to-[#4be96a]/20 flex items-center justify-center">
                            <Sprout className="w-5 h-5 text-[#00f28a]" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground">Farm Details</h3>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-foreground mb-2.5">Farm Size</label>
                            <Select
                              value={formData.farmSize}
                              onValueChange={(value) => setFormData({ ...formData, farmSize: value })}
                            >
                              <SelectTrigger className="bg-white border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all shadow-inner group-hover/input:border-[#00f28a]/50 h-auto">
                                <SelectValue placeholder="Select farm size" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                {farmSizes.map((size) => (
                                  <SelectItem key={size} value={size}>
                                    {size}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="group/input">
                            <label className="block text-sm font-semibold text-foreground mb-2.5">Primary Crops</label>
                            <Select
                              value={formData.cropTypes}
                              onValueChange={(value) => setFormData({ ...formData, cropTypes: value })}
                            >
                              <SelectTrigger className="bg-white border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all shadow-inner group-hover/input:border-[#00f28a]/50 h-auto">
                                <SelectValue placeholder="Select crop type" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                {cropTypes.map((crop) => (
                                  <SelectItem key={crop} value={crop}>
                                    {crop}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-foreground mb-2.5">Farming Experience</label>
                            <Input
                              type="text"
                              placeholder="e.g., 10 years"
                              value={formData.experience}
                              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                              className="bg-white/50 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all shadow-inner group-hover/input:border-[#00f28a]/50"
                            />
                          </div>

                          <div className="group/input">
                            <label className="block text-sm font-semibold text-foreground mb-2.5">FPO Member?</label>
                            <Select
                              value={formData.fpoMember}
                              onValueChange={(value) => setFormData({ ...formData, fpoMember: value })}
                            >
                              <SelectTrigger className="bg-white border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all shadow-inner group-hover/input:border-[#00f28a]/50 h-auto">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="group/input">
                          <label className="block text-sm font-semibold text-foreground mb-2.5 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#00f28a]" />
                            Additional Information
                          </label>
                          <Textarea
                            placeholder="Tell us more about your farm, crops, or any specific needs..."
                            rows={4}
                            value={formData.additionalInfo}
                            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                            className="bg-white/50 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all resize-none shadow-inner group-hover/input:border-[#00f28a]/50"
                          />
                        </div>

                        <div className="flex gap-4">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1"
                          >
                            <button
                              type="button"
                              onClick={() => setStep(1)}
                              className="w-full py-4 px-6 rounded-xl text-base font-bold bg-white border-2 border-gray-200 text-gray-900 hover:border-[#00f28a] hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              Back
                            </button>
                          </motion.div>
                          
                          <motion.div
                            whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.98 }}
                            className="flex-1"
                          >
                            <button
                              type="submit"
                              disabled={isSubmitting || isSuccess}
                              className="w-full py-4 px-6 rounded-xl text-base font-bold bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-black hover:shadow-[0_0_30px_rgba(0,242,138,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                            >
                              {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                                  />
                                  Submitting...
                                </span>
                              ) : isSuccess ? (
                                <>
                                  Submitted
                                  <CheckCircle className="w-5 h-5" />
                                </>
                              ) : (
                                <>
                                  Complete Registration
                                  <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </>
                              )}
                            </button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
