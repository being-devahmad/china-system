import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { CalendarIcon, ArrowLeft } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ImageUpload } from "@/components/ImageUpload"

export default function NewVoucherPage() {
    return (
        <>
            <div className="flex justify-between ">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Voucher</h1>
                    <p className="text-gray-500">Create a new voucher for your shop.</p>
                </div>
                <Link href="/dashboard/vouchers">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Vouchers
                    </Button>
                </Link>
            </div>
            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Voucher Details</CardTitle>
                        <CardDescription>Enter the details for the new voucher.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="shop">Shop</Label>
                                <Select>
                                    <SelectTrigger id="shop">
                                        <SelectValue placeholder="Select shop" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="shop1">Shop 1</SelectItem>
                                        <SelectItem value="shop2">Shop 2</SelectItem>
                                        <SelectItem value="shop3">Shop 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bill-number">Bill Number</Label>
                                <Input id="bill-number" placeholder="Enter bill number" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="container-number">Container Number</Label>
                                <Input id="container-number" placeholder="Enter container number" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input id="amount" type="number" placeholder="0.00" />
                            </div>
                        </div>

                        <Tabs defaultValue="cash" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="cash">Cash</TabsTrigger>
                                <TabsTrigger value="bank">Bank</TabsTrigger>
                                <TabsTrigger value="wechat">WeChat</TabsTrigger>
                                <TabsTrigger value="alipay">Alipay</TabsTrigger>
                            </TabsList>
                            <TabsContent value="cash" className="space-y-4">
                                <div className="space-y-2 pt-4">
                                    <Label>Transaction Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                <span>Pick a date</span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label>Upload Images</Label>
                                    <ImageUpload />
                                </div>
                            </TabsContent>
                            <TabsContent value="bank" className="space-y-4">
                                <div className="space-y-2 pt-4">
                                    <Label>Transaction Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                <span>Pick a date</span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bank-name">Bank Name</Label>
                                    <Input id="bank-name" placeholder="Enter bank name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="account-number">Account Number</Label>
                                    <Input id="account-number" placeholder="Enter account number" />
                                </div>
                            </TabsContent>
                            <TabsContent value="wechat" className="space-y-4">
                                <div className="space-y-2 pt-4">
                                    <Label>Transaction Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                <span>Pick a date</span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="wechat-id">WeChat ID</Label>
                                    <Input id="wechat-id" placeholder="Enter WeChat ID" />
                                </div>
                            </TabsContent>
                            <TabsContent value="alipay" className="space-y-4">
                                <div className="space-y-2 pt-4">
                                    <Label>Transaction Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                <span>Pick a date</span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="alipay-id">Alipay ID</Label>
                                    <Input id="alipay-id" placeholder="Enter Alipay ID" />
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="space-y-2">
                            <Label htmlFor="note">Note</Label>
                            <Textarea id="note" placeholder="Add any additional notes here" />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="discount">Discount</Label>
                                <Input id="discount" type="number" placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="damage">Difference/Damage</Label>
                                <Input id="damage" type="number" placeholder="0.00" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Create Voucher</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
