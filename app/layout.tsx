'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Chats from "@/components/web-components/chats";
import OnlineUsers from "@/components/web-components/online-users";
import { Toaster } from "@/components/ui/sonner"
import { ModalProvider } from "@/components/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center w-full h-screen">
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
