// app/dashboard/categories/page.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

const dummyCategories = [
    { id: "1", hsCode: "0101.21", name: "Live Horses" },
    { id: "2", hsCode: "0201.30", name: "Frozen Beef" },
    { id: "3", hsCode: "0302.12", name: "Fresh Fish" },
];

export default function CategoryListPage() {
    const [categories] = useState(dummyCategories);

    return (
        <div className="px-4 py-8">
            <Card className="max-w-5xl mx-auto shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl">Categories</CardTitle>
                    <Link href="/dashboard/category/create">
                        <Button>Add New Category</Button>
                    </Link>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-32">HS-Code</TableHead>
                                <TableHead>Category Name</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.hsCode}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Link href={`/dashboard/categories/${category.id}/edit`} className="w-full">
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
