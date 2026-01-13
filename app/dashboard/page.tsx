"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import { GradientButton } from "@/components/ui/gradient-button"
import {
  LayoutDashboard,
  Leaf,
  Store,
  Truck,
  BarChart3,
  Settings,
  LogOut,
  TrendingUp,
  Users,
  Package,
  Bell,
  Search,
  ChevronRight,
  Calendar,
  ArrowLeft,
} from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard", active: true },
  { icon: Leaf, label: "Farmers", href: "/dashboard/farmers" },
  { icon: Store, label: "Retailers", href: "/dashboard/retailers" },
  { icon: Truck, label: "Logistics", href: "/dashboard/logistics" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

const stats = [
  { label: "Total Farmers", value: "523", change: "+12%", icon: Users, color: "from-[#00F28A] to-[#4BE96A]" },
  { label: "Active Orders", value: "89", change: "+8%", icon: Package, color: "from-[#00F28A] to-[#4BE96A]" },
  { label: "Revenue (MTD)", value: "₹12.4L", change: "+23%", icon: TrendingUp, color: "from-[#00F28A] to-[#4BE96A]" },
  { label: "Avg. Grade Score", value: "A+", change: "+5%", icon: BarChart3, color: "from-[#00F28A] to-[#4BE96A]" },
]

const recentActivity = [
  { type: "farmer", message: "New farmer registered from Pune", time: "2 min ago" },
  { type: "order", message: "Order #1234 delivered successfully", time: "15 min ago" },
  { type: "grade", message: "Batch #5678 graded as Premium", time: "1 hour ago" },
  { type: "retailer", message: "Metro Foods requested 500kg tomatoes", time: "2 hours ago" },
]

const upcomingDeliveries = [
  { id: "DEL001", retailer: "Fresh Mart", items: "Tomatoes, Onions", date: "Today, 4:00 PM" },
  { id: "DEL002", retailer: "Metro Foods", items: "Potatoes, Carrots", date: "Tomorrow, 9:00 AM" },
  { id: "DEL003", retailer: "Green Grocers", items: "Spinach, Capsicum", date: "Tomorrow, 2:00 PM" },
]

function DashboardContent() {
  const router = useRouter()
  const { user, logout, isLoading, isAuthenticated } = useAuth()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-12 h-12 border-4 border-[#00f28a] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-[#00f28a] text-gray-700 hover:text-gray-900 transition-all shadow-lg hover:shadow-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back</span>
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className={`fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center shadow-[0_0_15px_rgba(0,242,138,0.3)]">
              <span className="text-xl font-bold text-[#0a0a0a]">A</span>
            </div>
            {!isSidebarCollapsed && <span className="text-xl font-bold text-foreground">Agrimater</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className={`flex items-center gap-3 ${isSidebarCollapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F28A] to-[#4BE96A] flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-[#0a0a0a]">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </span>
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.userType}</p>
              </div>
            )}
            {!isSidebarCollapsed && (
              <button
                onClick={logout}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "ml-20" : "ml-64"}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ChevronRight className={`w-5 h-5 transition-transform ${isSidebarCollapsed ? "" : "rotate-180"}`} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.name?.split(" ")[0]}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-[0_0_30px_rgba(0,242,138,0.1)] transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-[#0a0a0a]" />
                  </div>
                  <span className="text-sm font-medium text-primary">{stat.change}</span>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm text-primary hover:underline">View all activity</button>
            </motion.div>

            {/* Upcoming Deliveries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Upcoming Deliveries</h3>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                {upcomingDeliveries.map((delivery) => (
                  <div key={delivery.id} className="p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{delivery.retailer}</span>
                      <span className="text-xs text-primary font-mono">{delivery.id}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{delivery.items}</p>
                    <p className="text-xs text-muted-foreground">{delivery.date}</p>
                  </div>
                ))}
              </div>
              <GradientButton variant="secondary" className="w-full mt-4">
                View All Deliveries
              </GradientButton>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-[#00F28A]/10 to-[#4BE96A]/10 border border-primary/20"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <GradientButton size="sm">
                <Users className="w-4 h-4 mr-2" /> Add Farmer
              </GradientButton>
              <GradientButton variant="secondary" size="sm">
                <Package className="w-4 h-4 mr-2" /> New Order
              </GradientButton>
              <GradientButton variant="secondary" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" /> Grade Produce
              </GradientButton>
              <GradientButton variant="secondary" size="sm">
                <Truck className="w-4 h-4 mr-2" /> Schedule Delivery
              </GradientButton>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return <DashboardContent />
}
