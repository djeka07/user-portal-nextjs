import createHeaders from '~/common/models/helpers/headers'
import { AuthClient, SelfControllerClient, UserRequest, UserResponse,   UpdateUsersAccessRequest as UpdateUsersAccessReq, UserControllerClient, UsersResponse, UpdateSelfPasswordRequest, OkResponse, GetApplicationsResponse, AppControllerClient, } from './generated/user.generated';
import { http } from '@djeka07/utils';

const url = process.env.USER_API!;
const applicationId = process.env.APPLICATION_ID;

type GetSelfRequestParams = {
  accessToken?: string;
}

export type CreateUserRequestParams = GetSelfRequestParams & {
  form: UserRequest;
};

export type UpdateUserRequestParams = GetSelfRequestParams & {
  id: string;
  form: UserRequest;
};

export type UpdateUsersAccessRequestParams = GetSelfRequestParams & {
  form: UpdateUsersAccessReq;
};


export type FetchUsersRequestParams = GetSelfRequestParams & {
  page: number;
  take: number;
  filter?: { hasGrantedAccess?: boolean; roleIds?: string[] };
};

export type UpdatePasswordFromAccessTokenRequestParams = GetSelfRequestParams & UpdateSelfPasswordRequest;

export type ResetByIdRequestParams = GetSelfRequestParams & {
  id: string;
};

export type FetchApplicationsRequestParams = GetSelfRequestParams & {
  page: number;
  take: number;
};

export type FetchUserRequestParams = GetSelfRequestParams & {
  id: string;
}

export type SearchUsersRequestParams = GetSelfRequestParams & {
  page: number;
  take: number;
  query?: string;
};


export const getSelfRequest = ({ accessToken }: GetSelfRequestParams): Promise<UserResponse> => {
  const headers = createHeaders({accessToken});
  const client = new SelfControllerClient(new AuthClient(url, headers), url, http());
  return client.get();
}

export const createUserRequest = async ({ accessToken, form }: CreateUserRequestParams): Promise<UserResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.createUser(form);
};

export const updateUserRequest = async ({ accessToken, form, id }: UpdateUserRequestParams): Promise<UserResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.updateUser(id, form);
};

export const updateUsersAccessRequest = async ({
  accessToken,
  form,
}: UpdateUsersAccessRequestParams): Promise<UserResponse[]> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.grantAccessForUsers(form);
};

export const fetchUsersRequest = async ({
  accessToken,
  page,
  take,
  filter,
}: FetchUsersRequestParams): Promise<UsersResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.getUsers(false, JSON.stringify(filter), page, take);
};

export const fetchUserRequest = async ({
  accessToken,
id
}: FetchUserRequestParams): Promise<UserResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.findUserById(id);
};

export const resetByIdRequest = ({ id, accessToken }: ResetByIdRequestParams): Promise<OkResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.resetPasswordToken(id, { applicationId: applicationId! });
};

export const updatePasswordFromAccessToken = ({ accessToken, ...rest }: UpdatePasswordFromAccessTokenRequestParams): Promise<UserResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new SelfControllerClient(new AuthClient(url, headers), url, http());
  return client.updatePassword(rest);
};

export const fetchApplications = async ({
  accessToken,
  page,
  take,
}: FetchApplicationsRequestParams): Promise<GetApplicationsResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new AppControllerClient(new AuthClient(url, headers), url, http());
  return client.get(page, take);
};

export const searchUsers = async ({
  accessToken,
  page,
  take,
  query,
}: SearchUsersRequestParams): Promise<UsersResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.searchUsers(query, page, take);
};