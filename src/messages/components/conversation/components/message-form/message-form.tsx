'use client';
import { ActionReturn } from '~/common/models/types/actions';
import { root } from './message-form.css';
import { Button, Icon, TextArea } from '@djeka07/ui';
import { useTranslation } from '~/app/i18n/client';
import { useActionState, KeyboardEvent, FormEventHandler, useRef } from 'react';
import { FieldError } from '~/common/models/types/field-error';

export type Form = { message: string };

type MessageFormProps = {
  onSubmit: (message?: string) => Promise<void>;
  errors?: FieldError;
  isSending: boolean;
};

export const MessageForm = ({ onSubmit, isSending, errors }: MessageFormProps) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLTextAreaElement>(null);

  const internalOnSubmit = () => {
    onSubmit(ref?.current?.value);
  };

  return (
    <form className={root} onSubmit={internalOnSubmit}>
      <TextArea
        radius="xxlarge"
        onEnterWithoutShift={internalOnSubmit}
        error={errors?.message?.[0] ? t(errors.message[0]) : undefined}
        name="message"
        placeholder={t('form.conversation.input.message.placeholder')}
        ref={ref}
      />
      <Button isLoading={isSending} wide={false} transparent>
        <Icon color="white" name="Send" />
      </Button>
    </form>
  );
};
