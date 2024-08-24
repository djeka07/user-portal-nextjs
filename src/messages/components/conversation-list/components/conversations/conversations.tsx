import { ConversionMessageResponse } from '~/messages/models/services/generated/message.generated';
import { UserResponse } from '~/users/models/services/generated/user.generated';

import { For, UserBadges } from '@djeka07/ui';
import { subString } from '@djeka07/utils';
import { useTranslation } from '~/app/i18n/client';
import { Link } from '~/common/components/links';
import { createDate } from '~/common/models/helpers/date';
import { ConversationState } from '~/messages/models/contexts/conversation.state';
import {
  conversationItem,
  conversationName,
  lastMessage,
  lastMessageTime,
  lastMessageWrapper,
  messages,
  numberOfConversations,
} from './conversations.css';

type ConversationsProps = {
  items: ConversationState[];
  user?: UserResponse;
  selectedConversationId?: string;
  total: number;
};

const Conversations = ({ items, total, selectedConversationId, user }: ConversationsProps) => {
  const { t, language } = useTranslation();

  const getConversationName = (item: ConversationState): string => {
    if (item.conversationName) {
      return item.conversationName;
    }

    if (item?.users?.length === 1) {
      const [user] = item.users;
      return `${user.firstName} ${user.lastName}`;
    }

    const filtered = item?.users?.filter((u) => u.userId !== user?.id) || [];
    return filtered.map((u) => `${u.firstName} ${u.lastName}`).join(', ');
  };

  const getLastMessage = (item: ConversationState): string => {
    return `${item?.lastMessage?.from === user?.id ? t('common:label:you') : ''} ${subString(
      item.lastMessage?.message,
      30,
    )}`;
  };

  const getDate = (lastMessage?: ConversionMessageResponse): string => {
    if (!lastMessage) {
      return '';
    }
    const day = createDate(lastMessage?.createdAt);
    return day.fromNow();
  };
  return (
    <>
      <div className={messages}>
        <For each={items} keyed="conversationId">
          {(item) => {
            const badgeUsers = (item?.users || [])
              ?.filter((u) => (item.users?.length === 1 ? true : u.userId !== user?.id))
              ?.slice(0, 2);

            return (
              <Link
                title={t('messages:conversation-list:messages-with', {
                  users: badgeUsers?.map((u) => `${u.firstName} ${u.lastName}`).join(', '),
                })}
                href={`/${language}/messages/${item.conversationId}`}
                className={conversationItem({
                  selected: selectedConversationId === item.conversationId,
                })}
              >
                <UserBadges items={badgeUsers} />
                <div className={lastMessageWrapper}>
                  <div className={conversationName}>{getConversationName(item)}</div>
                  <div>
                    {!!item?.lastMessage && <div className={lastMessage}>{getLastMessage(item)}</div>}
                    <div className={lastMessageTime}>{getDate(item.lastMessage)}</div>
                  </div>
                </div>
              </Link>
            );
          }}
        </For>
      </div>
      <div className={numberOfConversations}>
        {t('messages:conversation-list:number-of-messages', { count: `${total}` })}
      </div>
    </>
  );
};

export default Conversations;
