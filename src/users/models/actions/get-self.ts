'use server';

import getAuth from '~/auth/models/actions/get-auth';
import { getSession } from '~/auth/models/helpers/session';
import { getSelfRequest } from '../services/user.service';

const getSelfAction = async () => {
  const { accessToken} = await getAuth();
  return getSelfRequest({ accessToken });
}

export default getSelfAction;