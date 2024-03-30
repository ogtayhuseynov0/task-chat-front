import { create } from 'zustand'
export type Chat = {
  id: number
  owner_id: number
  second_user: number
}

interface CurrentChatState {
  currentChat: Chat | null
  setCurrentChat: (chat: Chat | null) => void
}

const useCurrentChatStore = create<CurrentChatState>()((set) => ({
  currentChat: null,
  setCurrentChat: (chat) => set({ currentChat: chat })
}))

export default useCurrentChatStore

