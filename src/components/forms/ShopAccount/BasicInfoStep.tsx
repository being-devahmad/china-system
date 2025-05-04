"use client"

import type React from "react"

import { Building2, Upload } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useShopAccountStore } from "@/store/account.store"

export function BasicInfoStep() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { shopPicture, shopNo, accountType, imagePreview, errors, setField } = useShopAccountStore()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setField("imagePreview", result)
                setField("shopPicture", result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Building2 className="h-4 w-4 text-blue-600" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
            </div>
            <Separator className="mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-1">
                    <div>
                        <Label className="text-sm font-medium text-gray-700">Shop Picture</Label>
                        <div className="flex flex-col items-center mt-1">
                            <div
                                className={cn(
                                    "w-48 h-48 rounded-lg flex items-center justify-center overflow-hidden mb-3",
                                    imagePreview ? "border border-gray-200" : "border-2 border-dashed border-gray-300 bg-gray-50",
                                )}
                            >
                                {imagePreview ? (
                                    <Image
                                        src={imagePreview || "/placeholder.svg"}
                                        alt="Shop preview"
                                        className="w-full h-full object-cover"
                                        width={192}
                                        height={192}
                                    />
                                ) : (
                                    <div className="text-center p-4">
                                        <div className="h-12 w-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                            <Upload className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <p className="text-sm text-gray-500">Upload shop image</p>
                                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                    </div>
                                )}
                            </div>
                            <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="shop-picture"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="text-sm"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {imagePreview ? "Change Image" : "Select Image"}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="shopNo" className="text-sm font-medium text-gray-700">
                            Shop Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="shopNo"
                            placeholder="Enter shop number"
                            className="bg-white"
                            value={shopNo}
                            onChange={(e) => setField("shopNo", e.target.value)}
                        />
                        {errors.shopNo && <p className="text-sm text-red-500">{errors.shopNo}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                            Account Type <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                            value={accountType}
                            onValueChange={(value) => setField("accountType", value as any)}
                            className="grid grid-cols-2 gap-3"
                        >
                            <div
                                className={cn(
                                    "flex items-center space-x-2 rounded-lg border border-gray-200 p-3 cursor-pointer transition-all",
                                    accountType === "expense" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                                )}
                                onClick={() => setField("accountType", "expense")}
                            >
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="expense" id="expense" />
                                    <Label htmlFor="expense" className="font-normal cursor-pointer">
                                        Expense Account
                                    </Label>
                                </div>
                            </div>

                            <div
                                className={cn(
                                    "flex items-center space-x-2 rounded-lg border border-gray-200 p-3 cursor-pointer transition-all",
                                    accountType === "company" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                                )}
                                onClick={() => setField("accountType", "company")}
                            >
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="company" id="company" />
                                    <Label htmlFor="company" className="font-normal cursor-pointer">
                                        Company Account
                                    </Label>
                                </div>
                            </div>

                            <div
                                className={cn(
                                    "flex items-center space-x-2 rounded-lg border border-gray-200 p-3 cursor-pointer transition-all",
                                    accountType === "supplier" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                                )}
                                onClick={() => setField("accountType", "supplier")}
                            >
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="supplier" id="supplier" />
                                    <Label htmlFor="supplier" className="font-normal cursor-pointer">
                                        Supplier
                                    </Label>
                                </div>
                            </div>

                            <div
                                className={cn(
                                    "flex items-center space-x-2 rounded-lg border border-gray-200 p-3 cursor-pointer transition-all",
                                    accountType === "shopkeeper" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                                )}
                                onClick={() => setField("accountType", "shopkeeper")}
                            >
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="shopkeeper" id="shopkeeper" />
                                    <Label htmlFor="shopkeeper" className="font-normal cursor-pointer">
                                        Shopkeeper
                                    </Label>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}
