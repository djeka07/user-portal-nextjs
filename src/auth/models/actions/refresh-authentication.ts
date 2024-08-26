'use server';
import { Authorization, createToken } from '~/auth/models/helpers/token';
import { createSession, deleteSession } from '../helpers/session';
import { refreshTokenRequest } from '../services/auth.service';
import { redirect } from 'next/navigation';

const refreshAuthenticationAction = async (token: string, redirectTo: string): Promise<Authorization> => {
  try {
    const response = await refreshTokenRequest({ token });
    const auth = createToken(response);
    await createSession(auth);
    return auth;
  } catch (err) {
    await deleteSession();
    redirect(redirectTo);
  }
};

export default refreshAuthenticationAction;
