import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    FileText,
    Users,
    Clock,
    MoreHorizontal,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-slate-500">Welcome back, John. Here's an overview of your business.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-9">
                        Export
                    </Button>
                    <Button className="h-9">Create Invoice</Button>
                </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value="$24,512.65"
                    change="+12.5%"
                    trend="up"
                    icon={<DollarSign className="h-5 w-5" />}
                    description="vs. previous month"
                />
                <StatCard
                    title="Invoices"
                    value="142"
                    change="+8.2%"
                    trend="up"
                    icon={<FileText className="h-5 w-5" />}
                    description="Total invoices"
                />
                <StatCard
                    title="Clients"
                    value="38"
                    change="+4.1%"
                    trend="up"
                    icon={<Users className="h-5 w-5" />}
                    description="Active clients"
                />
                <StatCard
                    title="Outstanding"
                    value="$6,840.00"
                    change="-2.3%"
                    trend="down"
                    icon={<Clock className="h-5 w-5" />}
                    description="Awaiting payment"
                />
            </div>

            {/* Charts and tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-base font-medium">Revenue Overview</CardTitle>
                            <CardDescription>Monthly revenue for the current year</CardDescription>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>Export data</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-end space-x-2 pt-6">
                            {/* Placeholder for chart */}
                            <div className="flex-1 bg-slate-100 rounded-t-md h-[40%]"></div>
                            <div className="flex-1 bg-slate-100 rounded-t-md h-[60%]"></div>
                            <div className="flex-1 bg-slate-100 rounded-t-md h-[45%]"></div>
                            <div className="flex-1 bg-slate-100 rounded-t-md h-[70%]"></div>
                            <div className="flex-1 bg-slate-100 rounded-t-md h-[55%]"></div>
                            <div className="flex-1 bg-slate-100 rounded-t-md h-[65%]"></div>
                            <div className="flex-1 bg-primary/20 rounded-t-md h-[80%]"></div>
                            <div className="flex-1 bg-primary rounded-t-md h-[90%]"></div>
                            <div className="flex-1 bg-slate-100 rounded-t-md h-[75%]"></div>
                            <div className="flex-1 bg-slate-100 rounded-t-md h-[60%]"></div>
                            <div className="flex-1 bg-slate-100 rounded-t-md h-[50%]"></div>
                            <div className="flex-1 bg-slate-100 rounded-t-md h-[65%]"></div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Recent Invoices</CardTitle>
                        <CardDescription>Latest invoices issued</CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="space-y-4">
                            <InvoiceItem id="INV-2023-001" client="Acme Inc." amount="$1,200.00" status="paid" date="Oct 12, 2023" />
                            <InvoiceItem
                                id="INV-2023-002"
                                client="Globex Corp"
                                amount="$3,540.00"
                                status="pending"
                                date="Oct 10, 2023"
                            />
                            <InvoiceItem
                                id="INV-2023-003"
                                client="Stark Industries"
                                amount="$890.00"
                                status="paid"
                                date="Oct 8, 2023"
                            />
                            <InvoiceItem
                                id="INV-2023-004"
                                client="Wayne Enterprises"
                                amount="$2,150.00"
                                status="overdue"
                                date="Oct 5, 2023"
                            />
                        </div>
                        <div className="pt-4 px-6">
                            <Button variant="ghost" className="w-full justify-between text-primary">
                                View all invoices
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent activity and clients */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
                        <CardDescription>Latest actions and updates</CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="space-y-4">
                            <ActivityItem user="John Doe" action="created a new invoice" target="INV-2023-005" time="2 hours ago" />
                            <ActivityItem user="Jane Smith" action="added a new client" target="Oscorp Industries" time="Yesterday" />
                            <ActivityItem user="System" action="marked invoice as paid" target="INV-2023-002" time="Yesterday" />
                            <ActivityItem
                                user="John Doe"
                                action="sent a payment reminder"
                                target="Wayne Enterprises"
                                time="2 days ago"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Top Clients</CardTitle>
                        <CardDescription>By revenue this month</CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="space-y-4">
                            <ClientItem name="Acme Inc." revenue="$5,240.00" invoices={4} />
                            <ClientItem name="Globex Corp" revenue="$3,540.00" invoices={2} />
                            <ClientItem name="Stark Industries" revenue="$2,890.00" invoices={3} />
                            <ClientItem name="Wayne Enterprises" revenue="$2,150.00" invoices={1} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

interface StatCardProps {
    title: string
    value: string
    change: string
    trend: "up" | "down"
    icon: React.ReactNode
    description: string
}

function StatCard({ title, value, change, trend, icon, description }: StatCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">{title}</p>
                        <h3 className="text-2xl font-bold">{value}</h3>
                    </div>
                    <div className="bg-slate-100 p-2 rounded-full">{icon}</div>
                </div>
                <div className="flex items-center mt-4">
                    <div className={`flex items-center text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {trend === "up" ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                        {change}
                    </div>
                    <p className="text-xs text-slate-500 ml-2">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

interface InvoiceItemProps {
    id: string
    client: string
    amount: string
    status: "paid" | "pending" | "overdue"
    date: string
}

function InvoiceItem({ id, client, amount, status, date }: InvoiceItemProps) {
    const statusColors = {
        paid: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        overdue: "bg-red-100 text-red-800",
    }

    return (
        <div className="flex items-center justify-between px-6 py-3 hover:bg-slate-50">
            <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-slate-600" />
                </div>
                <div>
                    <p className="text-sm font-medium">{id}</p>
                    <p className="text-xs text-slate-500">{client}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium">{amount}</p>
                <div className="flex items-center justify-end gap-2 mt-1">
                    <Badge variant="outline" className={statusColors[status]}>
                        {status}
                    </Badge>
                    <p className="text-xs text-slate-500">{date}</p>
                </div>
            </div>
        </div>
    )
}

interface ActivityItemProps {
    user: string
    action: string
    target: string
    time: string
}

function ActivityItem({ user, action, target, time }: ActivityItemProps) {
    return (
        <div className="flex items-start gap-4 px-6 py-3 hover:bg-slate-50">
            <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <p className="text-sm">
                    <span className="font-medium">{user}</span> {action} <span className="font-medium">{target}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">{time}</p>
            </div>
        </div>
    )
}

interface ClientItemProps {
    name: string
    revenue: string
    invoices: number
}

function ClientItem({ name, revenue, invoices }: ClientItemProps) {
    return (
        <div className="flex items-center justify-between px-6 py-3 hover:bg-slate-50">
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">{name.split(" ")[0][0]}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-slate-500">{invoices} invoices</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium">{revenue}</p>
                <p className="text-xs text-slate-500">This month</p>
            </div>
        </div>
    )
}
