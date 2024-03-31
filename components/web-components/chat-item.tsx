import useUserStore, { Chat } from '@/stores/user.store'
import { useRouter } from 'next/navigation'
import React from 'react'

function ChatItem({ chat }: { chat: Chat }) {
  const { push } = useRouter()
  const { user } = useUserStore()
  const goToChat = async () => {
    push(`/chat/${chat.id}`)
  }
  return (
    <div onClick={goToChat} className='px-3 py-2 bg-secondary rounded-md cursor-pointer'>
      {user?.id == chat?.user1?.id ? chat?.user2?.username : chat?.user1?.username}
    </div>
  )
}

export default ChatItem
