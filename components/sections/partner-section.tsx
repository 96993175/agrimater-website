"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { SectionTitle } from "@/components/ui/section-title"
import { ContactForm } from "@/components/forms/contact-form"
import { Users, Store, Truck, Briefcase, ArrowRight, Sparkles } from "lucide-react"

const partnerTypes = [
  { 
    icon: Users, 
    label: "For FPOs", 
    href: "/farmer-onboarding",
    description: "Empower farmer collectives with verified produce",
    gradient: "from-[#00f28a]/20 to-[#4be96a]/20"
  },
  { 
    icon: Store, 
    label: "For Retailers", 
    href: "/retailer-solutions",
    description: "Access quality-graded agricultural products",
    gradient: "from-[#4be96a]/20 to-[#00f28a]/20"
  },
  { 
    icon: Truck, 
    label: "For Logistics", 
    href: "/retailer-solutions",
    description: "Optimize delivery with smart route planning",
    gradient: "from-[#00f28a]/20 to-[#4be96a]/20"
  },
  { 
    icon: Briefcase, 
    label: "Investor Access", 
    href: "/investor-access",
    description: "Join the agritech revolution",
    gradient: "from-[#4be96a]/20 to-[#00f28a]/20"
  },
]

export function PartnerSection() {
  return (
    <section id="partner" className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00f28a]/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4be96a]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
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
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced title with badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#00f28a]" />
            <span className="text-sm font-medium bg-gradient-to-r from-[#00f28a] to-[#4be96a] bg-clip-text text-transparent">
              Partner With Us
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Join the{" "}
            <span className="bg-gradient-to-r from-[#00f28a] to-[#4be96a] bg-clip-text text-transparent">
              Revolution
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Whether you're a farmer, retailer, or investor — there's a place for you in our ecosystem.
          </motion.p>
        </motion.div>

        {/* Enhanced partner type cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {partnerTypes.map((partner, index) => (
            <Link key={partner.label} href={partner.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative h-full"
              >
                {/* Card glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${partner.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Card content */}
                <div className="relative h-full glass-card rounded-2xl p-6 border border-border/50 group-hover:border-[#00f28a]/30 transition-colors">
                  {/* Icon container */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00f28a]/10 to-[#4be96a]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <partner.icon className="w-7 h-7 text-[#00f28a] group-hover:text-[#4be96a] transition-colors" />
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#00f28a] transition-colors">
                    {partner.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {partner.description}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="flex items-center gap-2 text-[#00f28a] font-medium text-sm">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-[#00f28a]/30 rounded-tr-2xl" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Contact form with enhanced wrapper */}
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Highlighted text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:pr-8"
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold">
                    <span className="text-foreground">Ready to</span>
                    <br />
                    <span className="bg-gradient-to-r from-[#00f28a] to-[#4be96a] bg-clip-text text-transparent">
                      Transform Together?
                    </span>
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Drop us a message and let's discuss how we can revolutionize agricultural supply chains together.
                  </p>
                </div>
                
                {/* Stats or benefits */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-[#00f28a]">24h</div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-[#00f28a]">100+</div>
                    <div className="text-sm text-muted-foreground">Active Partners</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right side - Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
