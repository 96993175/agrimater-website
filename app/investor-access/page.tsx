"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { GradientButton } from "@/components/ui/gradient-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Briefcase,
  TrendingUp,
  Users,
  Globe,
  CheckCircle,
  Mail,
  Building,
  DollarSign,
  ArrowRight,
  Shield,
  Target,
  Zap,
} from "lucide-react"

const highlights = [
  { icon: TrendingUp, value: "10x", label: "Market Growth Potential" },
  { icon: Users, value: "500+", label: "Farmers Onboarded" },
  { icon: Globe, value: "$50B+", label: "Addressable Market" },
  { icon: Target, value: "#113", label: "Tracxn Ranked" },
]

const investmentBenefits = [
  {
    icon: Zap,
    title: "First-Mover Advantage",
    description: "Be part of India's agricultural tech revolution from the ground floor",
  },
  { icon: Shield, title: "Strong IP Portfolio", description: "Proprietary AI grading and verification technology" },
  { icon: TrendingUp, title: "Scalable Model", description: "Asset-light platform with exponential growth potential" },
]

export default function InvestorAccessPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firm: "",
    investmentRange: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, category: "investor" }),
      })

      if (response.ok) {
        setIsSuccess(true)
      }
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Investor Relations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Invest in the{" "}
            <span className="bg-gradient-to-r from-[#00F28A] to-[#4BE96A] bg-clip-text text-transparent">
              Future of Agriculture
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join us in transforming India's $500B agricultural supply chain with AI-powered transparency and efficiency.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {highlights.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-6 rounded-2xl glass text-center"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Why Invest in Agrimater?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {investmentBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-muted/50"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#0a0a0a]" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        {!isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl glass">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Request Investor Deck</h3>

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Mail className="inline w-4 h-4 mr-2" />
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="investor@firm.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Building className="inline w-4 h-4 mr-2" />
                      Firm/Company
                    </label>
                    <Input
                      type="text"
                      placeholder="Investment firm name"
                      value={formData.firm}
                      onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <DollarSign className="inline w-4 h-4 mr-2" />
                      Investment Range
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., $100K - $500K"
                      value={formData.investmentRange}
                      onChange={(e) => setFormData({ ...formData, investmentRange: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <Textarea
                    placeholder="Tell us about your investment interests..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background/50 resize-none"
                  />
                </div>

                <GradientButton type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Request Access <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </GradientButton>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,242,138,0.4)]">
              <CheckCircle className="w-12 h-12 text-[#0a0a0a]" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Request Received!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for your interest in Agrimater. Our founder will personally reach out within 48 hours with the
              investor deck and additional information.
            </p>
            <GradientButton onClick={() => (window.location.href = "/")}>Return to Home</GradientButton>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  )
}
