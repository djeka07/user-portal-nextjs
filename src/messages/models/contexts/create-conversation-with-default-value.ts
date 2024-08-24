import { ConversationState } from './conversation.state';
const createConversationWithDefaultValue =  (partial?: Partial<ConversationState>): ConversationState => ({
  isGroup: false,
  users: [],
  conversationName: undefined,
  hasNextPage: false,
  state: 'initial',
  items: [],
  page: 1,
  total: 0,
  ...(partial || {}),
});


export default createConversationWithDefaultValue;