"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle, User, Mail, MessageSquare, Tag } from "lucide-react"

const categories = [
  { value: "fpo", label: "FPO / Farmer Producer Organization" },
  { value: "retailer", label: "Retailer" },
  { value: "logistics", label: "Logistics Partner" },
  { value: "investor", label: "Investor" },
  { value: "other", label: "Other" },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", category: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      {/* Holographic ambient glow layers */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00f28a]/20 via-[#4be96a]/20 to-[#00f28a]/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00f28a]/30 via-transparent to-[#4be96a]/30 rounded-[2rem] blur-md animate-pulse-slow" />
      
      {/* Main form container with glassmorphism */}
      <form
        onSubmit={handleSubmit}
        className="futuristic-glass relative p-10 rounded-[2rem] shadow-2xl overflow-hidden"
      >
        {/* Scan line effect overlay */}
        <div className="scan-lines absolute inset-0 pointer-events-none opacity-30" />
        
        {/* Top edge glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#00f28a] to-transparent glow-line" />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-[#00f28a]/50 rounded-tl-[2rem] glow-corner" />
        <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-[#00f28a]/50 rounded-tr-[2rem] glow-corner" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-[#00f28a]/50 rounded-bl-[2rem] glow-corner" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-[#00f28a]/50 rounded-br-[2rem] glow-corner" />

        <motion.h3 
          className="text-3xl font-bold text-foreground mb-8 text-center relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="relative inline-block">
            Get in Touch
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00f28a] to-transparent" />
          </span>
        </motion.h3>

        <div className="space-y-6 relative z-10">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Name Input with Floating Label */}
            <div className="relative floating-input-wrapper">
              <div className={`floating-input-icon ${focusedField === "name" ? "text-[#00f28a]" : "text-muted-foreground"}`}>
                <User className="w-4 h-4" />
              </div>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                required
                className="futuristic-input peer"
                placeholder=" "
              />
              <label htmlFor="name" className="floating-label">
                Name
              </label>
            </div>

            {/* Email Input with Floating Label */}
            <div className="relative floating-input-wrapper">
              <div className={`floating-input-icon ${focusedField === "email" ? "text-[#00f28a]" : "text-muted-foreground"}`}>
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                className="futuristic-input peer"
                placeholder=" "
              />
              <label htmlFor="email" className="floating-label">
                Email
              </label>
            </div>
          </div>

          {/* Category Select with Floating Label */}
          <div className="relative floating-input-wrapper">
            <div className={`floating-input-icon ${focusedField === "category" ? "text-[#00f28a]" : "text-muted-foreground"}`}>
              <Tag className="w-4 h-4" />
            </div>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              onFocus={() => setFocusedField("category")}
              onBlur={() => setFocusedField(null)}
              required
              className="futuristic-input peer"
            >
              <option value="" disabled></option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <label htmlFor="category" className="floating-label">
              Category
            </label>
          </div>

          {/* Message Textarea with Floating Label */}
          <div className="relative floating-input-wrapper">
            <div className={`floating-input-icon ${focusedField === "message" ? "text-[#00f28a]" : "text-muted-foreground"}`}>
              <MessageSquare className="w-4 h-4" />
            </div>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              required
              className="futuristic-input peer resize-none"
              placeholder=" "
            />
            <label htmlFor="message" className="floating-label">
              Message
            </label>
          </div>

          {/* Success Message */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#00f28a]/10 border border-[#00f28a]/30 backdrop-blur-sm"
            >
              <CheckCircle className="w-5 h-5 text-[#00f28a]" />
              <span className="text-[#00f28a] font-medium">Message sent successfully! We'll be in touch soon.</span>
            </motion.div>
          )}

          {/* Error Message */}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/30 backdrop-blur-sm"
            >
              <AlertCircle className="w-5 h-5 text-destructive" />
              <span className="text-destructive font-medium">Something went wrong. Please try again.</span>
            </motion.div>
          )}

          {/* Cyber Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="cyber-button w-full relative group/btn overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00f28a] via-[#4be96a] to-[#00f28a] bg-[length:200%_100%] animate-gradient-shift" />
            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-[#00f28a] blur-xl opacity-50 animate-pulse-glow" />
            </div>
            <span className="relative z-10 flex items-center justify-center gap-2 text-black font-bold text-lg py-4">
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                </>
              )}
            </span>
            {/* Button edge glow */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          </motion.button>
        </div>

        {/* Holographic depth particles */}
        <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-[#00f28a] opacity-40 blur-sm animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-1.5 h-1.5 rounded-full bg-[#4be96a] opacity-30 blur-sm animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-20 w-1 h-1 rounded-full bg-[#00f28a] opacity-50 blur-sm animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </form>
    </motion.div>
  )
}
