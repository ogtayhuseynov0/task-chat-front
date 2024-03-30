'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Chats from "@/components/web-components/chats";
import OnlineUsers from "@/components/web-components/online-users";
import { Toaster } from "@/components/ui/sonner"
import { ModalProvider } from "@/components/providers/modal-provider";
import { useModal } from "@/stores/modal.store";
import useUserStore from "@/stores/user.store";
import { WebSocketDemo } from "@/stores/ws";
import { useEffect } from "react";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { user } = useUserStore()
  const { onOpen, onClose, isOpen } = useModal();
  useEffect(() => {
    if (user) {
      onClose()
    }
  }, [user, onClose])

  if (!user && !isOpen) {
    onOpen('AuthModal')
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center w-full h-screen">
          {user && <WebSocketDemo />}
          <Chats />
          <div className="flex-grow h-full">
            {children}
          </div>
          <OnlineUsers />
        </div>
        <ModalProvider />
        <Toaster />
      </body>
    </html>
  );
}
