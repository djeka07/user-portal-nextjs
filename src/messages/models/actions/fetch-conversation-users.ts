'use server';

import getAuth from '~/auth/models/helpers/get-auth';
import { ConversationUserResponse } from '../services/generated/message.generated';
import { fetchConversationUsers } from '../services/messages.service';

const fetchConversationUsersServerFn = async (id: string): Promise<ConversationUserResponse> => {
  const { accessToken } = await getAuth();
  const response = await fetchConversationUsers({ accessToken, id });
  return response;
};


export default fetchConversationUsersServerFn;