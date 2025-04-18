/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define the Account type based on our form
export type Account = {
  id: string
  shopPicture: string
  shopNo: string
  mobileBoss: string
  mobileMiss: string
  mobileManager: string
  mobileFactory: string
  accountType: "expense" | "company" | "supplier" | "shopkeeper"
  shopAddress: string
  city: string
  email: string
  bankAccounts: string[]
  status: "active" | "inactive" | "pending"
  createdAt: Date
}

// Sample data
const data: Account[] = [
  {
    id: "1",
    shopPicture: "/placeholder.svg?height=40&width=40",
    shopNo: "SH001",
    mobileBoss: "+1 (555) 123-4567",
    mobileMiss: "+1 (555) 234-5678",
    mobileManager: "+1 (555) 345-6789",
    mobileFactory: "+1 (555) 456-7890",
    accountType: "shopkeeper",
    shopAddress: "123 Main Street, Suite 101",
    city: "new-york",
    email: "shop1@example.com",
    bankAccounts: ["1234567890", "0987654321"],
    status: "active",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    shopPicture: "/placeholder.svg?height=40&width=40",
    shopNo: "SH002",
    mobileBoss: "+1 (555) 567-8901",
    mobileMiss: "+1 (555) 678-9012",
    mobileManager: "",
    mobileFactory: "+1 (555) 789-0123",
    accountType: "supplier",
    shopAddress: "456 Oak Avenue, Building B",
    city: "los-angeles",
    email: "supplier@example.com",
    bankAccounts: ["2345678901"],
    status: "active",
    createdAt: new Date("2023-02-20"),
  },
  {
    id: "3",
    shopPicture: "/placeholder.svg?height=40&width=40",
    shopNo: "SH003",
    mobileBoss: "+1 (555) 890-1234",
    mobileMiss: "+1 (555) 901-2345",
    mobileManager: "+1 (555) 012-3456",
    mobileFactory: "",
    accountType: "company",
    shopAddress: "789 Pine Road, Floor 3",
    city: "chicago",
    email: "company@example.com",
    bankAccounts: ["3456789012", "4567890123"],
    status: "inactive",
    createdAt: new Date("2023-03-10"),
  },
  {
    id: "4",
    shopPicture: "/placeholder.svg?height=40&width=40",
    shopNo: "SH004",
    mobileBoss: "",
    mobileMiss: "+1 (555) 123-4567",
    mobileManager: "+1 (555) 234-5678",
    mobileFactory: "+1 (555) 345-6789",
    accountType: "expense",
    shopAddress: "101 Cedar Lane, Unit 5",
    city: "houston",
    email: "expense@example.com",
    bankAccounts: ["5678901234"],
    status: "pending",
    createdAt: new Date("2023-04-05"),
  },
  {
    id: "5",
    shopPicture: "/placeholder.svg?height=40&width=40",
    shopNo: "SH005",
    mobileBoss: "+1 (555) 456-7890",
    mobileMiss: "+1 (555) 567-8901",
    mobileManager: "",
    mobileFactory: "+1 (555) 678-9012",
    accountType: "shopkeeper",
    shopAddress: "202 Maple Street, Suite 303",
    city: "phoenix",
    email: "shop2@example.com",
    bankAccounts: ["6789012345", "7890123456"],
    status: "active",
    createdAt: new Date("2023-05-12"),
  },
]

// Helper function to get city name from value
const getCityName = (cityValue: string): string => {
  const cityMap: Record<string, string> = {
    "new-york": "New York",
    "los-angeles": "Los Angeles",
    chicago: "Chicago",
    houston: "Houston",
    phoenix: "Phoenix",
    philadelphia: "Philadelphia",
    "san-antonio": "San Antonio",
    "san-diego": "San Diego",
    dallas: "Dallas",
    "san-jose": "San Jose",
  }
  return cityMap[cityValue] || cityValue
}

// Helper function to get account type label
const getAccountTypeLabel = (type: Account["accountType"]): string => {
  const typeMap: Record<Account["accountType"], string> = {
    expense: "Expense Account",
    company: "Company Account",
    supplier: "Supplier",
    shopkeeper: "Shopkeeper",
  }
  return typeMap[type]
}

// Define columns
export const columns: ColumnDef<Account>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "shopNo",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Shop No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={row.original.shopPicture || "/placeholder.svg"} alt={row.original.shopNo} />
            <AvatarFallback>{row.original.shopNo.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.getValue("shopNo")}</div>
            <div className="text-xs text-gray-500">{row.original.email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "accountType",
    header: "Account Type",
    cell: ({ row }) => {
      const accountType = row.getValue("accountType") as Account["accountType"]

      // Define badge variants based on account type
      const badgeVariants: Record<Account["accountType"], string> = {
        expense: "destructive",
        company: "default",
        supplier: "secondary",
        shopkeeper: "outline",
      }

      return <Badge variant={badgeVariants[accountType] as any}>{getAccountTypeLabel(accountType)}</Badge>
    },
  },
  {
    accessorKey: "mobileMiss",
    header: "Primary Contact",
    cell: ({ row }) => <div>{row.getValue("mobileMiss")}</div>,
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => <div>{getCityName(row.getValue("city"))}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Account["status"]

      // Define badge variants based on status
      const statusVariants: Record<Account["status"], { variant: string; label: string }> = {
        active: { variant: "success", label: "Active" },
        inactive: { variant: "destructive", label: "Inactive" },
        pending: { variant: "warning", label: "Pending" },
      }

      return <Badge variant={statusVariants[status].variant as any}>{statusVariants[status].label}</Badge>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const account = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function AccountsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div>
      <div className="rounded-md border-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4 px-6 border-t border-gray-200">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
