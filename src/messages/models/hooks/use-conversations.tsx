import { useContext } from 'react';
import { ConversationsContext, ConversationsContextType } from '../contexts/conversations.context';
import { ConversationResponse } from '../services/generated/message.generated';

export type ConversationsActions = {
  create: (userIds: string[], form: FormData) => Promise<ConversationResponse>;
  fetch: (page: number, take?: number) => Promise<void>;
  push: (conversations: ConversationResponse[]) => void;
};

export function useConversations(): ConversationsContextType {
  const context = useContext(ConversationsContext);

  if (!context) {
    throw new Error('useConversations need to me in ConversationProvider');
  }

  return context;
}
