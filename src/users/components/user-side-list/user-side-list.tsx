import { Icon, Match, Message, PanelContainer, PanelContent, PanelSize, Switch, Typography } from '@djeka07/ui';
import { sortBy } from '@djeka07/utils';
import { useMemo, useState } from 'react';
import { useTranslation } from '~/app/i18n/client';
import { AdminContainer } from '~/auth/components/admins';
import Skeleton from '~/common/components/skeleton/skeleton';
import { ProgressState } from '~/common/models/types/fetch.state';
import { SessionInformation } from '~/common/models/types/user.session';
import { UsersResponse } from '~/users/models/services/generated/user.generated';
import { CreateUserFormContainer } from '../create-user-form';
import { Users } from './components/users';
import { headingWrapper, panelContent, svg } from './user-side-list.css';
import { UsersSideList } from './components/users/users';

type UserListProps = {
  loggedInUsers: SessionInformation[];
  selectedUserId?: string;
  state: ProgressState<UsersResponse>;
};

const UserSideList = ({ loggedInUsers, state, selectedUserId }: UserListProps) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const users = useMemo(
    () =>
      sortBy<UsersSideList>(
        (state?.data?.users || []).map((u) => {
          const loggedInUser = loggedInUsers?.find((l) => l.user?.userId === u.id);
          return {
            ...u,
            ...(loggedInUser || { online: false }),
          };
        }),
        'online',
      ).reverse(),
    [state?.data?.users, loggedInUsers],
  );

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  const onCreateUserSuccess = (closePanel: () => void): void => {
    setTimeout(() => {
      closePanel();
    }, 500);
  };

  return (
    <>
      <div className={headingWrapper}>
        <Typography transform="capitalize" overflow="ellipsis" whiteSpace="noWrap" variant="h4">
          {t('users:users-view:title')}
        </Typography>
        <AdminContainer>
          <Icon onClick={toggleShow} className={svg} name="Plus" />
          {show && (
            <PanelContainer
              panelElementProps={{ maxWidth: PanelSize.Xsmall, closeOnEscape: true, showCloseButton: true }}
              afterPanelClosed={() => setShow(false)}
            >
              {(props) => (
                <PanelContent className={panelContent}>
                  <CreateUserFormContainer
                    onCancel={() => props.closePanel()}
                    onSuccess={() => onCreateUserSuccess(props.closePanel)}
                  />
                </PanelContent>
              )}
            </PanelContainer>
          )}
        </AdminContainer>
      </div>
      <Switch expression={state.state}>
        <Match when="pending">
          <Skeleton amount={10} />
        </Match>
        <Match when="errored">
          <Message error border={false} direction="column">
            Could not fetch users
          </Message>
        </Match>
        <Match when="ready">
          <Users selectedUserId={selectedUserId} users={users || []} total={state?.data?.total || 0} />
        </Match>
      </Switch>
    </>
  );
};

export default UserSideList;
