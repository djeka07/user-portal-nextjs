'use server';
import getAuth from '~/auth/models/helpers/get-auth';
import { UsersResponse } from '../../users/models/services/generated/user.generated';
import { fetchUsersRequest } from '../../users/models/services/user.service';

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