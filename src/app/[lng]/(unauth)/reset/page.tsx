import { getTranslation } from '~/app/i18n/server';
import { ResetView } from '~/auth/views';

type ResetPageProps = {
  searchParams: { email?: string };
  params: { lng: string };
};

export async function generateMetadata({ params: { lng } }: ResetPageProps) {
  const { t } = await getTranslation(lng, 'reset');
  return { title: t('reset:title'), description: t('reset:description') };
}

const ResetPage = ({ params: { lng }, searchParams }: ResetPageProps) => (
  <ResetView language={lng} email={searchParams?.email} />
);
export default ResetPage;
