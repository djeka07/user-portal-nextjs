'use server';

import { parse } from '@djeka07/utils';
import { z } from 'zod';
import { ActionReturn } from '~/common/models/types/actions';
import { updateUserRequest } from '../services/user.service';
import getAuth from '~/auth/models/helpers/get-auth';

const userFormSchema = z.object({
  id: z.string().optional(),
  email: z.string({ message: 'form:login:input:email:error:empty' }).email('form:login:input:email:error:not-valid'),
  firstName: z.string().min(1, { message: 'form:user:input:firstName:error' }),
  lastName: z.string().min(1, { message: 'form:user:input:lastName:error' }),
  roles: z
    .array(z.string().or(z.boolean()))
    .nonempty('form:user:error:roles')
    .superRefine((ref, ctx) => {
      if (ref.every((r) => !r)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'form:user:error:roles',
        });
      }
    }),
});

type UserFormData = z.infer<typeof userFormSchema>;

const editUserAction = async (_: unknown, formData: FormData): Promise<ActionReturn> => {
  const { email, firstName, lastName, roles, id } = parse<UserFormData>(formData);
  console.log(firstName);
  console.log(Array.from(formData.keys()));
  const { success, error } = userFormSchema.safeParse({ email, firstName, lastName, roles, id });

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
      statusCode: 400,
    };
  }
  const filteredRoles = roles?.filter<string>((f): f is string => typeof f === 'string') || [];
  const { accessToken } = await getAuth();
  const response = await updateUserRequest({
    accessToken,
    id: id!,
    form: { email, firstName, lastName, roles: filteredRoles.map((role) => ({ roleId: role })) },
  });
  return { statusCode: 200, data: response };
};

export default editUserAction;
