'use client';
import { ActionReturn } from '~/common/models/types/actions';
import { buttonWrapper, error, form as formClass, root } from './user-form.css';
import { RoleResponse } from '~/users/models/services/generated/user.generated';
import { useTranslation } from '~/app/i18n/client';
import { useActionState } from 'react';
import { Button, Checkbox, For, Icon, Match, Message, Switch, TextInput, Typography } from '@djeka07/ui';
import { isEmpty } from '@djeka07/utils';

type Form = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  roles: string[];
};

type UserFormProps = {
  action: (_: unknown, formData: FormData) => Promise<ActionReturn>;
  roles?: RoleResponse[];
  title?: string;
  submitText: string;
  successText: string;
  errorText: string;
  form?: Form;
  onCancel?: () => void;
  onSuccess?: () => void;
};

const UserForm = ({
  action,
  submitText,
  successText,
  form,
  onCancel,
  onSuccess,
  roles,
  title,
}: UserFormProps): JSX.Element => {
  const { t } = useTranslation();
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <div className={root}>
      {!!title && (
        <Typography weight="bold" variant="h2">
          {title}
        </Typography>
      )}
      <form className={formClass} action={formAction}>
        <TextInput
          type="text"
          value={form?.firstName}
          name="firstName"
          autoComplete="firstname"
          label={t('register:form:first-name:label')}
          placeholder={t('register:form:first-name:placeholder')}
          error={state?.errors?.firstName?.[0] ? t(state.errors.firstName[0]) : undefined}
        />
        <TextInput
          type="text"
          name="lastName"
          autoComplete="lastname"
          label={t('register:form:last-name:label')}
          placeholder={t('register:form:last-name:placeholder')}
          value={form?.lastName}
          error={state?.errors?.lastName?.[0] ? t(state.errors.lastName[0]) : undefined}
        />
        <TextInput
          type="text"
          name="email"
          autoComplete="email"
          value={form?.email}
          label={t('login:form:email:label')}
          placeholder={t('login:form:email:placeholder')}
          error={state?.errors?.email?.[0] ? t(state.errors.email[0]) : undefined}
        />
        {!!form?.id && <input type="hidden" name="id" value={form?.id} />}
        {!isEmpty(roles) && (
          <div>
            <Typography marginBottom="small" variant="h5">
              {t('users:users-list:form:roles:label')}
            </Typography>
            <For each={roles} keyed={'id'}>
              {(item) => (
                <Checkbox
                  defaultChecked={form?.roles?.includes(item.id)}
                  name="roles"
                  label={item.name}
                  value={item.id}
                />
              )}
            </For>
            {!!state?.errors?.roles?.[0] && (
              <Message className={error} error>
                <Icon name="AlertCircle" color="error" size="small" />
                {t(state?.errors?.roles?.[0])}
              </Message>
            )}
          </div>
        )}

        <div className={buttonWrapper}>
          <Button success size="small" isLoading={pending} type="submit">
            {submitText}
          </Button>
          {!!onCancel && (
            <Button size="small" error onClick={onCancel}>
              {t('common:button:cancel')}
            </Button>
          )}
        </div>
        {state.statusCode === 200 && <Message success>{successText}</Message>}
      </form>
    </div>
  );
};

export default UserForm;
