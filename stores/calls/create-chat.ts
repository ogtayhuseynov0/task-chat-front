import axsiosInstance from "@/lib/axios";
import useUserStore from "../user.store";

export function UseCreateChat() {
  const { user } = useUserStore()
  const createChat = async (userID: number) => {
    const chat = await axsiosInstance.post('/chats', { user2ID: userID, user1ID: user?.id })
    return chat.data
  };

  return createChat;
}
