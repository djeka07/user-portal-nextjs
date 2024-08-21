import { UsersView } from '~/users/views';

type UsersPageProps = {
  params: { lng: string };
};

const UsersPage = ({ params: { lng } }: UsersPageProps) => {
  return <UsersView language={lng} />;
};

export default UsersPage;
