import { Button, Container, Paper, Stack } from '@mui/material';
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

	return (
		<Container className='mt-20'>
			<Form form={form} submitHandler={submitHandler}>
				<Paper elevation={10}>
					<Container className='px-20 py-10'>
						<Stack direction='column' gap={1}>
							<FormTextInput name='email' label='Login' />
							<FormTextInput name='password' label='Password' type='password' />
							<Button type='submit'>Sign in</Button>
						</Stack>
					</Container>
				</Paper>
			</Form>
		</Container>
	);
};

export default LoginPage;
