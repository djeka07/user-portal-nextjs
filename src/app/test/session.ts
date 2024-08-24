import 'server-only';
import * as Iron from 'iron-webcrypto';
import { cookies } from 'next/headers';
import { Authorization } from '../../auth/models/helpers/token';

const password = process.env.SESSION_PASSWORD;

const sealSession = async (authorization: Authorization): Promise<string> => {
  return Iron.seal(globalThis.crypto, authorization, password!, Iron.defaults)
}

const unsealSession = async (session: string): Promise<Authorization> => {
  return Iron.unseal(globalThis.crypto, session, password!, Iron.defaults) as Promise<Authorization>
}

const get = () => {
  
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