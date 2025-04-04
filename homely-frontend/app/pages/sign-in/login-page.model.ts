import { z } from 'zod';

export const loginFormValidationSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email cannot be empty' })
		.email('This is not a valid email.'),
	password: z.string().min(1, { message: 'Password cannot be empty' }),
});

export type LoginFormValues = z.infer<typeof loginFormValidationSchema>;
