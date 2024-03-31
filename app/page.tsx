'use client';

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ChatsContext from "@/components/web-components/chats-content";
import OnlineUserContent from "@/components/web-components/online-users-content";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="font-bold h-12 sticky top-0 w-full z-10 flex items-center justify-between ">
        <div className="md:hidden ml-2 md:ml-0">
          <Sheet>
            <SheetTrigger>Chats</SheetTrigger>
            <SheetContent side={'left'} className="p-2 pt-10">
              <ChatsContext />
            </SheetContent>
          </Sheet>
        </div>

        <div className="md:hidden mr-2 md:mr-0">
          <Sheet>
            <SheetTrigger>Users</SheetTrigger>
            <SheetContent side={'right'} className="p-2">
              <OnlineUserContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex items-center flex-grow">
        Create chat from online users.
      </div>
    </div >
  );
}
