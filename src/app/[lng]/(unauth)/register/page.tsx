import { getTranslation } from '~/app/i18n/server';
import { RegisterView } from '~/auth/views';

type RegisterPageProps = {
  searchParams: Promise<{ email: string }>;
  params: Promise<{ lng: string }>;
};

export async function generateMetadata({ params }: RegisterPageProps) {
  const { lng } = await params;
  const { t } = await getTranslation(lng, 'register');
  return { title: t('register:title'), description: t('register:description') };
}

const RegisterPage = async ({ params, searchParams }: RegisterPageProps) => {
  const { lng } = await params;
  const { email } = await searchParams;
  return <RegisterView language={lng} email={email} />;
};
export default RegisterPage;
