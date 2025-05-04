"use client";

import { useState } from "react";
import {
    Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter
} from "@/components/ui/dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = ["Footwear", "Apparel", "Electronics"];

export default function CreateReceivingEntry() {
    const router = useRouter();
    const [form, setForm] = useState({
        shopNumber: "",
        billNumber: "",
        items: "",
        cartons: "",
        weight: "",
        cbm: "",
        note: "",
        category: "",
    });

    const [showDialog, setShowDialog] = useState(false);

    const isValid = () =>
        form.shopNumber && form.billNumber && form.items &&
        form.cartons && form.weight && form.cbm && form.category;

    const handleSubmit = () => {
        // Submit to API here
        toast.success("Receiving Entry Created");
        setShowDialog(false);
        router.push("/dashboard/receiving-list");
    };

    const totalSummary = `Total Cartons: ${form.cartons || 0}, Weight: ${form.weight || 0}kg`;

    return (
        <div className="p-6">
            <Card className="max-w-3xl mx-auto shadow-md">
                <CardHeader>
                    <CardTitle>Create Receiving Entry</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">

                    {[
                        { label: "Shop Number", key: "shopNumber" },
                        { label: "Bill Number (Invoice ID)", key: "billNumber" },
                        { label: "Items", key: "items" },
                        { label: "Total Cartons", key: "cartons", type: "number" },
                        { label: "Weight (kg)", key: "weight", type: "number" },
                        { label: "CBM", key: "cbm", type: "number" },
                        { label: "Note", key: "note" },
                    ].map(({ label, key, type }) => (
                        <div key={key}>
                            <Label>{label}</Label>
                            <Input
                                type={type || "text"}
                                value={form[key as keyof typeof form]}
                                onChange={(e) =>
                                    setForm({ ...form, [key]: e.target.value })
                                }
                            />
                        </div>
                    ))}

                    <div>
                        <Label>Category</Label>
                        <Select
                            value={form.category}
                            onValueChange={(value) => setForm({ ...form, category: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="text-sm text-muted-foreground mt-2">
                        {totalSummary}
                    </div>

                    <Dialog open={showDialog} onOpenChange={setShowDialog}>
                        <DialogTrigger asChild>
                            <Button disabled={!isValid()} className="mt-4">Submit</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Confirm Submission</DialogTitle>
                            <p>Are you sure you want to submit this Receiving List entry?</p>
                            <DialogFooter className="mt-4">
                                <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
                                <Button onClick={handleSubmit}>Yes, Submit</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </CardContent>
            </Card>
        </div>
    );
}
