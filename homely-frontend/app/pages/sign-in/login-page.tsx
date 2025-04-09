import { Alert, Box, Button, Container, Paper, Stack } from '@mui/material';
import { AuthService } from '~/api/services/authService';
import { useDispatch } from 'react-redux';
import { authSlice } from '~/store/auth/auth-slice';
import {
	loginFormValidationSchema,
	type LoginFormValues,
} from './login-page.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTextInput from '~/components/form-components/form-text-input';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/routes/paths';
import Form from '~/components/form-components/form';
import { useMutation } from '@tanstack/react-query';
import { getApiErrorMessage } from '~/api/errors.util';

const LoginPage = () => {
	const navigate = useNavigate();

	const form = useForm<LoginFormValues>({
		defaultValues: {
			// TODO: Remove, was added fo tests purpose
			email: '',
			password: '',
		},
		resolver: zodResolver(loginFormValidationSchema),
		mode: 'onTouched',
	});

	const dispatch = useDispatch();

	const { isPending, mutate, error } = useMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: AuthService.signIn,
		onSuccess: (response) => {
			dispatch(
				authSlice.actions.signIn({
					accessToken: response,
				})
			);

			navigate(ROUTES.main);
		},
	});

	const submitHandler = async (values: LoginFormValues) => {
		mutate({ email: values.email, password: values.password });
	};

	return (
		<Box className=' h-screen flex items-center justify-center '>
			<Paper elevation={10} className='p-10 min-w-120'>
				<Form form={form} submitHandler={submitHandler}>
					<Stack direction='column' gap={2}>
						<FormTextInput name='email' label='Login' />
						<FormTextInput name='password' label='Password' type='password' />
						{error && (
							<Alert severity='error'>{getApiErrorMessage(error)}</Alert>
						)}
						<Button
							disabled={isPending}
							loading={isPending}
							variant='contained'
							type='submit'
						>
							Sign in
						</Button>
					</Stack>
				</Form>
			</Paper>
		</Box>
	);
};

export default LoginPage;
