import api from '../apiClient';

export class AuthService {
	static signIn = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		const res = await api.post<string>('/auth/signIn', { email, password });
		return res.data;
	};

	static signUp = async ({
		email,
		password,
		firstName,
		middleName,
		lastName,
	}: {
		email: string;
		password: string;
		firstName: string;
		middleName?: string | null;
		lastName: string;
	}) => {
		const res = await api.post('/auth/signUp', {
			email,
			password,
			firstName,
			middleName,
			lastName,
		});
		return res.data;
	};
}
