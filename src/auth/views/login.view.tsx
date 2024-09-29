import { Typography } from '@djeka07/ui';
import { getTranslation } from '~/app/i18n/server';
import { LoginForm } from '../components/login-forms';
import login from '../models/actions/login';

type LoginViewProps = {
  redirectTo?: string;
  email?: string;
  language: string;
};

const LoginView = async ({ redirectTo, language, email }: LoginViewProps) => {
  const { t } = await getTranslation(language, 'login');
  return (
    <>
      <Typography variant="h1">{t('title')}</Typography>
      <LoginForm action={login} redirectTo={redirectTo} email={email} />
    </>
  );
};

export default LoginView;
