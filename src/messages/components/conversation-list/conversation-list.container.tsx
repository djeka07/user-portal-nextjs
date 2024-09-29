'use client';
import { useEffect } from 'react';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { useParams, useSocket } from '~/common/models/hooks';
import { useConversations } from '~/messages/models/hooks/use-conversations';
import { MessageReponse } from '~/messages/models/services/generated/message.generated';
import { SocketEvent } from '~/notifications/models/services/generated/notification.generated';
import ConversionList from './conversation-list';

const ConversationListContainer = () => {
  const { socket } = useSocket();
  const [authState] = useAuth();
  const params = useParams();
  const [{ conversations, state, total }, { fetch }] = useConversations();

  const onMessage = (message: MessageReponse) => {
    console.log(message);
  };

  useEffect(() => {
    console.log('running effect');
    fetch(1, 10);
    socket?.on(SocketEvent.MESSAGE_CREATED, onMessage);
    return () => {
      socket?.off(SocketEvent.MESSAGE_CREATED, onMessage);
    };
  }, [fetch, socket]);

  return (
    <ConversionList
      user={authState.user}
      selectedConversationId={params.id as string}
      state={state}
      items={conversations}
      total={total}
    />
  );
};

export default ConversationListContainer;
