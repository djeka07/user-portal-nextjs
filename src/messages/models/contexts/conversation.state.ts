import { FetchState } from '~/common/models/types/fetch.state';
import { ConversationResponse, ConversionMessageResponse, MessageReponse, UserResponse } from '../services/generated/message.generated';

export type ConversationState = {
  users?: UserResponse[];
  conversationName?: string;
  conversationId?: string;
  isGroup?: boolean;
  lastMessage?: ConversionMessageResponse;
  items?: MessageReponse[];
  page?: number;
  total?: number;
  hasNextPage?: boolean;
  state: ConversationFetchState;
};

export type ConversationFetchState = FetchState | 'creating' | 'pending-next' | 'sending';

export type ConversationsState = {
  conversations: ConversationState[];
  total: number;
  state: ConversationFetchState;
};

export type ConversationActions = {
  createMessage: (id: string, form: FormData) => Promise<MessageReponse | null>;
  create: (userIds: string[], form: FormData) => Promise<ConversationResponse>;
  readMessages: (id: string, messageIds: string[]) => Promise<void>;
  fetchMessages: (id: string, page?: number, take?: number) => Promise<void>;
  fetch: (page: number, take?: number) => Promise<void>;
  updateMessages: (id: string, messages: MessageReponse[]) => void;
  pushMessages: (id: string, messages: MessageReponse[]) => void;
};
