"use client"

import { Building2, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useShopAccountStore } from "@/store/account.store"

export function BankingInfoStep() {
    const { bankAccounts, errors, addBankAccount, removeBankAccount, updateBankAccount } = useShopAccountStore()

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-medium text-gray-900">Bank Account Information</h2>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addBankAccount} className="text-sm">
                    <Plus className="h-4 w-4 mr-2" /> Add Account
                </Button>
            </div>
            <Separator className="mb-6" />

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">Add one or more bank accounts associated with this shop</p>

                {bankAccounts.map((account, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <Label htmlFor={`bank-account-${index}`} className="text-sm font-medium text-gray-700">
                                Bank Account {index + 1} {index === 0 && <span className="text-red-500">*</span>}
                            </Label>
                            {bankAccounts.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeBankAccount(index)}
                                    className="h-8 w-8 p-0"
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            )}
                        </div>
                        <div className="mt-1">
                            <Input
                                id={`bank-account-${index}`}
                                placeholder="Enter bank account number"
                                value={account}
                                onChange={(e) => updateBankAccount(index, e.target.value)}
                                className="bg-white"
                            />
                        </div>
                    </div>
                ))}
                {errors.bankAccounts && <p className="text-sm text-red-500">{errors.bankAccounts}</p>}
            </div>
        </div>
    )
}
