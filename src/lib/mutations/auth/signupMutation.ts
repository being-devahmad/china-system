// lib/mutations/useSignupMutation.ts
import { useAuthStore } from '@/store/auth.store'
import { useMutation } from '@tanstack/react-query'

export const useSignupMutation = () => {
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: async (payload: {
      firstName: string
      lastName: string
      email: string
      password: string
    }) => {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, tenants: [] }), // you can modify tenants if needed
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Signup failed')
      return data
    },
    onSuccess: (data) => {
      setUser({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
      })
    },
  })
}
