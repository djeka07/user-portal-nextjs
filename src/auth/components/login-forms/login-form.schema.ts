import zod from 'zod';

export const loginSchema = zod.object({
  redirectTo: zod.string().optional(),
  email: zod.string({ message: 'login:form:email:error:empty' }).email('login:form:email:error:not-valid'),
  password: zod.string({ message: 'login:form:password:error:empty' }).min(1),
});

export type LoginFormData = zod.infer<typeof loginSchema>;
