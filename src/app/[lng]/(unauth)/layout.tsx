import { ReactNode } from 'react';
import { UnauthLayout as Layout } from '~/auth/components/layouts';

type UnauthLayoutProps = {
  children: ReactNode;
};

const UnauthLayout = ({ children }: UnauthLayoutProps) => <Layout>{children}</Layout>;

export default UnauthLayout;
