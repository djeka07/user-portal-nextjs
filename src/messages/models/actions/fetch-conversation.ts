'use server';
import getAuth from '~/auth/models/helpers/get-auth';
import { ConversationResponse } from '../services/generated/message.generated';
import { fetchConversation } from '../services/messages.service';
import { deleteSession } from '~/auth/models/helpers/session';

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