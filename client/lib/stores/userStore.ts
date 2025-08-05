import { create } from "zustand"
import { StateCreator } from "zustand"
import { persist } from "zustand/middleware"

type UserInfo = {
  name: string
  role: string
  email?: string
}

type UserStore = {
  user: UserInfo | null
  setUser: (user: UserInfo) => void
  clearUser: () => void
}


export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-store",
    }
  )
)
