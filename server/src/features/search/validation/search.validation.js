import { z } from 'zod';

export const suggestQuerySchema = z.object({
  query: z.object({
    q: z.string().max(100, 'Query cannot exceed 100 characters').optional(),
    limit: z.string().regex(/^\d+$/).optional().transform(Number).refine(val => val >= 1 && val <= 10, 'Limit must be between 1 and 10').optional()
  })
});
