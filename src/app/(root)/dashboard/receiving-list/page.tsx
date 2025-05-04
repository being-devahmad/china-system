"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const dummyReceivingList = [
    {
        id: "1",
        shopNumber: "Shop-101",
        billNumber: "INV-001",
        items: "Shoes, Belts",
        cartons: 5,
        note: "Fragile",
        category: "Footwear",
        weight: "150kg",
        cbm: "2.5",
    },
    {
        id: "2",
        shopNumber: "Shop-102",
        billNumber: "INV-002",
        items: "Jackets",
        cartons: 3,
        note: "-",
        category: "Apparel",
        weight: "100kg",
        cbm: "1.8",
    },
];

const categories = ["All", "Footwear", "Apparel", "Electronics"];

export default function ReceivingListPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredList = selectedCategory === "All"
        ? dummyReceivingList
        : dummyReceivingList.filter(item => item.category === selectedCategory);

    return (
        <div className="p-6">
            <Card className="shadow-md max-w-7xl mx-auto">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Receiving List</CardTitle>

                    <div className="flex gap-4 items-center">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Link href="/dashboard/receiving-list/create">
                            <Button>Add New</Button>
                        </Link>
                    </div>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Shop No.</TableHead>
                                <TableHead>Bill No.</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total Cartons</TableHead>
                                <TableHead>Note</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Weight</TableHead>
                                <TableHead>CBM</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredList.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.shopNumber}</TableCell>
                                    <TableCell>{item.billNumber}</TableCell>
                                    <TableCell>{item.items}</TableCell>
                                    <TableCell>{item.cartons}</TableCell>
                                    <TableCell>{item.note}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.weight}</TableCell>
                                    <TableCell>{item.cbm}</TableCell>
                                    <TableCell>
                                        <Link href={`/dashboard/receiving-list/${item.id}/edit`}>
                                            <Button variant="outline" size="sm">
                                                <Pencil className="h-4 w-4 mr-1" /> Edit
                                            </Button>
                                        </Link>
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
