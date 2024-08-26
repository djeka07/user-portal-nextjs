import { fetchUserRequest } from '../../users/models/services/user.service';

const fetchUserAction = async (id: string) => {
  const { accessToken } = await getAuth();
  return fetchUserRequest({ accessToken, id })
}

export default fetchUserAction;

function getAuth(): { accessToken: any; } | PromiseLike<{ accessToken: any; }> {
  throw new Error('Function not implemented.');
}
