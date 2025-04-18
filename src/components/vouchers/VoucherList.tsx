import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Eye, Download, Printer } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function VoucherList() {
  const vouchers = [
    {
      id: "FT-2025-0001",
      shop: "Fashion Outlet",
      date: "2025-04-15",
      amount: "$1,250.00",
      paymentMethod: "Cash",
      billNumber: "BILL-001",
      containerNumber: "CNT-001",
    },
    {
      id: "FT-2025-0002",
      shop: "Electronics Hub",
      date: "2025-04-14",
      amount: "$2,780.50",
      paymentMethod: "Bank",
      billNumber: "BILL-002",
      containerNumber: "CNT-002",
    },
    {
      id: "FT-2025-0003",
      shop: "Home Decor",
      date: "2025-04-13",
      amount: "$950.25",
      paymentMethod: "WeChat",
      billNumber: "BILL-003",
      containerNumber: "CNT-001",
    },
    {
      id: "FT-2025-0004",
      shop: "Sports Center",
      date: "2025-04-12",
      amount: "$1,845.75",
      paymentMethod: "Alipay",
      billNumber: "BILL-004",
      containerNumber: "CNT-003",
    },
    {
      id: "FT-2025-0005",
      shop: "Fashion Outlet",
      date: "2025-04-11",
      amount: "$2,150.00",
      paymentMethod: "Cash",
      billNumber: "BILL-005",
      containerNumber: "CNT-002",
    },
  ]

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case "Cash":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Cash
          </Badge>
        )
      case "Bank":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Bank
          </Badge>
        )
      case "WeChat":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            WeChat
          </Badge>
        )
      case "Alipay":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Alipay
          </Badge>
        )
      default:
        return <Badge variant="outline">{method}</Badge>
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Voucher ID</TableHead>
          <TableHead>Shop</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Bill #</TableHead>
          <TableHead>Container #</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vouchers.map((voucher) => (
          <TableRow key={voucher.id}>
            <TableCell className="font-medium">{voucher.id}</TableCell>
            <TableCell>{voucher.shop}</TableCell>
            <TableCell>{voucher.date}</TableCell>
            <TableCell>{getPaymentMethodBadge(voucher.paymentMethod)}</TableCell>
            <TableCell>{voucher.billNumber}</TableCell>
            <TableCell>{voucher.containerNumber}</TableCell>
            <TableCell className="text-right">{voucher.amount}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
