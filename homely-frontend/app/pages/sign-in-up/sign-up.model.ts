import { z } from 'zod';

export const signUpFormValidationSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email cannot be empty' })
		.email('This is not a valid email.'),
	password: z.string().min(1, { message: 'Password cannot be empty' }),
	firstName: z
		.string()
		.min(1, { message: 'First name cannot be empty' })
		.refine(
			(value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
			'First name should contain only alphabets'
		),
	middleName: z
		.string()
		.optional()
		.nullable()
		.refine(
			(value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value ?? ''),
			'Middle name should contain only alphabets'
		),
	lastName: z
		.string()
		.min(1, { message: 'Last name cannot be empty' })
		.refine(
			(value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
			'Last name should contain only alphabets'
		),
});

export type SignUpFormValues = z.infer<typeof signUpFormValidationSchema>;
