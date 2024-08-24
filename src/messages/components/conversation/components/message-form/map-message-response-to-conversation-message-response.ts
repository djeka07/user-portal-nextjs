import { ConversionMessageResponse, MessageReponse } from '~/messages/models/services/generated/message.generated';

const mapMessageResponseToConversationMessageResponse = (response: MessageReponse): ConversionMessageResponse => ({
  createdAt: response.createdAt,
  from: response.from?.userId,
  messageId: response.messageId,
  message: response.message,
  // readBy: response.readBy,
});


export default mapMessageResponseToConversationMessageResponse;