import zod from 'zod';

export const userFormSchema = zod.object({
  intent: zod.string(),
  id: zod.string().optional(),
  email: zod.string({ message: 'form:login:input:email:error:empty' }).email('form:login:input:email:error:not-valid'),
  firstName: zod.string().min(1, { message: 'form:user:input:firstName:error' }),
  lastName: zod.string().min(1, { message: 'form:user:input:lastName:error' }),
  roles: zod
    .array(zod.string().or(zod.boolean()))
    .nonempty('form:user:error:roles')
    .superRefine((ref, ctx) => {
      if (ref.every((r) => !r)) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'form:user:error:roles',
        });
      }
    }),
});

export type UserFormData = zod.infer<typeof userFormSchema>;
