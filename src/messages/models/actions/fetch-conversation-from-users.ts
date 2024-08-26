'use server';

import getAuth from '~/auth/models/helpers/get-auth';
import { ConversationResponse } from '../services/generated/message.generated';
import { fetchConversationFromUsers } from '../services/messages.service';

const fetchConversationFromUsersServerFn = async (ids: string[]): Promise<ConversationResponse> => {
  const { accessToken} = await getAuth();
  const request = {
    accessToken,
    userIds: ids,
  };

  const response = await fetchConversationFromUsers(request);
  return response;
};

export default fetchConversationFromUsersServerFn;