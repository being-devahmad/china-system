import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function LedgerTable() {
  const transactions = [
    {
      id: "FT-2025-0001",
      date: "2025-04-15",
      branch: "msj",
      invoiceNo: "247",
      description: "S-B-R-Invoice",
      mode: "sale DEBIT",
      shop: "Fashion Outlet",
      debit: 1250.0,
      credit: 0,
      balance: 1250.0,
      billNumber: "BILL-001",
      paid: true,
      userName: "Wasal Rasool",
      bank: "N/A",
    },
    {
      id: "FT-2025-0002",
      date: "2025-04-14",
      branch: "msj",
      invoiceNo: "243",
      description: "S-B-Invoice",
      mode: "sale DEBIT",
      shop: "Electronics Hub",
      debit: 2780.5,
      credit: 0,
      balance: 4030.5,
      billNumber: "BILL-002",
      paid: true,
      userName: "Wasal Rasool",
      bank: "N/A",
    },
    {
      id: "FT-2025-0003",
      date: "2025-04-13",
      branch: "msj",
      invoiceNo: "241",
      description: "S-B-Invoice",
      mode: "sale DEBIT",
      shop: "Home Decor",
      debit: 950.25,
      credit: 0,
      balance: 4980.75,
      billNumber: "BILL-003",
      paid: false,
      userName: "Wasal Rasool",
      bank: "N/A",
    },
    {
      id: "FT-2025-0004",
      date: "2025-04-12",
      branch: "msj",
      invoiceNo: "240",
      description: "S-B-Invoice",
      mode: "sale DEBIT",
      shop: "Sports Center",
      debit: 1845.75,
      credit: 0,
      balance: 6826.5,
      billNumber: "BILL-004",
      paid: true,
      userName: "Wasal Rasool",
      bank: "N/A",
    },
    {
      id: "FT-2025-0005",
      date: "2025-04-11",
      branch: "msj",
      invoiceNo: "239",
      description: "S-B-R-Invoice",
      mode: "sale return",
      shop: "Fashion Outlet",
      debit: 0,
      credit: 500.0,
      balance: 6326.5,
      billNumber: "BILL-005",
      paid: true,
      userName: "Wasal Rasool",
      bank: "N/A",
    },
  ]

  const totalDebit = transactions.reduce((sum, transaction) => sum + transaction.debit, 0)
  const totalCredit = transactions.reduce((sum, transaction) => sum + transaction.credit, 0)

  return (
    <div className="overflow-auto">
      <Table className="border-collapse w-full">
        <TableHeader className="bg-gray-100">
          <TableRow className="text-xs font-medium text-gray-700">
            <TableHead className="border px-2 py-2">Date</TableHead>
            <TableHead className="border px-2 py-2">Branch</TableHead>
            <TableHead className="border px-2 py-2">INV/VOUC. No</TableHead>
            <TableHead className="border px-2 py-2">Detail</TableHead>
            <TableHead className="border px-2 py-2">Mode</TableHead>
            <TableHead className="border px-2 py-2">Account Name</TableHead>
            <TableHead className="border px-2 py-2 text-right">Debit</TableHead>
            <TableHead className="border px-2 py-2 text-right">Credit</TableHead>
            <TableHead className="border px-2 py-2 text-right">Balance</TableHead>
            <TableHead className="border px-2 py-2">Bill</TableHead>
            <TableHead className="border px-2 py-2">Paid</TableHead>
            <TableHead className="border px-2 py-2">User Name</TableHead>
            <TableHead className="border px-2 py-2">Bank</TableHead>
            <TableHead className="border px-2 py-2">Ref ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="text-sm">
              <TableCell className="border px-2 py-2">{transaction.date}</TableCell>
              <TableCell className="border px-2 py-2">{transaction.branch}</TableCell>
              <TableCell className="border px-2 py-2">{transaction.invoiceNo}</TableCell>
              <TableCell className="border px-2 py-2">{transaction.description}</TableCell>
              <TableCell className="border px-2 py-2">{transaction.mode}</TableCell>
              <TableCell className="border px-2 py-2">{transaction.shop}</TableCell>
              <TableCell className="border px-2 py-2 text-right">
                {transaction.debit > 0 ? transaction.debit.toFixed(2) : "0"}
              </TableCell>
              <TableCell className="border px-2 py-2 text-right">
                {transaction.credit > 0 ? transaction.credit.toFixed(2) : "0"}
              </TableCell>
              <TableCell className="border px-2 py-2 text-right font-medium">
                {transaction.balance.toFixed(2)}
              </TableCell>
              <TableCell className="border px-2 py-2">{transaction.billNumber}</TableCell>
              <TableCell className="border px-2 py-2">{transaction.paid ? "Yes" : "No"}</TableCell>
              <TableCell className="border px-2 py-2">{transaction.userName}</TableCell>
              <TableCell className="border px-2 py-2">{transaction.bank}</TableCell>
              <TableCell className="border px-2 py-2">
                <Button
                  size="sm"
                  variant="default"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-0 px-3 text-xs h-6 rounded"
                >
                  Slip
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
