"use client"

import { motion } from "framer-motion"
import { SectionTitle } from "@/components/ui/section-title"
import { MapPin, Trophy, Users, Building } from "lucide-react"

const stats = [
  { icon: Building, value: "160+", label: "Competitors in Space" },
  { icon: Trophy, value: "#113", label: "Tracxn Ranking" },
  { icon: Users, value: "500+", label: "Farmers Onboarded" },
  { icon: MapPin, value: "2", label: "Active Zones" },
]

const activeZones = [
  { name: "Pune", coords: { x: 35, y: 55 } },
  { name: "Hinjewadi", coords: { x: 33, y: 53 } },
]

export function ImpactSection() {
  return (
    <section id="impact" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Making an Impact Across Bharat"
          subtitle="From a single district to transforming agricultural supply chains nationwide"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* India map silhouette */}
              <img
                src="/india-map-outline-silhouette-dark-minimal-style.jpg"
                alt="India map"
                className="w-full h-full object-contain opacity-20"
              />

              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,242,138,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,138,0.3) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Active zone markers */}
              {activeZones.map((zone, index) => (
                <motion.div
                  key={zone.name}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="absolute"
                  style={{ left: `${zone.coords.x}%`, top: `${zone.coords.y}%` }}
                >
                  {/* Pulse effect */}
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute w-8 h-8 rounded-full bg-[#00F28A]/50 -translate-x-1/2 -translate-y-1/2"
                  />
                  {/* Marker */}
                  <div className="relative w-4 h-4 rounded-full bg-[#00F28A] shadow-[0_0_20px_rgba(0,242,138,0.8)] -translate-x-1/2 -translate-y-1/2" />
                  {/* Label */}
                  <div className="absolute left-4 top-0 whitespace-nowrap">
                    <span className="text-sm font-medium text-foreground bg-background/80 px-2 py-1 rounded">
                      {zone.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 p-6 rounded-2xl glass"
            >
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                In a competitive landscape of <span className="text-primary font-semibold">160+ agritech startups</span>
                , Agrimater has carved its niche, earning recognition on Tracxn with a
                <span className="text-primary font-semibold"> ranking of #113</span>. We're just getting started on our
                mission to revolutionize agricultural supply chains across India.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-muted/50 text-center"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
