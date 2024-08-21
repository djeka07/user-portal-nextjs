import { getTranslation } from '~/app/i18n/server';
import { RegisterView } from '~/auth/views';

type RegisterPageProps = {
  searchParams: { email: string };
  params: { lng: string };
};

export async function generateMetadata({ params: { lng } }: RegisterPageProps) {
  const { t } = await getTranslation(lng, 'register');
  return { title: t('register:title'), description: t('register:description') };
}

const RegisterPage = ({ params, searchParams }: RegisterPageProps) => (
  <RegisterView language={params.lng} email={searchParams?.email} />
);
export default RegisterPage;
