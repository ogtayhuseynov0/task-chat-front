'use client';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axsiosInstance from "@/lib/axios";
import { toast } from "sonner";
import useUserStore from "@/stores/user.store";
import { getOnlineUser } from "@/stores/calls/get-online-users";
import { GetUserChats } from "@/stores/calls/get-user-chats";
import { useModal } from "@/stores/modal.store";
const formSchema = z.object({
  username: z.string(),
  password: z.string(),
})
export function AuthModal() {
  const { setUser, setCurrentChats, setOnlineUsers, user } = useUserStore()
  const getUsers = getOnlineUser()
  const userChats = GetUserChats()

  const { isOpen, type, onClose } = useModal();
  const isModalOpen = type === "AuthModal" && isOpen;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })
  const isFormLoading = form.formState.isSubmitting;

  function onSubmit(values: z.infer<typeof formSchema>) {
    axsiosInstance.post('user/register', values).then(async (res) => {
      // console.log(res);
      setUser(res.data)
      const usrs = await getUsers()
      const chts = await userChats(res.data.id)
      // console.log('Onlines', usrs)

      setOnlineUsers(usrs || [])
      setCurrentChats(chts || [])
      onClose()
    }).catch(err => {
      toast.error("Credentials are wrong!")

    });
    console.log(values)
  }
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}
      modal
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button disabled={isFormLoading} type="submit">Login</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

