// import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VoucherList } from "@/components/vouchers/VoucherList"

// import { VoucherList } from "@/components/voucher-list"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function VouchersPage() {
    return (
        <>
            <div className="flex justify-between">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Voucher Management</h1>
                    <p className="text-gray-500">Create a new voucher for your shop.</p>
                </div>
                {/* <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Accounts Management</h1>
                    <p className="text-gray-500">View and manage all shop and account records in the system.</p>
                </div> */}
                <Link href="/dashboard/vouchers/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Voucher
                    </Button>
                </Link>
            </div>
            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>All Vouchers</CardTitle>
                                <CardDescription>View and manage all your vouchers across shops.</CardDescription>
                            </div>
                            <div className="flex space-x-2">
                                <Button variant="outline">Export</Button>
                                <Button variant="outline">Filter</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <VoucherList />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
