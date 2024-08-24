import { ConversationFetchState, ConversationState } from '~/messages/models/contexts/conversation.state';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { ConversationsResponse } from '../../models/services/generated/message.generated';
import { Conversations, ConversationsSkeleton } from './components/conversations';
import { headingWrapper, svg } from './conversation-list.css';
import { useTranslation } from '~/app/i18n/client';
import { Icon, Match, Message, Switch, Typography } from '@djeka07/ui';
import { Link } from '~/common/components/links';

type ConversationListProps = {
  conversations?: ConversationsResponse;
  selectedConversationId?: string;
  user?: UserResponse;
  state: ConversationFetchState;
  items: ConversationState[];
  total: number;
};

const ConversationList = (props: ConversationListProps) => {
  const { t, language } = useTranslation();
  return (
    <>
      <div className={headingWrapper}>
        <Typography variant="h4">{t('messages:conversation-list:title')}</Typography>
        <Link title={t('messages.conversation-list.create-new')} href={`/${language}/messages/new`}>
          <Icon className={svg} name="Edit" />
        </Link>
      </div>
      <Switch expression={props.state}>
        <Match when="pending">
          <>
            <ConversationsSkeleton />
            <ConversationsSkeleton />
            <ConversationsSkeleton />
          </>
        </Match>
        <Match when="errored">
          <Message error border={false} direction="column">
            Could not fetch messages
          </Message>
        </Match>
        <Match when="ready">
          <Conversations
            user={props.user}
            selectedConversationId={props.selectedConversationId}
            items={props.items || []}
            total={props.total || 0}
          />
        </Match>
      </Switch>
    </>
  );
};

export default ConversationList;
