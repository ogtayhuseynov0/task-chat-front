import axsiosInstance from "@/lib/axios";
import useUserStore from "../user.store";

export function GetUserChats() {
  const getChats = async (userID: number) => {
    const response = await axsiosInstance.get('/chats?user_id=' + userID)
    return response.data;
  }
  return getChats;
}

