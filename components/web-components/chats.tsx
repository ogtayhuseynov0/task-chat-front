import React from 'react'
import ChatItem from './chat-item'
import useUserStore from '@/stores/user.store'
import { Button } from '../ui/button'

function Chats() {
  const { user, setUser, currentChats, setCurrentChats, setOnlineUsers } = useUserStore()

  const logUserOut = () => {
    setUser(null)
    setOnlineUsers([])
    setCurrentChats([])
  }
  return (
    <div className="w-80 border-r border-r-black p-2 flex flex-col h-full flex-shrink-0">
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
