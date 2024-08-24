import MessagesView from '~/messages/views/messages/messages.view';

type MessagesPageProps = {
  params: { lng: string };
};

const MessagesPage = ({ params: { lng } }: MessagesPageProps) => {
  return <MessagesView language={lng} />;
};

export default MessagesPage;
