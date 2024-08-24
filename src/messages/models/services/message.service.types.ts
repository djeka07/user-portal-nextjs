
export type FetchConversationsRequestParams = {
  accessToken: string;
  page: number;
  take: number;
};

export type FetchConversationRequestParams = Pick<FetchConversationsRequestParams , 'accessToken'> & {
  id: string;
};

export type FetchConversationMessagesRequestParams = FetchConversationsRequestParams & {
  id: string;
};

export type FetchConversationUsersRequestParams = Omit<FetchConversationsRequestParams, 'page' | 'take'> & {
  id: string;
};

export type FetchConversationFromUsersRequestParams = {
  userIds: string[];
  accessToken: string;
};

export type CreateConversationMessageRequestParams = {
  message: string;
  id: string;
  accessToken: string;
};

export type ReadConversationMessageRequestParams = {
  accessToken: string;
  id: string;
  messageIds: string[];
};

export type CreateConversationRequestParams = {
  userIds: string[];
  message?: string;
  accessToken: string;
};