'use server';

import getAuth from '~/app/test/get-auth';
import { ConversationResponse } from '../../messages/models/services/generated/message.generated';
import { CreateConversationRequestParams } from '../../messages/models/services/message.service.types';
import { createConversation } from '../../messages/models/services/messages.service';

const createConversationFormAction = async (userIds: string[], form: FormData): Promise<ConversationResponse> => {
  const { accessToken } = await getAuth();
  const message = String(form.get('message'));
  const request: CreateConversationRequestParams = {
    accessToken,
    userIds,
    message
  };
  const response = await createConversation(request);
  return response;
};

export default createConversationFormAction;
