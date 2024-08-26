import { SocketEvent } from '~/notifications/models/services/generated/notification.generated';
import Messages from './messages';
import { useConversations } from '~/messages/models/hooks/use-conversations';
import { MessageReponse } from '~/messages/models/services/generated/message.generated';
import { useSocket } from '~/common/models/hooks';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { useEffect, useMemo } from 'react';

type MessagesContainerProps = {
  id: string;
};

const MessagesContainer = ({ id }: MessagesContainerProps) => {
  const [{ user }] = useAuth();
  const [{ conversations, state }, { pushMessages, fetchMessages, readMessages, updateMessages }] = useConversations();
  const { socket, loggedInUsers } = useSocket();
  const conversation = conversations?.find((i) => i.conversationId === id);
  console.log('state', state);
  const onMessageRecieved = (message: MessageReponse) => {
    if (!conversation?.items?.find((s) => s.messageId === message?.messageId)) {
      pushMessages(id, [message]);
    }
  };

  const onMessagesRead = (messageIds: string[]) => {
    readMessages(id, messageIds);
  };

  const onReadMessageReceived = (messages: MessageReponse[]) => {
    updateMessages(id, messages);
  };

  useEffect(() => {
    socket?.on(SocketEvent.MESSAGE_CREATED, onMessageRecieved);
    socket?.on(SocketEvent.MESSAGE_READ, onReadMessageReceived);
    return () => {
      socket?.off(SocketEvent.MESSAGE_CREATED, onMessageRecieved);
      socket?.off(SocketEvent.MESSAGE_READ, onReadMessageReceived);
    };
  }, []);

  return (
    <Messages
      conversation={conversation}
      onFetch={() => fetchMessages(id, (conversation?.page || 1) + 1)}
      id={id}
      currentUser={user}
      loggedInUsers={loggedInUsers}
      onMessagesRead={onMessagesRead}
    />
  );
};

export default MessagesContainer;
