'use server';

import { redirect } from 'next/navigation';
import { getSession } from '../helpers/session';
import { Authorization } from '../helpers/token';
import { isBefore } from '~/common/models/helpers/date';
import logoutAction from './logout';
import { createFormData } from '@djeka07/utils';
import { cookies } from 'next/headers';
import { cookieName } from '~/app/i18n/settings';

const getAuth = async (): Promise<Authorization> => {
  const session = await getSession();
  if (!session || !isBefore(session?.expires, Date.now())) {
    const language = cookies().get(cookieName)?.value;
    logoutAction(createFormData({ language }));
    redirect(`/${language}/login`)
  }

  return session;
}

export default getAuth;