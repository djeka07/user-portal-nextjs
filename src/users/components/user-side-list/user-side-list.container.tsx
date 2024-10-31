'use client';
import { useEffect, useState, useCallback } from 'react';
import { useSocket } from '~/common/models/hooks';
import { ProgressState } from '~/common/models/types/fetch.state';
import fetchUsersAction from '~/users/models/actions/fetch-users';
import { UsersResponse } from '~/users/models/services/generated/user.generated';
import UserList from './user-side-list';

type UserSideListContainerProps = {
  id?: string;
};

const UserSideListContainer = ({ id }: UserSideListContainerProps) => {
  const { loggedInUsers } = useSocket();

  const [page] = useState(1);
  const [state, setState] = useState<ProgressState<UsersResponse>>({ state: 'pending' });

  const fetch = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, state: page === 1 ? 'pending' : 'repending' }));
      const users = await fetchUsersAction(page, 20);
      setState((prev) => ({ ...prev, data: users, state: 'ready' }));
      return users;
    } catch {
      setState((prev) => ({ ...prev, error: 'Could not fetch users', state: 'errored' }));
    }
  }, [page]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return <UserList loggedInUsers={loggedInUsers} selectedUserId={id} state={state} />;
};

export default UserSideListContainer;
