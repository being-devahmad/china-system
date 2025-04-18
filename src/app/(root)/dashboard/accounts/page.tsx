import { AccountsTable } from "@/components/accounts/accounts-table";
import { AccountsTableFilters } from "@/components/accounts/accounts-table-filters";


export default function AccountsPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Accounts Management</h1>
                <p className="text-gray-500">View and manage all shop and account records in the system.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <AccountsTableFilters />
                </div>
                <AccountsTable />
            </div>
        </div>
    )
}
