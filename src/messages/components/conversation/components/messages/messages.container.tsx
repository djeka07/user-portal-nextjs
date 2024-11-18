import { SocketEvent } from '~/notifications/models/services/generated/notification.generated';
import Messages from './messages';
import { useConversations } from '~/messages/models/hooks/use-conversations';
import { MessageReponse } from '~/messages/models/services/generated/message.generated';
import { useSocket } from '~/common/models/hooks';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { useCallback, useEffect, useMemo } from 'react';

type MessagesContainerProps = {
  id: string;
};

const MessagesContainer = ({ id }: MessagesContainerProps) => {
  const [{ user }] = useAuth();
  const [{ conversations, state }, { pushMessages, fetchMessages, readMessages, updateMessages }] = useConversations();
  const { socket, loggedInUsers } = useSocket();
  const conversation = conversations?.find((i) => i.conversationId === id);
  console.log('state', state);
  const onMessageRecieved = useCallback(
    (message: MessageReponse) => {
      if (!conversation?.items?.find((s) => s.messageId === message?.messageId)) {
        pushMessages(id, [message]);
      }
    },
    [conversation?.items, id, pushMessages],
  );

  const onMessagesRead = (messageIds: string[]) => {
    readMessages(id, messageIds);
  };

  const onReadMessageReceived = useCallback(
    (messages: MessageReponse[]) => {
      updateMessages(id, messages);
    },
    [id, updateMessages],
  );

  const onFetch = useCallback(async () => {
    fetchMessages(id, (conversation?.page || 1) + 1);
  }, [conversation?.page, fetchMessages, id]);

  useEffect(() => {
    socket?.on(SocketEvent.MESSAGE_CREATED, onMessageRecieved);
    socket?.on(SocketEvent.MESSAGE_READ, onReadMessageReceived);
    return () => {
      socket?.off(SocketEvent.MESSAGE_CREATED, onMessageRecieved);
      socket?.off(SocketEvent.MESSAGE_READ, onReadMessageReceived);
    };
  }, [onMessageRecieved, onReadMessageReceived, socket]);

  return (
    <Messages
      conversation={conversation}
      onFetch={onFetch}
      id={id}
      currentUser={user}
      loggedInUsers={loggedInUsers}
      onMessagesRead={onMessagesRead}
    />
  );
};

export default MessagesContainer;
