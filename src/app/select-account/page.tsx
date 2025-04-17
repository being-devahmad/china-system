"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CircleDollarSign, Building, Users, ArrowRight, Search, CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Sample account data - in a real app, this would come from an API
const accounts = [
    {
        id: "acc-001",
        name: "Acme Corporation",
        role: "Administrator",
        type: "Enterprise",
        logo: "/placeholder.svg?height=40&width=40",
        initials: "AC",
        users: 24,
        lastAccessed: "2 days ago",
        recentActivity: true,
    },
    {
        id: "acc-002",
        name: "Globex Industries",
        role: "Manager",
        type: "Business",
        logo: "/placeholder.svg?height=40&width=40",
        initials: "GI",
        users: 12,
        lastAccessed: "1 week ago",
        recentActivity: false,
    },
    {
        id: "acc-003",
        name: "Stark Enterprises",
        role: "Viewer",
        type: "Enterprise",
        logo: "/placeholder.svg?height=40&width=40",
        initials: "SE",
        users: 56,
        lastAccessed: "3 weeks ago",
        recentActivity: false,
    },
    {
        id: "acc-004",
        name: "Wayne Industries",
        role: "Administrator",
        type: "Business",
        logo: "/placeholder.svg?height=40&width=40",
        initials: "WI",
        users: 18,
        lastAccessed: "Yesterday",
        recentActivity: true,
    },
    {
        id: "acc-005",
        name: "Oscorp Technologies",
        role: "Manager",
        type: "Startup",
        logo: "/placeholder.svg?height=40&width=40",
        initials: "OT",
        users: 8,
        lastAccessed: "4 days ago",
        recentActivity: false,
    },
]

export default function AccountSelectionPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null)

    const filteredAccounts = accounts.filter((account) =>
        account.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleAccountSelect = (accountId: string) => {
        setSelectedAccount(accountId)
    }

    const handleContinue = () => {
        if (selectedAccount) {
            router.push("/dashboard")
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 py-4">
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-900 p-2 rounded-md">
                            <CircleDollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">ChinaSystem</span>
                    </div>
                    <Button variant="ghost" className="text-slate-600">
                        Sign Out
                    </Button>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-bold tracking-tight mb-2">Select an Account</h1>
                        <p className="text-slate-500 max-w-md mx-auto">
                            Choose which account you'd like to access from the options below
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                        <div className="p-4 border-b border-slate-100">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search accounts..."
                                    className="pl-9 bg-slate-50 border-slate-200"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {filteredAccounts.length > 0 ? (
                                filteredAccounts.map((account) => (
                                    <AccountCard
                                        key={account.id}
                                        account={account}
                                        selected={selectedAccount === account.id}
                                        onSelect={() => handleAccountSelect(account.id)}
                                    />
                                ))
                            ) : (
                                <div className="py-12 text-center">
                                    <p className="text-slate-500">No accounts found matching your search</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            size="lg"
                            onClick={handleContinue}
                            disabled={!selectedAccount}
                            className="px-6 transition-all duration-200"
                        >
                            Continue to Dashboard
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-slate-200 py-6">
                <div className="container mx-auto px-4 md:px-6 text-center text-sm text-slate-500">
                    <p>© 2023 ChinaSystem. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

interface AccountCardProps {
    account: {
        id: string
        name: string
        role: string
        type: string
        logo: string
        initials: string
        users: number
        lastAccessed: string
        recentActivity: boolean
    }
    selected: boolean
    onSelect: () => void
}

function AccountCard({ account, selected, onSelect }: AccountCardProps) {
    return (
        <Card
            className={`border-0 rounded-none hover:bg-slate-50 transition-colors cursor-pointer ${selected ? "bg-primary/5" : ""
                }`}
            onClick={onSelect}
        >
            <CardContent className="p-0">
                <div className="flex items-center p-4">
                    <div className="relative flex-shrink-0">
                        <Avatar className="h-12 w-12 border border-slate-200">
                            <AvatarImage src={account.logo || "/placeholder.svg"} alt={account.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">{account.initials}</AvatarFallback>
                        </Avatar>
                        {account.recentActivity && (
                            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                        )}
                    </div>

                    <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-medium text-slate-900">{account.name}</h3>
                                <div className="flex items-center mt-1">
                                    <Badge variant="outline" className="text-xs font-normal bg-slate-50 mr-2">
                                        {account.type}
                                    </Badge>
                                    <span className="text-xs text-slate-500">{account.role}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="flex items-center text-xs text-slate-500 mb-1">
                                        <Users className="h-3 w-3 mr-1" />
                                        <span>{account.users} users</span>
                                    </div>
                                    <div className="text-xs text-slate-500">Last accessed: {account.lastAccessed}</div>
                                </div>
                                <div
                                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${selected
                                            ? "border-primary bg-primary text-white"
                                            : "border-slate-300 bg-white text-transparent"
                                        }`}
                                >
                                    {selected && <CheckCircle2 className="h-3 w-3" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

