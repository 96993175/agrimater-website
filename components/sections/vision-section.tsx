"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { Leaf, Zap, Shield, TrendingUp } from "lucide-react"

const visionPoints = [
  { icon: Leaf, text: "Sustainable farming practices" },
  { icon: Shield, text: "Verified produce at every step" },
  { icon: Zap, text: "AI-powered quality grading" },
  { icon: TrendingUp, text: "Smart logistics optimization" },
]

export function VisionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="vision" ref={ref} className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle title="The Future of Fresh Begins Here" align="left" />

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              We're bridging the gap between farms and retail with cutting-edge AI technology. Our platform ensures
              complete transparency, from soil to shelf — empowering farmers, retailers, and consumers with verified,
              grade-level data and intelligent logistics that transform how India's agricultural supply chain operates.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {visionPoints.map((point, index) => (
                <motion.div
                  key={point.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-5 h-5 text-[#0a0a0a]" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{point.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Holographic Image */}
          <motion.div style={{ x }} className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src="/futuristic-holographic-farm-technology-interface-w.jpg"
                  alt="Futuristic farm technology"
                  className="w-full h-auto rounded-3xl"
                />

                {/* Holographic overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00F28A]/20 via-transparent to-[#4BE96A]/20 rounded-3xl" />

                {/* Scan lines effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,242,138,0.1) 2px, rgba(0,242,138,0.1) 4px)",
                  }}
                />
              </motion.div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                animate={{ y: [0, -10, 0] }}
                className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="text-2xl font-bold text-primary">99.2%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                animate={{ y: [0, 10, 0] }}
                className="absolute -top-6 -right-6 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Live Monitoring</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
