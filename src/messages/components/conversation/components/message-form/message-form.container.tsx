import { useSocket } from '~/common/models/hooks';
import mapMessageResponseToConversationMessage from './map-message-response-to-conversation-message-response';
import { Form, MessageForm } from './message-form';
import { useConversations } from '~/messages/models/hooks/use-conversations';
import { FormEvent, FormEventHandler, useMemo } from 'react';
import createMessageFormAction from '~/messages/models/actions/create-message';

type MessageFormContainerProps = {
  id: string;
};

const MessageFormContainer = ({ id }: MessageFormContainerProps) => {
  const { socket } = useSocket();
  const [{ conversations }, { createMessage }] = useConversations();
  const conversation = useMemo(() => conversations?.find((c) => c.conversationId === id), [id]);

  const onSubmit = async (message?: string) => {
    const formData = new FormData();
    formData.append('message', message || '');
    const msg = await createMessage(id, formData);
    socket?.emit('message', { conversationId: id, id: msg?.messageId });
  };

  return <MessageForm isSending={conversation?.state === 'sending' || false} onSubmit={onSubmit} />;
};

export default MessageFormContainer;
