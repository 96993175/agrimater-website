"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Linkedin, Instagram, MapPin, Mail, Phone, Leaf, ArrowUpRight } from "lucide-react"

const footerLinks = {
  solutions: [
    { href: "/retailer-solutions", label: "Retailer Solutions" },
    { href: "/farmer-onboarding", label: "Farmer Onboarding" },
    { href: "/investor-access", label: "Investor Access" },
  ],
  company: [
    { href: "#vision", label: "Our Vision" },
    { href: "#team", label: "Team" },
    { href: "#partner", label: "Partner With Us" },
  ],
  legal: [
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
    { href: "/dashboard", label: "Dashboard" },
  ],
}

const socialLinks = [
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f28a]/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#4be96a]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#00f28a]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "4s" }} />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,138,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,138,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F28A] to-[#4BE96A] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center shadow-lg">
                  <Leaf className="w-6 h-6 text-gray-900" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Agrimater</span>
            </Link>
            <p className="text-gray-400 mb-8 text-pretty leading-relaxed">
              AI-powered farm-to-retail transparency for Bharat. Reimagining agriculture, empowering supply chains.
            </p>
            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-gray-400 hover:text-[#00f28a] transition-all duration-300 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00f28a]/10 group-hover:border-[#00f28a]/30 transition-all duration-300">
                  <MapPin className="w-4 h-4 text-[#00f28a]" />
                </div>
                <span className="text-sm">Hinjewadi Phase 1, Pune</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-gray-400 hover:text-[#00f28a] transition-all duration-300 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00f28a]/10 group-hover:border-[#00f28a]/30 transition-all duration-300">
                  <Mail className="w-4 h-4 text-[#00f28a]" />
                </div>
                <span className="text-sm">hello@agrimater.com</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-gray-400 hover:text-[#00f28a] transition-all duration-300 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00f28a]/10 group-hover:border-[#00f28a]/30 transition-all duration-300">
                  <Phone className="w-4 h-4 text-[#00f28a]" />
                </div>
                <span className="text-sm">+91 98765 43210</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6 text-lg">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link href={link.href} className="text-gray-400 hover:text-[#00f28a] transition-all duration-300 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#00f28a] group-hover:w-6 group-hover:h-0.5 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6 text-lg">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Link href={link.href} className="text-gray-400 hover:text-[#00f28a] transition-all duration-300 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#00f28a] group-hover:w-6 group-hover:h-0.5 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6 text-lg">Account</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Link href={link.href} className="text-gray-400 hover:text-[#00f28a] transition-all duration-300 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#00f28a] group-hover:w-6 group-hover:h-0.5 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h5 className="font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 text-sm">Follow Us</h5>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group"
                      aria-label={social.label}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#00f28a] to-[#4be96a] rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                      <div className="relative w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-gradient-to-br group-hover:from-[#00f28a] group-hover:to-[#4be96a] group-hover:text-gray-900 group-hover:border-transparent transition-all duration-300 shadow-lg">
                        <social.icon className="w-5 h-5" />
                      </div>
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </footer>
  )
}
