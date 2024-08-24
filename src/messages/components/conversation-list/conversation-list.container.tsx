'use client';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { useConversations } from '~/messages/models/hooks/use-conversations';
import { MessageReponse } from '~/messages/models/services/generated/message.generated';
import { SocketEvent } from '~/notifications/models/services/generated/notification.generated';
import ConversionList from './conversation-list';
import { useSocket } from '~/common/models/hooks';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const ConversationListContainer = () => {
  const { socket } = useSocket();
  const [authState] = useAuth();
  const params = useParams();
  const [{ conversations, state, total }, { fetch }] = useConversations();

  const onMessage = (message: MessageReponse) => {
    console.log(message);
  };

  useEffect(() => {
    fetch(1, 10);
    socket?.on(SocketEvent.MESSAGE_CREATED, onMessage);
    return () => {
      socket?.off(SocketEvent.MESSAGE_CREATED, onMessage);
    };
  }, []);

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
