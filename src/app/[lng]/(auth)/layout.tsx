import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import fetchRolesAction from '~/auth/models/actions/fetch-roles';
import getAuth from '~/auth/models/helpers/get-auth';
import getSelfAction from '~/users/models/actions/get-self';

const Layout = dynamic(() => import('~/auth/components/layouts/auth-layout'));

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

export const revalidate = 0;
export default AuthLayout;
