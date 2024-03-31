import React from 'react'
import ChatsContext from './chats-content'

function Chats() {
  return (
    <div className="w-0 p-0 md:w-80 h-full transition-all overflow-hidden md:border-r border-r-black md:p-2 ">
      <ChatsContext />
    </div>
  )
}

export default Chats
