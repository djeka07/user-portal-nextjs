import { MessageView } from '~/messages/views';

type MessagePageProps = {
  params: Promise<{ id: string }>;
};

const MessagePage = async ({ params }: MessagePageProps) => {
  const { id } = await params;
  return <MessageView id={id} />;
};
export default MessagePage;
