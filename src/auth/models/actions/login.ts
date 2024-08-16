'use server';

import { loginSchema } from "~/auth/components/login-forms/login-form.schema";
import { loginRequest } from "../services/auth.service";

const login = async (state: any, form: FormData) => {
  console.log('form', state, form)
  const email = String(form.get('email'));
  const password = String(form.get('password'));

  const validate = loginSchema.safeParse({ email, password });
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
    }
  }
  const response = await loginRequest({ email, password });
  return response;
}

export default login;