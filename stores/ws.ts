import { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import useUserStore from './user.store';
import useCurrentChatStore from './current-chat.store';
import { goBottomOfElement } from '@/lib/utils';

export const WebSocketDemo = () => {
  const { user, setOnlineUsers } = useUserStore()
  const { setMessages, messages } = useCurrentChatStore()
  const [socketUrl] = useState(`${process.env.NEXT_PUBLIC_WS_URL}${user?.id}`)
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const event = JSON.parse(lastMessage.data)
      // console.log('EVENT_WS: ', event, lastMessage);
      if (event.type === 'users') {
        setOnlineUsers(event.users)
      }
      if (event.type === 'message') {
        goBottomOfElement('div[id="chat-scroll"] > [data-radix-scroll-area-viewport]')
        const allMessages = [...messages, event.data]
        setMessages(allMessages)
      }

      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  useEffect(() => {
    console.log(`#SOCKET: ${connectionStatus}`);
  }, [connectionStatus, readyState]);

  return null;
};
