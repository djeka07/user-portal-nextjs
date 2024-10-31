import { getTranslation } from '~/app/i18n/server';
import LoginView from '~/auth/views/login.view';

type LoginPageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: Promise<{ lng: string }>;
};

export async function generateMetadata({ params }: Pick<LoginPageProps, 'params'>) {
  const { lng } = await params;
  const { t } = await getTranslation(lng, 'login');
  return { title: t('login:title'), description: t('login:description') };
}

const LoginPage = async ({ searchParams, params }: LoginPageProps) => {
  const { lng } = await params;
  const { redirectTo, email } = await searchParams;
  return <LoginView language={lng} redirectTo={redirectTo} email={email} />;
};
export default LoginPage;
