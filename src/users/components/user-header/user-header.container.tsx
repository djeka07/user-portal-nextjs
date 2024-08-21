'use client';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import UserHeader from './user-header';

type UserHeaderContainerProps = {
  user: UserResponse;
};

const UserHeaderContainer = ({ user }: UserHeaderContainerProps) => {
  const [state, { isAdmin }] = useAuth();
  return <UserHeader user={user} isAdmin={isAdmin()} isCurrentUser={state.user?.id === user?.id} />;
};

export default UserHeaderContainer;
