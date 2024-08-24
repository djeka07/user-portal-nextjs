'use server';

import { redirect } from 'next/navigation';
import { deleteSession } from '../test/session';

const logoutAction = (formData: FormData): void => {
  const language = String(formData.get('language'));
  deleteSession();
  redirect(`/${language}/login`);
}

export default logoutAction;