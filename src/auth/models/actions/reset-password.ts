'use server';

import { parse } from "@djeka07/utils";
import { z } from "zod";
import { resetPasswordRequest } from "../services/auth.service";
import { ActionReturn } from "~/common/models/types/actions";

const resetPasswordSchema = z.object({
  email: z.string({ message: 'login:form:email:error:empty' }).email('login:form:email:error:not-valid'),
});

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

const resetPasswordAction = async (_: unknown, formData: FormData): Promise<ActionReturn> => {
  const { email } = parse<ResetPasswordData>(formData);
  const validate = resetPasswordSchema.safeParse({ email });
  if (!validate.success) {
    return {
      statusCode: 400,
      errors: validate.error.flatten().fieldErrors,
    }
  }
  await resetPasswordRequest({ email });
  return { statusCode: 200 }
}

export default resetPasswordAction;