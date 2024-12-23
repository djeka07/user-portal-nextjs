'use client';
import { Dayjs } from 'dayjs';
import { createContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Authorization } from '~/auth/models/helpers/token';
import { useLocalStorage } from '@djeka07/hooks';
import { connectToClient } from '~/common/models/helpers/websocket';
import { SocketEvent } from '~/notifications/models/services/generated/notification.generated';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { SessionInformation } from '../types/user.session';

export type SocketProviderProps = {
  token: Authorization;
  user: UserResponse;
  children: JSX.Element;
};

export type ChatUser = {
  id: string;
  userId: string;
  username: string;
  name: string;
  online: Dayjs;
};

export type SocketState = {
  socket?: Socket;
  loggedInUsers: SessionInformation[];
};

export const SocketContext = createContext<Omit<SocketState, 'children'>>({ loggedInUsers: [] });

export function SocketProvider({ children, token, user }: SocketProviderProps) {
  const [sessionId, setSessionId] = useLocalStorage<string | undefined>('sessionId', undefined);
  const [socket, setSocket] = useState<Socket>();
  const [loggedInUsers, setLoggedInUsers] = useState<SessionInformation[]>([]);

  useEffect(() => {
    const connctedIo = connectToClient(token?.accessToken as string, user, sessionId);
    connctedIo?.on(SocketEvent.SESSION_CONNECTED, ({ sessionId }) => {
      setSessionId(sessionId);
    });

    setSocket(connctedIo);

    connctedIo?.on(SocketEvent.USERS, (users: SessionInformation[]) => {
      setLoggedInUsers(users);
    });

    connctedIo.on(SocketEvent.MESSAGE_CREATED, (props) => {
      console.log(props);
    });

    connctedIo?.on(SocketEvent.USER_DISCONNECTED, (userId: string) => {
      setLoggedInUsers((prev) => prev.filter((u) => u.user?.userId !== userId));
    });

    return () => {
      console.log('disconnecting');
      socket?.disconnect();
    };
  }, [sessionId, setSessionId, socket, token?.accessToken, user]);

  return (
    <SocketContext.Provider value={{ socket: socket as Socket, loggedInUsers }}>{children}</SocketContext.Provider>
  );
}
