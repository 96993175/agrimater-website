"use client"

import { SectionTitle } from "@/components/ui/section-title"
import { FounderCard } from "@/components/ui/founder-card"

export function TeamSection() {
  return (
    <section id="team" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="The Visionary Behind Agrimater"
          subtitle="Leading the charge to transform agriculture in Bharat"
        />

        <FounderCard
          name="Dhairyashil Shinde"
          title="Founder & CEO — Visionary entrepreneur building AI for Bharat"
          quote="We started small but dared to dream big. Every farmer deserves access to fair markets, and every consumer deserves to know where their food comes from."
        />
      </div>
    </section>
  )
}
