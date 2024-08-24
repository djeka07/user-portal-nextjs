'use server';

import { parse } from "@djeka07/utils";
import { loginRequest } from "../../auth/models/services/auth.service";
import { redirect } from "next/navigation";

import zod from 'zod';
import { ActionReturn } from "~/common/models/types/actions";
import { createSession } from '../test/session';
import { createToken } from '../../auth/models/helpers/token';

const loginSchema = zod.object({
  redirectTo: zod.string().optional(),
  language: zod.string().optional(),
  email: zod.string({ message: 'login:form:email:error:empty' }).email('login:form:email:error:not-valid'),
  password: zod.string({ message: 'login:form:password:error:empty' }).min(1, 'login:form:password:error:empty'),
});

type LoginFormData = zod.infer<typeof loginSchema>;

const loginAction = async (_: unknown, form: FormData): Promise<ActionReturn> => {
  const { email, language, password, redirectTo } = parse<LoginFormData>(form);
  const validate = loginSchema.safeParse({ email, password });
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
    }
  }
  const response = await loginRequest({ email, password });
  await createSession(createToken(response));
  return redirect(redirectTo || `/${language}`)
}

export default loginAction;