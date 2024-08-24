'use server';

import getAuth from '~/app/test/get-auth';
import { ConversationsResponse } from '../../messages/models/services/generated/message.generated';
import { fetchConversations } from '../../messages/models/services/messages.service';
import { cookies } from 'next/headers';

const fetchConversationsServerFn =  async (page: number, take: number = 10): Promise<ConversationsResponse> => {
  const { accessToken } = await getAuth(cookies);
  const response = await fetchConversations({ accessToken, page, take});
  return response;
};

export default fetchConversationsServerFn;