import { MessageView } from '~/messages/views';

type MessagePageProps = {
  params: { id: string };
};

const MessagePage = ({ params: { id } }: MessagePageProps) => <MessageView id={id} />;
export default MessagePage;
