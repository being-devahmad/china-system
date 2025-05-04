// import { ShopAccountFormState } from "@/app/api/accounts/create/route"
import { ShopAccountFormState } from "@/store/account.store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useShopAccountApi() {
    const queryClient = useQueryClient()

    const createShopAccount = useMutation({
        mutationFn: async (data: ShopAccountFormState) => {
            const response = await fetch("/api/shop-account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to create shop account")
            }

            return response.json()
        },
        onSuccess: () => {
            // Invalidate relevant queries if needed
            queryClient.invalidateQueries({ queryKey: ["shopAccounts"] })
        },
    })

    return {
        createShopAccount,
    }
}
