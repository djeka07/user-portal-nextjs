'use server';

import { parse } from '@djeka07/utils';
import { redirect } from 'next/navigation';
import zod from 'zod';
import { ActionReturn } from '~/common/models/types/actions';
import { registerRequest } from "../../auth/models/services/auth.service";


const registerFormSchema = zod
  .object({
    language: zod.string(),
    email: zod
      .string({ message: 'form:login:input:email:error:empty' })
      .email('login:form:email:error:not-valid'),
    firstName: zod.string({ message: 'register:form:first-name:error:empty' }),
    lastName: zod.string({ message: 'register:form:last-name:error:empty' }),
    password: zod.string({ message: 'login:form:password:error:empty' }).min(8),
    confirmPassword: zod.string({ message: 'register:form:confirm-password:error:empty' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'register:form:confirm-password:error:no-match',
    path: ['confirmPassword'],
  });

type RegisterFormData = zod.infer<typeof registerFormSchema>;

const registerAction = async (_: unknown, form: FormData): Promise<ActionReturn> => {
  const { firstName, confirmPassword, email, language, lastName, password } = parse<RegisterFormData>(form);
  const validate = registerFormSchema.safeParse({ email, password, firstName, lastName, confirmPassword });
  if (!validate.success) {
    return {
      statusCode: 400,
      errors: validate.error.flatten().fieldErrors,
    }
  }
  await registerRequest({ email, password, confirmPassword, firstName, lastName });
  return redirect(`/${language}/login?email=${email}`)
}

export default registerAction;