'use client';
import { Button, Message, TextInput } from '@djeka07/ui';
import { useActionState } from 'react';
import { useTranslation } from '~/app/i18n/client';
import { form } from './new-password.css';
import newPasswordFromResetTokenAction from '~/app/actions/new-password';

type NewPasswordFormProps = {
  email: string;
  resetToken: string;
};

const NewPasswordForm = ({ email, resetToken }: NewPasswordFormProps) => {
  const [state, formAction, pending] = useActionState(newPasswordFromResetTokenAction, { statusCode: undefined });
  const { t } = useTranslation();

  return (
    <form className={form} action={formAction}>
      <TextInput type="hidden" name="resetToken" value={resetToken} />
      <TextInput
        autoComplete="username"
        name="email"
        disabled
        label={t('form:login:input:email:label')}
        type="email"
        value={email}
      />
      <TextInput
        name="password"
        label={t('form:login:input:password:label')}
        placeholder={t('form:login:input:password:placeholder')}
        autoComplete="new-password"
        error={state?.errors?.password?.[0] ? t(state.errors.password[0]) : undefined}
        type="password"
      />
      <TextInput
        label={t('form:register:input:confirm-password:label')}
        placeholder={t('form:register:input:confirm-password:placeholder')}
        autoComplete="new-password"
        name="confirmPassword"
        error={state?.errors?.confirmPassword?.[0] ? t(state.errors.confirmPassword[0]) : undefined}
        type="password"
      />
      {!state.statusCode ? (
        <Button isLoading={pending} type="submit">
          {t('common:button:confirm')}
        </Button>
      ) : (
        <Message success>Lösenorden är nu återställt</Message>
      )}
    </form>
  );
};

export default NewPasswordForm;
