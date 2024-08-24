import { ReactNode } from 'react';
import { AsideLayout } from '~/common/components/layouts';
import { ConversationListContainer } from '~/messages/components/conversation-list';
import { ConversationsProvider } from '~/messages/models/contexts/conversations.context';

type MessagesLayoutProps = {
  params: { id?: string };
  children: ReactNode;
};

const MessagesLayout = ({ params, children }: MessagesLayoutProps) => (
  <ConversationsProvider id={params.id}>
    <AsideLayout asideRender={<ConversationListContainer />}>{children}</AsideLayout>
  </ConversationsProvider>
);

export default MessagesLayout;
