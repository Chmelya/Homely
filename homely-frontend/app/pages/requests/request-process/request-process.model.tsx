import { z } from 'zod';

export const processServiceRequestValidationSchema = z.object({
	performer: z.number(),
});

export type ProcessServiceRequestValues = z.infer<
	typeof processServiceRequestValidationSchema
>;
