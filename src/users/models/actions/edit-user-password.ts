import { ActionReturn } from '~/common/models/types/actions';

import {z} from 'zod';
import { parse } from '@djeka07/utils';
import { updatePasswordFromAccessToken } from '../services/user.service';
import getAuth from '~/app/test/get-auth';

const editPasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, 'form:update-password:input:current-password:error:empty'),
    password: z
      .string()
      .min(1, 'form:login:input:password:error:empty')
      .min(8, 'form:login:input:password:error:short'),
    confirmPassword: z
      .string()
      .min(1, 'form:register:input:confirm-password:error:empty')
      .min(8, 'form:register:input:confirm-password:error:short'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword)
      ctx.addIssue({
        code: 'custom',
        message: 'form:register:input:confirm-password:error:no-match',
        path: ['confirmPassword'],
      });
  });

export type EditPasswordFormData = z.infer<typeof editPasswordFormSchema>;


const editUserPasswordAction = async (_: unknown, formData: FormData): Promise<ActionReturn> => {
    const { confirmPassword, currentPassword, password } = parse<EditPasswordFormData>(formData);

    const {success, error } = editPasswordFormSchema.safeParse({ confirmPassword, currentPassword, password });
    if (!success) {
      return {
        statusCode: 400,
        errors: error.flatten().fieldErrors
      }
    }
    const { accessToken } = await getAuth();
    const response = await updatePasswordFromAccessToken({accessToken, confirmPassword, currentPassword, password})
    return {
      statusCode: 200,
      data: response
    }
}

export default editUserPasswordAction;