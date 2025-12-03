"use client"

import type React from "react"

import { useState } from "react"
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
} from "lucide-react"

const solutions = [
  {
    icon: ShieldCheck,
    title: "Verified Supply Chain",
    description: "Every product is traced from farm to shelf with blockchain-backed verification.",
  },
  {
    icon: BarChart3,
    title: "Quality Grading",
    description: "AI-powered grading ensures consistent quality across all produce categories.",
  },
  {
    icon: Truck,
    title: "Smart Logistics",
    description: "Optimized delivery routes maintain freshness and reduce operational costs.",
  },
  {
    icon: TrendingUp,
    title: "Demand Forecasting",
    description: "AI predictions help you stock the right products at the right time.",
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
      const response = await fetch("/api/retailers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
      }
    } catch (error) {
      console.error("Registration error:", error)
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
            <Store className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">For Retailers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-[#00F28A] to-[#4BE96A] bg-clip-text text-transparent">
              Supply Chain
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Access verified, grade-level produce directly from farmers. Reduce waste, improve margins, and delight your
            customers with consistent quality.
          </p>
          <GradientButton onClick={() => setShowForm(true)} size="lg">
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </GradientButton>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl glass hover:shadow-[0_0_30px_rgba(0,242,138,0.15)] transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,242,138,0.3)]">
                <solution.icon className="w-6 h-6 text-[#0a0a0a]" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{solution.title}</h3>
              <p className="text-sm text-muted-foreground">{solution.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { value: "30%", label: "Cost Reduction" },
            { value: "99.2%", label: "Quality Accuracy" },
            { value: "50%", label: "Less Waste" },
            { value: "24/7", label: "Live Tracking" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-muted/50 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form Modal/Section */}
        {showForm && !isSuccess && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl glass">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Request a Demo</h3>

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Building className="inline w-4 h-4 mr-2" />
                      Business Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Your company name"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Contact Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Mail className="inline w-4 h-4 mr-2" />
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="business@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Phone className="inline w-4 h-4 mr-2" />
                      Phone
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Business Type</label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                    >
                      <SelectTrigger className="bg-background/50">
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
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Number of Locations</label>
                    <Input
                      type="text"
                      placeholder="e.g., 5 stores"
                      value={formData.locations}
                      onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Requirements</label>
                  <Textarea
                    placeholder="Tell us about your needs..."
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="bg-background/50 resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <GradientButton
                    type="button"
                    variant="secondary"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </GradientButton>
                  <GradientButton type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Submitting..." : "Request Demo"}
                  </GradientButton>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,242,138,0.4)]">
              <CheckCircle className="w-12 h-12 text-[#0a0a0a]" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Request Submitted!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for your interest. Our enterprise team will contact you within 24 hours to schedule a
              personalized demo.
            </p>
            <GradientButton onClick={() => (window.location.href = "/")}>Return to Home</GradientButton>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  )
}
