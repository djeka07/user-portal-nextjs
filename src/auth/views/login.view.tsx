import { Typography } from '@djeka07/ui/src/components/atoms/typographies';
import { useTranslation } from '~/app/i18n/server';
import { LoginForm } from '../components/login-forms';
import login from '../models/actions/login';

type LoginViewProps = {
  redirectTo?: string | null;
  language: string;
};

const LoginView = async ({ redirectTo, language }: LoginViewProps) => {
  const { t } = await useTranslation(language, 'login')
  return (
    <>
      <Typography variant="h1">{t('title')}</Typography>
      <LoginForm action={login} />
    </>
  );
};

export default LoginView;
