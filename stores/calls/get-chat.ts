import axsiosInstance from "@/lib/axios";

export function GetChat() {
  const getChat = async (chat_id: number) => {
    const response = await axsiosInstance.get('/chats/' + chat_id)
    return response.data;
  }
  return getChat;
}




