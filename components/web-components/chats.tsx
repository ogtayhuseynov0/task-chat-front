import React from 'react'
import ChatItem from './chat-item'
import useUserStore from '@/stores/user.store'
import { Button } from '../ui/button'
import useCurrentChatStore from '@/stores/current-chat.store'
import { useRouter } from 'next/navigation'

function Chats() {
  const { user, setUser, currentChats, setCurrentChats, setOnlineUsers } = useUserStore()
  const { setMessages, setCurrentChat } = useCurrentChatStore()
  const { push } = useRouter()
  const logUserOut = () => {
    setUser(null)
    setMessages([])
    setCurrentChat(null)
    setOnlineUsers([])
    setCurrentChats([])
    push('/')
  }
  return (
    <div className="w-0 p-0 md:w-80 transition-all overflow-hidden md:border-r border-r-black md:p-2 flex flex-col h-full flex-shrink-0">
      {user &&
        <div className='flex mb-3 items-center justify-between'>
          <div className='text-lg'>User: {user.username}</div>
          <Button size={'sm'} onClick={() => logUserOut()}>Logout</Button>
        </div>
      }
      <div className='text-lg mt-2 text-center'>Chats</div>

      <div className='flex flex-col gap-2'>
        {currentChats.map(chat => (
          <ChatItem key={chat.id} chat={chat} />
        ))}

      </div>
    </div>
  )
}

export default Chats
