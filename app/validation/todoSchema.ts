import z from 'zod';

export const todoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must be provided')
    .max(30, 'Title must be between 1 and 30 characters'),
  description: z
    .string()
    .min(1, 'Description must be provided')
    .max(100, 'Description must be between 1 and 100 characters'),
});
