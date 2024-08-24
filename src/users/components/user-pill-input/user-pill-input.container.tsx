'use client';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { UserResponse, UsersResponse } from '~/users/models/services/generated/user.generated';
import { searchUsers } from '~/users/models/services/user.service';
import UserPillInput from './user-pill-input';
import { ProgressState } from '~/common/models/types/fetch.state';
import { useState } from 'react';
import searchUsersServerFn from '~/users/models/servers/search-users';

type UserPillInputContainerProps = {
  selectedUsers: UserResponse[];
  onDeleteUser: (id: string) => Promise<void>;
  onSelectUser: (user: UserResponse) => Promise<void>;
};

const UserPillInputContainer = (props: UserPillInputContainerProps) => {
  const [state, setState] = useState<ProgressState<UsersResponse>>({ state: 'initial' });

  const onInputChange = async (value: string) => {
    try {
      setState((prev) => ({ ...prev, state: 'pending' }));
      const response = await searchUsersServerFn(value, 1, 10);
      setState((prev) => ({ ...prev, state: 'ready', data: response }));
    } catch (error) {
      setState((prev) => ({ ...prev, state: 'errored', error }));
    }
  };

  const onDeletePill = (id: string) => {
    props.onDeleteUser(id);
  };

  const onUserClick = async (user: UserResponse) => {
    props.onSelectUser(user);
    setState({ state: 'initial' });
  };

  return (
    <UserPillInput
      onDelete={onDeletePill}
      onInputChange={onInputChange}
      onUserClick={onUserClick}
      pills={props.selectedUsers.map((u) => ({ id: u.id, label: `${u.firstName} ${u.lastName}` }))}
      state={state}
    />
  );
};

export default UserPillInputContainer;
