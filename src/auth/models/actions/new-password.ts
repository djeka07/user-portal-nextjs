'use server';

import newPasswordSchema from "~/auth/components/new-password-forms/new-password.schema";
import { newPasswordFromResetTokenRequest, NewPasswordFromResetTokenRequestParams } from "../services/auth.service";
import { FieldError } from "~/common/models/types/field-error";
import { parse } from '@djeka07/utils'

export type NewPasswordFromResetTokenState = {
  errors?: FieldError;
  statusCode?: number;
}

const newPasswordFromResetTokenAction = async (_: unknown, form: FormData): Promise<NewPasswordFromResetTokenState> => {
  const { password, confirmPassword, resetToken } = parse<NewPasswordFromResetTokenRequestParams>(form)
  const validate = newPasswordSchema.safeParse({ password, confirmPassword });
  if (!validate.success) {
    return {
      statusCode: 400,
      errors: validate.error.flatten().fieldErrors
    }
  }
  const response = await newPasswordFromResetTokenRequest({ resetToken, password, confirmPassword });
  return response;
}

export default newPasswordFromResetTokenAction;