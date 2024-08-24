'use server';

import getAuth from '~/app/test/get-auth';
import { ConversationResponse } from '../../messages/models/services/generated/message.generated';
import { fetchConversationFromUsers } from '../../messages/models/services/messages.service';

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