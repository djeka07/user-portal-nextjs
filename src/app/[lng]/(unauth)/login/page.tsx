import { getTranslation } from '~/app/i18n/server';
import LoginView from '~/auth/views/login.view';

type LoginPageProps = {
  searchParams: { [key: string]: string | undefined };
  params: { lng: string }
}

export async function generateMetadata({ params: { lng } }: Pick<LoginPageProps, 'params'>) {
  const { t } = await getTranslation(lng, 'login')
  return { title: t('login:title'), description: t('login:description') }
}

const LoginPage = ({ searchParams, params }: LoginPageProps) => {
  const search = searchParams;
  return <LoginView language={params.lng} redirectTo={search?.redirectTo} />;
};

export default LoginPage;