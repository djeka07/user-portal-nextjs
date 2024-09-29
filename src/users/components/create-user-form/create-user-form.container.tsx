'use client';
import { UserForm } from '../user-form';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { useTranslation } from '~/app/i18n/client';
import createUserAction from '~/users/models/actions/create-user';

type CreateUserContainerProps = {
  onCancel?: () => void;
  onSuccess?: () => void;
};

const CreateUserFormContainer = ({ onCancel, onSuccess }: CreateUserContainerProps) => {
  const [state] = useAuth();
  const { t } = useTranslation();
  return (
    <UserForm
      title={t('users:users-list:create-new')}
      successText={t('form:user:success:create')}
      errorText={t('form:user:error:create')}
      submitText={t('common:button:create')}
      action={createUserAction}
      onSuccess={onSuccess}
      onCancel={onCancel}
      roles={state.roles}
    />
  );
};

export default CreateUserFormContainer;
