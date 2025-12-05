"use client"

import type React from "react"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "relative font-medium rounded-full transition-all duration-300 ease-out"

    const variants = {
      primary:
        "bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-gray-900 hover:shadow-lg hover:shadow-[#00F28A]/20",
      secondary: "bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:shadow-md",
      outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
    }

    const sizes = {
      sm: "px-5 py-2 text-sm",
      md: "px-8 py-4 text-base",
      lg: "px-10 py-5 text-lg",
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    )
  },
)

GradientButton.displayName = "GradientButton"

export { GradientButton }
