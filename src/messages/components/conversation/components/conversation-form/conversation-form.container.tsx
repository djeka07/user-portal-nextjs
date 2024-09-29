'use client';
import { useState } from 'react';
import { useTranslation } from '~/app/i18n/client';
import { useRouter, useSocket } from '~/common/models/hooks';
import { useConversations } from '~/messages/models/hooks/use-conversations';
import { MessageForm } from '../message-form/message-form';

type ConversationFormContainerProps = {
  userIds: string[];
  id?: string;
};

const ConversationFormContainer = ({ userIds, id }: ConversationFormContainerProps) => {
  const router = useRouter();
  const { language } = useTranslation();
  const { socket } = useSocket();
  const [, { create, createMessage }] = useConversations();
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (message?: string) => {
    try {
      const form = new FormData();
      form.append('message', message || '');
      let messageId;
      setIsSending(true);
      if (!id) {
        const conversation = await create(userIds, form);
        messageId = conversation?.lastMessage?.messageId;
      } else {
        const message = await createMessage(id, form);
        messageId = message?.messageId;
      }
      setIsSending(false);
      socket?.emit('message', { conversationId: id, id: messageId });
      router.push(`/${language}/messages/${id}`);
    } catch (error) {
      setIsSending(false);
    }
  };

  return <MessageForm isSending={isSending} onSubmit={onSubmit} />;
};

export default ConversationFormContainer;
