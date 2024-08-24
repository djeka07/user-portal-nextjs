'use server';
import getAuth from '~/app/test/get-auth';
import { ConversationResponse } from '../../messages/models/services/generated/message.generated';
import { fetchConversation } from '../../messages/models/services/messages.service';
import { deleteSession } from '~/app/test/session';

const fetchConversationServerFn =  async (id: string): Promise<ConversationResponse> => {
  try {
    const { accessToken } = await getAuth();
    const response = await fetchConversation({ accessToken, id });
    return response;
  } catch (error) {
    const redirect = await deleteSession();
    throw redirect;
  }
};

export default fetchConversationServerFn;