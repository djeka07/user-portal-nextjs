'use client';
import { UserResponse } from '~/users/models/services/generated/user.generated';

import { isEmpty } from '@djeka07/utils';
import { useState } from 'react';
import { useTranslation } from '~/app/i18n/client';
import { ProgressState } from '~/common/models/types/fetch.state';
import { useConversations } from '~/messages/models/hooks/use-conversations';
import fetchConversationFromUsers from '~/messages/models/actions/fetch-conversation-from-users';
import { ConversationResponse } from '../../models/services/generated/message.generated';
import { newMessageWrapper, root, wrapper } from './new-message.view.css';
import { Match, Spinner, Switch, Typography } from '@djeka07/ui';
import { ConversationFormContainer } from '~/messages/components/conversation/components/conversation-form';
import { UserPillInputContainer } from '~/users/components/user-pill-input';
import { MessagesContainer } from '~/messages/components/conversation/components/messages';

const NewMessageView = () => {
  const { t } = useTranslation();
  const [selectedUsers, setSelectedUsers] = useState<UserResponse[]>([]);
  const [, { fetchMessages }] = useConversations();
  const [conversationState, setConversationState] = useState<ProgressState<ConversationResponse>>({
    state: 'initial',
  });

  const onSelectUser = async (user: UserResponse) => {
    setSelectedUsers((prev) => [...prev, user]);
    fetchConversation();
  };

  const onDeleteUser = async (id: string) => {
    setSelectedUsers((prev) => prev.filter((u: UserResponse) => u.id !== id));
    fetchConversation();
  };

  const fetchConversation = async () => {
    try {
      setConversationState((prev) => ({ ...prev, state: 'pending' }));
      if (!isEmpty(selectedUsers)) {
        const response = await fetchConversationFromUsers(selectedUsers?.map((user) => user.id));
        setConversationState((prev) => ({ ...prev, data: response, state: 'ready' }));
        await fetchMessages(response.conversationId);
      }
    } catch (error) {
      setConversationState((prev) => ({ ...prev, data: undefined, state: 'ready' }));
    }
  };

  return (
    <div className={root}>
      <UserPillInputContainer onSelectUser={onSelectUser} selectedUsers={selectedUsers} onDeleteUser={onDeleteUser} />
      <div className={wrapper}>
        {!isEmpty(selectedUsers) && (
          <Switch expression={conversationState.state}>
            <Match when="pending">
              <Spinner />
            </Match>
            <Match when="ready">
              {conversationState.data?.conversationId ? (
                <MessagesContainer id={conversationState.data.conversationId} />
              ) : (
                <div className={newMessageWrapper}>
                  <Typography align="center" weight="bold">
                    {t('form.conversation.title')}
                  </Typography>
                </div>
              )}
            </Match>
          </Switch>
        )}
      </div>
      {!isEmpty(selectedUsers) && (
        <ConversationFormContainer
          id={conversationState.data?.conversationId}
          userIds={selectedUsers?.map((u) => u.id)}
        />
      )}
    </div>
  );
};

export default NewMessageView;
