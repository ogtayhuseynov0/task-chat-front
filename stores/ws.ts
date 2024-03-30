import { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import useUserStore from './user.store';

export const WebSocketDemo = () => {
  const { user, setOnlineUsers } = useUserStore()
  const [socketUrl, setSocketUrl] = useState(`ws://localhost:8000/ws/${user?.username}`)
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const event = JSON.parse(lastMessage.data)
      console.log(event);
      if (event.type === 'users') {
        setOnlineUsers(event.users.map((user: any) => ({ username: user })))
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
