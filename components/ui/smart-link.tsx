import Link from "next/link"
import type { LinkProps } from "next/link"
import { forwardRef } from "react"

interface SmartLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
  prefetch?: boolean
  [key: string]: any
}

/**
 * Smart Link component that disables prefetching by default
 * to reduce edge request inflation
 */
export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
  ({ prefetch = false, href, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        prefetch={prefetch}
        {...props}
      />
    )
  }
)

SmartLink.displayName = "SmartLink"