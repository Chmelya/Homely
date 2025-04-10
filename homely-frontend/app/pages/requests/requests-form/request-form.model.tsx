import { z } from 'zod';

export const serviceRequestValidationSchema = z.object({
	title: z.string().min(1, { message: 'Title cannot be empty' }),
	description: z
		.string()
		.max(140, { message: 'Description limit is 140' })
		.optional()
		.nullable(),
	urgency: z.number(),
	category: z.number(),
	status: z.number(),
});

export type ServiceRequestValues = z.infer<
	typeof serviceRequestValidationSchema
>;
