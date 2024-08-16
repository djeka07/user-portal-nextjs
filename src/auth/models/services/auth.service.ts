import { http } from "@djeka07/utils";
import createHeaders from "~/common/models/helpers/headers";
import { AuthClient, AuthControllerClient } from "~/users/models/services/generated/user.generated";

type LoginRequestParams = {
  email: string;
  password: string;
}

const url = process.env.USER_API;
const applicationId = process.env.APPLICATION_ID;

export const loginRequest = ({ email, password }: LoginRequestParams) => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url!, headers), url, http());
  return client.auth({ email, password, applicationId: applicationId! });
}