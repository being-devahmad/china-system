// src/store/auth.store.ts
import {create} from 'zustand'

interface AuthState {
  user: { email: string; firstName: string; lastName: string } | null
  setUser: (user: { email: string; firstName: string; lastName: string }) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>((set: (arg0: { user: any; }) => any) => ({
  user: null,
  setUser: (user: any) => set({ user }),
  clearUser: () => set({ user: null }),
}))
