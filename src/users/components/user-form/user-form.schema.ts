import zod from 'zod';

export const userFormSchema = zod.object({
  intent: zod.string(),
  id: zod.string().optional(),
  email: zod.string({ message: 'form:login:input:email:error:empty' }).email('form:login:input:email:error:not-valid'),
  firstName: zod.string().min(1, { message: 'register:form:first-name:error:empty' }),
  lastName: zod.string().min(1, { message: 'register:form:last-name:error:empty' }),
  roles: zod
    .array(zod.string().or(zod.boolean()))
    .nonempty('form:user:error:roles')
    .superRefine((ref, ctx) => {
      if (ref.every((r) => !r)) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'users:users-list:form:roles:error:empty',
        });
      }
    }),
});

export type UserFormData = zod.infer<typeof userFormSchema>;
