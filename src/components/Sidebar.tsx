"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarRail,
} from "@/components/ui/sidebar"
import { MENU_ITEMS } from "@/constants"

export default function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar className="border-r" collapsible="icon">
            <SidebarHeader className="border-b p-4">
                <div className="flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    <span className="font-bold text-lg">InvoiceHub</span>
                </div>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-2 py-1.5">Main Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {MENU_ITEMS.map((route) => (
                                <SidebarMenuItem key={route.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === route.href}
                                        tooltip={route.label}
                                        className="py-2.5"
                                    >
                                        <Link href={route.href}>
                                            <route.icon className="h-5 w-5" />
                                            <span className="font-medium">{route.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                        <div className="font-medium">John Doe</div>
                        <div className="text-xs text-muted-foreground">john@example.com</div>
                    </div>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
