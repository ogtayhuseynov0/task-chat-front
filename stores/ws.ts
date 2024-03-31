import { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import useUserStore from './user.store';
import useCurrentChatStore from './current-chat.store';

export const WebSocketDemo = () => {
  const { user, setOnlineUsers } = useUserStore()
  const { setMessages, messages } = useCurrentChatStore()
  const [socketUrl] = useState(`ws://localhost:8000/ws/${user?.id}`)
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const event = JSON.parse(lastMessage.data)
      console.log('EVENT_WS: ', event, lastMessage);
      if (event.type === 'users') {
        setOnlineUsers(event.users)
      }
      if (event.type === 'message') {
        var chat = document.querySelector('div[id="chat-scroll"] > [data-radix-scroll-area-viewport]');

        setTimeout(() => {
          if (chat)
            chat.scrollTop = chat.scrollHeight
        }, 100);

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
