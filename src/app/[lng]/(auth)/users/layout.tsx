import { ReactNode } from 'react';
import { AsideLayout } from '~/common/components/layouts';
import { UserSideListContainer } from '~/users/components/user-side-list';

export type UsersLayoutProps = {
  children: ReactNode;
};

const UsersLayout = ({ children }: UsersLayoutProps) => (
  <AsideLayout margin="small" asideRender={<UserSideListContainer />}>
    {children}
  </AsideLayout>
);

export default UsersLayout;
