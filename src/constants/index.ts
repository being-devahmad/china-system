'use client'

import { CreditCard, FileText, Home, PieChart, Settings, Users } from "lucide-react";

export const MENU_ITEMS = [
    {
        icon: Home,
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: Users,
        label: "Accounts",
        href: "/dashboard/accounts",
    },
    {
        icon: CreditCard,
        label: "Purchase Orders",
        href: "/dashboard/purchase-orders",
    },
    {
        icon: FileText,
        label: "Invoices",
        href: "/dashboard/invoices",
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