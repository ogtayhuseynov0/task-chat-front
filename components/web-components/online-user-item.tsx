import { UseCreateChat } from '@/stores/calls/create-chat'
import { GetChatMessages } from '@/stores/calls/get-chat-messages'
import { GetUserChats } from '@/stores/calls/get-user-chats'
import useCurrentChatStore from '@/stores/current-chat.store'
import useUserStore, { User } from '@/stores/user.store'
import { DotIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function OnlineUserItem({ user }: { user: User }) {
  const createChatCall = UseCreateChat()
  const { setCurrentChat, setMessages } = useCurrentChatStore()
  const { push } = useRouter()
  const { user: lUser, setCurrentChats } = useUserStore()
  const getMessages = GetChatMessages()
  const userChats = GetUserChats()

  const createChat = async () => {
    const cht = await createChatCall(user.id)
    setCurrentChat(cht)
    if (lUser) {
      const chts = await userChats(lUser?.id)
      setCurrentChats(chts || [])
    }
    const messages = await getMessages(cht.id)
    setMessages(messages)
    push(`/chat/${cht.id}`)
  }

  return (
    <div onClick={createChat} className='px-3 py-2 flex bg-green-200 items-center rounded-md cursor-pointer'>
      <DotIcon className='h-10 w-10 fill-green-600' />
      {user?.username}
    </div>
  )
}

export default OnlineUserItem
