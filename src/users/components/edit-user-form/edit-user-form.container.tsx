'use client';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { UserForm } from '../user-form';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { useMemo } from 'react';
import { useTranslation } from '~/app/i18n/client';
import editUserAction from '~/users/models/actions/edit-user';

type UpdateUserFormContainerProps = {
  user: UserResponse;
  hideTitle?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
};

const EditUserFormContainer = ({ user, hideTitle, onCancel, onSuccess }: UpdateUserFormContainerProps) => {
  const [state] = useAuth();
  const { t } = useTranslation();
  const form = useMemo(
    () =>
      !!user
        ? {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles.map((r) => r.id),
          }
        : undefined,
    [user],
  );

  return (
    <UserForm
      onCancel={onCancel}
      onSuccess={onSuccess}
      successText={t('form:user:success:update')}
      errorText={t('form:user:error:update')}
      submitText={t('common:button:update')}
      action={editUserAction}
      form={form}
      roles={state.roles}
      title={hideTitle ? undefined : t('form:user:title:update')}
    />
  );
};

export default EditUserFormContainer;
