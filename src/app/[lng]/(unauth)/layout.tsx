import { ReactNode } from "react";
import { UnauthLayout as Layout } from "~/auth/components/layouts";

export type UnAuthLayoutProps = {
  children: ReactNode;
}

const UnAuthLayout = ({ children }: UnAuthLayoutProps) => {
  const reason = ''
  return (
    <>
      <Layout reason={reason || undefined}>
        {children}
      </Layout>
    </>
  );
};

export default UnAuthLayout;