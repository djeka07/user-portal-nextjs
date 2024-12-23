'use server';

import { createFormData } from '@djeka07/utils';
import { redirect } from 'next/navigation';
import { cookieName, fallbackLng } from '~/app/i18n/settings';
import { isBefore } from '~/common/models/helpers/date';
import { Authorization } from './token';
import logoutAction from '../actions/logout';
import { cookies } from 'next/headers';
import { getSession } from './session';

const getAuth = async (): Promise<Authorization> => {
  const session = await getSession();
    if (!session || !isBefore(session?.expires, Date.now())) {
      const language = (await cookies())?.get(cookieName)?.value || fallbackLng;
      console.log(language, 'l')
      logoutAction(createFormData({ language }));
      redirect(`/${language}/login`)
    }
  return session;
}

export default getAuth;