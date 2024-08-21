import { root } from './users-access.css';
import { GetApplicationsResponse, UsersResponse } from '~/users/models/services/generated/user.generated';
import { UserAccessFormContainer } from '~/users/components/users-access-form';
import { Typography } from '@djeka07/ui';
import { getTranslation } from '~/app/i18n/server';

type UsersAccessViewProps = {
  language: string;
};

const UsersAccessView = async ({ language }: UsersAccessViewProps) => {
  const { t } = await getTranslation(language, 'users');
  return (
    <div className={root}>
      <Typography variant="h1">{t('users:access:title')}</Typography>
      <UserAccessFormContainer />
    </div>
  );
};

export default UsersAccessView;
