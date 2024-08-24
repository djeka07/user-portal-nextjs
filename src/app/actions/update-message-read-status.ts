'use server';

import getAuth from '~/app/test/get-auth';
import { MessageReponse } from '../../messages/models/services/generated/message.generated';
import { updateMessageReadStatus } from '../../messages/models/services/messages.service';

const updateMessageReadStatusServerFn =  async (id: string, messageIds: string[]): Promise<MessageReponse[]> => {
  const { accessToken } = await getAuth();
  const response = await updateMessageReadStatus({ accessToken, id, messageIds });
  return response;
};

export default updateMessageReadStatusServerFn;