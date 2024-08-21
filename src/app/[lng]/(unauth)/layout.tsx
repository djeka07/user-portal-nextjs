import { ReactNode } from "react";
import { UnauthLayout as Layout } from "~/auth/components/layouts";

export type UnAuthLayoutProps = {
  children: ReactNode;
  searchParams?: { reason?: string };
}

const UnAuthLayout = ({ children, searchParams }: UnAuthLayoutProps) => (
  <Layout reason={searchParams?.reason || undefined}>
    {children}
  </Layout>
);

export default UnAuthLayout;