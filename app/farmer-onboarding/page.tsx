"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { GradientButton } from "@/components/ui/gradient-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, MapPin, Phone, User, FileText, CheckCircle, ArrowRight, Sprout, Shield, TrendingUp } from "lucide-react"

const benefits = [
  { icon: Shield, title: "Verified Identity", description: "Get blockchain-verified farmer credentials" },
  { icon: TrendingUp, title: "Better Prices", description: "Access direct market connections for fair pricing" },
  { icon: Sprout, title: "AI Grading", description: "Free AI-powered produce quality assessment" },
]

const cropTypes = ["Vegetables", "Fruits", "Grains", "Pulses", "Spices", "Dairy", "Other"]

const farmSizes = ["Less than 1 acre", "1-5 acres", "5-10 acres", "10-25 acres", "More than 25 acres"]

export default function FarmerOnboardingPage() {
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
      const response = await fetch("/api/farmers/register", {
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

  if (isSuccess) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,242,138,0.4)]">
              <CheckCircle className="w-12 h-12 text-[#0a0a0a]" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Registration Successful!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for joining Agrimater. Our team will contact you within 24-48 hours to complete your
              verification.
            </p>
            <GradientButton onClick={() => (window.location.href = "/")}>Return to Home</GradientButton>
          </motion.div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Farmer Onboarding</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Join the{" "}
            <span className="bg-gradient-to-r from-[#00F28A] to-[#4BE96A] bg-clip-text text-transparent">
              Agricultural Revolution
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Connect directly with retailers, get fair prices for your produce, and access AI-powered tools to grow your
            farming business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Benefits sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Why Join Agrimater?</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-4 rounded-xl glass"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-[#0a0a0a]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Registration form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl glass">
              {/* Progress indicator */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step >= s
                          ? "bg-gradient-to-br from-[#00F28A] to-[#4BE96A] text-[#0a0a0a]"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 2 && (
                      <div
                        className={`w-full h-1 mx-4 rounded ${step > s ? "bg-primary" : "bg-muted"}`}
                        style={{ width: "100px" }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Personal Information</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <User className="inline w-4 h-4 mr-2" />
                        Full Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <Phone className="inline w-4 h-4 mr-2" />
                        Phone Number
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

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Village/Town
                    </label>
                    <Input
                      type="text"
                      placeholder="Your village or town"
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">District</label>
                      <Input
                        type="text"
                        placeholder="District name"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        required
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">State</label>
                      <Input
                        type="text"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        required
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <GradientButton type="button" onClick={() => setStep(2)} className="w-full">
                    Continue <ArrowRight className="ml-2 w-4 h-4" />
                  </GradientButton>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Farm Details</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Farm Size</label>
                      <Select
                        value={formData.farmSize}
                        onValueChange={(value) => setFormData({ ...formData, farmSize: value })}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select farm size" />
                        </SelectTrigger>
                        <SelectContent>
                          {farmSizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Primary Crops</label>
                      <Select
                        value={formData.cropTypes}
                        onValueChange={(value) => setFormData({ ...formData, cropTypes: value })}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select crop type" />
                        </SelectTrigger>
                        <SelectContent>
                          {cropTypes.map((crop) => (
                            <SelectItem key={crop} value={crop}>
                              {crop}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Farming Experience</label>
                      <Input
                        type="text"
                        placeholder="e.g., 10 years"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">FPO Member?</label>
                      <Select
                        value={formData.fpoMember}
                        onValueChange={(value) => setFormData({ ...formData, fpoMember: value })}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <FileText className="inline w-4 h-4 mr-2" />
                      Additional Information
                    </label>
                    <Textarea
                      placeholder="Tell us more about your farm..."
                      rows={3}
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      className="bg-background/50 resize-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <GradientButton type="button" variant="secondary" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </GradientButton>
                    <GradientButton type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? "Submitting..." : "Complete Registration"}
                    </GradientButton>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
