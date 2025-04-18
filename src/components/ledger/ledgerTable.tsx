import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function LedgerTable() {
  const transactions = [
    {
      id: "FT-2025-0001",
      date: "2025-04-15",
      shop: "Fashion Outlet",
      description: "Payment for Invoice #INV-001",
      paymentMethod: "Cash",
      billNumber: "BILL-001",
      containerNumber: "CNT-001",
      debit: "$1,250.00",
      credit: "-",
      balance: "$1,250.00",
    },
    {
      id: "FT-2025-0002",
      date: "2025-04-14",
      shop: "Electronics Hub",
      description: "Payment for Invoice #INV-002",
      paymentMethod: "Bank",
      billNumber: "BILL-002",
      containerNumber: "CNT-002",
      debit: "$2,780.50",
      credit: "-",
      balance: "$4,030.50",
    },
    {
      id: "FT-2025-0003",
      date: "2025-04-13",
      shop: "Home Decor",
      description: "Payment for Invoice #INV-003",
      paymentMethod: "WeChat",
      billNumber: "BILL-003",
      containerNumber: "CNT-001",
      debit: "$950.25",
      credit: "-",
      balance: "$4,980.75",
    },
    {
      id: "FT-2025-0004",
      date: "2025-04-12",
      shop: "Sports Center",
      description: "Payment for Invoice #INV-004",
      paymentMethod: "Alipay",
      billNumber: "BILL-004",
      containerNumber: "CNT-003",
      debit: "$1,845.75",
      credit: "-",
      balance: "$6,826.50",
    },
    {
      id: "FT-2025-0005",
      date: "2025-04-11",
      shop: "Fashion Outlet",
      description: "Payment for Invoice #INV-005",
      paymentMethod: "Cash",
      billNumber: "BILL-005",
      containerNumber: "CNT-002",
      debit: "-",
      credit: "$500.00",
      balance: "$6,326.50",
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
          <TableHead>Date</TableHead>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Shop</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Bill #</TableHead>
          <TableHead>Container #</TableHead>
          <TableHead className="text-right">Debit</TableHead>
          <TableHead className="text-right">Credit</TableHead>
          <TableHead className="text-right">Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell className="font-medium">{transaction.id}</TableCell>
            <TableCell>{transaction.shop}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{getPaymentMethodBadge(transaction.paymentMethod)}</TableCell>
            <TableCell>{transaction.billNumber}</TableCell>
            <TableCell>{transaction.containerNumber}</TableCell>
            <TableCell className="text-right">{transaction.debit}</TableCell>
            <TableCell className="text-right">{transaction.credit}</TableCell>
            <TableCell className="text-right font-medium">{transaction.balance}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
