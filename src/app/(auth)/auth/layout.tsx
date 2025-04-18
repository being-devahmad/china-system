import type React from "react"
import { CircleDollarSign, BarChart3, FileText, } from "lucide-react"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
            {/* Left side - Branding and features */}
            <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Floating elements */}
                <div className="absolute right-0 top-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-float-slow"></div>
                <div className="absolute -left-20 bottom-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-12">
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white/10 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                                <CircleDollarSign className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight">China System</h1>
                        </div>
                        <p className="text-xl font-light text-white/80 max-w-md">
                            Enterprise-grade financial management for modern businesses
                        </p>
                    </div>

                    <div className="flex-grow flex flex-col justify-center">
                        <div className="max-w-lg mx-auto">
                            {/* Dashboard preview */}
                            <div className="relative mb-16">
                                <div className="relative h-[320px] w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                                    {/* Top bar */}
                                    <div className="h-12 bg-slate-800 border-b border-white/10 flex items-center px-4">
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                                        </div>
                                        <div className="mx-auto bg-slate-700 rounded-md px-3 py-1 text-xs text-white/70">
                                            dashboard.chinasystem.com
                                        </div>
                                    </div>

                                    {/* Dashboard content */}
                                    <div className="p-6">
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            {/* Stats cards */}
                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="text-xs text-white/60 mb-1">Revenue</div>
                                                <div className="text-lg font-semibold">$24,512</div>
                                                <div className="text-xs text-green-400 mt-1">+12.5%</div>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="text-xs text-white/60 mb-1">Invoices</div>
                                                <div className="text-lg font-semibold">142</div>
                                                <div className="text-xs text-green-400 mt-1">+8.2%</div>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="text-xs text-white/60 mb-1">Clients</div>
                                                <div className="text-lg font-semibold">38</div>
                                                <div className="text-xs text-green-400 mt-1">+4.1%</div>
                                            </div>
                                        </div>

                                        {/* Chart */}
                                        <div className="bg-white/5 rounded-lg p-4 border border-white/10 h-32 mb-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="text-sm font-medium text-white/80">Monthly Revenue</div>
                                                <div className="text-xs text-white/60">Last 6 months</div>
                                            </div>
                                            <div className="flex items-end h-16 gap-2">
                                                <div className="w-1/6 h-[30%] bg-primary/40 rounded-sm"></div>
                                                <div className="w-1/6 h-[45%] bg-primary/40 rounded-sm"></div>
                                                <div className="w-1/6 h-[35%] bg-primary/40 rounded-sm"></div>
                                                <div className="w-1/6 h-[60%] bg-primary/40 rounded-sm"></div>
                                                <div className="w-1/6 h-[75%] bg-primary/40 rounded-sm"></div>
                                                <div className="w-1/6 h-[90%] bg-primary rounded-sm"></div>
                                            </div>
                                        </div>

                                        {/* Table */}
                                        <div className="bg-white/5 rounded-lg border border-white/10">
                                            <div className="text-xs text-white/80 p-3 border-b border-white/10">Recent Invoices</div>
                                            <div className="text-xs divide-y divide-white/10">
                                                <div className="flex justify-between p-3">
                                                    <span className="text-white/70">INV-2023-001</span>
                                                    <span className="text-white/90 font-medium">$1,200.00</span>
                                                </div>
                                                <div className="flex justify-between p-3">
                                                    <span className="text-white/70">INV-2023-002</span>
                                                    <span className="text-white/90 font-medium">$3,540.00</span>
                                                </div>
                                                <div className="flex justify-between p-3">
                                                    <span className="text-white/70">INV-2023-003</span>
                                                    <span className="text-white/90 font-medium">$890.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badges */}
                                <div className="absolute -top-3 -left-3 bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg">
                                    <BarChart3 className="h-5 w-5 text-white" />
                                </div>
                                <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-primary to-purple-600 p-3 rounded-lg shadow-lg">
                                    <FileText className="h-5 w-5 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Auth forms */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="flex lg:hidden items-center gap-3 mb-8">
                        <div className="bg-slate-900 p-2.5 rounded-xl">
                            <CircleDollarSign className="h-6 w-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">China System</h1>
                    </div>

                    {/* Auth form container */}
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200/50 overflow-hidden">{children}</div>
                </div>
            </div>
        </div>
    )
}

// Feature item component
// function FeatureItem({
//     icon,
//     title,
//     description,
// }: {
//     icon: React.ReactNode
//     title: string
//     description: string
// }) {
//     return (
//         <div className="flex items-start gap-3">
//             <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">{icon}</div>
//             <div>
//                 <h3 className="text-sm font-medium text-white">{title}</h3>
//                 <p className="text-xs text-white/70 mt-1">{description}</p>
//             </div>
//         </div>
//     )
// }
