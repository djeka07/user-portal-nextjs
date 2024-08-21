import zod from 'zod';

const resetFormSchema = zod.object({
  email: zod.string({ message: 'form:login:input:email:error:empty' }).email('form:login:input:email:error:not-valid'),
});

export type ResetFormData = zod.infer<typeof resetFormSchema>;
export default resetFormSchema;
