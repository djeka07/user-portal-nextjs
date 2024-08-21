'use client';
import UserList from './user-side-list';
import { useParams } from 'next/navigation';
import { ProgressState } from '~/common/models/types/fetch.state';
import { useEffect, useState } from 'react';
import { useSocket } from '~/common/models/hooks';
import { UsersResponse } from '~/users/models/services/generated/user.generated';
import fetchUsersAction from '~/users/models/actions/fetch-users';

type UserSideListContainerProps = {
  selectedUserId?: string;
};

const UserSideListContainer = ({ selectedUserId }: UserSideListContainerProps) => {
  const { loggedInUsers } = useSocket();
  const params = useParams();
  const [page] = useState(1);
  const [state, setState] = useState<ProgressState<UsersResponse>>({ state: 'pending' });

  const fetch = async () => {
    try {
      setState((prev) => ({ ...prev, state: page === 1 ? 'pending' : 'repending' }));
      const users = await fetchUsersAction(page, 20);
      setState((prev) => ({ ...prev, data: users, state: 'ready' }));
      return users;
    } catch {
      setState((prev) => ({ ...prev, error: 'Could not fetch users', state: 'errored' }));
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return <UserList loggedInUsers={loggedInUsers} selectedUserId={params.id as string} state={state} />;
};

export default UserSideListContainer;
