'use server';

import getAuth from '~/app/test/get-auth';
import { searchUsers } from '../services/user.service';

const searchUsersServerFn = async (query: string, page: number, take: number) => {
  const { accessToken } = await getAuth();
  return searchUsers({ accessToken, page, take, query })
}

export default searchUsersServerFn;