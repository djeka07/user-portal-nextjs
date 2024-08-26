'use server';
import { ActionReturn } from '~/common/models/types/actions';
import { MessageReponse } from '../services/generated/message.generated';
import { CreateConversationMessageRequestParams } from '../services/message.service.types';
import { createConversationMessage } from '../services/messages.service';
import getAuth from '~/auth/models/helpers/get-auth';

const createMessageFormAction = async (_: unknown, form: FormData): Promise<ActionReturn<MessageReponse>> => {
  const {  accessToken } = await getAuth();
  const id = String(form.get('id'));
  const message = String(form.get('message'));
  const request: CreateConversationMessageRequestParams = {
    accessToken,
    id,
    message,
  };
  const response = await createConversationMessage(request);
  return {
    statusCode: 200,
    data: response
  }
};

export default createMessageFormAction