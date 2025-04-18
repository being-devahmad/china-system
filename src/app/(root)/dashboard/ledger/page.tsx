import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Printer, Search } from "lucide-react"
import { LedgerTable } from "@/components/ledger/ledgerTable"
import { DateRangePicker } from "@/components/dateRangePicker"

export default function LedgerPage() {
    return (

        <>
            <div className="flex justify-between">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Ledger</h1>
                    <p className="text-gray-500">View and generate ledger reports for your shops.</p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>
            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Ledger Filters</CardTitle>
                        <CardDescription>Filter the ledger by shop, date range, or transaction details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-2">
                                <Label htmlFor="shop">Shop</Label>
                                <Select>
                                    <SelectTrigger id="shop">
                                        <SelectValue placeholder="All Shops" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Shops</SelectItem>
                                        <SelectItem value="shop1">Shop 1</SelectItem>
                                        <SelectItem value="shop2">Shop 2</SelectItem>
                                        <SelectItem value="shop3">Shop 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Date Range</Label>
                                <DateRangePicker />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="container">Container Number</Label>
                                <Input id="container" placeholder="Enter container number" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bill">Bill Number</Label>
                                <Input id="bill" placeholder="Enter bill number" />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button>
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Ledger Report</CardTitle>
                                <CardDescription>Showing all transactions based on your filters.</CardDescription>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Transaction ID: <span className="font-medium">FT-2025-0001</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <LedgerTable />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
