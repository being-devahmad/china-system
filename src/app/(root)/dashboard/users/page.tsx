// app/dashboard/users/page.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export default function UsersPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const users: User[] = [
        { id: "1", firstName: "John", lastName: "Doe", email: "john@example.com", role: "Admin" },
        { id: "2", firstName: "Jane", lastName: "Smith", email: "jane@example.com", role: "Manager" },
        { id: "3", firstName: "Mike", lastName: "Johnson", email: "mike@example.com", role: "User" },
    ];

    const filteredUsers = users.filter((user) =>
        `${user.firstName} ${user.lastName} ${user.email} ${user.role}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-4 py-8">
            <Card className="shadow-lg">
                <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <CardTitle className="text-2xl">Users</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Manage users in your application.
                        </p>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                        <Input
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64"
                        />
                        <Button onClick={() => router.push("/dashboard/users/create")}>
                            Create User
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user, index) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{user.firstName} {user.lastName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role}</TableCell>


                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/users/${user.id}/manage`)}>
                                                            Manage User
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => alert("Edit user feature coming soon")}>
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => alert("Delete user feature coming soon")}>
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>

                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
