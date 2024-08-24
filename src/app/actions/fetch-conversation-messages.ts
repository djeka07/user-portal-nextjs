'use server';
import getAuth from '~/app/test/get-auth';
import { MessagesResponse } from '../../messages/models/services/generated/message.generated';
import { fetchConversationMessages } from '../../messages/models/services/messages.service';

const fetchConversationMessagesServerFn = async  (id: string, page: number, take: number = 10): Promise<MessagesResponse> => {
  const { accessToken } = await getAuth();
  const response = await fetchConversationMessages( { accessToken, id, page, take });
  return response;
};

export default fetchConversationMessagesServerFn
