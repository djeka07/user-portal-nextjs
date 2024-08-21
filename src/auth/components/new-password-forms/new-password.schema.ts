import zod from 'zod';

const newPasswordSchema = zod
  .object({
    password: zod
      .string()
      .min(1, 'form:login:input:password:error:empty')
      .min(8, 'form:login:input:password:error:short'),
    confirmPassword: zod
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

export type NewPasswordData = zod.infer<typeof newPasswordSchema>;
export default newPasswordSchema;
