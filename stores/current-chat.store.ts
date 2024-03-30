import { create } from 'zustand'
import { User } from './user.store'
export type Chat = {
  id: number
  owner_id: number
  second_user: number
}
export type Message = {
  id: number
  chat_id: number
  owner_id: number
  owner: User
  content: string
  created_at: string
}

interface CurrentChatState {
  currentChat: Chat | null
  messages: Message[]
  setMessages: (messages: Message[]) => void
  setCurrentChat: (chat: Chat | null) => void
}

const useCurrentChatStore = create<CurrentChatState>()((set) => ({
  currentChat: null,
  messages: [],
  setMessages: (messages) => set({ messages }),
  setCurrentChat: (chat) => set({ currentChat: chat })
}))

export default useCurrentChatStore

