'use client';
import { root } from '../user-form/user-form.css';
import { buttonWrapper } from './edit-password-form.css';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { Button, TextInput } from '@djeka07/ui';
import { useTranslation } from '~/app/i18n/client';
import { ActionReturn } from '~/common/models/types/actions';
import { useActionState } from 'react';

type EditPasswordFormProps = {
  action: (_: unknown, formData: FormData) => Promise<ActionReturn>;
  user: UserResponse;
  onCancel?: () => void;
  onSuccess?: () => void;
};

const EditPasswordForm = ({ user, action, onCancel }: EditPasswordFormProps) => {
  const [state, formAction, pending] = useActionState(action, {});
  const { t } = useTranslation();

  return (
    <form className={root} action={formAction}>
      <TextInput
        autoComplete="username"
        name="email"
        disabled
        label={t('form:login:input:email:label')}
        type="email"
        value={user.email}
      />
      <TextInput
        autoComplete="current-password"
        type="password"
        label={t('users:user-view:actions:edit-password:form:update-password:current-password:label')}
        placeholder={t('users:user-view:actions:edit-password:form:update-password:current-password:placeholder')}
        name="currentPassword"
      />
      <TextInput
        autoComplete="new-password"
        type="password"
        label={t('login:form:password:label')}
        placeholder={t('login:form:password:placeholder')}
        name="password"
      />
      <TextInput
        autoComplete="new-password"
        type="password"
        label={t('register:form:confirm-password:label')}
        placeholder={t('register:form:confirm-password:placeholder')}
        name="confirmPassword"
      />
      <div className={buttonWrapper}>
        <Button size="small" isLoading={pending} success>
          {t('common:button:update')}
        </Button>
        <Button size="small" onClick={onCancel} error>
          {t('common:button:cancel')}
        </Button>
      </div>
    </form>
  );
};

export default EditPasswordForm;
