import { ReactNode } from 'react';
import getAuth from '~/app/test/get-auth';
import { AuthLayout as Layout } from '~/auth/components/layouts';
import fetchRolesAction from '~/app/actions/fetch-roles';
import getSelfAction from '~/users/models/actions/get-self';

type AuthLayoutProps = {
  children: ReactNode;
  params: { lng: string };
};

const AuthLayout = async ({ children, params: { lng } }: AuthLayoutProps) => {
  const tokenData = getAuth();
  const userData = getSelfAction();
  const rolesData = fetchRolesAction();

  const [token, user, roles] = await Promise.all([tokenData, userData, rolesData]);
  return (
    <Layout language={lng} user={user} roles={roles} token={token}>
      {children}
    </Layout>
  );
};

export default AuthLayout;
