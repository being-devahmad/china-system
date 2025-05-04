"use client"

import { Check, ChevronsUpDown, User } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useShopAccountStore } from "@/store/account.store"

const cities = [
    { label: "New York", value: "new-york" },
    { label: "Los Angeles", value: "los-angeles" },
    { label: "Chicago", value: "chicago" },
    { label: "Houston", value: "houston" },
    { label: "Phoenix", value: "phoenix" },
    { label: "Philadelphia", value: "philadelphia" },
    { label: "San Antonio", value: "san-antonio" },
    { label: "San Diego", value: "san-diego" },
    { label: "Dallas", value: "dallas" },
    { label: "San Jose", value: "san-jose" },
]

export function ContactInfoStep() {
    const [cityOpen, setCityOpen] = useState(false)
    const { mobileBoss, mobileMiss, mobileManager, mobileFactory, email, city, shopAddress, errors, setField } =
        useShopAccountStore()

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <User className="h-4 w-4 text-blue-600" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
            </div>
            <Separator className="mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="mobileBoss" className="text-sm font-medium text-gray-700">
                            Boss Mobile Number
                        </Label>
                        <div className="relative">
                            <Input
                                id="mobileBoss"
                                placeholder="Enter boss mobile number"
                                className="bg-white pl-10"
                                value={mobileBoss}
                                onChange={(e) => setField("mobileBoss", e.target.value)}
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <User className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mobileMiss" className="text-sm font-medium text-gray-700">
                            Miss Mobile Number <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="mobileMiss"
                                placeholder="Enter miss mobile number"
                                className="bg-white pl-10"
                                value={mobileMiss}
                                onChange={(e) => setField("mobileMiss", e.target.value)}
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <User className="h-4 w-4" />
                            </div>
                        </div>
                        {errors.mobileMiss && <p className="text-sm text-red-500">{errors.mobileMiss}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter email address"
                            className="bg-white"
                            value={email}
                            onChange={(e) => setField("email", e.target.value)}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="mobileManager" className="text-sm font-medium text-gray-700">
                            Manager Mobile Number
                        </Label>
                        <div className="relative">
                            <Input
                                id="mobileManager"
                                placeholder="Enter manager mobile number"
                                className="bg-white pl-10"
                                value={mobileManager}
                                onChange={(e) => setField("mobileManager", e.target.value)}
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <User className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mobileFactory" className="text-sm font-medium text-gray-700">
                            Factory Mobile Number
                        </Label>
                        <div className="relative">
                            <Input
                                id="mobileFactory"
                                placeholder="Enter factory mobile number"
                                className="bg-white pl-10"
                                value={mobileFactory}
                                onChange={(e) => setField("mobileFactory", e.target.value)}
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <User className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                            City <span className="text-red-500">*</span>
                        </Label>
                        <Popover open={cityOpen} onOpenChange={setCityOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn("w-full justify-between bg-white", !city && "text-muted-foreground")}
                                >
                                    {city ? cities.find((c) => c.value === city)?.label || "Select city" : "Select city"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Search city..." />
                                    <CommandList>
                                        <CommandEmpty>No city found.</CommandEmpty>
                                        <CommandGroup>
                                            {cities.map((c) => (
                                                <CommandItem
                                                    key={c.value}
                                                    value={c.label}
                                                    onSelect={() => {
                                                        setField("city", c.value)
                                                        setCityOpen(false)
                                                    }}
                                                >
                                                    <Check className={cn("mr-2 h-4 w-4", c.value === city ? "opacity-100" : "opacity-0")} />
                                                    {c.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="shopAddress" className="text-sm font-medium text-gray-700">
                    Shop Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                    id="shopAddress"
                    placeholder="Enter complete shop address"
                    className="resize-none bg-white min-h-[100px]"
                    value={shopAddress}
                    onChange={(e) => setField("shopAddress", e.target.value)}
                />
                {errors.shopAddress && <p className="text-sm text-red-500">{errors.shopAddress}</p>}
            </div>
        </div>
    )
}
