import { Button, Container, Paper, Stack } from '@mui/material';
import { AuthService } from '~/api/services/authService';
import { useDispatch } from 'react-redux';
import { authSlice } from '~/store/auth/auth-slice';
import {
	loginFormValidationSchema,
	type LoginFormValues,
} from './login-page.model';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTextInput from '~/components/form-components/form-text-input';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/routes/paths';

const LoginPage = () => {
	const navigate = useNavigate();

	const form = useForm<LoginFormValues>({
		defaultValues: {
			// TODO: Remove, was added fo tests purpose
			email: 'ewr@mail.com',
			password: '',
		},
		resolver: zodResolver(loginFormValidationSchema),
		mode: 'onTouched',
	});

	const dispatch = useDispatch();
	const submitHandler = async (values: LoginFormValues) => {
		const token = await AuthService.signIn(values.email, values.password);

		dispatch(
			authSlice.actions.signIn({
				accessToken: token,
			})
		);

		navigate(ROUTES.main);
	};

	//TODO: Refactor
	return (
		<Container className='mt-20'>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(submitHandler)}>
					<Paper elevation={10}>
						<Container className='px-20 py-10'>
							<Stack direction='column' gap={1}>
								<FormTextInput
									control={form.control}
									name='email'
									label='Login'
								/>
								<FormTextInput
									control={form.control}
									name='password'
									label='Password'
									type='password'
								/>
								<Button type='submit'>Sign in</Button>
							</Stack>
						</Container>
					</Paper>
				</form>
			</FormProvider>
		</Container>
	);
};

export default LoginPage;
