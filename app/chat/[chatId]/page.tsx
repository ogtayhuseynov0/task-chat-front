'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useCurrentChatStore from "@/stores/current-chat.store";
import useUserStore from "@/stores/user.store";
import { SendMessageCall } from "@/stores/calls/send-message";
import { cn, goBottomOfElement } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { GetChat } from "@/stores/calls/get-chat";
import { GetChatMessages } from "@/stores/calls/get-chat-messages";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import OnlineUserContent from "@/components/web-components/online-users-content";
import ChatsContext from "@/components/web-components/chats-content";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message must be at least 1 characters long."
  }),
})

export default function Chat() {
  const params = useParams<{ chatId: string }>()
  const chatID = params.chatId
  const getChat = GetChat()
  const getMessages = GetChatMessages()
  const { push } = useRouter()
  const { currentChat, messages, setCurrentChat, setMessages } = useCurrentChatStore()
  const { user } = useUserStore()
  const senMesage = SendMessageCall()

  const fetchMyAPI = useCallback(async () => {
    await getChat(parseInt(chatID)).then(async (response) => {
      const messages = await getMessages(response.id)
      setMessages(messages)
      goBottomOfElement('div[id="chat-scroll"] > [data-radix-scroll-area-viewport]')
      setCurrentChat(response)
    }).catch((e) => {
      push('/')
    })
  }, [chatID, currentChat])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })
  const isFormLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      content: values.message,
      chat_id: currentChat?.id,
      sender_id: user?.id,
      receiver_id: currentChat?.user1ID == user?.id ? currentChat?.user2ID : currentChat?.user1ID
    }
    const m = await senMesage(data)
    form.reset()
    console.log(values, m)
  }

  useEffect(() => {
    fetchMyAPI()
    goBottomOfElement('div[id="chat-scroll"] > [data-radix-scroll-area-viewport]')
  }, [chatID])

  return (
    <div className="p-2 flex flex-col h-full">
      <div className="font-bold h-12 -mx-2 -mt-2 bg-white sticky top-0 z-10 flex items-center justify-around shrink-0 shadow shadow-black">
        <div className="md:hidden ml-2 md:ml-0">
          <Sheet>
            <SheetTrigger>Chats</SheetTrigger>
            <SheetContent side={'left'} className="p-2 pt-10">
              <ChatsContext />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex-grow text-center">
          Chat with {currentChat?.user1ID == user?.id ? currentChat?.user2?.username : currentChat?.user1?.username}
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
      <ScrollArea className="mb-6 px-4 flex flex-grow w-full" id="chat-scroll">
        <div className="flex-grow flex flex-col gap-2">

          {messages.map((msg) => (
            <div key={msg.id} className={
              cn("flex", user?.id == msg.sender.id && 'flex-row-reverse')
            }>
              <div className="w-max bg-secondary p-2 rounded-md ">
                <div className={cn(
                  "font-bold", user?.id == msg.sender.id && 'text-right'
                )}>{msg.sender.username}</div>
                <div>{msg.content}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="h-max shrink-0 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full flex-grow mr-2">
                  <FormControl>
                    <Input placeholder="Type Message ..." autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isFormLoading} type="submit">Send</Button>
          </form>
        </Form>
      </div>
    </div >
  );
}

