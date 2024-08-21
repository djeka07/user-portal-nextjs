'use client';
import { useCallback, useState } from 'react';
import { EditUserFormContainer } from '~/users/components/edit-user-form';
import { ResetUserPasswordForm } from '~/users/components/reset-user-password-form';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { root } from './user-actions.css';
import { EditPasswordForm } from '~/users/components/edit-password-form';
import { ActionButton, Match, PanelContainer, PanelContent, PanelSize, Switch } from '@djeka07/ui';
import { useTranslation } from '~/app/i18n/client';
import editUserPasswordAction from '~/users/models/actions/edit-user-password';
import resetUserPasswordAction from '~/users/models/actions/reset-user-password';

type Actions = undefined | 'edit' | 'reset' | 'edit_password';

type UserActionsProps = {
  user: UserResponse;
};

const UserActions = ({ user }: UserActionsProps) => {
  const { t } = useTranslation();
  const [selectedAction, setSelectedAction] = useState<Actions>();

  const onSuccess = useCallback((closePanel: () => void) => {
    setTimeout(() => closePanel(), 1000);
  }, []);

  return (
    <>
      <div className={root}>
        <ActionButton
          iconName="Edit"
          onClick={() => setSelectedAction('edit')}
          description={t('users:user-view:actions:edit:text')}
        >
          {t('users:user-view:actions:edit:title')}
        </ActionButton>
        <ActionButton
          iconName="Edit"
          onClick={() => setSelectedAction('edit_password')}
          description={t('users:user-view:actions:edit-password:text')}
        >
          {t('users:user-view:actions:edit-password:title')}
        </ActionButton>
        <ActionButton
          iconName="Repeat"
          onClick={() => setSelectedAction('reset')}
          description={t('users:user-view:actions:reset:text')}
        >
          {t('users:user-view:actions:reset:title')}
        </ActionButton>
      </div>
      {!!selectedAction && (
        <PanelContainer
          afterPanelClosed={() => setSelectedAction(undefined)}
          panelElementProps={{
            maxWidth: PanelSize.Xsmall,
            closeOnEscape: true,
          }}
        >
          {(panelProps) => (
            <Switch expression={selectedAction}>
              <Match when="edit">
                <PanelContent title={t('form:user:title:update')}>
                  <EditUserFormContainer
                    user={user}
                    hideTitle
                    onCancel={() => panelProps.closePanel()}
                    onSuccess={() => onSuccess(panelProps.closePanel)}
                  />
                </PanelContent>
              </Match>
              <Match when="edit_password">
                <PanelContent title={t('form:user:title:update')}>
                  <EditPasswordForm
                    user={user}
                    action={editUserPasswordAction}
                    onCancel={() => panelProps.closePanel()}
                    onSuccess={() => onSuccess(panelProps.closePanel)}
                  />
                </PanelContent>
              </Match>
              <Match when="reset">
                <PanelContent background="dark" centerContent>
                  <ResetUserPasswordForm
                    action={resetUserPasswordAction}
                    user={user}
                    onCancel={panelProps.closePanel}
                  />
                </PanelContent>
              </Match>
            </Switch>
          )}
        </PanelContainer>
      )}
    </>
  );
};

export default UserActions;
