import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/dateRangePicker"
import { LedgerTable } from "@/components/ledger/ledgerTable"
import { RefreshCw } from "lucide-react"
import { AccountInfo } from "@/components/ledger/AccountsInfo"
import { PromiseButtons } from "@/components/ledger/PromiseButtons"

export default function LedgerPage() {
  // Calculate totals
  const ledgerBalance = 4647.0
  const chequeBalance = 27710.0
  const totalDebit = 494825.0
  const totalCredit = 490178.0

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900">LEDGER REPORT</h1>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
            <div className="flex-1">
              <DateRangePicker />
            </div>
            <div className="flex-1">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Jheela Food Corner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shops</SelectItem>
                  <SelectItem value="jheela">Jheela Food Corner</SelectItem>
                  <SelectItem value="shop1">Fashion Outlet</SelectItem>
                  <SelectItem value="shop2">Electronics Hub</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">GET LEDGER REPORT</Button>
        </div>

        <div className="md:col-span-1">
          <AccountInfo />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">LEDGER BALANCE</h3>
              <p className="text-2xl font-bold">
                {ledgerBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">CHEQUE BALANCE</h3>
              <p className="text-2xl font-bold">
                {chequeBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">TOTAL DEBIT</h3>
              <p className="text-2xl font-bold">{totalDebit.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">TOTAL CREDIT</h3>
              <p className="text-2xl font-bold">{totalCredit.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <PromiseButtons />

      <div className="bg-white rounded-md border shadow-sm overflow-x-auto">
        <LedgerTable />
      </div>
    </div>
  )
}
