import z from 'zod';

export const completedSchema = z.object({
  completed: z.boolean(),
});
