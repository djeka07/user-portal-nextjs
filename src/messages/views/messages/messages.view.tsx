'use client';

import { useConversations } from '~/messages/models/hooks/use-conversations';
import { root } from './messages.view.css';
import { Spinner } from '@djeka07/ui';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type MessagesViewProps = {
  language: string;
};

const MessagesView = ({ language }: MessagesViewProps) => {
  const { push } = useRouter();
  const [{ conversations, state }] = useConversations();

  const routeToPage = useCallback(() => {
    console.log('state', state, conversations);
    if (state !== 'pending') {
      const firstId = conversations[0]?.conversationId || 'new';
      push(`/${language}/messages/${firstId}`);
    }
  }, [language, push, conversations, state]);

  useEffect(() => {
    routeToPage();
  }, [routeToPage]);

  return (
    <div className={root}>
      <Spinner size="large" />
    </div>
  );
};

export default MessagesView;
