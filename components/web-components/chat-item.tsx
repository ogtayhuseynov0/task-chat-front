import { Chat } from '@/stores/user.store'
import React from 'react'

function ChatItem({ chat }: { chat: Chat }) {
  return (
    <div className='px-3 py-2 bg-secondary rounded-md cursor-pointer'>
      {chat?.id} - {chat?.user1?.username}
    </div>
  )
}

export default ChatItem
