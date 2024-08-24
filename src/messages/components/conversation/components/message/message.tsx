'use client';
import {
  MessageReponse,
  UserResponse as MsgUserResponse,
} from '~/messages/models/services/generated/message.generated';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { badge, badgeMessageWrapper, message, messageWrapper, userWrapper } from './message.css';
import { useTranslation } from '~/app/i18n/client';
import { useState } from 'react';
import { For, PanelContainer, PanelContent, PanelPosition, PanelSize, Typography, UserBadge } from '@djeka07/ui';
import { createDate, formatDate } from '~/common/models/helpers/date';
import { isEmpty } from '@djeka07/utils';

type MessageProps = {
  item: MessageReponse;
  currentUser?: UserResponse;
  users?: MsgUserResponse[];
  isGroup?: boolean;
  index: number;
  isLastMessage: boolean;
};

const Message = ({ index, isLastMessage, item, currentUser, isGroup, users }: MessageProps) => {
  const { t } = useTranslation();
  const [showReadPanel, setShowReadPanel] = useState(false);
  return (
    <>
      <Typography align="center" color="grey500" size="xsmall">
        {createDate(item.createdAt).format('lll')}
      </Typography>
      <div
        className={messageWrapper({ user: item?.from?.userId === currentUser?.id ? 'current' : undefined })}
        id={index === 0 ? 'fetchRef' : undefined}
      >
        {item?.from?.userId !== currentUser?.id && (users?.length || 0) > 2 && (
          <Typography color="grey500" size="xsmall">
            {item.from.firstName}
          </Typography>
        )}
        <div className={badgeMessageWrapper}>
          {item.from?.userId !== currentUser?.id && <UserBadge className={badge} user={item.from} />}
          <div
            id={item.messageId}
            className={message({ user: item.from?.userId === currentUser?.id ? 'current' : undefined })}
          >
            {item.message}
          </div>
        </div>
        {isLastMessage && !isEmpty(item?.readBy) && (
          <div className={userWrapper({ isGroup })} onClick={isGroup ? () => setShowReadPanel(true) : undefined}>
            <For each={item?.readBy} keyed={(item) => `${item.readAt}-${item.user.userId}`}>
              {(user) => (
                <UserBadge
                  text={t('messages.conversation.seen-by-text', {
                    name: user?.user?.firstName,
                    date: formatDate(createDate(user?.readAt)),
                  })}
                  size="small"
                  user={user?.user}
                />
              )}
            </For>
          </div>
        )}
      </div>
      {showReadPanel && (
        <PanelContainer
          afterPanelClosed={() => setShowReadPanel(false)}
          overlayElementProps={{ shouldCloseOnClick: true }}
          panelElementProps={{
            showCloseButton: true,
            closeOnEscape: true,
            panelPosition: PanelPosition.Center,
            maxWidth: PanelSize.Small,
          }}
        >
          <PanelContent title={t('messages.conversation.seen-by')} centerTitle>
            Hej
          </PanelContent>
        </PanelContainer>
      )}
    </>
  );
};

export default Message;
