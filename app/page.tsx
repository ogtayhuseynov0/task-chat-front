'use client';
import { useModal } from "@/stores/modal.store";
import useUserStore from "@/stores/user.store";
import { WebSocketDemo } from "@/stores/ws";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUserStore()
  const { onOpen, onClose, isOpen } = useModal();
  useEffect(() => {
    if (user) {
      onClose()
    }
  }, [user, onClose])

  if (!user && !isOpen) {
    onOpen('AuthModal')
    return null
  }

  return (
    <div className="p-4 flex items-center justify-center h-full">
      {user && <WebSocketDemo />}
      <div>
        Create chat from online users.
      </div>
    </div >
  );
}
