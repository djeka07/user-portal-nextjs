'use server';
import getAuth from '~/app/test/get-auth';
import { UsersResponse } from '../services/generated/user.generated';
import { fetchUsersRequest } from '../services/user.service';

const fetchUsersAction = async (
  page: number,
  take: number = 10,
  hasGrantedFilter: boolean | undefined = undefined,
): Promise<UsersResponse> => {
  const { accessToken } = await getAuth();
  let filter: {hasGrantedAccess?: boolean } = {};
  if (hasGrantedFilter !== undefined) {
    filter = { hasGrantedAccess: hasGrantedFilter };
  }

  return fetchUsersRequest({ accessToken, page, take, filter });
};

export default fetchUsersAction;