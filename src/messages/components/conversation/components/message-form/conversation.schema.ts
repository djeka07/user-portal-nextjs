import { z } from 'zod'

export const messageFormSchema = z.object({
  message: z.string().min(1, 'form.register.input.first-name.error.empty'),
});
