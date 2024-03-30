import axsiosInstance from "@/lib/axios";

export function getOnlineUser() {

  const getUsers = async () => {
    const response = await axsiosInstance.get('/user/online');
    return response.data;
  }
  return getUsers;
}
