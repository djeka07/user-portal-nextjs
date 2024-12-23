import { Typography } from '@djeka07/ui';
import { getTranslation } from '~/app/i18n/server';
import { RegisterForm } from '~/auth/components/register-forms';
import registerAction from '../models/actions/register';

type RegisterViewProps = {
  language: string;
  email?: string;
};

const RegisterView = async ({ language, email }: RegisterViewProps) => {
  const { t } = await getTranslation(language, 'register');
  return (
    <>
      <Typography variant="h1">{t('register:title')}</Typography>
      <RegisterForm email={email} action={registerAction} />
    </>
  );
};

export default RegisterView;
