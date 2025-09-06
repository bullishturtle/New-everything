"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import {
  Home,
  Users,
  Briefcase,
  Calendar,
  FileText,
  Camera,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Estimates", href: "/dashboard/estimates", icon: FileText },
  { name: "Photos", href: "/dashboard/photos", icon: Camera },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <Suspense fallback={null}>
      <div className="min-h-screen bg-black text-white">
        {/* Mobile sidebar */}
        <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-white/10">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">
                  R
                </div>
                <span className="font-bold text-lg">RoofFax CRM</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
          <div className="flex flex-col h-full bg-gray-900 border-r border-white/10">
            <div className="flex items-center gap-2 p-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">
                R
              </div>
              <span className="font-bold text-lg">RoofFax CRM</span>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top header */}
          <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-5 w-5" />
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search customers, jobs..." className="pl-10 w-64 bg-white/5 border-white/10" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-gray-900 border-white/10" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">John Doe</p>
                        <p className="text-xs leading-none text-gray-400">john@rooffax.com</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </Suspense>
  )
}
