import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export type User = {
  id: number
  username: string
  is_online: boolean
}

export type Chat = {
  id: number
  user1: User
  user2: User
}


interface UserState {
  user: User | null,
  onlineUsers: User[],
  currentChats: Chat[],
  setOnlineUsers: (users: User[]) => void,
  setCurrentChats: (users: Chat[]) => void,
  setUser: (user: User | null) => void
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      onlineUsers: [],
      currentChats: [],
      setOnlineUsers: (users) => set({ onlineUsers: users }),
      setCurrentChats: (chats) => set({ currentChats: chats }),
      setUser: (user) => set({ user })
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        // console.log('hydration starts')
        // optional
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error)
          } else {
            console.log('hydration finished', state)
          }
        }
      }
    },
  ),
)

export default useUserStore

