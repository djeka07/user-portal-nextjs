import MessagesView from '~/messages/views/messages/messages.view';

type MessagesPageProps = {
  params: Promise<{ lng: string }>;
};

const MessagesPage = async ({ params }: MessagesPageProps) => {
  const { lng } = await params;
  return <MessagesView language={lng} />;
};

export default MessagesPage;
