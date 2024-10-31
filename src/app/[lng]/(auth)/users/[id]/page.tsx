import { Suspense } from 'react';
import fetchUserAction from '~/users/models/actions/fetch-user';
import { UserView } from '~/users/views';

type UserPageProps = {
  params: Promise<{ id: string }>;
};

const UserPage = async ({ params }: UserPageProps) => {
  const { id } = await params;
  const user = await fetchUserAction(id);

  return (
    <Suspense>
      <UserView user={user} />
    </Suspense>
  );
};

export default UserPage;
