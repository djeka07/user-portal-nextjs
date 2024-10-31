import { getTranslation } from '~/app/i18n/server';
import { ResetView } from '~/auth/views';

type ResetPageProps = {
  searchParams: Promise<{ email?: string }>;
  params: Promise<{ lng: string }>;
};

export async function generateMetadata({ params }: ResetPageProps) {
  const { lng } = await params;
  const { t } = await getTranslation(lng, 'reset');
  return { title: t('reset:title'), description: t('reset:description') };
}

const ResetPage = async ({ params, searchParams }: ResetPageProps) => {
  const { lng } = await params;
  const { email } = await searchParams;
  return <ResetView language={lng} email={email} />;
};
export default ResetPage;
