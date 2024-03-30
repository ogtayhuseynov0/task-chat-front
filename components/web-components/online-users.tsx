import useUserStore from "@/stores/user.store"
import OnlineUserItem from "./online-user-item"

function OnlineUsers() {
  const { onlineUsers, user } = useUserStore()
  return (
    <div className="w-80 p-2 border-l border-l-black h-full flex flex-col flex-shrink-0">
      <div className='text-lg mb-4 text-center'>Online Users</div>

      <div className="flex flex-col gap-2">
        {onlineUsers.filter(ouser => ouser.username !== user?.username).map(user => (
          <OnlineUserItem key={user.username} user={user} />
        ))}

      </div>
    </div>
  )
}

export default OnlineUsers
