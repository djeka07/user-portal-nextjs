'use server';

import getAuth from '~/auth/models/helpers/get-auth';
import { ConversationResponse } from '../services/generated/message.generated';
import { CreateConversationRequestParams } from '../services/message.service.types';
import { createConversation } from '../services/messages.service';

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
