import { ConversationState } from '~/messages/models/contexts/conversation.state';
import { UserResponse as UserClientResponse } from '~/users/models/services/generated/user.generated';
import { ParticipantList } from '../participant-list';
import { ParticipantsNames } from '../participant-names';
import { participantsWrapper, root, status, statusWrapper, wrapper } from './participants-header.css';
import { SessionInformation } from '~/common/models/types/user.session';
import { useMemo, useState } from 'react';
import {
  Button,
  Icon,
  PanelContainer,
  PanelContent,
  PanelPosition,
  PanelSize,
  Typography,
  UserBadges,
} from '@djeka07/ui';
import { isEmpty } from '@djeka07/utils';
import { useTranslation } from '~/app/i18n/client';

type ParticipantsHeaderProps = {
  currentUser?: UserClientResponse;
  conversation?: ConversationState;
  loggedInUsers: SessionInformation[];
  onBackClick: () => void;
};

const ParticipantsHeader = ({ currentUser, loggedInUsers, onBackClick, conversation }: ParticipantsHeaderProps) => {
  const { t } = useTranslation();
  const [showParticipantsPanel, setShowParticipantsPanel] = useState(false);
  const [showInformationPanel, setShowInformationPanel] = useState(false);
  const isConversationWithSelf = useMemo(
    () => conversation?.users?.every((u) => u.userId === currentUser?.id),
    [conversation?.users, currentUser?.id],
  );
  const filteredUsers = useMemo(
    () =>
      isConversationWithSelf
        ? conversation?.users || []
        : conversation?.users?.filter((u) => u?.userId !== currentUser?.id) || [],
    [conversation?.users, currentUser?.id, isConversationWithSelf],
  );
  const filteredUserIds = useMemo(() => filteredUsers.map((f) => f.userId), [filteredUsers]);
  const anyOnline = useMemo(
    () => loggedInUsers.some((u) => filteredUserIds.includes(u?.user?.userId || '')),
    [filteredUserIds, loggedInUsers],
  );
  const title = anyOnline ? t('messages:message-view:active') : t('messages:message-view:not-active');
  return (
    <>
      <div className={root}>
        <Button label={title} transparent innerClass={wrapper} onClick={() => setShowParticipantsPanel(true)}>
          <UserBadges items={filteredUsers} />
          <span className={participantsWrapper}>
            <ParticipantsNames items={filteredUsers} conversationName={conversation?.conversationName} />
            <span className={statusWrapper}>
              <span
                className={status({
                  status: anyOnline ? 'online' : undefined,
                })}
              ></span>
              <Typography as="span" variant="body" color="grey400" size="small">
                {title}
              </Typography>
            </span>
          </span>
        </Button>

        <Button label="Show" transparent onClick={() => setShowInformationPanel(true)}>
          <Icon name="AlertCircle" size="large" color="white" />
        </Button>
      </div>

      {showParticipantsPanel && !isEmpty(conversation?.users) && (
        <PanelContainer
          afterPanelClosed={() => setShowParticipantsPanel(false)}
          panelElementProps={{
            panelPosition: PanelPosition.Center,
            showCloseButton: true,
            closeOnEscape: true,
          }}
          overlayElementProps={{ shouldCloseOnClick: true }}
        >
          <PanelContent title={t('messages.conversation.participants')} centerTitle radius="medium" background="dark">
            <ParticipantList users={conversation?.users!} />
          </PanelContent>
        </PanelContainer>
      )}
      {showInformationPanel && (
        <PanelContainer
          afterPanelClosed={() => setShowInformationPanel(false)}
          panelElementProps={{
            panelPosition: PanelPosition.Right,
            maxWidth: PanelSize.Xsmall,
            showCloseButton: true,
            closeOnEscape: true,
          }}
          overlayElementProps={{ shouldCloseOnClick: true }}
        >
          <PanelContent background="light">hej</PanelContent>
        </PanelContainer>
      )}
    </>
  );
};

export default ParticipantsHeader;
