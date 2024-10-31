'use client';
import { UsersFormPart } from './components/users-form-part';
import { ApplicationFormPart } from './components/applications-form-part';
import { buttonWrapper } from './users-access-form.css';
import { useTranslation } from '~/app/i18n/client';
import { useActionState } from 'react';
import { ActionReturn } from '~/common/models/types/actions';
import { AppResponse, GetApplicationsResponse, UsersResponse } from '~/users/models/services/generated/user.generated';
import { Button, Match, Switch } from '@djeka07/ui';

type UserAccessListProps = {
  users: UsersResponse;
  appData: GetApplicationsResponse;
  action: (_: unknown, formData: FormData) => Promise<ActionReturn>;
  onSuccess: () => void;
};

const UserAccessForm = ({ action, appData, users, onSuccess }: UserAccessListProps): JSX.Element => {
  const { t } = useTranslation();
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <div>
      <form action={formAction} method="post">
        <input type="hidden" name="access" value="true" />
        <ApplicationFormPart
          applications={appData?.applications as AppResponse[]}
          errors={state.errors?.applications}
        />
        <UsersFormPart errors={state.errors?.users} users={users} />
        <div className={buttonWrapper}>
          <Button label={t('common.button.update')} size="small" disabled={(users?.total || 0) === 0} type="submit">
            {t('common.button.update')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserAccessForm;
