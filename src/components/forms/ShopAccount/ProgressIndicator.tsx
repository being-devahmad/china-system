"use client"

import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { useShopAccountStore } from "@/store/account.store"

export function ProgressIndicator() {
    const { currentStep } = useShopAccountStore()
    const totalSteps = 3

    return (
        <div className="mb-8">
            <div className="flex justify-between">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2",
                                currentStep > index + 1
                                    ? "bg-green-50 border-green-500 text-green-700"
                                    : currentStep === index + 1
                                        ? "bg-blue-50 border-blue-500 text-blue-700"
                                        : "bg-gray-50 border-gray-200 text-gray-400",
                            )}
                        >
                            {currentStep > index + 1 ? <Check className="h-5 w-5" /> : index + 1}
                        </div>
                        <span
                            className={cn("text-xs mt-2", currentStep === index + 1 ? "text-blue-700 font-medium" : "text-gray-500")}
                        >
                            {index === 0 ? "Basic Info" : index === 1 ? "Contact Details" : "Banking Info"}
                        </span>
                    </div>
                ))}
            </div>
            <div className="relative mt-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full">
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
