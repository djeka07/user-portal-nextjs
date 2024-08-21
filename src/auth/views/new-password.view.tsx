import { Typography } from '@djeka07/ui';
import { getTranslation } from '~/app/i18n/server';
import { NewPasswordForm } from '../components/new-password-forms';

type NewPasswordViewProps = {
  resetToken: string;
  email: string;
  language: string;
};

const NewPasswordView = async ({ resetToken, email, language }: NewPasswordViewProps) => {
  const { t } = await getTranslation(language);
  return (
    <>
      <Typography variant="h1">{t('form:new-password:title')}</Typography>
      <Typography variant="body">{t('form:new-password:description')}</Typography>
      <NewPasswordForm email={email} resetToken={resetToken} />
    </>
  );
};
export default NewPasswordView;
