// app/dashboard/users/[id]/manage/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Fake function to simulate fetching user data
const fetchUserById = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800)); // simulate network delay

    // Normally yeh API call hogi
    return {
        id,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
    };
};

const availableModules = [
    "Dashboard",
    "Users Management",
    "Invoices",
    "Products",
    "Reports",
    "Settings",
];

export default function ManageUserPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
    const [selectedModules, setSelectedModules] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const data = await fetchUserById(id);
            setUser(data);
            setLoading(false);
        };
        getUser();
    }, [id]);

    const toggleModule = (module: string) => {
        setSelectedModules((prev) =>
            prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]
        );
    };

    const handleSave = async () => {
        // Fake API save
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.success("Permissions updated successfully!");
        router.push("/dashboard/users");
    };

    if (loading) {
        return (
            <div className="px-4 py-8">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="px-4 py-8">
            <Card className="max-w-3xl mx-auto shadow-lg border">
                <CardHeader>
                    <CardTitle className="text-2xl">Manage User Permissions</CardTitle>
                    <CardDescription className="text-md mt-2">
                        <span className="font-semibold">Name:</span> {user?.firstName} {user?.lastName}<br />
                        <span className="font-semibold">Email:</span> {user?.email}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {availableModules.map((module) => (
                            <div key={module} className="flex items-center space-x-2">
                                <Checkbox
                                    id={module}
                                    checked={selectedModules.includes(module)}
                                    onCheckedChange={() => toggleModule(module)}
                                />
                                <label htmlFor={module} className="text-sm font-medium">
                                    {module}
                                </label>
                            </div>
                        ))}
                    </div>

                    <Button onClick={handleSave} className="w-full mt-8">
                        Save Permissions
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
