"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { GradientButton } from "@/components/ui/gradient-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Store,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Truck,
  CheckCircle,
  Building,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  ArrowLeft,
} from "lucide-react"

const solutions = [
  {
    icon: ShieldCheck,
    title: "Verified Supply Chain",
    description: "Every product is traced from farm to shelf with blockchain-backed verification.",
    color: "from-emerald-400 to-green-500",
  },
  {
    icon: BarChart3,
    title: "Quality Grading",
    description: "AI-powered grading ensures consistent quality across all produce categories.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Truck,
    title: "Smart Logistics",
    description: "Optimized delivery routes maintain freshness and reduce operational costs.",
    color: "from-lime-400 to-green-500",
  },
  {
    icon: TrendingUp,
    title: "Demand Forecasting",
    description: "AI predictions help you stock the right products at the right time.",
    color: "from-teal-400 to-green-500",
  },
]

const businessTypes = [
  "Supermarket Chain",
  "Grocery Store",
  "Restaurant Chain",
  "Food Processing Unit",
  "Export Business",
  "Other",
]

export default function RetailerSolutionsPage() {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    locations: "",
    requirements: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("Submitting retailer data:", formData)
      const response = await fetch("/api/retailers/register", {
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

  return (
    <PageWrapper>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50/20">
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

        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#00f28a]/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4be96a]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f28a]/3 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "4s" }} />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,138,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,138,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#00f28a]/20 shadow-lg shadow-[#00f28a]/5 mb-8"
          >
            <Store className="w-5 h-5 text-[#00f28a]" />
            <span className="text-sm font-bold bg-gradient-to-r from-[#00f28a] to-[#4be96a] bg-clip-text text-transparent">
              Enterprise Solutions for Retailers
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: 0.2,
              duration: 0.8,
              ease: "easeOut"
            }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            Transform Your{" "}
            <span className="bg-gradient-to-r from-[#00F28A] via-[#00f28a] to-[#4BE96A] bg-clip-text text-transparent">
              Supply Chain
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              delay: 1.2,
              duration: 0.6,
              ease: "easeOut"
            }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Access verified, grade-level produce directly from farmers. Reduce waste, improve margins, and delight your
            customers with consistent quality through our AI-powered platform.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: 0.2,
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <motion.button
              onClick={() => {
                setShowForm(true)
                setTimeout(() => {
                  document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }, 100)
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 242, 138, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-black text-lg font-bold shadow-2xl shadow-[#00f28a]/30 transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              <Zap className="w-6 h-6" />
              Request Enterprise Demo
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-32 mt-50"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${solution.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Card */}
                <div className="relative p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-gray-200/50 group-hover:border-[#00f28a]/30 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  {/* Floating icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300`}
                  >
                    <solution.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00f28a] transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {solution.description}
                  </p>
                  
                  {/* Accent line */}
                  <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#00f28a] to-[#4be96a] group-hover:w-full transition-all duration-500 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Proven Results
              </span>
            </h2>
            <p className="text-gray-600 text-lg">Real metrics from our retail partners</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { value: "30%", label: "Cost Reduction", icon: TrendingUp },
              { value: "99.2%", label: "Quality Accuracy", icon: Target },
              { value: "50%", label: "Less Waste", icon: Sparkles },
              { value: "24/7", label: "Live Tracking", icon: Zap },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                {/* Connecting lines (visible on larger screens) */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-[#00f28a]/50 to-transparent translate-x-1/2" />
                )}
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00f28a] to-[#4be96a] rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                
                {/* Stat card */}
                <div className="relative p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-xl text-center group-hover:border-[#00f28a]/30 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-[#00f28a] mx-auto mb-4" strokeWidth={2} />
                  
                  <motion.div
                    className="text-5xl font-bold mb-3 bg-gradient-to-r from-[#00f28a] to-[#4be96a] bg-clip-text text-transparent"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  
                  {/* Decorative pulse */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-[#00f28a] rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form Modal/Section */}
        {showForm && !isSuccess && (
          <motion.div 
            id="demo-form"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00f28a]/20 via-[#4be96a]/20 to-[#00f28a]/20 rounded-3xl blur-3xl" />
              
              <form onSubmit={handleSubmit} className="relative p-10 rounded-3xl bg-white/95 backdrop-blur-2xl border border-[#00f28a]/20 shadow-2xl">
                <div className="text-center mb-10">
                  <h3 className="text-4xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Request Enterprise Demo
                    </span>
                  </h3>
                  <p className="text-gray-600">
                    Join leading retailers transforming their supply chain
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2.5 flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#00f28a]" />
                        Business Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Your company name"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        required
                        className="bg-white/60 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2.5">Contact Name</label>
                      <Input
                        type="text"
                        placeholder="Your name"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        required
                        className="bg-white/60 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2.5 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#00f28a]" />
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="business@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-white/60 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2.5 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#00f28a]" />
                        Phone
                      </label>
                      <Input
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="bg-white/60 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2.5">Business Type</label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                      >
                        <SelectTrigger className="bg-white border-2 border-gray-200 focus:border-[#00f28a] rounded-xl px-4 py-3.5">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2.5">Number of Locations</label>
                      <Input
                        type="text"
                        placeholder="e.g., 5 stores"
                        value={formData.locations}
                        onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                        className="bg-white/60 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 transition-all"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2.5">Requirements</label>
                    <Textarea
                      placeholder="Tell us about your needs..."
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="bg-white/60 border-2 border-gray-200 focus:border-[#00f28a] focus:ring-4 focus:ring-[#00f28a]/10 rounded-xl px-4 py-3.5 resize-none transition-all"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      type="button"
                      onClick={() => setShowForm(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-4 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || isSuccess}
                      whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.02, boxShadow: isSubmitting || isSuccess ? undefined : "0 0 30px rgba(0, 242, 138, 0.5)" }}
                      whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.98 }}
                      className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-black font-bold shadow-xl shadow-[#00f28a]/30 hover:shadow-2xl hover:shadow-[#00f28a]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                          />
                          Submitting...
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Submitted Request
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Request Demo
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Success icon with enhanced animations */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
              className="relative w-32 h-32 mx-auto mb-10"
            >
              {/* Outer glow ring */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#00F28A] to-[#4BE96A] rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ opacity: 0.2 }}
              />
              
              <div className="absolute inset-2 bg-gradient-to-br from-[#00F28A] to-[#4BE96A] rounded-full shadow-2xl shadow-[#00f28a]/50 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <CheckCircle className="w-16 h-16 text-black" strokeWidth={2.5} />
                </motion.div>
              </div>
              
              {/* Sparkles */}
              {[...Array(8)].map((_, i) => (
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
                    top: `${50 + 60 * Math.cos((i * Math.PI * 2) / 8)}%`,
                    left: `${50 + 60 * Math.sin((i * Math.PI * 2) / 8)}%`,
                  }}
                />
              ))}
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-[#00f28a] to-[#4be96a] bg-clip-text text-transparent">
                Request Submitted!
              </span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-10 p-8 rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-[#00f28a]/20 shadow-xl"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                Thank you for your interest in Agrimater's enterprise solutions. Our B2B team will contact you within{" "}
                <span className="font-bold text-[#00f28a]">24 hours</span> to schedule a personalized demo and discuss your specific requirements.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={() => (window.location.href = "/")}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 242, 138, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-black font-bold shadow-xl shadow-[#00f28a]/30 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Return to Home
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
      </div>
    </PageWrapper>
  )
}
