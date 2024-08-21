import { Typography } from '@djeka07/ui';
import { AdminContainer } from '~/auth/components/admins';
import { CreateUserItem } from '~/users/components/create-user-item';
import { NoAccessUsers } from '~/users/components/no-access-users';
import { grid, root } from './users.css';
import { Suspense } from 'react';

type UsersViewProps = {
  language: string;
};

const UsersView = ({ language }: UsersViewProps) => {
  return (
    <div className={root}>
      <Typography variant="h1">Users</Typography>
      <div className={grid}>
        <AdminContainer>
          <Suspense>
            <NoAccessUsers language={language} />
          </Suspense>
        </AdminContainer>
        <CreateUserItem />
      </div>
    </div>
  );
};

export default UsersView;
