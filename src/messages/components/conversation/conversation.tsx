import { MessageFormContainer } from './components/message-form';
import { MessagesContainer } from './components/messages';
import { ParticipantsHeaderContainer } from './components/participants-header';
import { wrapper } from './conversion.css';

type ConversationProps = {
  id: string;
};

const Conversation = ({ id }: ConversationProps) => {
  return (
    <div className={wrapper}>
      <ParticipantsHeaderContainer id={id} />
      <MessagesContainer id={id} />
      <MessageFormContainer id={id} />
    </div>
  );
};

export default Conversation;
