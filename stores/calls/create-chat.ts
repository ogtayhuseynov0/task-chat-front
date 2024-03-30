import axsiosInstance from "@/lib/axios";
import useUserStore from "../user.store";

export function UseCreateChat() {
  const { user } = useUserStore()
  const createChat = async (userID: string) => {
    const chat = await axsiosInstance.post('/chats', { second_user: userID, owner_id: user?.id })
    return chat.data
  };

  return createChat;
}
