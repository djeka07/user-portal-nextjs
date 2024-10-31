import { ReactNode } from 'react';
import { AsideLayout } from '~/common/components/layouts';
import { UserSideListContainer } from '~/users/components/user-side-list';

export type UsersLayoutProps = {
  children: ReactNode;
  params: Promise<{ id?: string }>;
};

const UsersLayout = async ({ children, params }: UsersLayoutProps) => {
  const { id } = await params;
  return (
    <AsideLayout margin="small" asideRender={<UserSideListContainer id={id} />}>
      {children}
    </AsideLayout>
  );
};

export default UsersLayout;
