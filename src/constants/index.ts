'use client'

import { CreditCard, FileText, Home, PieChart, Settings, Users } from "lucide-react";




export const MENU_ITEMS = [
    {
        icon: Home,
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: FileText,
        label: "Invoices",
        href: "/dashboard/invoices",
    },
    {
        icon: CreditCard,
        label: "Payments",
        href: "/dashboard/payments",
    },
    {
        icon: Users,
        label: "Clients",
        href: "/dashboard/clients",
    },
    {
        icon: PieChart,
        label: "Reports",
        href: "/dashboard/reports",
    },
    {
        icon: Settings,
        label: "Settings",
        href: "/dashboard/settings",
    },
]