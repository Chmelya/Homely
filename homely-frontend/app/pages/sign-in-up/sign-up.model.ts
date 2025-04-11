import { z } from 'zod';

export const signUpFormValidationSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email cannot be empty' })
		.email('This is not a valid email.'),
	password: z.string().min(1, { message: 'Password cannot be empty' }),
	firstName: z.string().min(1, { message: 'First name cannot be empty' }),
	middleName: z.string().optional(),
	lastName: z.string().min(1, { message: 'Last name cannot be empty' }),
});

export type SignUpFormValues = z.infer<typeof signUpFormValidationSchema>;
