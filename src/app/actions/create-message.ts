'use server';
import { ActionReturn } from '~/common/models/types/actions';
import { MessageReponse } from '../../messages/models/services/generated/message.generated';
import { CreateConversationMessageRequestParams } from '../../messages/models/services/message.service.types';
import { createConversationMessage } from '../../messages/models/services/messages.service';
import getAuth from '~/app/test/get-auth';

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