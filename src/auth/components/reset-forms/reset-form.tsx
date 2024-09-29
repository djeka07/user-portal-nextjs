'use client';
import { Button, Message, TextInput } from '@djeka07/ui';
import { useActionState } from 'react';
import { useTranslation } from '~/app/i18n/client';
import { Link } from '~/common/components/links';
import { buttonWrapper, form, link } from './reset-form.css';
import { ActionReturn } from '~/common/models/types/actions';
import { createQueryParams } from '~/common/models/helpers/query';

type ResetFormProps = {
  action: (state: ActionReturn, form: FormData) => Promise<ActionReturn>;
  email?: string;
};

const ResetForm = ({ action, email }: ResetFormProps) => {
  const { t, language } = useTranslation('reset');
  const [state, formAction, pending] = useActionState<ActionReturn, FormData>(action, {});
  const queryParams = createQueryParams({ email }, { skipNulls: true, addQueryPrefix: true, encodeValuesOnly: true });
  return (
    <form className={form} action={formAction}>
      <TextInput
        type="email"
        label={t('login:form:email:label')}
        placeholder={t('login:form:email:placeholder')}
        error={state.errors?.email?.[0] ? t(state.errors.email[0]) : undefined}
        name="email"
        value={email}
      />
      <Message show={state?.statusCode === 200} success>
        {t('reset:success')}
      </Message>
      <div className={buttonWrapper}>
        <Button title={t('reset:button')} isLoading={pending} type="submit">
          {t('reset:button')}
        </Button>
        <Link className={link} href={`/${language}/login${queryParams}`}>
          {t('login:title')}
        </Link>
      </div>
    </form>
  );
};

export default ResetForm;
