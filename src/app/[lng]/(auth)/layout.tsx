import { ReactNode } from 'react';
import { AuthLayout as Layout } from '~/auth/components/layouts';
import fetchRolesAction from '~/auth/models/actions/fetch-roles';
import getAuth from '~/auth/models/actions/get-auth';
import getSelfAction from '~/users/models/actions/get-self';

export type UnAuthLayoutProps = {
  children: ReactNode;
  params: { lng: string };
};

const AuthLayout = async ({ children, params: { lng } }: UnAuthLayoutProps) => {
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