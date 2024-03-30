import axsiosInstance from "@/lib/axios";

export function SendMessageCall() {
  const sendMessage = async (body: any) => {
    const response = await axsiosInstance.post('/messages', body)
    return response.data;
  }
  return sendMessage;
}


