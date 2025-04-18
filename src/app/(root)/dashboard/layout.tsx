"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
    CircleDollarSign,
    Menu,
    X,
    Home,
    FileText,
    Users,
    BarChart3,
    Settings,
    Bell,
    Search,
    HelpCircle,
    LogOut,
    ChevronDown,
    CreditCard,
    PieChart,
    Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024)
            if (window.innerWidth < 1024) {
                setSidebarCollapsed(true)
            }
        }

        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)
        return () => window.removeEventListener("resize", checkScreenSize)
    }, [])

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Navbar */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
                {/* Left section with logo and menu toggle */}
                <div className="flex items-center gap-3">
                    {/* Mobile menu button */}
                    <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>

                    {/* Desktop sidebar toggle */}
                    <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={toggleSidebar}>
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle sidebar</span>
                    </Button>

                    {/* Logo - visible when sidebar is collapsed or on mobile */}
                    <div
                        className={cn(
                            "flex items-center gap-2 transition-opacity",
                            !sidebarCollapsed && !isMobile ? "opacity-0 lg:hidden" : "opacity-100",
                        )}
                    >
                        <div className="bg-slate-900 p-1.5 rounded-md">
                            <CircleDollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">ChinaSystem</span>
                    </div>
                </div>

                {/* Center section with search */}
                <div className="hidden md:flex items-center max-w-md w-full relative">
                    <Search className="h-4 w-4 absolute left-3 text-slate-400" />
                    <Input placeholder="Search..." className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-primary/20" />
                </div>

                {/* Right section with actions */}
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="text-slate-500">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
                    </Button>

                    <Button variant="ghost" size="icon" className="text-slate-500">
                        <HelpCircle className="h-5 w-5" />
                        <span className="sr-only">Help</span>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="p-1.5">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                    <AvatarFallback className="bg-primary/10 text-primary text-sm">JD</AvatarFallback>
                                </Avatar>
                                <ChevronDown className="ml-2 h-4 w-4 text-slate-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium">John Doe</p>
                                    <p className="text-xs text-slate-500">john.doe@example.com</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                <span>My Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Desktop */}
                <aside
                    className={cn(
                        "bg-white border-r border-slate-200 z-20 transition-all duration-300 ease-in-out hidden lg:flex flex-col",
                        sidebarCollapsed ? "w-20" : "w-64",
                    )}
                >
                    {/* Sidebar header with logo */}
                    <div
                        className={cn(
                            "h-16 flex items-center px-4 border-b border-slate-200",
                            sidebarCollapsed ? "justify-center" : "justify-start",
                        )}
                    >
                        {!sidebarCollapsed && (
                            <div className="flex items-center gap-2">
                                <div className="bg-slate-900 p-1.5 rounded-md">
                                    <CircleDollarSign className="h-5 w-5 text-primary" />
                                </div>
                                <span className="font-bold text-lg tracking-tight">ChinaSystem</span>
                            </div>
                        )}
                    </div>

                    {/* Navigation links */}
                    <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                        <NavItem
                            href="/dashboard"
                            icon={<Home className="h-5 w-5" />}
                            label="Dashboard"
                            active={pathname === "/dashboard"}
                            collapsed={sidebarCollapsed}
                        />
                        <NavItem
                            href="/dashboard/accounts"
                            icon={<Users className="h-5 w-5" />}
                            label="Accounts"
                            active={pathname.startsWith("/dashboard/accounts")}
                            collapsed={sidebarCollapsed}
                        />
                        <NavItem
                            href="/dashboard/purchase-orders"
                            icon={<FileText className="h-5 w-5" />}
                            label="Purchase Orders"
                            active={pathname.startsWith("/dashboard/purchase-orders")}
                            collapsed={sidebarCollapsed}
                        />
                        <NavItem
                            href="/dashboard/invoices"
                            icon={<CreditCard className="h-5 w-5" />}
                            label="Invoices"
                            active={pathname.startsWith("/dashboard/invoices")}
                            collapsed={sidebarCollapsed}
                        />
                        <NavItem
                            href="/dashboard/vouchers"
                            icon={<BarChart3 className="h-5 w-5" />}
                            label="Vouchers"
                            active={pathname.startsWith("/dashboard/vouchers")}
                            collapsed={sidebarCollapsed}
                        />
                        <NavItem
                            href="/dashboard/ledger"
                            icon={<PieChart className="h-5 w-5" />}
                            label="Ledger"
                            active={pathname.startsWith("/dashboard/ledger")}
                            collapsed={sidebarCollapsed}
                        />
                        {/* <NavItem
                            href="/dashboard/calendar"
                            icon={<Calendar className="h-5 w-5" />}
                            label="Calendar"
                            active={pathname.startsWith("/dashboard/calendar")}
                            collapsed={sidebarCollapsed}
                        /> */}

                        <div className={cn("pt-4 mt-4 border-t border-slate-200", sidebarCollapsed ? "mx-2" : "mx-1")}>
                            <NavItem
                                href="/dashboard/settings"
                                icon={<Settings className="h-5 w-5" />}
                                label="Settings"
                                active={pathname.startsWith("/dashboard/settings")}
                                collapsed={sidebarCollapsed}
                            />
                        </div>
                    </nav>

                    {/* User profile section */}
                    <div className={cn("border-t border-slate-200 p-4", sidebarCollapsed ? "flex justify-center py-4" : "")}>
                        {sidebarCollapsed ? (
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                                <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                            </Avatar>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                                    <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900 truncate">John Doe</p>
                                    <p className="text-xs text-slate-500 truncate">Administrator</p>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Mobile sidebar */}
                <div
                    className={cn(
                        "fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity",
                        mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
                    )}
                    onClick={closeMobileMenu}
                />

                <aside
                    className={cn(
                        "fixed inset-y-0 left-0 bg-white z-50 w-64 transition-transform duration-300 ease-in-out lg:hidden",
                        mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
                    )}
                >
                    <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                            <div className="bg-slate-900 p-1.5 rounded-md">
                                <CircleDollarSign className="h-5 w-5 text-primary" />
                            </div>
                            <span className="font-bold text-lg tracking-tight">ChinaSystem</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                        <NavItem
                            href="/dashboard"
                            icon={<Home className="h-5 w-5" />}
                            label="Dashboard"
                            active={pathname === "/dashboard"}
                            collapsed={false}
                            onClick={closeMobileMenu}
                        />
                        <NavItem
                            href="/dashboard/invoices"
                            icon={<FileText className="h-5 w-5" />}
                            label="Invoices"
                            active={pathname.startsWith("/dashboard/invoices")}
                            collapsed={false}
                            onClick={closeMobileMenu}
                        />
                        <NavItem
                            href="/dashboard/clients"
                            icon={<Users className="h-5 w-5" />}
                            label="Clients"
                            active={pathname.startsWith("/dashboard/clients")}
                            collapsed={false}
                            onClick={closeMobileMenu}
                        />
                        <NavItem
                            href="/dashboard/payments"
                            icon={<CreditCard className="h-5 w-5" />}
                            label="Payments"
                            active={pathname.startsWith("/dashboard/payments")}
                            collapsed={false}
                            onClick={closeMobileMenu}
                        />
                        <NavItem
                            href="/dashboard/reports"
                            icon={<BarChart3 className="h-5 w-5" />}
                            label="Reports"
                            active={pathname.startsWith("/dashboard/reports")}
                            collapsed={false}
                            onClick={closeMobileMenu}
                        />
                        <NavItem
                            href="/dashboard/analytics"
                            icon={<PieChart className="h-5 w-5" />}
                            label="Analytics"
                            active={pathname.startsWith("/dashboard/analytics")}
                            collapsed={false}
                            onClick={closeMobileMenu}
                        />
                        <NavItem
                            href="/dashboard/calendar"
                            icon={<Calendar className="h-5 w-5" />}
                            label="Calendar"
                            active={pathname.startsWith("/dashboard/calendar")}
                            collapsed={false}
                            onClick={closeMobileMenu}
                        />

                        <div className="pt-4 mt-4 border-t border-slate-200 mx-1">
                            <NavItem
                                href="/dashboard/settings"
                                icon={<Settings className="h-5 w-5" />}
                                label="Settings"
                                active={pathname.startsWith("/dashboard/settings")}
                                collapsed={false}
                                onClick={closeMobileMenu}
                            />
                        </div>
                    </nav>

                    <div className="border-t border-slate-200 p-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                                <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">John Doe</p>
                                <p className="text-xs text-slate-500 truncate">Administrator</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 overflow-auto">
                    <div className="container mx-auto p-6">{children}</div>
                </main>
            </div>
        </div>
    )
}

interface NavItemProps {
    href: string
    icon: React.ReactNode
    label: string
    active: boolean
    collapsed: boolean
    onClick?: () => void
}

function NavItem({ href, icon, label, active, collapsed, onClick }: NavItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                active ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                collapsed ? "justify-center" : "",
            )}
            onClick={onClick}
        >
            {icon}
            {!collapsed && <span>{label}</span>}
        </Link>
    )
}
