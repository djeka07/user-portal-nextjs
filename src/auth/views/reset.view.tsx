import { Typography } from '@djeka07/ui';
import { getTranslation } from '~/app/i18n/server';
import { ResetForm } from '~/auth/components/reset-forms';
import resetPasswordAction from '../models/actions/reset-password';

type ResetViewProps = {
  language: string;
  email?: string;
};

const ResetView = async ({ language, email }: ResetViewProps) => {
  const { t } = await getTranslation(language, 'reset');
  return (
    <>
      <Typography variant="h1">{t('reset:title')}</Typography>
      <ResetForm action={resetPasswordAction} email={email} />
    </>
  );
};

export default ResetView;
