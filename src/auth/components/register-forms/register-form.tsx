'use client';

import { Button, TextInput } from '@djeka07/ui/src/components/atoms/inputs';
import { Message } from '@djeka07/ui/src/components/atoms/messages';
import { useActionState } from 'react';
import { useTranslation } from '~/app/i18n/client';
import { Link } from '~/common/components/links';
import { buttonWrapper, form, inputs, link } from './register-form.css';
import { ActionReturn } from '~/common/models/types/actions';
import { createQueryParams } from '~/common/models/helpers/query';

type RegisterFormProps = {
  action: (state: unknown, form: FormData) => Promise<ActionReturn>;
  email?: string;
};

const RegisterForm = ({ action, email }: RegisterFormProps) => {
  const { t, language } = useTranslation('register');
  const queryParams = createQueryParams({ email }, { skipNulls: true, addQueryPrefix: true, encodeValuesOnly: true });
  const [state, formAction, pending] = useActionState(action, { statusCode: undefined });
  console.log(state);
  return (
    <form className={form} action={formAction}>
      <div className={inputs}>
        <input type="hidden" name="language" value={language} />
        <TextInput
          type="email"
          autoComplete="email"
          label={t('login:form:email:label')}
          placeholder={t('login:form:email:placeholder')}
          error={state.errors?.email?.[0] ? t(state.errors.email[0]) : undefined}
          name="email"
          value={email}
        />
        <TextInput
          type="text"
          autoComplete="firstname"
          label={t('register:form:first-name:label')}
          placeholder={t('register:form:first-name:placeholder')}
          error={state.errors?.firstName?.[0] ? t(state.errors.firstName[0]) : undefined}
          name="firstName"
        />
        <TextInput
          type="text"
          autoComplete="lastname"
          label={t('register:form:last-name:label')}
          placeholder={t('register:form:last-name:placeholder')}
          error={state.errors?.lastName?.[0] ? t(state.errors.lastName[0]) : undefined}
          name="lastName"
        />
        <TextInput
          type="password"
          autoComplete="new-password"
          label={t('login:form:password:label')}
          placeholder={t('login:form:password:placeholder')}
          error={state.errors?.password?.[0] ? t(state.errors.password[0]) : undefined}
          name="password"
        />
        <TextInput
          type="password"
          autoComplete="new-password"
          label={t('register:form:confirm-password:label')}
          placeholder={t('register:form:confirm-password:placeholder')}
          error={state.errors?.confirmPassword?.[0] ? t(state.errors.confirmPassword[0]) : undefined}
          name="confirmPassword"
        />
      </div>
      <Message error show={!!state?.errors?.['x-request-id']?.[0]}>
        {t('form:register:error', { requestId: state.errors?.['x-request-id']?.[0] || '' })}
      </Message>
      <Message success show={state?.statusCode === 200}>
        {t('form:register:success')}
      </Message>
      <div className={buttonWrapper}>
        <Button isLoading={pending} type="submit">
          {t('register:button')}
        </Button>
        <Link className={link} href={`/${language}/login${queryParams}`}>
          {t('login:title')}
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
