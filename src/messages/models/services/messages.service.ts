import { http } from '@djeka07/utils';
import createHeaders from '~/common/models/helpers/headers';
import { CreateConversationMessageRequestParams, CreateConversationRequestParams, FetchConversationFromUsersRequestParams, FetchConversationMessagesRequestParams, FetchConversationRequestParams, FetchConversationsRequestParams, FetchConversationUsersRequestParams, ReadConversationMessageRequestParams } from './message.service.types';
import { AuthClient, ConversationControllerClient, ConversationResponse, ConversationsResponse, ConversationUserResponse, MessageReponse, MessagesResponse } from './generated/message.generated';

const url = process.env.CHAT_API;

export const fetchConversations = ({
  accessToken,
  page,
  take,
}: FetchConversationsRequestParams): Promise<ConversationsResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new ConversationControllerClient(new AuthClient(url!, headers), url, http());
  return client.getUserConversations(page, take);
};

export const fetchConversation = ({
  accessToken,
  id,
}: FetchConversationRequestParams): Promise<ConversationResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new ConversationControllerClient(new AuthClient(url!, headers), url, http());
  return client.getConversation(id);
};

export const fetchConversationMessages = ({
  accessToken,
  id,
  page,
  take,
}: FetchConversationMessagesRequestParams): Promise<MessagesResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new ConversationControllerClient(new AuthClient(url!, headers), url, http());
  return client.getConversationMessages(id, page, take);
};

export const fetchConversationFromUsers = ({
  accessToken,
  userIds,
}: FetchConversationFromUsersRequestParams): Promise<ConversationResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new ConversationControllerClient(new AuthClient(url!, headers), url, http());
  return client.getConversationFromUsers(userIds);
};

export const fetchConversationUsers = ({
  accessToken,
  id,
}: FetchConversationUsersRequestParams): Promise<ConversationUserResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new ConversationControllerClient(new AuthClient(url!, headers), url, http());
  return client.getConversationUsers(id);
};

export const createConversation = ({
  accessToken,
  userIds,
  message,
}: CreateConversationRequestParams): Promise<ConversationResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new ConversationControllerClient(new AuthClient(url!, headers), url, http());
  return client.createConversation({ userIds, message })
};

export const createConversationMessage = ({
  accessToken,
  message,
  id,
}: CreateConversationMessageRequestParams): Promise<MessageReponse> => {
  const headers = createHeaders({ accessToken });
  const client = new ConversationControllerClient(new AuthClient(url!, headers), url, http());
  return client.createMessage(id, { message });
};

export const updateMessageReadStatus = async ({
  accessToken,
  id,
  messageIds,
}: ReadConversationMessageRequestParams): Promise<MessageReponse[]> => {
  const headers = createHeaders({ accessToken });
  const client = new ConversationControllerClient(new AuthClient(url!, headers), url, http());
  return client.readMessages(id, { messageIds });
};
