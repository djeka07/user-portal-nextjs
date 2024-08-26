'use server';

import getAuth from '~/auth/models/helpers/get-auth';
import { ConversationsResponse } from '../services/generated/message.generated';
import { fetchConversations } from '../services/messages.service';

const fetchConversationsServerFn =  async (page: number, take: number = 10): Promise<ConversationsResponse> => {
  const { accessToken } = await getAuth();
  const response = await fetchConversations({ accessToken, page, take});
  return response;
};

export default fetchConversationsServerFn;