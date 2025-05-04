import { User } from "lucide-react"

export function AccountInfo({ shopName = "Jheela Food Corner" }) {
  return (
    <div className="flex items-start gap-6">
      <div className="flex-shrink-0 bg-gray-100 rounded-full p-6">
        <User className="h-12 w-12 text-gray-500" />
      </div>
      <div className="space-y-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium">Account Type:</span>
            <span>Customers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Credit Limit:</span>
            <span>780,000</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Mobile No.:</span>
            <span>06546874</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Care Of:</span>
            <span>-</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Total Balance:</span>
            <span>4,647</span>
          </div>
        </div>
      </div>
    </div>
  )
}
