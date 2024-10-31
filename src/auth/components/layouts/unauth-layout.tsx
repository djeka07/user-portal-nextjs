import { Message } from '@djeka07/ui';
import { formWrapper, main, message, themeContainer } from './unauth-layout.css';
import { ReactNode } from 'react';
import ThemeContainer from '~/common/components/themes/theme.container';

type LayoutProps = { children: ReactNode; reason?: string };

const UnauthLayout = ({ children, reason }: LayoutProps) => {
  const t = (s: string) => s;
  const reasonLabel = t(`label:${reason}`);
  return (
    <div className={main}>
      <Message className={message} icon="AlertTriangle" warning show={!!reason && reasonLabel !== reason}>
        {reasonLabel}
      </Message>
      <div className={formWrapper}>
        <ThemeContainer size="xxlarge" className={themeContainer} />
        {children}
      </div>
    </div>
  );
};

export default UnauthLayout;
