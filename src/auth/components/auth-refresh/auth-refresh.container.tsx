'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import refreshAuthenticationAction from '~/auth/models/actions/refresh-authentication';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { createDate } from '~/common/models/helpers/date';
import { ProgressState } from '~/common/models/types/fetch.state';
import AuthRefresh from './auth-refresh';

const AuthRefreshContainer = () => {
  const [{ token }, { updateToken }] = useAuth();
  const pathname = usePathname();
  const [progress, setProgress] = useState<ProgressState<{ show: boolean }>>({
    state: 'initial',
    data: { show: false },
  });

  const refreshToken = useCallback(
    async (token: string) => {
      setProgress((prev) => ({ ...prev, data: { show: true }, state: 'pending' }));
      const auth = await refreshAuthenticationAction(token, pathname);
      setProgress((prev) => ({ ...prev, state: 'ready' }));
      updateToken(auth);
      setTimeout(() => {
        setProgress((prev) => ({ ...prev, data: { show: false } }));
      }, 2000);
    },
    [pathname, updateToken],
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      const expires = createDate(token?.expires).subtract(
        parseInt(String(process.env.NEXT_PUBLIC_AUTH_SUBSTRACT_MS), 10),
        'milliseconds',
      );
      if (createDate().isAfter(expires)) {
        await refreshToken(token!.refreshToken);
      }
    }, parseInt(String(process.env.NEXT_PUBLIC_AUTH_CHECK_INTERVAL_MS), 10));
    return () => {
      clearInterval(interval);
    };
  }, [refreshToken, token]);

  return (
    <AuthRefresh
      state={progress.state}
      show={progress.data?.show || false}
      onClose={() => setProgress((p) => ({ ...p, data: { show: false } }))}
    />
  );
};

export default AuthRefreshContainer;
