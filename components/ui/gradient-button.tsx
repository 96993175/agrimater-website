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
    const baseStyles = "relative font-semibold rounded-full transition-all duration-300 overflow-hidden"

    const variants = {
      primary:
        "bg-gradient-to-r from-[#00F28A] to-[#4BE96A] text-[#0a0a0a] hover:shadow-[0_0_30px_rgba(0,242,138,0.5)]",
      secondary: "bg-foreground/5 text-foreground border border-primary/30 hover:border-primary hover:bg-primary/10",
      outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
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
