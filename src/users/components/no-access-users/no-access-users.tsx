import { Button, Icon, Spinner, Typography } from '@djeka07/ui';
import { Suspense } from 'react';
import { getTranslation } from '~/app/i18n/server';
import { buttonWrapper, root, textWrapper, userWrapper, usersCount, wrapper } from './no-access-users.css';
import fetchUsersAction from '~/users/models/actions/fetch-users';
import Skeleton from '~/common/components/skeleton/skeleton';
import { Link } from '~/common/components/links';

type NoAccessUsersProps = {
  language: string;
};

const NoAccessUsers = async ({ language }: NoAccessUsersProps) => {
  const { t } = await getTranslation(language, 'users');
  const usersNoAccess = await fetchUsersAction(1, 1, false);
  return (
    <div className={root}>
      <div className={wrapper}>
        <Icon color="heading" size="xxlarge" name="Users" />
      </div>
      <div className={userWrapper}>
        <Suspense fallback={<Spinner margin="no" size="small" color="main" />}>
          <span className={usersCount}>{usersNoAccess?.total || 0}</span>
        </Suspense>
        <Typography transform="lowercase" variant="h3">
          {t('users:users-view:title')}
        </Typography>
      </div>
      <div className={textWrapper}>
        <Typography marginTop="small" size="small" align="center" fontStyle="italic" variant="body">
          <Suspense fallback={<Skeleton height="20px" amount={1} />}>
            {t('users:users-view:waiting-text', { count: usersNoAccess?.total || 0 })}
          </Suspense>
        </Typography>
      </div>
      <div className={buttonWrapper}>
        <Suspense fallback={<Button disabled>{t('users:users-view:give-access')}</Button>}>
          <Link href="">{t('users:users-view:give-access')}</Link>
        </Suspense>
      </div>
    </div>
  );
};

export default NoAccessUsers;
