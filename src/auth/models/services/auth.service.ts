import { http } from "@djeka07/utils";
import createHeaders from "~/common/models/helpers/headers";
import { AuthClient, AuthControllerClient, OkResponse, RoleControllerClient, RoleResponse } from '~/users/models/services/generated/user.generated';

type LoginRequestParams = {
  email: string;
  password: string;
}

type RegisterRequestParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export type NewPasswordFromResetTokenRequestParams = {
  resetToken: string;
  password: string;
  confirmPassword: string;
};

export type ResetPasswordRequest = {
  email: string;
}

type VerifyPasswordResetTokenRequestParams = {
  token: string;
}

 type GetSelfRequest = {
  accessToken?: string;
};

const url = process.env.USER_API;
const applicationId = process.env.APPLICATION_ID;

export const loginRequest = ({ email, password }: LoginRequestParams) => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url!, headers), url, http());
  return client.auth({ email, password, applicationId: applicationId! });
}

export const registerRequest = ({ email, password, confirmPassword, firstName, lastName }: RegisterRequestParams) => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url!, headers), url, http());
  return client.register({ email, password, confirmPassword, firstName, lastName });
}

export const refreshTokenRequest = ({ token }: VerifyPasswordResetTokenRequestParams) => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url!, headers), url, http());
  return client.refresh(token)
}

export const newPasswordFromResetTokenRequest = ({ confirmPassword, password, resetToken }: NewPasswordFromResetTokenRequestParams): Promise<OkResponse> => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url!, headers), url, http());
  return client.updatePasswordFromResetToken(resetToken, { password, confirmPassword })
}

export const resetPasswordRequest = ({ email }: ResetPasswordRequest): Promise<OkResponse> => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url!, headers), url, http());
  return client.resetPasswordToken({ applicationId: applicationId!, email })
}

export const verifyPasswordResetTokenRequest = ({ token }: VerifyPasswordResetTokenRequestParams) => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url!, headers), url, http());
  return client.verifyResetToken(token);
}

export const fetchRolesRequest = async ({ accessToken }: GetSelfRequest): Promise<RoleResponse[]> => {
  const headers = createHeaders({ accessToken });
  const client = new RoleControllerClient(new AuthClient(url!, headers), url, http());
  return client.getRoles();
}