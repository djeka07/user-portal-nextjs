'use server';
import getAuth from '~/auth/models/helpers/get-auth';
import { MessagesResponse } from '../services/generated/message.generated';
import { fetchConversationMessages } from '../services/messages.service';

const fetchConversationMessagesServerFn = async  (id: string, page: number, take: number = 10): Promise<MessagesResponse> => {
  const { accessToken } = await getAuth();
  const response = await fetchConversationMessages( { accessToken, id, page, take });
  return response;
};

export default fetchConversationMessagesServerFn
