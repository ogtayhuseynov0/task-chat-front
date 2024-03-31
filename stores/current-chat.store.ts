import { create } from 'zustand'
import { User } from './user.store'
export type Chat = {
  id: number
  user1ID: number
  user2ID: number
  user1: User
  user2: User
}
export type Message = {
  id: number
  chat_id: number
  sender_id: number
  sender: User
  receiver_id: number
  receiver: User
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

