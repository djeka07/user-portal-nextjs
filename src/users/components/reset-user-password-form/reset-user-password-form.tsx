'use client';
import { Button, Icon, Typography } from '@djeka07/ui';
import { useActionState } from 'react';
import { ActionReturn } from '~/common/models/types/actions';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { buttonWrapper, contentWrapper, root } from './reset-user-password-form.css';

type ResetUserPasswordProps = {
  action: (_: unknown, formData: FormData) => Promise<ActionReturn>;
  user: UserResponse;
  onSuccess?: () => void;
  onCancel?: () => void;
};

type Form = {
  intent: string;
};

const ResetUserPasswordForm = ({ action, onCancel, onSuccess, user }: ResetUserPasswordProps) => {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <div className={root}>
      <Icon name="Repeat" size="xxlarge" color="heading" padding="medium" radius="round" background="light" />
      <div className={contentWrapper}>
        <Typography align="center" variant="h3">
          Reset password
        </Typography>
        <Typography align="center" fontStyle="italic" variant="label">
          Are you sure you want to reset password for {user.firstName} {user.lastName}?
        </Typography>
      </div>
      <form action={formAction}>
        <input type="hidden" name="id" value={user.id} />
        <div className={buttonWrapper}>
          <Button success type="submit">
            Ok
          </Button>
          {!!onCancel && (
            <Button error outlined onClick={onCancel}>
              Close
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResetUserPasswordForm;
