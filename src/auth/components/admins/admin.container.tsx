'use client';

import { ReactNode } from 'react';
import { useAuth } from '~/auth/models/hooks/use-auth';

type AdminContainerProps = {
  children: ReactNode;
};

const AdminContainer = (props: AdminContainerProps) => {
  const [, { isAdmin }] = useAuth();
  return isAdmin() && props.children;
};

export default AdminContainer;
