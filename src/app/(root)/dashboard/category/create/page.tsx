"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CreateCategoryPage() {
    const [hsCode, setHsCode] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!hsCode || !name) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);

        // Simulate API call
        await new Promise((res) => setTimeout(res, 1200));

        toast.success("Category created successfully!");
        setLoading(false);
        router.push("/dashboard/categories"); // redirect to category list
    };

    return (
        <div className="px-4 py-8">
            <Card className="max-w-xl mx-auto shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Create New Category</CardTitle>
                    <p className="text-muted-foreground text-sm mt-1">
                        Add a new category with its HS-code.
                    </p>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="hsCode">HS-Code</Label>
                        <Input
                            id="hsCode"
                            placeholder="e.g. 0101.21"
                            value={hsCode}
                            onChange={(e) => setHsCode(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Category Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Live Horses"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleSubmit} className="w-full" disabled={loading}>
                        {loading ? "Creating..." : "Create Category"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
