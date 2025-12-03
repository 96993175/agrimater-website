"use client"

import { SectionTitle } from "@/components/ui/section-title"
import { FeatureCard } from "@/components/ui/feature-card"
import { ShieldCheck, BarChart3, Truck, Brain } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Produce",
    description:
      "Every product is verified at source with blockchain-backed traceability, ensuring authenticity from farm to consumer.",
  },
  {
    icon: BarChart3,
    title: "Grade-Level Precision",
    description:
      "AI-powered grading system provides precise quality metrics, standardizing produce assessment across the supply chain.",
  },
  {
    icon: Truck,
    title: "Smart Logistics",
    description:
      "Intelligent route optimization and real-time tracking ensure freshness is maintained throughout the delivery process.",
  },
  {
    icon: Brain,
    title: "Data-Driven Insights",
    description:
      "Advanced analytics provide actionable insights for demand forecasting, inventory management, and market trends.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Powering the Agricultural Revolution"
          subtitle="Four pillars of innovation driving farm-to-retail excellence"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
