'use client';
import { Match, Spinner, Switch } from '@djeka07/ui';
import { Conversation } from '../../components/conversation';
import { useConversations } from '~/messages/models/hooks/use-conversations';
import { useEffect, useMemo } from 'react';

type MessageViewProps = {
  id: string;
};

const MessageView = ({ id }: MessageViewProps) => {
  const [{ conversations }, { fetchMessages }] = useConversations();
  const conversation = useMemo(() => conversations.find((i) => i.conversationId === id), [conversations, id]);

  useEffect(() => {
    fetchMessages(id);
  }, [fetchMessages, id]);

  return conversation?.state === 'pending' ? (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Spinner />
    </div>
  ) : (
    <Conversation id={id} />
  );
};

export default MessageView;
