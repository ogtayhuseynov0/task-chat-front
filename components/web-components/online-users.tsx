import OnlineUserContent from "./online-users-content"
function OnlineUsers() {
  return (
    <div className="h-full">
      <div className="w-0 md:w-80 md:p-2 transition-all overflow-hidden md:border-l border-l-black h-full flex flex-col flex-shrink-0">
        <OnlineUserContent />
      </div>
    </div>
  )
}

export default OnlineUsers
