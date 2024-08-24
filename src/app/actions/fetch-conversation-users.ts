'use server';

import getAuth from '~/app/test/get-auth';
import { ConversationUserResponse } from '../../messages/models/services/generated/message.generated';
import { fetchConversationUsers } from '../../messages/models/services/messages.service';
import { cookies } from 'next/headers';

const fetchConversationUsersServerFn = async (id: string): Promise<ConversationUserResponse> => {
  const { accessToken } = await getAuth(cookies);
  const response = await fetchConversationUsers({ accessToken, id });
  return response;
};


export default fetchConversationUsersServerFn;