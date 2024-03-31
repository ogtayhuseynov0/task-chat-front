import { UseCreateChat } from '@/stores/calls/create-chat'
import useCurrentChatStore from '@/stores/current-chat.store'
import { User } from '@/stores/user.store'
import { DotIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function OnlineUserItem({ user }: { user: User }) {
  const createChatCall = UseCreateChat()
  const { setCurrentChat } = useCurrentChatStore()
  const { push } = useRouter()
  const createChat = async () => {
    const cht = await createChatCall(user.id)
    setCurrentChat(cht)
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
