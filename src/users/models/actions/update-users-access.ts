'use server';
import { updateUsersAccessRequest } from '../services/user.service';

import { toBool } from '@djeka07/utils';
import { z } from 'zod';
import getAuth from '~/auth/models/helpers/get-auth';
import { ActionReturn } from '~/common/models/types/actions';

const usersFormSchema = z.object({
  access: z.boolean(),
  userIds: z.string().array().nonempty('form:user:input:users:error'),
  applicationIds: z.string().array().nonempty('form:user:input:apps:error'),
});

const updateUsersAccessAction = async (_: unknown, form: FormData): Promise<ActionReturn> => {
  const grantAccess = toBool(form.get('access') as string);
  const userIds = form.getAll('users') as string[];
  const applicationIds = form.getAll('applicationIds') as string[];

  const { success, error } = usersFormSchema.safeParse({ access: grantAccess, userIds, applicationIds });
  if (!success) {
    return {
      statusCode: 400,
      errors: error.flatten().fieldErrors
    }
  }
  const { accessToken } = await getAuth();
  const response = await updateUsersAccessRequest({ accessToken, form: {  applicationIds, grantAccess, userIds }});
  return {
    statusCode: 200,
    data: response
  };
};

export default updateUsersAccessAction;