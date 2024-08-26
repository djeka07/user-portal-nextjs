'use server';

import getAuth from '~/auth/models/helpers/get-auth';
import { MessageReponse } from '../services/generated/message.generated';
import { updateMessageReadStatus } from '../services/messages.service';

const updateMessageReadStatusServerFn =  async (id: string, messageIds: string[]): Promise<MessageReponse[]> => {
  const { accessToken } = await getAuth();
  const response = await updateMessageReadStatus({ accessToken, id, messageIds });
  return response;
};

export default updateMessageReadStatusServerFn;