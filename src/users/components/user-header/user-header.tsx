import { UserResponse } from '~/users/models/services/generated/user.generated';
import { useState } from 'react';
import { UserActions } from './components/user-actions';
import { nameAndRolesWrapper, rolesWrapper, root } from './user-header.css';
import { isEmpty } from '@djeka07/utils';
import { Button, For, Icon, Typography, PanelContainer, PanelSize, PanelContent } from '@djeka07/ui';
import { useTranslation } from '~/app/i18n/client';

type UserHeaderProps = {
  user: UserResponse;
  isAdmin: boolean;
  isCurrentUser: boolean;
};

const UserHeader = ({ isAdmin, isCurrentUser, user }: UserHeaderProps) => {
  const { t } = useTranslation();
  const [showUserActions, setShowUserActions] = useState(false);

  return (
    <div className={root}>
      <div className={nameAndRolesWrapper}>
        <div
          className={rolesWrapper}
          title={`${t('form.user.input.roles.label')}: ${user.roles?.map((r) => r.name)?.join(', ')}`}
        >
          <div>
            <Icon size="normal" color="heading" name={isEmpty(user.roles) ? 'Slash' : 'User'} />
          </div>
          <For each={user.roles} keyed="id" fallback={<span>No roles</span>}>
            {(item, index) => (
              <Typography variant="label">
                {item.name}
                {index !== user.roles?.length - 1 && ','}
              </Typography>
            )}
          </For>
        </div>
        <Typography variant="h1">
          {user.firstName} {user.lastName}
        </Typography>
      </div>
      {(isCurrentUser || isAdmin) && (
        <Button
          label={t('common:button:actions')}
          align="center"
          justify="center"
          size="small"
          onClick={() => setShowUserActions(true)}
        >
          {t('common:button:actions')}
          <Icon color="white" name="Menu" />
        </Button>
      )}
      {showUserActions && (
        <PanelContainer
          panelElementProps={{ maxWidth: PanelSize.Small, showCloseButton: true, closeOnEscape: true }}
          afterPanelClosed={() => setShowUserActions(false)}
        >
          <PanelContent title={t('common:button:actions')}>
            <UserActions user={user} />
          </PanelContent>
        </PanelContainer>
      )}
    </div>
  );
};

export default UserHeader;
