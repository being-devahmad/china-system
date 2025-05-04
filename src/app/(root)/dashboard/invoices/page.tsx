"use client";

import { useState } from "react";
// import {
//     Card, CardContent, CardHeader, CardTitle,
//     Button, Checkbox, Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
//     Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription,
//     DialogFooter, Input, Label
// } from "@/components/ui";
import { X, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const purchaseOrders = [
    { id: 1, name: "PO-001", completed: 630, total: 1000 },
    { id: 2, name: "PO-002", completed: 200, total: 500 },
];

export default function CreateInvoicePage() {
    const [selected, setSelected] = useState<number[]>([]);
    const [struck, setStruck] = useState<number[]>([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editPO, setEditPO] = useState<any>(null);
    const [cartons, setCartons] = useState<any[]>([]);
    const [statusComplete, setStatusComplete] = useState(false);
    const [cancelled, setCancelled] = useState(false);


    const handleEdit = (po: any) => {
        setEditPO(po);
        setShowEditModal(true);
        setCartons(Array(5).fill({ qty: 120, unit: 20 }));
    };

    const handleSubmit = () => {
        toast.success("Invoice submitted successfully!");
        // API call logic here
    };

    const handleQtyChange = (val: number) => {
        if (val > editPO.completed) {
            const confirmed = confirm(`Entered ${val} exceeds completed quantity (${editPO.completed}). Proceed?`);
            if (!confirmed) return;
        }
    };
    return (
        <>
            <div className="p-6">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Create Invoice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Select</TableHead>
                                    <TableHead>PO Name</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Remove</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {purchaseOrders.map((po) => (
                                    <TableRow
                                        key={po.id}
                                        className={struck.includes(po.id) ? "line-through opacity-60" : ""}
                                    >
                                        <TableCell>
                                            <Checkbox
                                                checked={selected.includes(po.id)}
                                                onCheckedChange={() =>
                                                    setSelected((prev) =>
                                                        prev.includes(po.id)
                                                            ? prev.filter((id) => id !== po.id)
                                                            : [...prev, po.id]
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>{po.name}</TableCell>
                                        <TableCell>{po.completed} / {po.total}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm" onClick={() => handleEdit(po)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setStruck((prev) => [...prev, po.id])}
                                            >
                                                <X className="w-4 h-4 text-red-500" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="flex items-center gap-6 mt-6">
                            <Checkbox checked={statusComplete} onCheckedChange={() => setStatusComplete(!statusComplete)} />
                            <Label>Mark as Completed</Label>

                            <Checkbox checked={cancelled} onCheckedChange={() => setCancelled(!cancelled)} />
                            <Label>Cancelled</Label>
                        </div>

                        <div className="mt-6">
                            <Button onClick={handleSubmit}>Submit Invoice</Button>
                        </div>
                    </CardContent>
                </Card>
                <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                    <DialogContent className="max-w-2xl">
                        <DialogTitle>Edit Carton Details</DialogTitle>
                        <DialogDescription>Adjust carton-wise quantity/unit details.</DialogDescription>

                        {cartons.map((carton, index) => (
                            <div key={index} className="flex gap-4 mt-4 items-center">
                                <Label>Carton {index + 1}</Label>
                                <Input
                                    type="number"
                                    value={carton.qty}
                                    onChange={(e) => {
                                        const newCartons = [...cartons];
                                        newCartons[index].qty = Number(e.target.value);
                                        setCartons(newCartons);
                                        handleQtyChange(Number(e.target.value));
                                    }}
                                    className="w-24"
                                />
                                <Input
                                    type="number"
                                    value={carton.unit}
                                    onChange={(e) => {
                                        const newCartons = [...cartons];
                                        newCartons[index].unit = Number(e.target.value);
                                        setCartons(newCartons);
                                    }}
                                    className="w-24"
                                />
                            </div>
                        ))}

                        <DialogFooter className="mt-6">
                            <Button onClick={() => setShowEditModal(false)}>Update</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

        </>
    )

}