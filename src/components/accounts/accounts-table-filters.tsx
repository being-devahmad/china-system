"use client"

import { useState } from "react"
import { Check, Filter, Plus, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const accountTypes = [
    { label: "Expense Account", value: "expense" },
    { label: "Company Account", value: "company" },
    { label: "Supplier", value: "supplier" },
    { label: "Shopkeeper", value: "shopkeeper" },
]

const statuses = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Pending", value: "pending" },
]

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

export function AccountsTableFilters() {
    const [selectedAccountTypes, setSelectedAccountTypes] = useState<string[]>([])
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
    const [selectedCities, setSelectedCities] = useState<string[]>([])

    // Helper function to toggle selection
    const toggleSelection = (value: string, currentSelection: string[], setSelection: (value: string[]) => void) => {
        setSelection(
            currentSelection.includes(value)
                ? currentSelection.filter((item) => item !== value)
                : [...currentSelection, value],
        )
    }

    const router = useRouter()

    // Count active filters
    const activeFiltersCount = selectedAccountTypes.length + selectedStatuses.length + selectedCities.length

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input placeholder="Search accounts..." className="w-full bg-white pl-8" />
                </div>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 border-dashed">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                            {activeFiltersCount > 0 && (
                                <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal lg:hidden">
                                    {activeFiltersCount}
                                </Badge>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[220px] p-0" align="start">
                        <Command>
                            <CommandInput placeholder="Filter by..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Account Type">
                                    {accountTypes.map((type) => (
                                        <CommandItem
                                            key={type.value}
                                            onSelect={() => toggleSelection(type.value, selectedAccountTypes, setSelectedAccountTypes)}
                                        >
                                            <div
                                                className={cn(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    selectedAccountTypes.includes(type.value)
                                                        ? "bg-primary text-primary-foreground"
                                                        : "opacity-50 [&_svg]:invisible",
                                                )}
                                            >
                                                <Check className="h-4 w-4" />
                                            </div>
                                            <span>{type.label}</span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup heading="Status">
                                    {statuses.map((status) => (
                                        <CommandItem
                                            key={status.value}
                                            onSelect={() => toggleSelection(status.value, selectedStatuses, setSelectedStatuses)}
                                        >
                                            <div
                                                className={cn(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    selectedStatuses.includes(status.value)
                                                        ? "bg-primary text-primary-foreground"
                                                        : "opacity-50 [&_svg]:invisible",
                                                )}
                                            >
                                                <Check className="h-4 w-4" />
                                            </div>
                                            <span>{status.label}</span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup heading="City">
                                    {cities.map((city) => (
                                        <CommandItem
                                            key={city.value}
                                            onSelect={() => toggleSelection(city.value, selectedCities, setSelectedCities)}
                                        >
                                            <div
                                                className={cn(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    selectedCities.includes(city.value)
                                                        ? "bg-primary text-primary-foreground"
                                                        : "opacity-50 [&_svg]:invisible",
                                                )}
                                            >
                                                <Check className="h-4 w-4" />
                                            </div>
                                            <span>{city.label}</span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                            {activeFiltersCount > 0 && (
                                <>
                                    <CommandSeparator />
                                    <div className="p-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-center text-xs"
                                            onClick={() => {
                                                setSelectedAccountTypes([])
                                                setSelectedStatuses([])
                                                setSelectedCities([])
                                            }}
                                        >
                                            Clear Filters
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex items-center space-x-2">
                {/* Active filters display */}
                <div className="hidden items-center space-x-2 lg:flex">
                    {selectedAccountTypes.length > 0 && (
                        <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                            {selectedAccountTypes.length} type{selectedAccountTypes.length > 1 ? "s" : ""}
                        </Badge>
                    )}
                    {selectedStatuses.length > 0 && (
                        <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                            {selectedStatuses.length} status{selectedStatuses.length > 1 ? "es" : ""}
                        </Badge>
                    )}
                    {selectedCities.length > 0 && (
                        <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                            {selectedCities.length} {selectedCities.length > 1 ? "cities" : "city"}
                        </Badge>
                    )}
                    {activeFiltersCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            onClick={() => {
                                setSelectedAccountTypes([])
                                setSelectedStatuses([])
                                setSelectedCities([])
                            }}
                        >
                            Clear all
                        </Button>
                    )}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            View
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked={true}>Shop No</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={true}>Account Type</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={true}>Primary Contact</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={true}>City</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={true}>Status</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={true}>Created Date</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Separator orientation="vertical" className="hidden h-8 sm:block" />

                <Button size="sm" className="h-9"
                    onClick={() => router.push('/dashboard/accounts/create')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Account
                </Button>
            </div>
        </div>
    )
}
