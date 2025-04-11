import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';
import { AuthService } from '~/api/services/authService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTextInput from '~/components/form-components/form-text-input';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '~/routes/paths';
import Form from '~/components/form-components/form';
import { useMutation } from '@tanstack/react-query';
import {
	signUpFormValidationSchema,
	type SignUpFormValues,
} from './sign-up.model';
import { getApiErrorMessage } from '~/api/errors.util';

const LoginPage = () => {
	const navigate = useNavigate();

	const form = useForm<SignUpFormValues>({
		defaultValues: {
			// TODO: Remove, was added fo tests purpose
			email: '',
			password: '',
			firstName: '',
			middleName: undefined,
			lastName: '',
		},
		resolver: zodResolver(signUpFormValidationSchema),
		mode: 'onTouched',
	});

	const { isPending, mutate, error } = useMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: AuthService.signUp,
		onSuccess: () => {
			navigate(ROUTES.signIn);
		},
	});

	const submitHandler = async (values: SignUpFormValues) => {
		mutate({
			email: values.email,
			password: values.password,
			firstName: values.firstName,
			middleName: values.middleName,
			lastName: values.lastName,
		});
	};

	return (
		<Box className='h-screen flex items-center justify-center transition-all'>
			<Paper elevation={10} className='px-10 py-6 min-w-120'>
				<Form form={form} submitHandler={submitHandler}>
					<Stack direction='column' gap={2}>
						<FormTextInput name='email' label='Login' />
						<FormTextInput name='password' label='Password' type='password' />
						<FormTextInput name='firstName' label='First name' />
						<FormTextInput name='middleName' label='Middle name' />
						<FormTextInput name='lastName' label='Last name' />
						{error && (
							<Alert severity='error'>{getApiErrorMessage(error!)}</Alert>
						)}
						<Button
							disabled={isPending}
							loading={isPending}
							variant='contained'
							type='submit'
						>
							Sign up
						</Button>
					</Stack>
				</Form>
				<Box className='mt-4'>
					<Typography className='flex justify-center text-sm'>
						Already a resident?&nbsp;
						<Link className='underline text-pink-500' to={ROUTES.signIn}>
							Sign In!
						</Link>
					</Typography>
				</Box>
			</Paper>
		</Box>
	);
};

export default LoginPage;
