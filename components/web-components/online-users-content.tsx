import useUserStore from "@/stores/user.store"
import OnlineUserItem from "./online-user-item"

function OnlineUserContent() {
  const { onlineUsers, user } = useUserStore()

  return (
    <div className="h-full">
      <div className='text-lg mb-4 text-center'>Online Users</div>
      <div className="flex flex-col gap-2">
        {onlineUsers.filter(ouser => ouser.id !== user?.id).map(user => (
          <OnlineUserItem key={user.id} user={user} />
        ))}

      </div>
    </div>
  )
}

export default OnlineUserContent
