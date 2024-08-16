'use client';
import { Button, Message, TextInput } from '@djeka07/ui';
import { buttonWrapper, form, link, linkWrapper, message } from './login.form.css';
import { useActionState } from 'react';
import { useTranslation } from '~/app/i18n/client';
import { Link } from '~/common/components/links';

type LoginFormProps = {
  redirectTo?: string;
  action: (state: any, form: FormData) => any;
};

const LoginForm = ({ action, redirectTo }: LoginFormProps) => {
  const { t } = useTranslation();
  const [state, formAction, pending] = useActionState(action, null);
  console.log(state)
  return (
    <form method="POST" className={form} action={formAction}>
      <TextInput type="hidden" name="redirectTo" value={redirectTo} />
      <TextInput
        type="text"
        autoComplete="email"
        label={t('login:form:email:label')}
        placeholder={t('login:form:email:placeholder')}
        error={state?.errors?.email?.[0] ? t(state.errors.email[0]) : undefined}
        name="email"
      />
      <TextInput
        type="password"
        label={t('login:form:password:label')}
        autoComplete="current-password"
        placeholder={t('form:login:input:password:placeholder')}
        error={state?.errors?.password?.[0] ? t(state.errors.password[0]) : undefined}
        name="password"
      />
      <Message className={message} icon="AlertTriangle" error show={!!state?.error}>
        {t('form:login:error')}
      </Message>
      <div className={buttonWrapper}>
        <Button type="submit" isLoading={pending}>
          {t('login:title')}
        </Button>
        <div className={linkWrapper}>
          <Link className={link} href="/register">
            {t('login:links:not-a-user')}
          </Link>
          <Link className={link} href="/reset">
            {t('login:links:forgot')}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
