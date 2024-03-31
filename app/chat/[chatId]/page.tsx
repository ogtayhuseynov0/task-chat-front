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
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message must be at least 1 characters long."
  }),
})

export default function Chat() {
  const { currentChat, messages } = useCurrentChatStore()
  const { user } = useUserStore()
  const senMesage = SendMessageCall()
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
    console.log(values, m)
  }
  return (
    <div className="p-2 flex flex-col h-full">
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
                    <Input placeholder="Type Message ..." {...field} />
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

