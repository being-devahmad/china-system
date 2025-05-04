"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { EyeIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const mockPurchaseOrders = [
    {
        id: "PO12345",
        shop: "Contra Shop 1",
        container: "15",
        totalItems: 3,
        totalCartons: 24,
        status: "Pending",
        date: "2025-04-30",
    },
    {
        id: "PO12346",
        shop: "Contra Shop 2",
        container: "16",
        totalItems: 5,
        totalCartons: 35,
        status: "Approved",
        date: "2025-04-28",
    },
];

export default function PurchaseOrderListPage() {
    return (
        <div className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Purchase Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                            <Label htmlFor="search">Search</Label>
                            <Input id="search" placeholder="Search by PO ID or Shop" className="w-72" />
                        </div>
                        <Link href={'/dashboard/purchase-orders/create'} >
                            <Button variant="default">Create Purchase Order</Button>
                        </Link>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>PO ID</TableHead>
                                <TableHead>Shop</TableHead>
                                <TableHead>Container</TableHead>
                                <TableHead>Total Items</TableHead>
                                <TableHead>Total Cartons</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockPurchaseOrders.map((po) => (
                                <TableRow key={po.id}>
                                    <TableCell>{po.id}</TableCell>
                                    <TableCell>{po.shop}</TableCell>
                                    <TableCell>{po.container}</TableCell>
                                    <TableCell>{po.totalItems}</TableCell>
                                    <TableCell>{po.totalCartons}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={po.status === "Approved" ? "success" : "secondary"}
                                        >
                                            {po.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{po.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="outline">
                                            <EyeIcon className="w-4 h-4 mr-1" /> View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
