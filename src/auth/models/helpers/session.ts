import 'server-only';
import * as Iron from 'iron-webcrypto';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { Authorization } from './token';
import { cookies } from 'next/headers';

const password = process.env.SESSION_PASSWORD;

const sealSession = async (authorization: Authorization): Promise<string> => {
  return Iron.seal(globalThis.crypto, authorization, password!, Iron.defaults)
}

const unsealSession = async (session: string): Promise<Authorization> => {
  return Iron.unseal(globalThis.crypto, session, password!, Iron.defaults) as Promise<Authorization>
}

export const getSession = async (): Promise<Authorization | undefined> => {
  const cookie = cookies().get('session')?.value;
  return !!cookie ? unsealSession(cookie) : undefined
}

export const createSession = async (authorization: Authorization) => {
  const sealedSession = await sealSession(authorization);
  cookies().set('session', sealedSession, {
    httpOnly: true,
    secure: true,
    expires: authorization.expires,
    sameSite: 'lax',
    path: '/',
  })
}

export const deleteSession = async () => {
  cookies().delete('session');
}