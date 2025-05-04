"use client"

import { Button } from "@/components/ui/button"
import { useShopAccountStore } from "@/store/account.store"

interface FormNavigationProps {
    onSubmit: () => void
}

export function FormNavigation({ onSubmit }: FormNavigationProps) {
    const { currentStep, nextStep, prevStep } = useShopAccountStore()
    const totalSteps = 3

    return (
        <div className="flex justify-between items-center p-6 bg-gray-50 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                Previous
            </Button>

            {currentStep < totalSteps ? (
                <Button type="button" onClick={nextStep}>
                    Continue
                </Button>
            ) : (
                <Button type="button" onClick={onSubmit}>
                    Create Account
                </Button>
            )}
        </div>
    )
}
