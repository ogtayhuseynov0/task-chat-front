import axsiosInstance from "@/lib/axios";

export function GetChatMessages() {
  const getMessages = async (chat_id: number) => {
    const response = await axsiosInstance.get('/messages/chat/' + chat_id)
    return response.data;
  }
  return getMessages;
}



