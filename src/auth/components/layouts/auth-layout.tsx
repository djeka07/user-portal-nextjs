import { AuthProvider } from '~/auth/models/contexts/auth.context';
// import { NotificationsContainer } from '~/notifications/components/notifications';
import { UserResponse, RoleResponse } from '~/users/models/services/generated/user.generated';

import { main } from './auth-layout.css';
import { ReactNode } from 'react';
import { PanelsRendererContainer } from '@djeka07/ui';
import { Authorization } from '~/auth/models/helpers/token';
import { Navigation } from '~/common/components/navigation';
import { isAdministrator } from '~/auth/models/helpers/administrator';
import { SocketProvider } from '~/common/models/contexts/socket.context';
import { AuthRefreshContainer } from '../auth-refresh';

type AuthLayoutProps = {
  user: UserResponse;
  token: Authorization;
  roles: RoleResponse[];
  language: string;
  children: ReactNode;
};

const AuthLayout = ({ children, roles, token, user, language }: AuthLayoutProps) => (
  <AuthProvider initialUser={user} initialToken={token} initialRoles={roles}>
    {process.env.NEXT_PUBLIC_AUTH_REFRESH_ACTIVE === 'true' && <AuthRefreshContainer />}
    <Navigation language={language} currentUser={user} isAdmin={isAdministrator(user, roles)} />
    <SocketProvider user={user} token={token}>
      <>
        {/* <NotificationsContainer /> */}
        <main className={main}>{children}</main>
        <PanelsRendererContainer />
      </>
    </SocketProvider>
  </AuthProvider>
);

export default AuthLayout;
