"use client";

import { useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { PlusIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
    { label: "Footwear", hsCode: "6401" },
    { label: "Apparel", hsCode: "6101" },
];

export default function CreatePurchaseOrderPage() {
    const [containerNumber, setContainerNumber] = useState("");
    const [items, setItems] = useState([
        {
            itemName: "",
            category: "",
            weight: "",
            cbm: "",
            picture: "",
            cartons: "",
            quantity: "",
            price: "",
            rateCode: "",
        },
    ]);

    const year = new Date().getFullYear().toString().slice(-2);

    const handleAddItem = () => {
        setItems([
            ...items,
            {
                itemName: "",
                category: "",
                weight: "",
                cbm: "",
                picture: "",
                cartons: "",
                quantity: "",
                price: "",
                rateCode: "",
            },
        ]);
    };

    const handleRemoveItem = (index: number) => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
    };

    const handleItemChange = (index: number, key: string, value: string) => {
        const updated = [...items];
        updated[index][key] = value;
        setItems(updated);
    };

    const totalWeight = items.reduce(
        (sum, item) => sum + (parseFloat(item.weight) || 0),
        0
    );
    const totalCBM = items.reduce(
        (sum, item) => sum + (parseFloat(item.cbm) || 0),
        0
    );

    const handleSubmit = () => {
        toast.success("Purchase Order Created Successfully");
        // Submit to API here
    };

    return (
        <div className="p-6">
            <Card className="max-w-5xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Purchase Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label>Container Number</Label>
                        <Input
                            value={containerNumber}
                            onChange={(e) => setContainerNumber(e.target.value)}
                        />
                    </div>

                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="border p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4 relative"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={() => handleRemoveItem(idx)}
                            >
                                <TrashIcon className="w-4 h-4 text-destructive" />
                            </Button>

                            <div>
                                <Label>Item Name</Label>
                                <Input
                                    value={item.itemName}
                                    onChange={(e) => handleItemChange(idx, "itemName", e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Category</Label>
                                <Select
                                    value={item.category}
                                    onValueChange={(val) => handleItemChange(idx, "category", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.hsCode} value={cat.label}>
                                                {cat.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Rate Code</Label>
                                <Input
                                    value={item.rateCode}
                                    onChange={(e) => handleItemChange(idx, "rateCode", e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Cartons</Label>
                                <Input
                                    type="number"
                                    value={item.cartons}
                                    onChange={(e) => handleItemChange(idx, "cartons", e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>C/Qty (e.g. 120*5)</Label>
                                <Input
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Weight (kg)</Label>
                                <Input
                                    type="number"
                                    value={item.weight}
                                    onChange={(e) => handleItemChange(idx, "weight", e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>CBM</Label>
                                <Input
                                    type="number"
                                    value={item.cbm}
                                    onChange={(e) => handleItemChange(idx, "cbm", e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Price</Label>
                                <Input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(idx, "price", e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Item Picture</Label>
                                <Input
                                    type="file"
                                    onChange={(e) =>
                                        handleItemChange(idx, "picture", e.target.files?.[0]?.name || "")
                                    }
                                />
                            </div>
                        </div>
                    ))}

                    <Button onClick={handleAddItem} variant="outline">
                        <PlusIcon className="mr-2 w-4 h-4" /> Add Item
                    </Button>

                    <div className="text-sm text-muted-foreground">
                        Total Weight: {totalWeight} kg | Total CBM: {totalCBM}
                    </div>

                    <Button onClick={handleSubmit} className="mt-4">
                        Submit Purchase Order
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
