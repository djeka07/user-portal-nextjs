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
        <Typography weight="bold" variant="h2" color="grey700">
          {title}
        </Typography>
      )}
      <form className={formClass} action={formAction}>
        <TextInput
          type="text"
          value={form?.firstName}
          name="firstName"
          autoComplete="firstname"
          label={t('form.user.input.firstName.label')}
          placeholder={t('form.user.input.firstName.placeholder')}
          error={state?.errors?.firstName?.[0] ? t(state.errors.firstName[0]) : undefined}
        />
        <TextInput
          type="text"
          name="lastName"
          autoComplete="lastname"
          label={t('form.user.input.lastName.label')}
          placeholder={t('form.user.input.lastName.placeholder')}
          value={form?.lastName}
          error={state?.errors?.lastName?.[0] ? t(state.errors.lastName[0]) : undefined}
        />
        <TextInput
          type="text"
          name="email"
          autoComplete="email"
          value={form?.email}
          label={t('form.login.input.email.label')}
          placeholder={t('form.login.input.email.placeholder')}
          error={state?.errors?.email?.[0] ? t(state.errors.email[0]) : undefined}
        />
        {!!form?.id && <input type="hidden" name="id" value={form?.id} />}
        {!isEmpty(roles) && (
          <div>
            <Typography marginBottom="small" variant="h5" color="grey700">
              {t('form.user.input.roles.label')}
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
        <Switch expression={state.statusCode}>
          <Match when={!200}>
            <div className={buttonWrapper}>
              <Button isLoading={pending} type="submit">
                {submitText}
              </Button>
              {!!onCancel && <Button onClick={onCancel}>{t('common.button.cancel')}</Button>}
            </div>
          </Match>
          <Match when={200}>
            <Message success>{successText}</Message>
          </Match>
        </Switch>
      </form>
    </div>
  );
};

export default UserForm;
