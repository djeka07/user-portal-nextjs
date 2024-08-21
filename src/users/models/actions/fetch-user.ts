import getAuth from '~/auth/models/actions/get-auth'
import { fetchUserRequest } from '../services/user.service';

const fetchUserAction = async (id: string) => {
  const { accessToken } = await getAuth();
  return fetchUserRequest({ accessToken, id })
}

export default fetchUserAction;