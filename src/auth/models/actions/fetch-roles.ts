'use server';

import { fetchRolesRequest } from '../services/auth.service';
import getAuth from '../helpers/get-auth';

const fetchRolesAction = async () => {
  const { accessToken } = await getAuth();
  return fetchRolesRequest({accessToken })
}

export default fetchRolesAction;