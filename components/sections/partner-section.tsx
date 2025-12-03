"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { SectionTitle } from "@/components/ui/section-title"
import { ContactForm } from "@/components/forms/contact-form"
import { Users, Store, Truck, Briefcase } from "lucide-react"

const partnerTypes = [
  { icon: Users, label: "For FPOs", href: "/farmer-onboarding" },
  { icon: Store, label: "For Retailers", href: "/retailer-solutions" },
  { icon: Truck, label: "For Logistics Teams", href: "/retailer-solutions" },
  { icon: Briefcase, label: "Investor Access", href: "/investor-access" },
]

export function PartnerSection() {
  return (
    <section id="partner" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Partner With Agrimater"
          subtitle="Join us in transforming agricultural supply chains across India"
        />

        {/* Partner type buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {partnerTypes.map((partner, index) => (
            <Link key={partner.label} href={partner.href}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl glass hover:shadow-[0_0_30px_rgba(0,242,138,0.2)] transition-shadow cursor-pointer"
              >
                <partner.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{partner.label}</span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
