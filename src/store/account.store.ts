import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export type AccountType = "expense" | "company" | "supplier" | "shopkeeper"

export interface ShopAccountFormState {
    // Form data
    shopPicture: string
    shopNo: string
    mobileBoss: string
    mobileMiss: string
    mobileManager: string
    mobileFactory: string
    accountType: AccountType
    shopAddress: string
    city: string
    email: string
    bankAccounts: string[]

    // UI state
    currentStep: number
    errors: Record<string, string>
    imagePreview: string | null

    // Actions
    setField: <
        K extends keyof Omit<
            ShopAccountFormState,
            | "setField"
            | "setErrors"
            | "clearErrors"
            | "reset"
            | "nextStep"
            | "prevStep"
            | "validateStep"
            | "addBankAccount"
            | "removeBankAccount"
            | "updateBankAccount"
            | "currentStep"
            | "errors"
            | "imagePreview"
        >,
    >(
        field: K,
        value: ShopAccountFormState[K],
    ) => void
    setErrors: (errors: Record<string, string>) => void
    clearErrors: (fields?: string[]) => void
    reset: () => void
    nextStep: () => void
    prevStep: () => void
    validateStep: (step: number) => boolean
    addBankAccount: () => void
    removeBankAccount: (index: number) => void
    updateBankAccount: (index: number, value: string) => void
}

const initialState = {
    // Form data
    shopPicture: "",
    shopNo: "",
    mobileBoss: "",
    mobileMiss: "",
    mobileManager: "",
    mobileFactory: "",
    accountType: "shopkeeper" as AccountType,
    shopAddress: "",
    city: "",
    email: "",
    bankAccounts: [""],

    // UI state
    currentStep: 1,
    errors: {},
    imagePreview: null,
}

export const useShopAccountStore = create<ShopAccountFormState>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,

                setField: (field, value) => {
                    set((state) => {
                        // Clear error for this field if it exists
                        const newErrors = { ...state.errors }
                        if (newErrors[field]) {
                            delete newErrors[field]
                        }

                        return {
                            [field]: value,
                            errors: newErrors,
                        }
                    })
                },

                setErrors: (errors) => set({ errors }),

                clearErrors: (fields) =>
                    set((state) => {
                        if (!fields) return { errors: {} }

                        const newErrors = { ...state.errors }
                        fields.forEach((field) => {
                            if (newErrors[field]) {
                                delete newErrors[field]
                            }
                        })

                        return { errors: newErrors }
                    }),

                reset: () => set(initialState),

                nextStep: () => {
                    const { currentStep, validateStep } = get()
                    if (validateStep(currentStep) && currentStep < 3) {
                        set({ currentStep: currentStep + 1 })
                    }
                },

                prevStep: () => {
                    const { currentStep } = get()
                    if (currentStep > 1) {
                        set({ currentStep: currentStep - 1 })
                    }
                },

                validateStep: (step) => {
                    const state = get()
                    const newErrors: Record<string, string> = {}

                    if (step === 1) {
                        if (!state.shopNo) {
                            newErrors.shopNo = "Shop number is required"
                        }
                    } else if (step === 2) {
                        if (!state.mobileMiss) {
                            newErrors.mobileMiss = "Miss mobile number is required"
                        }

                        if (!state.email) {
                            newErrors.email = "Email is required"
                        } else if (!/\S+@\S+\.\S+/.test(state.email)) {
                            newErrors.email = "Invalid email address"
                        }

                        if (!state.city) {
                            newErrors.city = "City is required"
                        }

                        if (!state.shopAddress) {
                            newErrors.shopAddress = "Shop address is required"
                        }
                    } else if (step === 3) {
                        if (!state.bankAccounts.length || !state.bankAccounts[0]) {
                            newErrors.bankAccounts = "At least one bank account is required"
                        }
                    }

                    set({ errors: newErrors })
                    return Object.keys(newErrors).length === 0
                },

                addBankAccount: () =>
                    set((state) => ({
                        bankAccounts: [...state.bankAccounts, ""],
                    })),

                removeBankAccount: (index) =>
                    set((state) => {
                        if (state.bankAccounts.length <= 1) return state

                        const updatedAccounts = [...state.bankAccounts]
                        updatedAccounts.splice(index, 1)

                        return { bankAccounts: updatedAccounts }
                    }),

                updateBankAccount: (index, value) =>
                    set((state) => {
                        const updatedAccounts = [...state.bankAccounts]
                        updatedAccounts[index] = value

                        // Clear error if it exists
                        const newErrors = { ...state.errors }
                        if (newErrors.bankAccounts && value) {
                            delete newErrors.bankAccounts
                        }

                        return {
                            bankAccounts: updatedAccounts,
                            errors: newErrors,
                        }
                    }),
            }),
            {
                name: "shop-account-form",
                partialize: (state) => ({
                    shopPicture: state.shopPicture,
                    shopNo: state.shopNo,
                    mobileBoss: state.mobileBoss,
                    mobileMiss: state.mobileMiss,
                    mobileManager: state.mobileManager,
                    mobileFactory: state.mobileFactory,
                    accountType: state.accountType,
                    shopAddress: state.shopAddress,
                    city: state.city,
                    email: state.email,
                    bankAccounts: state.bankAccounts,
                    currentStep: state.currentStep,
                    imagePreview: state.imagePreview,
                }),
            },
        ),
    ),
)
