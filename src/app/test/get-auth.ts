'use server';

import { createFormData } from '@djeka07/utils';
import { redirect } from 'next/navigation';
import { cookieName } from '~/app/i18n/settings';
import { isBefore } from '~/common/models/helpers/date';
import { getSession } from './session';
import { Authorization } from '../../auth/models/helpers/token';
import logoutAction from '../actions/logout';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const getAuth = async (cookies: () => ReadonlyRequestCookies): Promise<Authorization> => {
  const session = await getSession();
    if (!session || !isBefore(session?.expires, Date.now())) {
      const language = cookies().get(cookieName)?.value;
      logoutAction(createFormData({ language }));
      redirect(`/${language}/login`)
    }
  return session;
}

export default getAuth;