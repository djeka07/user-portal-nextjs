import { UsersView } from '~/users/views';

type UsersPageProps = {
  params: Promise<{ lng: string }>;
};

const UsersPage = async ({ params }: UsersPageProps) => {
  const { lng } = await params;
  return <UsersView language={lng} />;
};

export default UsersPage;
