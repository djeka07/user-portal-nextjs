'use server';

import getAuth from '~/auth/models/helpers/get-auth';
import { getSelfRequest } from '../../users/models/services/user.service';

const getSelfAction = async () => {
  const { accessToken} = await getAuth();
  return getSelfRequest({ accessToken });
}

export default getSelfAction;