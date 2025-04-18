// src/lib/mutations/useSigninMutation.ts
import { useAuthStore } from '@/store/auth.store'
import { useMutation } from '@tanstack/react-query'

export const useSigninMutation = () => {
  const setUser = useAuthStore((state: { setUser: any }) => state.setUser)

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, tenants: [] }), // Modify tenants if needed
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Signin failed')
      return data
    },
    onSuccess: (data) => {
      setUser({
        email: data.user.email,
        firstName: data.user.firstName, // Storing additional user data
        lastName: data.user.lastName,   // Storing additional user data
      })
    },
  })
}
