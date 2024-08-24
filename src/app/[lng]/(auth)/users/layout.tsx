import { ReactNode } from 'react';
import { AsideLayout } from '~/common/components/layouts';
import { UserSideListContainer } from '~/users/components/user-side-list';

export type UsersLayoutProps = {
  children: ReactNode;
  params: { id?: string };
};

const UsersLayout = ({ children, params }: UsersLayoutProps) => (
  <AsideLayout margin="small" asideRender={<UserSideListContainer id={params?.id} />}>
    {children}
  </AsideLayout>
);

export default UsersLayout;
