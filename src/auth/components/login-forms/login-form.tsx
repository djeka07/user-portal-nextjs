'use client';
import { Button, Message, TextInput } from '@djeka07/ui';
import { buttonWrapper, form, link, linkWrapper, message } from './login.form.css';
import { useActionState } from 'react';
import { useTranslation } from '~/app/i18n/client';
import { Link } from '~/common/components/links';
import { createQueryParams } from '~/common/models/helpers/query';

type LoginFormProps = {
  redirectTo?: string;
  email?: string;
  action: (state: any, form: FormData) => any;
};

const LoginForm = ({ action, redirectTo, email }: LoginFormProps) => {
  const { t, language } = useTranslation();
  const [state, formAction, pending] = useActionState(action, null);
  const queryParams = createQueryParams({ email }, { skipNulls: true, addQueryPrefix: true, encodeValuesOnly: true });
  return (
    <form className={form} action={formAction}>
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <input type="hidden" name="language" value={language} />
      <TextInput
        type="text"
        autoComplete="email"
        value={email}
        label={t('login:form:email:label')}
        placeholder={t('login:form:email:placeholder')}
        error={state?.errors?.email?.[0] ? t(state.errors.email[0]) : undefined}
        name="email"
      />
      <TextInput
        type="password"
        label={t('login:form:password:label')}
        autoComplete="current-password"
        placeholder={t('login:form:password:placeholder')}
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
          <Link className={link} href={`/${language}/register${queryParams}`}>
            {t('login:links:not-a-user')}
          </Link>
          <Link className={link} href={`/${language}/reset${queryParams}`}>
            {t('login:links:forgot')}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
