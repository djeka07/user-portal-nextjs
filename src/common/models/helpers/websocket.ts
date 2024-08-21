'use client';
import ioClient, { Socket } from 'socket.io-client';
import { UserResponse } from '~/users/models/services/generated/user.generated';
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET as string;
const path = process.env.NEXT_PUBLIC_SOCKET_PATH;
const isDevelopment = process.env.NODE_ENV === 'development';

export const connectToClient = (auth: string, user: UserResponse, sessionId?: string): Socket => {
  const socket = ioClient(ENDPOINT, {
    path,
    secure: !isDevelopment,
    auth: {
      authorization: auth,
      username: user?.username,
      id: user?.id,
      name: `${user?.firstName} ${user?.lastName}`,
      sessionId,
    },
    transports: ['websocket', 'polling'],
  });
  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err}`);
  });
  return socket;
};
