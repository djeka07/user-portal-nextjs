import zod from 'zod';

const editPasswordFormSchema = zod
  .object({
    intent: zod.string(),
    currentPassword: zod.string().min(1, 'form:update-password:input:current-password:error:empty'),
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

export type EditPasswordFormData = zod.infer<typeof editPasswordFormSchema>;
export default editPasswordFormSchema;
