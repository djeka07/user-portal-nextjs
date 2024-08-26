import getAuth from '~/auth/models/helpers/get-auth';
import { GetApplicationsResponse } from '../services/generated/user.generated';
import { fetchApplications } from '../services/user.service';

const fetchApplicationsAction = async (page: number, take: number): Promise<GetApplicationsResponse> => {
  const { accessToken } = await getAuth();
  return fetchApplications({ accessToken: accessToken, page, take });
};

export default fetchApplicationsAction;
