'use client';
import { produce, WritableDraft } from 'immer';
import { createContext, useState, useCallback } from 'react';
import createMessageFormAction from '../actions/create-message';
import { MessageReponse } from '../services/generated/message.generated';
import {
  ConversationActions,
  ConversationFetchState,
  ConversationsState,
  ConversationState,
} from './conversation.state';
import createConversationWithDefaultValue from './create-conversation-with-default-value';
import createConversationFormAction from '../actions/create-conversation';
import updateMessageReadStatusServerFn from '../actions/update-message-read-status';
import fetchConversationMessagesServerFn from '../actions/fetch-conversation-messages';
import fetchConversationsServerFn from '../actions/fetch-conversations';
import { arrayToObject } from '@djeka07/utils';

const defaultState: ConversationsContextType = [
  {
    conversations: [],
    state: 'initial',
    total: 0,
  },
  {
    createMessage: (id: string, form: FormData) => {
      throw new Error('AuthProvider updateToken not assigned');
    },
    create: (userIds: string[], form: FormData) => {
      throw new Error('AuthProvider updateToken not assigned');
    },
    readMessages: (id: string, messageIds: string[]) => {
      throw new Error('AuthProvider updateToken not assigned');
    },
    fetchMessages: (id: string, page?: number, take?: number) => {
      throw new Error('AuthProvider updateToken not assigned');
    },
    fetch: (page: number, take?: number) => {
      throw new Error('AuthProvider updateToken not assigned');
    },
    updateMessages: (id: string, messages: MessageReponse[]) => {
      throw new Error('AuthProvider updateToken not assigned');
    },
    pushMessages: (id: string, messages: MessageReponse[]) => {
      throw new Error('AuthProvider updateToken not assigned');
    },
  },
];

export const ConversationsContext = createContext<ConversationsContextType>(defaultState);

type ConversationProviderProps = {
  id?: string;
  children: JSX.Element;
};

export type ConversationsContextType = [ConversationsState, ConversationActions];

const getInitalState = (id?: string): ConversationsState => ({
  conversations: !!id ? [{ conversationId: id, state: 'pending' }] : [],
  state: 'pending',
  total: 0,
});

export const ConversationsProvider = ({ children, id }: ConversationProviderProps) => {
  const [state, setState] = useState<ConversationsState>(getInitalState(id));

  const context: ConversationsContextType = [
    state,
    {
      createMessage: async (id: string, form: FormData): Promise<MessageReponse | null> => {
        try {
          setState((prev) => ({
            ...prev,
            [id]: createConversationWithDefaultValue({ ...(prev || {}), state: 'sending' }),
          }));
          const response = await createMessageFormAction(id, form);
          setState(
            produce((prev) => {
              const conversation: WritableDraft<ConversationState> = prev.conversations.find(
                (conversation) => conversation.conversationId === id,
              ) || { state: 'initial' };
              conversation.state = 'ready';
              if (!!response.data) {
                (conversation.items || []).push(response.data);
              }
              conversation.total = (conversation?.total || 0) + 1;
            }),
          );
          return response.data || null;
        } catch (error) {
          setState(
            produce((prev) => {
              const conversation = prev.conversations.find((c) => c.conversationId === id) || { state: 'errored' };
              conversation.state = 'errored';
            }),
          );
          return null;
        }
      },
      create: async (userIds: string[], form: FormData) => {
        const response = await createConversationFormAction(userIds, form);
        setState(
          produce((prev) => {
            prev.conversations.push(createConversationWithDefaultValue(response));
          }),
        );
        return response;
      },
      readMessages: async (id: string, messageIds: string[]) => {
        const response = await updateMessageReadStatusServerFn(id, messageIds);
        setState(
          produce((prev) => {
            const conversation = prev.conversations.find((c) => c.conversationId === id) || { state: 'ready' };
            const items = conversation?.items?.map((item) => {
              const readMessageItem = response?.find((r) => r.messageId === item.messageId);
              return { ...item, readBy: readMessageItem?.readBy || [] };
            });
            conversation.items = items;
          }),
        );
      },
      fetchMessages: useCallback(async (id: string, page: number = 1, take: number = 20) => {
        try {
          console.log('fetch messages');
          setState(
            produce((prev) => {
              const conversation = prev.conversations.find((c) => c.conversationId === id) || { state: 'initial' };
              if (page > 1) {
                conversation.state = 'pending-next';
              } else {
                conversation.state = 'pending';
              }
            }),
          );

          const messages = await fetchConversationMessagesServerFn(id, page, take);
          setState(
            produce((prev) => {
              const conversation = prev.conversations.find((c) => c.conversationId === id) || { state: 'initial' };
              conversation.hasNextPage = messages.hasNextPage;
              conversation.total = messages.total;
              conversation.state = 'ready';
              conversation.page = messages.page;
              if (page > 1) {
                conversation.items?.unshift(...messages?.items);
              } else {
                conversation.items = messages?.items;
              }
              console.log(conversation);
            }),
          );
        } catch (error) {
          setState(
            produce((prev) => {
              const conversation = prev.conversations.find((c) => c.conversationId === id) || { state: 'initial' };
              conversation.state = 'errored';
            }),
          );
        }
      }, []),
      fetch: async (page: number, take: number = 20) => {
        setState(
          produce((prev) => {
            prev.state = 'pending';
          }),
        );
        const response = await fetchConversationsServerFn(page, take);
        setState(
          produce((prev) => {
            const conversations = response.items.map((i) => {
              const prevConverstion = prev.conversations.find((c) => c.conversationId === i.conversationId);
              return {
                ...(prevConverstion || {}),
                ...i,
                state: 'ready' as ConversationFetchState,
              };
            });
            prev.conversations = conversations;
            prev.state = 'ready';
            prev.total = response.total;
          }),
        );
      },
      updateMessages: (id: string, messages: MessageReponse[]): void => {
        setState(
          produce((prev) => {
            const conversation = prev.conversations.find((c) => c.conversationId === id) || { state: 'initial' };
            const items = conversation.items?.map((item) => {
              const readMessageItem = messages?.find((r) => r.messageId === item.messageId);
              return readMessageItem || item;
            });
            conversation.items = items;
          }),
        );
      },
      pushMessages: (id: string, messages: MessageReponse[]) => {
        setState(
          produce((prev) => {
            const conversation = prev.conversations.find((c) => c.conversationId === id) || { state: 'initial' };
            (conversation?.items || []).push(...messages);
            conversation.total = (conversation?.items || []).length;
          }),
        );
      },
    },
  ];

  return <ConversationsContext.Provider value={context}>{children}</ConversationsContext.Provider>;
};
