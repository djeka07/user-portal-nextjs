'use server';

import { cookies } from 'next/headers';
import { fetchRolesRequest } from '../../auth/models/services/auth.service';
import getAuth from '../test/get-auth';

const fetchRolesAction = async () => {
  const { accessToken } = await getAuth(cookies);
  return fetchRolesRequest({accessToken })
}

export default fetchRolesAction;